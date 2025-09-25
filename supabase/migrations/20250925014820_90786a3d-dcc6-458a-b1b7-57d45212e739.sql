-- Create pets table
CREATE TABLE public.pets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Cão', 'Gato')),
  breed TEXT NOT NULL,
  age TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Macho', 'Fêmea')),
  size TEXT NOT NULL CHECK (size IN ('Pequeno', 'Médio', 'Grande')),
  temperament TEXT[] NOT NULL DEFAULT '{}',
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  vaccinated BOOLEAN NOT NULL DEFAULT false,
  neutered BOOLEAN NOT NULL DEFAULT false,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;

-- Create policies for pets
CREATE POLICY "Anyone can view available pets" 
ON public.pets 
FOR SELECT 
USING (is_available = true);

CREATE POLICY "Users can view their own pets" 
ON public.pets 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own pets" 
ON public.pets 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pets" 
ON public.pets 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pets" 
ON public.pets 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create chats table
CREATE TABLE public.chats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id UUID NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
  pet_owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  interested_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(pet_id, interested_user_id)
);

-- Enable RLS
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

-- Create policies for chats
CREATE POLICY "Users can view their own chats" 
ON public.chats 
FOR SELECT 
USING (auth.uid() = pet_owner_id OR auth.uid() = interested_user_id);

CREATE POLICY "Users can create chats for pets" 
ON public.chats 
FOR INSERT 
WITH CHECK (auth.uid() = interested_user_id AND auth.uid() != pet_owner_id);

-- Create messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id UUID NOT NULL REFERENCES public.chats(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policies for messages
CREATE POLICY "Users can view messages from their chats" 
ON public.messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.chats 
    WHERE chats.id = messages.chat_id 
    AND (chats.pet_owner_id = auth.uid() OR chats.interested_user_id = auth.uid())
  )
);

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

-- Add triggers for updated_at
CREATE TRIGGER update_pets_updated_at
BEFORE UPDATE ON public.pets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chats_updated_at
BEFORE UPDATE ON public.chats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();