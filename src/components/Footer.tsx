import { Link } from 'react-router-dom';
import { Heart, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-secondary text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <span className="text-2xl font-bold">Save a Pet</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Conectando corações e transformando vidas através da adoção responsável. 
              Cada pet merece uma família, cada família merece um pet.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              {[
                { to: '/sobre', label: 'Sobre Nós' },
                { to: '/adotar', label: 'Adote um Pet' },
                { to: '/como-funciona', label: 'Como Funciona' },
                { to: '/cadastrar', label: 'Cadastrar Pet' },
                { to: '/blog', label: 'Blog' },
                { to: '/faq', label: 'FAQ' },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">contato@saveapet.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">São Paulo, SP</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Redes Sociais</h3>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Save a Pet. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/termos" className="text-muted-foreground hover:text-primary transition-colors">
                Termos de Uso
              </Link>
              <Link to="/privacidade" className="text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;