import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Sobre = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Sobre o <span className="text-primary">Save a Pet</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Conectando corações e transformando vidas através da adoção responsável. 
              Nossa missão é simples: cada pet merece uma família, cada família merece um pet.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold">Nossa Missão</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Fundado com o propósito de reduzir o número de animais abandonados, 
                  o Save a Pet é uma plataforma que facilita o encontro entre pets que 
                  precisam de um lar e famílias que desejam compartilhar amor.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Acreditamos que a adoção responsável é um ato de amor que transforma 
                  duas vidas: a do animal que ganha uma família e a da família que se 
                  completa com um novo membro.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/adotar">
                    <Heart className="w-5 h-5 mr-2" />
                    Adotar Agora
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/cadastrar">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Cadastrar Pet
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-warm rounded-3xl blur-3xl opacity-30" />
              <Card className="relative border-0 shadow-strong bg-card/80 backdrop-blur">
                <CardContent className="p-8 space-y-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-8 h-8 text-white" fill="currentColor" />
                  </div>
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold">Mais de 500 Vidas Transformadas</h3>
                    <p className="text-muted-foreground">
                      Desde nossa fundação, já conectamos centenas de pets com suas famílias ideais.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Nossos Valores</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Os princípios que guiam nossa missão de conectar pets e famílias
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Bem-estar Animal',
                description: 'Garantimos que todos os animais sejam tratados com dignidade, amor e respeito. Cada pet merece cuidado e carinho.'
              },
              {
                icon: Shield,
                title: 'Adoção Responsável',
                description: 'Promovemos o cuidado consciente através de processos seguros que garantem o bem-estar de pets e famílias.'
              },
              {
                icon: Users,
                title: 'Educação e Conscientização',
                description: 'Informamos sobre adoção responsável e cuidados com animais, criando uma comunidade mais consciente.'
              },
            ].map((value, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-card/50 backdrop-blur">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Como Trabalhamos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nosso processo é cuidadoso e transparente para garantir o melhor para todos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Verificação Cuidadosa',
                description: 'Todos os pets e adotantes passam por um processo de verificação para garantir segurança.'
              },
              {
                number: '02',
                title: 'Conexão Personalizada',
                description: 'Ajudamos a encontrar a combinação perfeita entre pet e família baseada no perfil de cada um.'
              },
              {
                number: '03',
                title: 'Suporte Contínuo',
                description: 'Oferecemos acompanhamento e suporte mesmo após a adoção para garantir adaptação.'
              },
            ].map((step, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 group">
                <CardContent className="p-8 space-y-6">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-bold text-primary">{step.number}</span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Faça Parte da Nossa Missão
          </h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Junte-se a nós na construção de um mundo onde todos os pets tenham um lar amoroso
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/como-funciona">Como Funciona</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/adotar">Começar Agora</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;