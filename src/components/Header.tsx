import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, LogOut, User, PawPrint } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleAuthAction = (action: 'login' | 'register') => {
    if (action === 'login') {
      navigate('/adotar');
    } else {
      navigate('/cadastrar');
    }
  };

  const baseNavLinks = [
    { to: '/sobre', label: 'Sobre' },
    { to: '/como-funciona', label: 'Como Funciona' },
    { to: '/blog', label: 'Blog' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contato', label: 'Contato' },
  ];

  const userNavLinks = user ? [{ to: '/meus-pets', label: 'Meus Pets' }] : [];
  const navLinks = [...userNavLinks, ...baseNavLinks];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-all duration-300 hover:scale-105" onClick={scrollToTop}>
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <span className="text-2xl font-bold text-foreground">Save a Pet</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={scrollToTop}
                className={`font-medium transition-all duration-300 hover:text-primary relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                  isActive(link.to) ? 'text-primary after:scale-x-100' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons and User Menu - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <>
                <Button variant="outline" onClick={() => handleAuthAction('login')} className="transition-all duration-300 hover:shadow-medium">
                  <Heart className="w-4 h-4 mr-2" />
                  Adotar Pet
                </Button>
                <Button onClick={() => handleAuthAction('register')} className="transition-all duration-300 hover:shadow-medium hover:scale-105">
                  <PawPrint className="w-4 h-4 mr-2" />
                  Cadastrar Pet
                </Button>
                <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sair" className="transition-all duration-300">
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate('/auth')} className="transition-all duration-300 hover:shadow-medium">
                  Entrar
                </Button>
                <Button onClick={() => navigate('/auth')} className="transition-all duration-300 hover:shadow-medium hover:scale-105">
                  Criar Conta
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 animate-fade-in">
            <nav className="flex flex-col gap-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => { scrollToTop(); setIsMenuOpen(false); }}
                  className={`font-medium py-2 px-4 rounded-lg transition-colors ${
                    isActive(link.to) 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4 border-t pt-4">
                {user ? (
                  <>
                     <Button variant="outline" onClick={() => { handleAuthAction('login'); setIsMenuOpen(false); }}>
                      <Heart className="w-4 h-4 mr-2" />
                      Adotar Pet
                    </Button>
                    <Button onClick={() => { handleAuthAction('register'); setIsMenuOpen(false); }}>
                      <PawPrint className="w-4 h-4 mr-2" />
                      Cadastrar Pet
                    </Button>
                    <Button variant="ghost" onClick={() => { handleSignOut(); setIsMenuOpen(false); }}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => { navigate('/auth'); setIsMenuOpen(false); }}>
                      Entrar
                    </Button>
                    <Button onClick={() => { navigate('/auth'); setIsMenuOpen(false); }}>
                      Criar Conta
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
