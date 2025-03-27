
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const studiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (featuresRef.current) observer.observe(featuresRef.current);
    if (productsRef.current) observer.observe(productsRef.current);
    if (studiesRef.current) observer.observe(studiesRef.current);

    return () => {
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (productsRef.current) observer.unobserve(productsRef.current);
      if (studiesRef.current) observer.unobserve(studiesRef.current);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
        
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 md:px-10 z-10">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              Soluciones Sostenibles para un Futuro Verde
            </h1>
            <p className="text-white/90 text-xl md:text-2xl mb-8">
              Ingeniería e infraestructura hidroagrícola para un mundo más sostenible
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/tienda" 
                className="btn-primary text-base md:text-lg py-3 px-8"
              >
                Explorar Productos <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link 
                to="/estudios-ambientales" 
                className="btn-secondary text-base md:text-lg py-3 px-8"
              >
                Estudios Ambientales <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            className="min-h-full min-w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source 
              src="https://assets.mixkit.co/videos/preview/mixkit-water-running-at-the-base-of-a-waterfall-26982-large.mp4" 
              type="video/mp4" 
            />
            Su navegador no soporta el elemento de video.
          </video>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef} 
        className="bg-white py-20 opacity-0 transition-opacity duration-1000"
      >
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-hidroin-darkblue mb-4">
              Experiencia y Compromiso
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              En Hidroiin nos dedicamos a brindar soluciones integrales para la sostenibilidad y el cuidado del medio ambiente.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="card-hover glass-card p-8 flex flex-col items-center text-center">
              <div className="rounded-full bg-hidroin-green/10 p-4 mb-6">
                <svg className="h-10 w-10 text-hidroin-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Eficiencia Energética</h3>
              <p className="text-gray-600">
                Soluciones que optimizan el uso de recursos para minimizar el impacto ambiental.
              </p>
            </div>
            
            <div className="card-hover glass-card p-8 flex flex-col items-center text-center">
              <div className="rounded-full bg-hidroin-blue/10 p-4 mb-6">
                <svg className="h-10 w-10 text-hidroin-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovación Sostenible</h3>
              <p className="text-gray-600">
                Implementamos tecnologías de vanguardia respetuosas con el medio ambiente.
              </p>
            </div>
            
            <div className="card-hover glass-card p-8 flex flex-col items-center text-center">
              <div className="rounded-full bg-hidroin-green/10 p-4 mb-6">
                <svg className="h-10 w-10 text-hidroin-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Garantía de Calidad</h3>
              <p className="text-gray-600">
                Todos nuestros productos y servicios cumplen con los más altos estándares de calidad.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Section */}
      <section 
        ref={productsRef} 
        className="bg-gray-50 py-20 opacity-0 transition-opacity duration-1000"
      >
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-hidroin-darkblue mb-4">
              Nuestros Productos
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ofrecemos una amplia gama de productos de alta calidad para sistemas de riego e infraestructura hidráulica.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {productCategories.map((category, index) => (
              <Link 
                key={index}
                to={category.path}
                className={cn(
                  "card-hover relative overflow-hidden rounded-xl aspect-square",
                  "group transform transition-all duration-500"
                )}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <div className="h-0.5 w-10 bg-hidroin-green my-2 transition-all duration-500 group-hover:w-16"></div>
                  <p className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 text-sm">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/tienda" 
              className="btn-secondary mx-auto inline-flex"
            >
              Ver todos los productos <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Studies Section */}
      <section 
        ref={studiesRef} 
        className="bg-white py-20 opacity-0 transition-opacity duration-1000"
      >
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-hidroin-darkblue mb-4">
              Estudios Ambientales
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Realizamos estudios especializados para evaluar y minimizar el impacto ambiental de los proyectos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {environmentalStudies.slice(0, 3).map((study, index) => (
              <div 
                key={index} 
                className="card-hover glass-card overflow-hidden rounded-xl"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {study.description}
                  </p>
                  <Link 
                    to="/estudios-ambientales" 
                    className="text-hidroin-blue font-medium hover:text-hidroin-green transition-colors inline-flex items-center"
                  >
                    Más información <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/estudios-ambientales" 
              className="btn-primary mx-auto inline-flex"
            >
              Ver todos los estudios <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-hidroin-darkblue text-white py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para Implementar Soluciones Sostenibles?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Nuestro equipo de expertos está listo para asesorarte en tu próximo proyecto. 
              Contáctanos hoy mismo para una consulta personalizada.
            </p>
            <Link 
              to="/contacto" 
              className="btn-primary text-lg py-3 px-10 mx-auto inline-flex"
            >
              Contactar ahora <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Sample data
const productCategories = [
  {
    name: "Bombas",
    path: "/tienda/bombas",
    image: "https://images.unsplash.com/photo-1635619044246-53a494bf7819?q=80&w=1000",
    description: "Bombas de alta eficiencia para sistemas de riego y distribución de agua"
  },
  {
    name: "Válvulas",
    path: "/tienda/valvulas",
    image: "https://images.unsplash.com/photo-1635348568570-875a18b75a51?q=80&w=1000",
    description: "Válvulas de control para todo tipo de aplicaciones hidráulicas"
  },
  {
    name: "Equipo de Riego",
    path: "/tienda/equipo-riego",
    image: "https://images.unsplash.com/photo-1565457210787-a6355fc8ca97?q=80&w=1000",
    description: "Sistemas completos para riego tecnificado y eficiente"
  },
  {
    name: "Riego Residencial",
    path: "/tienda/riego-residencial",
    image: "https://images.unsplash.com/photo-1590156352256-39e4a39aef0f?q=80&w=1000",
    description: "Soluciones de riego para jardines y áreas verdes residenciales"
  },
  {
    name: "Tubería PVC",
    path: "/tienda/tuberia-pvc",
    image: "https://images.unsplash.com/photo-1520627977056-1b7a6a1567e5?q=80&w=1000",
    description: "Tuberías y accesorios PVC para sistemas de conducción de agua"
  }
];

const environmentalStudies = [
  {
    title: "Evaluaciones de Impacto Ambiental",
    image: "https://images.unsplash.com/photo-1538935732373-f7a495fea3f6?q=80&w=1000",
    description: "Análisis detallados para evaluar y mitigar los efectos ambientales de proyectos de desarrollo."
  },
  {
    title: "Estudios Técnicos Justificativos",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000",
    description: "Documentación técnica que justifica el cambio de uso de suelo en terrenos forestales."
  },
  {
    title: "Restauración de Ecosistemas",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000",
    description: "Proyectos de recuperación de ecosistemas degradados para restablecer su funcionalidad ecológica."
  }
];

export default Index;
