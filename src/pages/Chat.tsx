import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Send, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ChatService, { Message, ChatDetail } from '@/integrations/supabase/chatService';

const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [chat, setChat] = useState<ChatDetail | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const loadChatData = async () => {
      if (!id) return;

      try {
        // Carregar dados do chat
        const chatData = await ChatService.getChatDetail(id);

        // Verificar se o usuário tem acesso a este chat
        if (chatData.pet_owner_id !== user.id && chatData.interested_user_id !== user.id) {
          toast({
            title: "Acesso negado",
            description: "Você não tem permissão para ver este chat.",
            variant: "destructive",
          });
          navigate('/chat');
          return;
        }

        setChat(chatData);

        // Carregar mensagens
        const messagesData = await ChatService.getMessages(id);
        setMessages(messagesData);

        // Marcar mensagens como lidas
        await ChatService.markMessagesAsRead(id, user.id);
      } catch (error) {
        console.error('Error fetching chat:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar o chat.",
          variant: "destructive",
        });
        navigate('/chat');
      } finally {
        setLoading(false);
      }
    };

    loadChatData();

    // Subscrever a novas mensagens
    if (id) {
      const subscription = ChatService.subscribeToMessages(
        id,
        (newMsg) => {
          setMessages((prev) => [...prev, newMsg]);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [id, user, navigate, toast]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !chat || sending) return;

    setSending(true);
    try {
      const sentMessage = await ChatService.sendMessage(
        chat.id,
        user.id,
        newMessage.trim()
      );
      setMessages((prev) => [...prev, sentMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Chat não encontrado</h1>
          <Button onClick={() => navigate('/chat')}>
            Voltar para chats
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const otherUser = chat.pet_owner_id === user?.id ? chat.interested_user : chat.pet_owner;

  // Validação mais segura
  if (!chat || !chat.pets || !otherUser) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Informações não disponíveis</h1>
          <Button onClick={() => navigate('/chat')}>
            Voltar para chats
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background flex flex-col md:relative md:min-h-screen md:bg-background">
      {/* Header - Hidden on mobile, visible on tablet+ */}
      <div className="hidden md:block">
        <Header />
      </div>
      
      <main className="flex-1 flex flex-col w-full h-screen md:h-auto md:container md:mx-auto md:px-4 md:py-8 md:max-w-2xl md:flex md:flex-col md:h-[calc(100vh-200px)]">
        {/* Back button - Only visible on mobile */}
        <div className="md:block hidden mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/chat')}
            className="flex items-center gap-2 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>

        <Card className="flex-1 flex flex-col shadow-none md:shadow-lg rounded-none md:rounded-lg overflow-hidden md:overflow-visible">
          {/* Header do Chat - Inspirado no WhatsApp */}
          <CardHeader className="border-b bg-gradient-to-r from-primary/10 to-primary/5 pb-4 md:pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Avatar Pet */}
                <div className="w-14 h-14 md:w-12 md:h-12 bg-gradient-to-br from-primary to-primary/50 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md">
                  {chat.pets?.image_url ? (
                    <img 
                      src={chat.pets.image_url} 
                      alt={chat.pets.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl md:text-xl">🐾</span>
                  )}
                </div>
                
                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg md:text-lg font-bold text-foreground truncate">
                    {chat.pets?.name || 'Chat'}
                  </h2>
                  <p className="text-sm md:text-xs text-foreground font-semibold mt-1 break-words">
                    {otherUser?.full_name || 'Usuário'}
                  </p>
                </div>
              </div>
              
              {/* Back button - Only visible on mobile, positioned in header */}
              <button
                onClick={() => navigate('/chat')}
                className="md:hidden ml-2 p-2 hover:bg-primary/10 rounded-full transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          </CardHeader>

          {/* Área de Mensagens - Inspirada no WhatsApp */}
          <CardContent className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3 bg-gradient-to-b from-background to-muted/30">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8 md:py-12 flex flex-col items-center justify-center h-full">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-primary/50" />
                </div>
                <p className="font-medium text-sm md:text-base">Nenhuma mensagem ainda</p>
                <p className="text-xs md:text-sm">Inicie a conversa sobre {chat.pets?.name}</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                  } animate-fade-in px-1 md:px-0`}
                >
                  <div
                    className={`max-w-xs px-4 py-2.5 rounded-2xl shadow-sm ${
                      message.sender_id === user?.id
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-white text-foreground border border-border rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm md:text-base break-words">{message.content}</p>
                    <p className={`text-xs mt-1.5 ${
                      message.sender_id === user?.id
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground'
                    }`}>
                      {formatDistanceToNow(new Date(message.created_at), {
                        addSuffix: false,
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input de Mensagem - Inspirado no WhatsApp */}
          <div className="border-t bg-white p-3 md:p-4 rounded-b-lg md:rounded-b-lg">
            <form onSubmit={sendMessage} className="flex gap-2 md:gap-3 items-end">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Mensagem..."
                disabled={sending}
                className="flex-1 rounded-full border-0 bg-muted/50 focus:bg-white px-4 md:px-5 py-2 md:py-2.5 text-sm md:text-base focus:ring-2 focus:ring-primary"
              />
              <Button 
                type="submit" 
                disabled={sending || !newMessage.trim()}
                size="sm"
                className="rounded-full w-10 h-10 md:w-10 md:h-10 p-0 flex items-center justify-center flex-shrink-0"
              >
                <Send className="w-4 h-4 md:w-4 md:h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </main>

      {/* Footer - Hidden on mobile, visible on tablet+ */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Chat;