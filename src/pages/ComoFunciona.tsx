import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Heart, Search, MessageCircle, Shield, Camera, FileCheck, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ComoFunciona = () => {
  const adoptionSteps = [
    {
      icon: Search,
      title: 'Cadastre-se como Adotante',
      description: 'Crie seu perfil gratuito na plataforma com suas informações básicas e preferências sobre pets.',
      details: ['Informações pessoais', 'Experiência com pets', 'Tipo de moradia', 'Preferências']
    },
    {
      icon: Heart,
      title: 'Pesquise e Escolha',
      description: 'Use nossos filtros avançados para encontrar pets que combinem com seu perfil e estilo de vida.',
      details: ['Filtros por idade, raça e temperamento', 'Localização próxima', 'Necessidades especiais', 'Fotos e descrições']
    },
    {
      icon: MessageCircle,
      title: 'Entre em Contato',
      description: 'Comunique-se diretamente com os responsáveis pelo pet através do nosso chat seguro.',
      details: ['Chat integrado na plataforma', 'Troca de informações', 'Agendamento de visitas', 'Esclarecimento de dúvidas']
    },
    {
      icon: Home,
      title: 'Faça a Adoção',
      description: 'Após conhecer o pet pessoalmente, finalize o processo de adoção de forma segura.',
      details: ['Visita presencial', 'Período de adaptação', 'Documentação necessária', 'Suporte pós-adoção']
    },
  ];

  const registerSteps = [
    {
      icon: FileCheck,
      title: 'Preencha o Formulário',
      description: 'Complete todas as informações sobre o pet que você quer colocar para adoção.',
      details: ['Nome, idade e raça', 'Temperamento e comportamento', 'Histórico médico', 'Necessidades especiais']
    },
    {
      icon: Camera,
      title: 'Adicione Fotos',
      description: 'Inclua fotos claras e de boa qualidade que mostrem a personalidade do seu pet.',
      details: ['Mínimo de 2 fotos', 'Diferentes ângulos', 'Boa iluminação', 'Mostrar o pet em ação']
    },
    {
      icon: Shield,
      title: 'Publicação Imediata',
      description: 'Seu anúncio é publicado instantaneamente e já fica visível para milhares de adotantes.',
      details: ['Anúncio ativo na hora', 'Visibilidade imediata', 'Edição fácil pelo perfil', 'Pronto para receber contatos']
    },
    {
      icon: MessageCircle,
      title: 'Receba Contatos',
      description: 'Interessados entrarão em contato através da plataforma para conhecer seu pet.',
      details: ['Notificações em tempo real', 'Chat seguro', 'Agendamento de visitas', 'Suporte durante o processo']
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Como <span className="text-primary">Funciona</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Nosso processo é simples, seguro e transparente. Conheça cada passo 
              para adotar um pet ou encontrar um novo lar para seu amiguinho.
            </p>
          </div>
        </div>
      </section>

      {/* Process Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="adopt" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-12 h-14">
              <TabsTrigger value="adopt" className="text-lg">Para Adotar um Pet</TabsTrigger>
              <TabsTrigger value="register" className="text-lg">Para Cadastrar um Pet</TabsTrigger>
            </TabsList>
            
            <TabsContent value="adopt" className="space-y-16">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold">Processo de Adoção</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Quatro passos simples para encontrar seu novo melhor amigo
                </p>
              </div>
              
              <div className="grid gap-8">
                {adoptionSteps.map((step, index) => (
                  <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-card/50 backdrop-blur">
                    <CardContent className="p-8">
                      <div className="grid lg:grid-cols-3 gap-8 items-center">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <step.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 bg-primary text-white text-sm font-bold rounded-full flex items-center justify-center">
                                {index + 1}
                              </span>
                              <h3 className="text-xl font-semibold">{step.title}</h3>
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:col-span-2 space-y-4">
                          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                          <div className="grid md:grid-cols-2 gap-3">
                            {step.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-sm">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center">
                <Button size="lg" asChild className="shadow-medium hover:shadow-strong hover:scale-105 transition-all duration-300">
                  <Link to="/adotar">
                    <Heart className="w-5 h-5 mr-2" />
                    Começar a Adotar
                  </Link>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-16">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold">Processo de Cadastro</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Quatro passos para encontrar uma família amorosa para seu pet
                </p>
              </div>
              
              <div className="grid gap-8">
                {registerSteps.map((step, index) => (
                  <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-card/50 backdrop-blur">
                    <CardContent className="p-8">
                      <div className="grid lg:grid-cols-3 gap-8 items-center">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center flex-shrink-0">
                            <step.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 bg-secondary text-white text-sm font-bold rounded-full flex items-center justify-center">
                                {index + 1}
                              </span>
                              <h3 className="text-xl font-semibold">{step.title}</h3>
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:col-span-2 space-y-4">
                          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                          <div className="grid md:grid-cols-2 gap-3">
                            {step.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                                <span className="text-sm">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center">
                <Button size="lg" asChild className="shadow-medium hover:shadow-strong hover:scale-105 transition-all duration-300">
                  <Link to="/cadastrar">
                    <Camera className="w-5 h-5 mr-2" />
                    Cadastrar Pet
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Segurança e Confiança</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Seu bem-estar e o dos pets é nossa prioridade
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verificação de Perfis',
                description: 'Todos os usuários passam por verificação antes de poder usar a plataforma.'
              },
              {
                icon: MessageCircle,
                title: 'Chat Seguro',
                description: 'Comunicação protegida dentro da plataforma sem exposição de dados pessoais.'
              },
              {
                icon: CheckCircle,
                title: 'Suporte 24/7',
                description: 'Nossa equipe está sempre disponível para ajudar durante todo o processo.'
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-soft bg-card/80 backdrop-blur text-center">
                <CardContent className="p-8 space-y-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
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
            Pronto para Começar?
          </h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Seja para adotar ou para encontrar um lar, estamos aqui para ajudar 
            em cada passo da jornada.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/adotar">Quero Adotar</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/cadastrar">Tenho um Pet</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ComoFunciona;