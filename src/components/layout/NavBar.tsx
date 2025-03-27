
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img
              src="/lovable-uploads/d382a0bb-6f6d-47e3-8017-04b87a8a33db.png"
              alt="Hidroiin"
              className="h-10 md:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={cn(
                'nav-link',
                location.pathname === '/' && 'font-medium text-hidroin-blue'
              )}
            >
              Inicio
            </Link>
            <div className="relative group">
              <button className="nav-link flex items-center">
                Tienda <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <Link
                    to="/tienda/bombas"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    Bombas
                  </Link>
                  <Link
                    to="/tienda/valvulas"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    Válvulas
                  </Link>
                  <Link
                    to="/tienda/equipo-riego"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    Equipo de Riego
                  </Link>
                  <Link
                    to="/tienda/riego-residencial"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    Riego Residencial
                  </Link>
                  <Link
                    to="/tienda/tuberia-pvc"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    Tubería PVC
                  </Link>
                </div>
              </div>
            </div>
            <Link
              to="/estudios-ambientales"
              className={cn(
                'nav-link',
                location.pathname === '/estudios-ambientales' && 'font-medium text-hidroin-blue'
              )}
            >
              Estudios Ambientales
            </Link>
            <Link
              to="/contacto"
              className={cn(
                'nav-link',
                location.pathname === '/contacto' && 'font-medium text-hidroin-blue'
              )}
            >
              Contacto
            </Link>
          </nav>

          {/* Cart Icon */}
          <Link to="/carrito" className="flex items-center ml-4">
            <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-hidroin-green transition-colors" />
          </Link>

          {/* Mobile Navigation Button */}
          <button
            className="ml-2 md:hidden"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white shadow-md animate-slide-in overflow-hidden">
            <nav className="flex flex-col space-y-4 p-4">
              <Link
                to="/"
                className="text-lg font-medium"
                onClick={closeMenu}
              >
                Inicio
              </Link>
              <div className="space-y-2">
                <p className="text-lg font-medium">Tienda</p>
                <div className="pl-4 space-y-2 border-l-2 border-gray-200">
                  <Link 
                    to="/tienda/bombas" 
                    className="block text-gray-600 hover:text-hidroin-green"
                    onClick={closeMenu}
                  >
                    Bombas
                  </Link>
                  <Link 
                    to="/tienda/valvulas" 
                    className="block text-gray-600 hover:text-hidroin-green"
                    onClick={closeMenu}
                  >
                    Válvulas
                  </Link>
                  <Link 
                    to="/tienda/equipo-riego" 
                    className="block text-gray-600 hover:text-hidroin-green"
                    onClick={closeMenu}
                  >
                    Equipo de Riego
                  </Link>
                  <Link 
                    to="/tienda/riego-residencial" 
                    className="block text-gray-600 hover:text-hidroin-green"
                    onClick={closeMenu}
                  >
                    Riego Residencial
                  </Link>
                  <Link 
                    to="/tienda/tuberia-pvc" 
                    className="block text-gray-600 hover:text-hidroin-green"
                    onClick={closeMenu}
                  >
                    Tubería PVC
                  </Link>
                </div>
              </div>
              <Link
                to="/estudios-ambientales"
                className="text-lg font-medium"
                onClick={closeMenu}
              >
                Estudios Ambientales
              </Link>
              <Link
                to="/contacto"
                className="text-lg font-medium"
                onClick={closeMenu}
              >
                Contacto
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
