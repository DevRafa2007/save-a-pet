import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FAQ = () => {
  const faqs = [
    {
      category: 'Adoção',
      questions: [
        {
          question: 'Como funciona o processo de adoção?',
          answer: 'O processo é simples: cadastre-se na plataforma, navegue pelos pets disponíveis, entre em contato com o responsável, agende uma visita e, se houver compatibilidade, finalize a adoção. Todo o processo é acompanhado pela nossa equipe.'
        },
        {
          question: 'Existe algum custo para adotar?',
          answer: 'A adoção através do Save a Pet é gratuita. No entanto, alguns responsáveis podem solicitar uma taxa simbólica para cobrir custos de vacinação ou castração. Isso será informado claramente no perfil do pet.'
        },
        {
          question: 'Posso visitar o pet antes de decidir?',
          answer: 'Sim! Incentivamos fortemente que você conheça o pet pessoalmente antes da adoção. É importante verificar a compatibilidade entre vocês e garantir que é a escolha certa para ambos.'
        },
        {
          question: 'E se eu morar em apartamento?',
          answer: 'Muitos pets se adaptam perfeitamente a apartamentos. O importante é escolher um animal compatível com seu espaço e estilo de vida. Gatos e cães pequenos geralmente se adaptam bem a apartamentos.'
        },
        {
          question: 'Preciso ter experiência prévia com pets?',
          answer: 'Não é obrigatório, mas é importante estar disposto a aprender. Oferecemos recursos educacionais e você sempre pode conversar com o responsável atual sobre os hábitos e necessidades específicas do pet.'
        }
      ]
    },
    {
      category: 'Cadastro de Pets',
      questions: [
        {
          question: 'Como cadastro meu pet para adoção?',
          answer: 'Acesse a seção "Cadastrar Pet", preencha o formulário completo com informações detalhadas sobre seu pet e adicione fotos de qualidade. O anúncio fica disponível na plataforma imediatamente após o envio!'
        },
        {
          question: 'Quantas fotos devo incluir?',
          answer: 'Recomendamos pelo menos 3 fotos de boa qualidade mostrando diferentes ângulos do pet. Fotos claras e bem iluminadas aumentam significativamente as chances de adoção.'
        },
        {
          question: 'Posso editar as informações depois?',
          answer: 'Sim, você pode atualizar as informações do seu pet a qualquer momento através do seu perfil de usuário.'
        },
        {
          question: 'O que acontece se eu mudar de ideia?',
          answer: 'Você pode remover o anúncio do seu pet a qualquer momento. Caso já tenha interessados, pedimos que comunique a todos de forma respeitosa.'
        },
        {
          question: 'Vocês verificam as informações?',
          answer: 'Sim, nossa equipe monitora os anúncios para garantir a segurança e a veracidade das informações. Temos um sistema de denúncias para qualquer comportamento inadequado, protegendo pets e adotantes.'
        }
      ]
    },
    {
      category: 'Segurança',
      questions: [
        {
          question: 'Como vocês garantem a segurança?',
          answer: 'Verificamos todos os perfis, oferecemos chat interno seguro, fornecemos diretrizes de segurança e temos uma equipe de suporte disponível. Sempre recomendamos encontros em locais seguros.'
        },
        {
          question: 'Posso denunciar comportamento suspeito?',
          answer: 'Sim! Temos um sistema de denúncias ativo. Qualquer comportamento inadequado pode ser reportado e nossa equipe tomará as medidas necessárias imediatamente.'
        },
        {
          question: 'Minhas informações pessoais ficam seguras?',
          answer: 'Sim, protegemos rigorosamente seus dados pessoais. Suas informações só são compartilhadas quando você autoriza o contato com interessados específicos.'
        },
        {
          question: 'Como funciona o chat da plataforma?',
          answer: 'O chat é interno e seguro. Você pode conversar com interessados sem expor seu telefone ou e-mail até se sentir confortável para compartilhar essas informações.'
        }
      ]
    },
    {
      category: 'Pós-Adoção',
      questions: [
        {
          question: 'Vocês oferecem suporte após a adoção?',
          answer: 'Sim! Oferecemos suporte contínuo através de nosso blog educativo, chat de suporte e uma comunidade ativa. Estamos aqui para ajudar na adaptação.'
        },
        {
          question: 'E se houver problemas de adaptação?',
          answer: 'É normal haver um período de adaptação. Oferecemos dicas e suporte, mas se realmente não der certo, ajudamos a encontrar uma nova família para o pet de forma responsável.'
        },
        {
          question: 'Posso manter contato com o antigo tutor?',
          answer: 'Isso fica a critério de ambas as partes. Muitos ex-tutores gostam de receber atualizações sobre como o pet está se adaptando.'
        },
        {
          question: 'Como posso compartilhar a história de sucesso?',
          answer: 'Adoramos histórias de sucesso! Você pode enviar fotos e depoimentos através do nosso site. Com sua permissão, podemos compartilhar para inspirar outras adoções.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Perguntas <span className="text-primary">Frequentes</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Encontre respostas para as dúvidas mais comuns sobre adoção de pets, 
              cadastro na plataforma e nossos processos.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                <h2 className="text-2xl font-bold text-primary">{category.category}</h2>
                
                <Card className="border-0 shadow-soft bg-card/50 backdrop-blur">
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem 
                          key={faqIndex} 
                          value={`${categoryIndex}-${faqIndex}`}
                          className="border-b border-border/50 last:border-b-0"
                        >
                          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-muted/50 transition-colors">
                            <span className="font-medium">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Não Encontrou sua Resposta?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nossa equipe está sempre pronta para ajudar. Entre em contato conosco através dos canais abaixo.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: MessageCircle,
                title: 'Chat ao Vivo',
                description: 'Fale conosco em tempo real',
                action: 'Iniciar Chat',
                href: '/contato'
              },
              {
                icon: Mail,
                title: 'E-mail',
                description: 'contato@saveapet.com',
                action: 'Enviar E-mail',
                href: 'mailto:contato@saveapet.com'
              },
              {
                icon: Phone,
                title: 'Telefone',
                description: '(11) 99999-9999',
                action: 'Ligar Agora',
                href: 'tel:+5511999999999'
              },
            ].map((contact, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-card/80 backdrop-blur text-center">
                <CardContent className="p-8 space-y-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{contact.title}</h3>
                    <p className="text-muted-foreground">{contact.description}</p>
                  </div>
                  <Button variant="outline" asChild className="w-full">
                    <Link to={contact.href}>{contact.action}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Help Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Recursos Úteis</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore nossos guias e recursos para uma experiência completa
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Como Funciona',
                description: 'Processo completo passo a passo',
                href: '/como-funciona'
              },
              {
                title: 'Blog Educativo',
                description: 'Dicas e artigos sobre adoção responsável',
                href: '/blog'
              },
              {
                title: 'Começar Adoção',
                description: 'Encontre seu novo melhor amigo',
                href: '/adotar'
              },
              {
                title: 'Cadastrar Pet',
                description: 'Ajude um pet a encontrar um lar',
                href: '/cadastrar'
              },
              {
                title: 'Sobre Nós',
                description: 'Conheça nossa missão e valores',
                href: '/sobre'
              },
              {
                title: 'Contato',
                description: 'Fale diretamente conosco',
                href: '/contato'
              },
            ].map((resource, index) => (
              <Card key={index} className="group border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{resource.description}</p>
                  </div>
                  <Button variant="ghost" asChild className="w-full justify-start p-0 h-auto">
                    <Link to={resource.href}>Acessar →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;