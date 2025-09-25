import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, MapPin, MessageCircle, ArrowLeft, Shield, Syringe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  size: string;
  temperament: string[];
  location: string;
  description: string;
  image_url: string;
  vaccinated: boolean;
  neutered: boolean;
  user_id: string;
  profiles: {
    full_name: string;
    email: string;
    phone: string;
  };
}

const PetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('pets')
          .select(`
            *,
            profiles (
              full_name,
              email,
              phone
            )
          `)
          .eq('id', id)
          .eq('is_available', true)
          .single();

        if (error) throw error;
        setPet(data);
      } catch (error) {
        console.error('Error fetching pet:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os detalhes do pet.",
          variant: "destructive",
        });
        navigate('/adotar');
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id, navigate, toast]);

  const handleStartChat = async () => {
    if (!user || !pet) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para iniciar um chat.",
        variant: "destructive",
      });
      return;
    }

    if (user.id === pet.user_id) {
      toast({
        title: "Ops!",
        description: "Você não pode conversar consigo mesmo.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if chat already exists
      const { data: existingChat } = await supabase
        .from('chats')
        .select('id')
        .eq('pet_id', pet.id)
        .eq('interested_user_id', user.id)
        .single();

      if (existingChat) {
        navigate(`/chat/${existingChat.id}`);
        return;
      }

      // Create new chat
      const { data: newChat, error } = await supabase
        .from('chats')
        .insert({
          pet_id: pet.id,
          pet_owner_id: pet.user_id,
          interested_user_id: user.id,
        })
        .select('id')
        .single();

      if (error) throw error;

      navigate(`/chat/${newChat.id}`);
    } catch (error) {
      console.error('Error creating chat:', error);
      toast({
        title: "Erro",
        description: "Não foi possível iniciar o chat.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-96 bg-muted rounded-lg"></div>
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Pet não encontrado</h1>
          <Button onClick={() => navigate('/adotar')}>
            Voltar para adoção
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/adotar')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para adoção
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pet Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            {pet.image_url ? (
              <img 
                src={pet.image_url} 
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Sem foto disponível
              </div>
            )}
          </div>

          {/* Pet Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold">{pet.name}</h1>
                <Button size="sm" variant="ghost" className="p-2 hover:bg-pet-love/20">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xl text-primary font-medium mb-2">
                {pet.breed} • {pet.age} • {pet.gender}
              </p>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                {pet.location}
              </div>
            </div>

            {/* Health Status */}
            <div className="flex gap-3">
              <Badge className="bg-pet-secondary text-white flex items-center gap-1">
                <Syringe className="w-3 h-3" />
                {pet.vaccinated ? 'Vacinado' : 'Não Vacinado'}
              </Badge>
              <Badge className="bg-pet-primary text-white flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {pet.neutered ? 'Castrado' : 'Não Castrado'}
              </Badge>
            </div>

            {/* Temperament */}
            <div>
              <h3 className="font-semibold mb-3">Temperamento</h3>
              <div className="flex flex-wrap gap-2">
                {pet.temperament.map((trait, index) => (
                  <Badge key={index} variant="outline">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-3">Sobre {pet.name}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {pet.description}
              </p>
            </div>

            <Separator />

            {/* Contact Info */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Informações do Anunciante</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Nome:</span> {pet.profiles.full_name}</p>
                  {pet.profiles.phone && (
                    <p><span className="font-medium">Telefone:</span> {pet.profiles.phone}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                className="flex-1"
                onClick={handleStartChat}
                disabled={!user}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Iniciar Conversa
              </Button>
              <Button variant="outline" className="flex-1">
                <Heart className="w-4 h-4 mr-2" />
                Favoritar
              </Button>
            </div>

            {!user && (
              <p className="text-sm text-muted-foreground text-center">
                <Button variant="link" onClick={() => navigate('/auth')} className="p-0 h-auto">
                  Faça login
                </Button> para conversar com o anunciante
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PetDetails;