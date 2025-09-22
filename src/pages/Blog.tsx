import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: 'Como Preparar Sua Casa para a Adoção de um Pet',
      excerpt: 'Dicas essenciais para criar um ambiente seguro e acolhedor para seu novo amiguinho. Descubra o que você precisa saber antes da chegada.',
      content: 'A chegada de um novo pet é um momento especial que requer preparação. Começe removendo objetos perigosos, como plantas tóxicas e produtos de limpeza ao alcance. Prepare um espaço específico com cama, comedouro e brinquedos. Para gatos, não esqueça da caixa de areia em local acessível e tranquilo.',
      author: 'Dr. Maria Silva',
      date: '2024-01-15',
      category: 'Preparação',
      readTime: '5 min',
      featured: true
    },
    {
      id: 2,
      title: 'Adoção Responsável: Como Saber se Você Está Pronto',
      excerpt: 'Reflexões importantes sobre o compromisso de ter um pet e como avaliar se este é o momento certo para sua família.',
      content: 'Adotar um pet é uma decisão que mudará sua vida por 10-15 anos ou mais. Considere seu tempo disponível, estabilidade financeira, espaço físico e compromisso emocional. Pets precisam de atenção diária, cuidados veterinários regulares e muito amor.',
      author: 'Ana Costa',
      date: '2024-01-10',
      category: 'Responsabilidade',
      readTime: '7 min',
      featured: true
    },
    {
      id: 3,
      title: '5 Coisas Que Você Precisa Saber Antes de Adotar um Pet',
      excerpt: 'Informações fundamentais que todo futuro tutor deve conhecer para garantir uma adoção bem-sucedida.',
      content: '1. Custos envolvidos: alimentação, veterinário, vacinas. 2. Tempo necessário para exercícios e socialização. 3. Escolha baseada no seu estilo de vida. 4. Importância da castração. 5. Paciência durante o período de adaptação.',
      author: 'João Santos',
      date: '2024-01-05',
      category: 'Dicas',
      readTime: '4 min',
      featured: false
    },
    {
      id: 4,
      title: 'A Importância da Socialização para Pets Resgatados',
      excerpt: 'Como ajudar seu pet resgatado a se adaptar ao novo lar e criar vínculos saudáveis com a família.',
      content: 'Pets resgatados podem ter traumas ou medos específicos. A socialização gradual é fundamental: apresente novos ambientes lentamente, use reforço positivo e seja paciente. Cada animal tem seu tempo de adaptação.',
      author: 'Dr. Pedro Lima',
      date: '2024-01-01',
      category: 'Comportamento',
      readTime: '6 min',
      featured: false
    },
    {
      id: 5,
      title: 'Cuidados Veterinários Essenciais para Pets Adotados',
      excerpt: 'Protocolo completo de cuidados médicos que seu novo pet precisa nos primeiros meses após a adoção.',
      content: 'Logo após a adoção, leve seu pet ao veterinário para um check-up completo. Inclui: exames de sangue, atualização de vacinas, vermifugação, teste para doenças específicas e discussão sobre castração se ainda não realizada.',
      author: 'Dra. Carla Oliveira',
      date: '2023-12-28',
      category: 'Saúde',
      readTime: '8 min',
      featured: false
    }
  ];

  const categories = ['Todas', 'Preparação', 'Responsabilidade', 'Dicas', 'Comportamento', 'Saúde'];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Blog <span className="text-primary">Save a Pet</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Informações, dicas e histórias para uma adoção responsável e feliz. 
              Aprenda tudo sobre cuidados com pets e prepare-se para essa jornada de amor.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-card/50 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'Todas' ? 'default' : 'outline'}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Artigos em Destaque</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {articles.filter(article => article.featured).map((article) => (
                <Card key={article.id} className="group overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur">
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Badge className="bg-primary">{article.category}</Badge>
                        <div className="flex items-center text-muted-foreground text-sm gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(article.date).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {article.readTime}
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          {article.author}
                        </div>
                        
                        <Button variant="ghost" className="group/btn">
                          Ler Mais
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Articles */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Todos os Artigos</h2>
            
            <div className="grid gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="group overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-card/50 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-3 gap-6 items-start">
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">{article.category}</Badge>
                          <div className="flex items-center text-muted-foreground text-sm gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(article.date).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {article.readTime}
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          {article.author}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-end">
                        <Button className="group/btn">
                          Ler Artigo
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carregar Mais Artigos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Receba Dicas Exclusivas
            </h2>
            <p className="text-xl opacity-90">
              Assine nossa newsletter e receba conteúdos exclusivos sobre adoção responsável, 
              cuidados com pets e histórias inspiradoras.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
              />
              <Button variant="secondary" size="lg">
                Assinar
              </Button>
            </div>
            
            <p className="text-sm opacity-75">
              Prometemos não fazer spam. Você pode cancelar a qualquer momento.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;