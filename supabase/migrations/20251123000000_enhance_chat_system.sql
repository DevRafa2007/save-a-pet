-- Aprimoramento completo do sistema de chat

-- Adiciona campos faltantes à tabela chats
ALTER TABLE public.chats
ADD COLUMN IF NOT EXISTS last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS last_message_preview TEXT,
ADD COLUMN IF NOT EXISTS pet_owner_unread_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS interested_user_unread_count INTEGER DEFAULT 0;

-- Adiciona campo para marcar mensagens como lidas
ALTER TABLE public.messages
ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT false;

-- Cria índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_chats_pet_owner_id ON public.chats(pet_owner_id);
CREATE INDEX IF NOT EXISTS idx_chats_interested_user_id ON public.chats(interested_user_id);
CREATE INDEX IF NOT EXISTS idx_chats_last_message_at ON public.chats(last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON public.messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);

-- Função para atualizar last_message_at e preview quando nova mensagem é inserida
CREATE OR REPLACE FUNCTION update_chat_after_message()
RETURNS TRIGGER AS $$
BEGIN
  -- Atualiza o timestamp da última mensagem e preview
  UPDATE public.chats
  SET 
    last_message_at = NEW.created_at,
    last_message_preview = SUBSTRING(NEW.content, 1, 50)
  WHERE id = NEW.chat_id;

  -- Atualiza contador de mensagens não lidas
  -- Se quem enviou é o dono do pet, incrementa contador do usuário interessado
  IF (SELECT pet_owner_id FROM public.chats WHERE id = NEW.chat_id) = NEW.sender_id THEN
    UPDATE public.chats
    SET interested_user_unread_count = interested_user_unread_count + 1
    WHERE id = NEW.chat_id;
  ELSE
    UPDATE public.chats
    SET pet_owner_unread_count = pet_owner_unread_count + 1
    WHERE id = NEW.chat_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para executar a função após inserir mensagem
DROP TRIGGER IF EXISTS update_chat_after_new_message ON public.messages;
CREATE TRIGGER update_chat_after_new_message
AFTER INSERT ON public.messages
FOR EACH ROW
EXECUTE FUNCTION update_chat_after_message();

-- Função para marcar mensagens como lidas
CREATE OR REPLACE FUNCTION mark_messages_as_read(chat_id UUID, user_id UUID)
RETURNS void AS $$
BEGIN
  -- Marca as mensagens como lidas
  UPDATE public.messages
  SET is_read = true
  WHERE chat_id = $1 AND sender_id != $2 AND is_read = false;

  -- Reseta o contador de não lidas apropriado
  IF (SELECT pet_owner_id FROM public.chats WHERE id = $1) = $2 THEN
    UPDATE public.chats
    SET pet_owner_unread_count = 0
    WHERE id = $1;
  ELSE
    UPDATE public.chats
    SET interested_user_unread_count = 0
    WHERE id = $1;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Melhorar RLS para mensagens incluir campo is_read
DROP POLICY IF EXISTS "Users can create messages in their chats" ON public.messages;
CREATE POLICY "Users can create messages in their chats" 
ON public.messages 
FOR INSERT 
WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (
    SELECT 1 FROM public.chats 
    WHERE chats.id = messages.chat_id 
    AND (chats.pet_owner_id = auth.uid() OR chats.interested_user_id = auth.uid())
  )
);

-- Função para limpar chats quando pet deixa de estar disponível
CREATE OR REPLACE FUNCTION handle_pet_unavailable()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_available = false AND OLD.is_available = true THEN
    -- Opcionalmente, você pode arquivar ou marcar os chats
    -- Por enquanto, apenas atualiza o timestamp
    UPDATE public.chats
    SET updated_at = now()
    WHERE pet_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para quando pet mudar de disponibilidade
DROP TRIGGER IF EXISTS pet_availability_changed ON public.pets;
CREATE TRIGGER pet_availability_changed
AFTER UPDATE ON public.pets
FOR EACH ROW
EXECUTE FUNCTION handle_pet_unavailable();
