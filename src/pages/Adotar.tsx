import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Heart, Search, Filter, MapPin, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
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
}

const Adotar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const { data, error } = await supabase
          .from('pets')
          .select('*')
          .eq('is_available', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPets(data || []);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const filteredPets = pets.filter(pet => {
    return (
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (selectedType === 'all' || pet.type === selectedType) &&
    (selectedAge === 'all' || pet.age.includes(selectedAge));
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Encontre seu <span className="text-primary">Novo Melhor Amigo</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubra pets incríveis que estão esperando por uma família amorosa. 
              Use os filtros abaixo para encontrar o companheiro perfeito para você.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card/50 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Buscar por nome ou raça..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Tipo de animal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="Cão">Cães</SelectItem>
                <SelectItem value="Gato">Gatos</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedAge} onValueChange={setSelectedAge}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Idade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as idades</SelectItem>
                <SelectItem value="meses">Filhotes</SelectItem>
                <SelectItem value="1">1 ano</SelectItem>
                <SelectItem value="2">2 anos</SelectItem>
                <SelectItem value="3">3+ anos</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="w-full lg:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filtros Avançados
            </Button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-muted-foreground">
              {filteredPets.length} {filteredPets.length === 1 ? 'pet encontrado' : 'pets encontrados'}
            </p>
          </div>
          
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="aspect-square bg-muted"></div>
                  <CardContent className="p-6 space-y-4">
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPets.map((pet) => (
                <Card key={pet.id} className="group overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur">
                  <div className="aspect-square overflow-hidden relative">
                    {pet.image_url ? (
                      <img 
                        src={pet.image_url} 
                        alt={pet.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                        Sem foto
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-foreground">
                        {pet.type}
                      </Badge>
                    </div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      {pet.vaccinated && (
                        <Badge className="bg-pet-secondary text-white">Vacinado</Badge>
                      )}
                      {pet.neutered && (
                        <Badge className="bg-pet-primary text-white">Castrado</Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{pet.name}</h3>
                        <Button size="sm" variant="ghost" className="p-2 hover:bg-pet-love/20">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-primary font-medium">{pet.breed} • {pet.age} • {pet.gender}</p>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {pet.location}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {pet.temperament.slice(0, 3).map((trait, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {pet.description}
                    </p>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => navigate(`/pet/${pet.id}`)}
                      >
                        Ver Detalhes
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="px-3"
                        onClick={() => navigate(`/pet/${pet.id}`)}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {filteredPets.length === 0 && (
            <div className="text-center py-16 space-y-6">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Nenhum pet encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros ou expandir sua busca
                </p>
              </div>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
                setSelectedAge('all');
              }}>
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Adotar;