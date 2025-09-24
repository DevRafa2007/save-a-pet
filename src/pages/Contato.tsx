import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Entraremos em contato em até 24 horas.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      type: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Entre em <span className="text-primary">Contato</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Estamos aqui para ajudar! Tem dúvidas sobre adoção, precisa de suporte 
              ou quer colaborar conosco? Fale com nossa equipe.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Envie sua Mensagem</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Preencha o formulário abaixo e nossa equipe entrará em contato 
                  o mais breve possível. Todos os campos são obrigatórios.
                </p>
              </div>
              
              <Card className="border-0 shadow-soft bg-card/50 backdrop-blur">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo de Contato *</Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o motivo do contato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="adoption">Dúvidas sobre Adoção</SelectItem>
                          <SelectItem value="register">Cadastro de Pet</SelectItem>
                          <SelectItem value="support">Suporte Técnico</SelectItem>
                          <SelectItem value="partnership">Parcerias</SelectItem>
                          <SelectItem value="complaint">Denúncia</SelectItem>
                          <SelectItem value="suggestion">Sugestão</SelectItem>
                          <SelectItem value="other">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Resuma brevemente seu contato"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Descreva detalhadamente sua dúvida, sugestão ou problema..."
                        className="min-h-[150px]"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full shadow-medium hover:shadow-strong hover:scale-105 transition-all duration-300"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Outras Formas de Contato</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Escolha a forma de contato que for mais conveniente para você. 
                  Estamos disponíveis para ajudar de segunda a sexta.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: 'E-mail',
                    info: 'contato@saveapet.com',
                    description: 'Resposta em até 24 horas',
                    action: 'Enviar E-mail',
                    href: 'mailto:contato@saveapet.com'
                  },
                  {
                    icon: Phone,
                    title: 'Telefone',
                    info: '(83) 99999-9999',
                    description: 'Seg à Sex, 9h às 18h',
                    action: 'Ligar Agora',
                    href: 'tel:+5583999999999'
                  },
                  {
                    icon: MessageCircle,
                    title: 'WhatsApp',
                    info: '(83) 99999-9999',
                    description: 'Chat rápido e direto',
                    action: 'Abrir WhatsApp',
                    href: 'https://wa.me/5583999999999'
                  },
                ].map((contact, index) => (
                  <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-card/50 backdrop-blur">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <contact.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg">{contact.title}</h3>
                            <p className="text-primary font-medium">{contact.info}</p>
                            <p className="text-muted-foreground text-sm">{contact.description}</p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={contact.href} target="_blank" rel="noopener noreferrer">
                              {contact.action}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Office Info */}
              <Card className="border-0 shadow-soft bg-gradient-secondary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Nossa Localização
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">Save a Pet - Sede</p>
                    <p className="text-muted-foreground">
                      Rua dos Pets, 123<br />
                      Vila Animal - João Pessoa, PB<br />
                      CEP: 01234-567
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Segunda à Sexta: 9h às 18h</span>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <Card className="border-0 shadow-soft bg-gradient-warm">
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className="text-lg font-semibold">Dúvidas Rápidas?</h3>
                  <p className="text-muted-foreground text-sm">
                    Confira nossa seção de perguntas frequentes para respostas imediatas
                  </p>
                  <Button variant="outline" asChild>
                    <a href="/faq">Ver FAQ</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h2 className="text-2xl lg:text-3xl font-bold">
              Situação de Emergência?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Se você encontrou um animal machucado ou em situação de risco, 
              entre em contato conosco imediatamente ou procure o veterinário mais próximo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Phone className="w-5 h-5 mr-2" />
                Emergência: (83) 99999-9999
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Emergencial
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;