import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, PlusCircle, PawPrint } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  image_url: string;
  is_available: boolean;
}

const MeusPets = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPets = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('pets')
          .select('id, name, breed, age, image_url, is_available')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPets(data || []);
      } catch (error) {
        console.error('Error fetching user pets:', error);
        toast({
          title: "Erro ao buscar seus pets",
          description: "Não foi possível carregar a lista dos seus pets. Tente novamente.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserPets();
  }, [user, navigate, toast]);

  const handleDeletePet = async (petId: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este pet? Esta ação não pode ser desfeita.")) {
      return;
    }

    try {
      const { error } = await supabase.from('pets').delete().eq('id', petId);

      if (error) throw error;

      setPets(pets.filter(p => p.id !== petId));
      toast({
        title: "Pet excluído com sucesso!",
      });
    } catch (error) {
      console.error('Error deleting pet:', error);
      toast({
        title: "Erro ao excluir o pet",
        description: "Não foi possível remover o pet. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Meus Pets Cadastrados</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-square bg-muted rounded-t-lg"></div>
                <CardContent className="p-4 space-y-3">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold">Meus Pets</h1>
          <Button onClick={() => navigate('/cadastrar')}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Cadastrar Novo Pet
          </Button>
        </div>

        {pets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map(pet => (
              <Card key={pet.id} className="overflow-hidden shadow-soft bg-card/50 backdrop-blur">
                <div className="aspect-square relative group">
                  <img
                    src={pet.image_url || ''}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={pet.is_available ? 'default' : 'destructive'}>
                      {pet.is_available ? 'Disponível' : 'Adotado'}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{pet.name}</h3>
                      <p className="text-muted-foreground">{pet.breed}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => navigate(`/pet/editar/${pet.id}`)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDeletePet(pet.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <PawPrint className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Nenhum pet cadastrado</h2>
            <p className="text-muted-foreground mb-6">Você ainda não cadastrou nenhum pet para adoção.</p>
            <Button onClick={() => navigate('/cadastrar')}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Cadastrar meu primeiro pet
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MeusPets;