import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MessageCircle, Search, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatService, { ChatListItem } from '@/integrations/supabase/chatService';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ChatInbox = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [filteredChats, setFilteredChats] = useState<ChatListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const loadChats = async () => {
      try {
        const userChats = await ChatService.getUserChats(user.id);
        setChats(userChats);
        setFilteredChats(userChats);
      } catch (error) {
        console.error('Error loading chats:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os chats.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadChats();

    // Subscrever a atualizações de chats em tempo real
    const subscription = ChatService.subscribeToUserChats(user.id, (updatedChat) => {
      setChats((prev) => {
        const index = prev.findIndex((c) => c.id === updatedChat.id);
        if (index > -1) {
          const newChats = [...prev];
          newChats[index] = updatedChat;
          return newChats.sort((a, b) => 
            new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()
          );
        }
        return [updatedChat, ...prev];
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user, navigate, toast]);

  // Atualizar chats filtrados quando chats ou filtros mudarem
  useEffect(() => {
    let filtered = chats;

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (chat) =>
          chat.pet_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chat.other_user_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por lidas/não lidas
    if (filter === 'unread') {
      filtered = filtered.filter((chat) => chat.unread_count > 0);
    }

    setFilteredChats(filtered);
  }, [chats, searchTerm, filter]);

  const handleChatClick = async (chatId: string, userId: string) => {
    // Marcar mensagens como lidas ao entrar no chat
    await ChatService.markMessagesAsRead(chatId, userId);
    navigate(`/chat/${chatId}`);
  };

  const totalUnread = chats.reduce((sum, chat) => sum + chat.unread_count, 0);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/adotar')}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <MessageCircle className="w-8 h-8" />
                Meus Chats
              </h1>
              <p className="text-muted-foreground mt-1">
                Você tem {chats.length} conversa{chats.length !== 1 ? 's' : ''}
                {totalUnread > 0 && ` (${totalUnread} não lida${totalUnread !== 1 ? 's' : ''})`}
              </p>
            </div>
          </div>

          {/* Barra de Busca e Filtros */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por pet ou usuário..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className="rounded-full"
              >
                Todos
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                onClick={() => setFilter('unread')}
                className="rounded-full"
              >
                Não Lidas {totalUnread > 0 && `(${totalUnread})`}
              </Button>
            </div>
          </div>
        </div>

        {/* Lista de Chats */}
        {filteredChats.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma conversa encontrada</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm
                  ? 'Tente ajustar sua busca'
                  : 'Comece a conversar indo até a aba de Adoção'}
              </p>
              {!searchTerm && (
                <Button onClick={() => navigate('/adotar')}>
                  Ir para Adoção
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredChats.map((chat) => (
              <Card
                key={chat.id}
                className="hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleChatClick(chat.id, user.id)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4 items-center">
                    {/* Avatar do Pet */}
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {chat.pet_image_url ? (
                        <img
                          src={chat.pet_image_url}
                          alt={chat.pet_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl">🐾</span>
                      )}
                    </div>

                    {/* Info do Chat */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">
                          {chat.pet_name}
                        </h3>
                        {chat.is_pet_owner && (
                          <Badge variant="secondary" className="text-xs">
                            Seu anúncio
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Com {chat.other_user_name}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {chat.last_message_preview}
                      </p>
                    </div>

                    {/* Timestamp e Badge de Não Lido */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(chat.last_message_at), {
                          addSuffix: false,
                          locale: ptBR,
                        })}
                      </p>
                      {chat.unread_count > 0 && (
                        <Badge className="bg-primary rounded-full">
                          {chat.unread_count}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ChatInbox;
