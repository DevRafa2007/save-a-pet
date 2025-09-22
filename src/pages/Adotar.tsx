import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Heart, Search, Filter, MapPin, Calendar, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import sampleDog from '@/assets/sample-dog.jpg';
import sampleCat from '@/assets/sample-cat.jpg';

const Adotar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');

  const pets = [
    {
      id: 1,
      name: 'Buddy',
      type: 'Cão',
      breed: 'Golden Retriever',
      age: '2 anos',
      gender: 'Macho',
      size: 'Grande',
      temperament: ['Carinhoso', 'Brincalhão', 'Sociável'],
      location: 'São Paulo, SP',
      description: 'Buddy é um golden retriever muito carinhoso que adora crianças e outros animais. Ele é super brincalhão e seria perfeito para uma família ativa.',
      image: sampleDog,
      vaccinated: true,
      neutered: true,
      contact: 'Maria Silva'
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Gato',
      breed: 'SRD (Laranja)',
      age: '1 ano',
      gender: 'Fêmea',
      size: 'Médio',
      temperament: ['Independente', 'Carinhosa', 'Calma'],
      location: 'Rio de Janeiro, RJ',
      description: 'Luna é uma gatinha muito especial. Apesar de independente, é extremamente carinhosa com quem conquista sua confiança. Perfeita para apartamentos.',
      image: sampleCat,
      vaccinated: true,
      neutered: true,
      contact: 'João Santos'
    },
    {
      id: 3,
      name: 'Thor',
      type: 'Cão',
      breed: 'Pastor Alemão',
      age: '3 anos',
      gender: 'Macho',
      size: 'Grande',
      temperament: ['Protetor', 'Leal', 'Inteligente'],
      location: 'Belo Horizonte, MG',
      description: 'Thor é um pastor alemão muito inteligente e protetor. Ideal para famílias que buscam um companheiro leal e guardião.',
      image: sampleDog,
      vaccinated: true,
      neutered: false,
      contact: 'Ana Costa'
    },
    {
      id: 4,
      name: 'Mimi',
      type: 'Gato',
      breed: 'Siamês',
      age: '6 meses',
      gender: 'Fêmea',
      size: 'Pequeno',
      temperament: ['Brincalhona', 'Curiosa', 'Vocal'],
      location: 'Porto Alegre, RS',
      description: 'Mimi é uma gatinha siamesa super brincalhona e curiosa. Ela adora explorar e é muito comunicativa. Perfeita para quem gosta de gatos ativos.',
      image: sampleCat,
      vaccinated: true,
      neutered: false,
      contact: 'Pedro Lima'
    },
  ];

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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPets.map((pet) => (
              <Card key={pet.id} className="group overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur">
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={pet.image} 
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
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
                    <Button className="flex-1">
                      Ver Detalhes
                    </Button>
                    <Button variant="outline" size="sm" className="px-3">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
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