import { supabase } from './client';

export interface ChatListItem {
  id: string;
  pet_id: string;
  pet_name: string;
  pet_image_url: string | null;
  last_message_preview: string | null;
  last_message_at: string;
  other_user_name: string;
  other_user_id: string;
  unread_count: number;
  is_pet_owner: boolean;
}

export interface ChatDetail {
  id: string;
  pet_id: string;
  pet_owner_id: string;
  interested_user_id: string;
  pets: {
    name: string;
    image_url: string | null;
  };
  pet_owner: {
    full_name: string;
  };
  interested_user: {
    full_name: string;
  };
}

export interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  is_read: boolean;
  sender: {
    full_name: string;
  };
}

class ChatService {
  /**
   * Obtém todos os chats do usuário (como doador e como interessado)
   */
  static async getUserChats(userId: string): Promise<ChatListItem[]> {
    const { data, error } = await supabase
      .from('chats')
      .select(`
        *,
        pets (
          name,
          image_url
        ),
        pet_owner:profiles!chats_pet_owner_id_fkey (
          full_name
        ),
        interested_user:profiles!chats_interested_user_id_fkey (
          full_name
        )
      `)
      .or(`pet_owner_id.eq.${userId},interested_user_id.eq.${userId}`)
      .order('last_message_at', { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) return [];

    // Transforma dados em formato legível
    return data.map((chat: any) => {
      const isPetOwner = chat.pet_owner_id === userId;
      const otherUser = isPetOwner ? chat.interested_user : chat.pet_owner;
      const unreadCount = isPetOwner 
        ? (chat.pet_owner_unread_count || 0)
        : (chat.interested_user_unread_count || 0);

      return {
        id: chat.id,
        pet_id: chat.pet_id,
        pet_name: chat.pets?.name || 'Pet',
        pet_image_url: chat.pets?.image_url || null,
        last_message_preview: chat.last_message_preview || 'Nenhuma mensagem',
        last_message_at: chat.last_message_at,
        other_user_name: otherUser?.full_name || 'Desconhecido',
        other_user_id: isPetOwner ? chat.interested_user_id : chat.pet_owner_id,
        unread_count: unreadCount,
        is_pet_owner: isPetOwner,
      };
    });
  }

  /**
   * Obtém os detalhes de um chat específico
   */
  static async getChatDetail(chatId: string): Promise<ChatDetail> {
    // Primeiro, obtém o chat com os IDs
    const { data: chatData, error: chatError } = await supabase
      .from('chats')
      .select(`
        *,
        pets!pet_id (
          name,
          image_url
        )
      `)
      .eq('id', chatId)
      .single();

    if (chatError) {
      console.error('Error fetching chat detail:', chatError);
      throw chatError;
    }
    if (!chatData) throw new Error('Chat não encontrado');

    // Depois, busca os dados dos usuários usando os IDs diretos
    const { data: petOwnerData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', chatData.pet_owner_id)
      .single();

    const { data: interestedUserData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', chatData.interested_user_id)
      .single();

    console.log('Chat data from DB:', {
      id: chatData.id,
      pets: chatData.pets,
      pet_owner: petOwnerData,
      interested_user: interestedUserData,
      pet_owner_id: chatData.pet_owner_id,
      interested_user_id: chatData.interested_user_id,
    });

    // Mapear os dados para o formato correto
    return {
      id: chatData.id,
      pet_id: chatData.pet_id,
      pet_owner_id: chatData.pet_owner_id,
      interested_user_id: chatData.interested_user_id,
      pets: chatData.pets || { name: 'Pet', image_url: null },
      pet_owner: petOwnerData || { full_name: 'Usuário' },
      interested_user: interestedUserData || { full_name: 'Usuário' },
    } as ChatDetail;
  }

  /**
   * Obtém mensagens de um chat
   */
  static async getMessages(
    chatId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles!messages_sender_id_fkey (
          full_name
        )
      `)
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return (data as any[]) || [];
  }

  /**
   * Envia uma mensagem
   */
  static async sendMessage(
    chatId: string,
    senderId: string,
    content: string
  ): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        chat_id: chatId,
        sender_id: senderId,
        content,
      })
      .select(`
        *,
        sender:profiles!messages_sender_id_fkey (
          full_name
        )
      `)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Erro ao enviar mensagem');

    return data as unknown as Message;
  }

  /**
   * Marca mensagens como lidas
   */
  static async markMessagesAsRead(chatId: string, userId: string): Promise<void> {
    try {
      // Verifica se o usuário é o dono do pet ou interessado
      const { data: chat } = await supabase
        .from('chats')
        .select('pet_owner_id, interested_user_id')
        .eq('id', chatId)
        .single();

      if (!chat) return;

      const isPetOwner = chat.pet_owner_id === userId;

      // Atualiza o contador apropriado com type assertion
      const updateData = isPetOwner
        ? { pet_owner_unread_count: 0 }
        : { interested_user_unread_count: 0 };

      await supabase
        .from('chats')
        .update(updateData as any)
        .eq('id', chatId);

      // Marca mensagens como lidas
      await supabase
        .from('messages')
        .update({ is_read: true } as any)
        .eq('chat_id', chatId)
        .neq('sender_id', userId);
    } catch (err) {
      console.warn('Não foi possível marcar mensagens como lidas:', err);
      // Continua mesmo se falhar, não é crítico
    }
  }

  /**
   * Cria um novo chat (ou retorna existente)
   */
  static async getOrCreateChat(
    petId: string,
    petOwnerId: string,
    interestedUserId: string
  ): Promise<string> {
    // Verifica se chat já existe
    const { data: existingChat } = await supabase
      .from('chats')
      .select('id')
      .eq('pet_id', petId)
      .eq('interested_user_id', interestedUserId)
      .single();

    if (existingChat) {
      return existingChat.id;
    }

    // Cria novo chat
    const { data: newChat, error } = await supabase
      .from('chats')
      .insert({
        pet_id: petId,
        pet_owner_id: petOwnerId,
        interested_user_id: interestedUserId,
      })
      .select('id')
      .single();

    if (error) throw error;
    if (!newChat) throw new Error('Erro ao criar chat');

    return newChat.id;
  }

  /**
   * Subscreve a atualizações de mensagens em um chat
   */
  static subscribeToMessages(
    chatId: string,
    onInsert: (message: Message) => void,
    onUpdate?: (message: Message) => void
  ) {
    const channel = supabase
      .channel(`chat:${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          onInsert(payload.new as Message);
        }
      );

    if (onUpdate) {
      channel.on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          onUpdate(payload.new as Message);
        }
      );
    }

    channel.subscribe();

    return {
      unsubscribe: () => {
        supabase.removeChannel(channel);
      },
    };
  }

  /**
   * Subscreve a atualizações de chats do usuário
   */
  static subscribeToUserChats(
    userId: string,
    onUpdate: (chat: ChatListItem) => void
  ) {
    const channel = supabase
      .channel(`user-chats:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chats',
          filter: `or(pet_owner_id.eq.${userId},interested_user_id.eq.${userId})`,
        },
        async (payload) => {
          // Busca os dados atualizados do chat
          const updatedChat = await this.getUserChats(userId);
          updatedChat.forEach(onUpdate);
        }
      )
      .subscribe();

    return {
      unsubscribe: () => {
        supabase.removeChannel(channel);
      },
    };
  }
}

export default ChatService;
