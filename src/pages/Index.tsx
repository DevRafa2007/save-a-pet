import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Shield, Star, ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-pets.jpg';
import testimonialFamily from '@/assets/testimonial-family.jpg';
import { supabase } from '@/integrations/supabase/client';

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  description: string;
  image_url: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [featuredPets, setFeaturedPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchFeaturedPets = async () => {
      try {
        const { data, error } = await supabase
          .from('pets')
          .select('id, name, breed, age, description, image_url')
          .eq('is_available', true)
          .order('created_at', { ascending: false })
          .limit(2);

        if (error) throw error;
        setFeaturedPets(data || []);
      } catch (error) {
        console.error('Error fetching featured pets:', error);
      }
    };

    fetchFeaturedPets();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Bem-vindo ao <span className="text-primary">Save a Pet</span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  O lugar onde os animais encontram novos lares e os corações se enchem de alegria!
                </p>
                <p className="text-lg text-muted-foreground">
                  Conectamos famílias amorosas com pets que precisam de um lar. 
                  Cada adoção é uma nova história de amor.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8 py-6 shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105">
                  <Link to="/adotar">
                    <Heart className="w-5 h-5 mr-2" />
                    Adote um Pet Agora
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6 shadow-soft hover:shadow-medium transition-all duration-300">
                  <Link to="/cadastrar">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Cadastre seu Pet
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-warm rounded-3xl blur-3xl opacity-30 animate-bounce-gentle" />
              <img 
                src={heroImage} 
                alt="Famílias felizes com seus pets adotados"
                className="relative rounded-3xl shadow-strong w-full h-auto max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Pets Adotados', icon: Heart },
              { number: '300+', label: 'Famílias Felizes', icon: Users },
              { number: '100%', label: 'Verificados', icon: Shield },
              { number: '4.9', label: 'Avaliação', icon: Star },
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-medium">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">{stat.number}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Pets Esperando por Você</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conheça alguns dos nossos amiguinhos que estão ansiosos para encontrar uma família amorosa
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPets.map((pet) => (
              <Card key={pet.id} className="group overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={pet.image_url || ''} 
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{pet.name}</h3>
                    <p className="text-primary font-medium">{pet.breed} • {pet.age}</p>
                  </div>
                  <p className="text-muted-foreground line-clamp-2">{pet.description}</p>
                  <Button asChild className="w-full group/btn">
                    <Link to={`/pet/${pet.id}`}>
                      Conhecer {pet.name}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            <Card 
              onClick={() => navigate('/adotar')}
              className="group flex items-center justify-center border-2 border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
            >
              <CardContent className="text-center p-8 space-y-4 flex flex-col justify-center items-center h-full">
                <Heart className="w-12 h-12 text-primary mx-auto" />
                <div>
                  <h3 className="text-xl font-semibold">Ver Todos os Pets</h3>
                  <p className="text-muted-foreground">Descubra mais amiguinhos esperando por você</p>
                </div>
                <Button variant="outline">
                  Ver Mais Pets
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Histórias de Amor</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Veja como o Save a Pet transformou vidas e criou laços eternos
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Card className="border-0 shadow-medium bg-card/80 backdrop-blur">
                <CardContent className="p-8">
                  <div className="flex gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic mb-6">
                    "Adotar o Max através do Save a Pet foi a melhor decisão que tomamos. 
                    O processo foi muito simples e seguro. Hoje nossa família está completa!"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">MF</span>
                    </div>
                    <div>
                      <p className="font-semibold">Maria e Felipe</p>
                      <p className="text-muted-foreground text-sm">Adotaram Max em Janeiro/2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <img 
                src={testimonialFamily} 
                alt="Família feliz com pet adotado"
                className="rounded-3xl shadow-strong w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Pronto para Mudar uma Vida?
          </h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Seja adotando um pet ou oferecendo um lar temporário, 
            você pode fazer a diferença na vida de um animal.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
              <Link to="/adotar">Quero Adotar</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="text-lg px-8 py-6 border-white text-primary bg-white hover:bg-primary hover:text-white transition-colors"
            >
              <Link to="/cadastrar">Tenho um Pet</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;