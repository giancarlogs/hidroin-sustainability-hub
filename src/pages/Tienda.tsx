
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronDown, ChevronUp, Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from 'sonner';

// Define product categories
const productCategories = {
  bombas: {
    title: "Bombas",
    description: "Bombas de alta eficiencia para sistemas de riego y distribución de agua",
    heroImage: "https://images.unsplash.com/photo-1635619044246-53a494bf7819?q=80&w=1000",
  },
  valvulas: {
    title: "Válvulas",
    description: "Válvulas de control para todo tipo de aplicaciones hidráulicas",
    heroImage: "https://images.unsplash.com/photo-1635348568570-875a18b75a51?q=80&w=1000",
  },
  "equipo-riego": {
    title: "Equipo de Riego",
    description: "Sistemas completos para riego tecnificado y eficiente",
    heroImage: "https://images.unsplash.com/photo-1565457210787-a6355fc8ca97?q=80&w=1000",
  },
  "riego-residencial": {
    title: "Riego Residencial",
    description: "Soluciones de riego para jardines y áreas verdes residenciales",
    heroImage: "https://images.unsplash.com/photo-1590156352256-39e4a39aef0f?q=80&w=1000",
  },
  "tuberia-pvc": {
    title: "Tubería PVC",
    description: "Tuberías y accesorios PVC para sistemas de conducción de agua",
    heroImage: "https://images.unsplash.com/photo-1520627977056-1b7a6a1567e5?q=80&w=1000",
  }
};

// Sample products data
const productData = [
  // Bombas
  {
    id: 1,
    name: "Bomba Centrífuga 1HP",
    price: 3250,
    image: "https://images.unsplash.com/photo-1609862776364-bd1e8c1e5c5a?q=80&w=500",
    category: "bombas",
    description: "Bomba centrífuga de 1HP con alta eficiencia energética para sistemas de riego.",
    featured: true
  },
  {
    id: 2,
    name: "Bomba Sumergible 2HP",
    price: 7890,
    image: "https://images.unsplash.com/photo-1593105522405-1a2518212a2a?q=80&w=500",
    category: "bombas",
    description: "Bomba sumergible para pozo profundo de 2HP con protección térmica.",
    featured: false
  },
  {
    id: 3,
    name: "Bomba Solar 0.5HP",
    price: 9450,
    image: "https://images.unsplash.com/photo-1535071535367-03264e55e8a5?q=80&w=500",
    category: "bombas",
    description: "Bomba con alimentación solar de 0.5HP, ideal para áreas sin acceso a electricidad.",
    featured: true
  },
  // Válvulas
  {
    id: 4,
    name: "Válvula de Compuerta 4\"",
    price: 1250,
    image: "https://images.unsplash.com/photo-1578164515867-5fc564a5d8bd?q=80&w=500",
    category: "valvulas",
    description: "Válvula de compuerta de 4 pulgadas para control de flujo en líneas principales.",
    featured: false
  },
  {
    id: 5,
    name: "Válvula de Retención 2\"",
    price: 780,
    image: "https://images.unsplash.com/photo-1599249300635-5e62a6da372e?q=80&w=500",
    category: "valvulas",
    description: "Válvula check de 2 pulgadas que previene el retorno de agua.",
    featured: true
  },
  {
    id: 6,
    name: "Válvula Reguladora de Presión",
    price: 1890,
    image: "https://images.unsplash.com/photo-1580745294621-13462c428b25?q=80&w=500",
    category: "valvulas",
    description: "Válvula reguladora de presión ajustable para proteger sistemas de riego.",
    featured: false
  },
  // Equipo de riego
  {
    id: 7,
    name: "Aspersor de Impacto",
    price: 350,
    image: "https://images.unsplash.com/photo-1564723855927-400aae749e3c?q=80&w=500",
    category: "equipo-riego",
    description: "Aspersor de impacto con alcance de 15 metros, ajustable a 360 grados.",
    featured: true
  },
  {
    id: 8,
    name: "Kit de Microaspersión",
    price: 1250,
    image: "https://images.unsplash.com/photo-1562865417-0131179a2190?q=80&w=500",
    category: "equipo-riego",
    description: "Kit completo de microaspersión para 100 m² con accesorios de instalación.",
    featured: false
  },
  {
    id: 9,
    name: "Cinta de Goteo 500m",
    price: 1790,
    image: "https://images.unsplash.com/photo-1486328228599-85db4443971f?q=80&w=500",
    category: "equipo-riego",
    description: "Rollo de cinta de goteo de 500 metros con goteros integrados cada 30 cm.",
    featured: true
  },
  // Riego residencial
  {
    id: 10,
    name: "Programador de Riego 6 Zonas",
    price: 1890,
    image: "https://images.unsplash.com/photo-1595351475754-8a594a3a1dfe?q=80&w=500",
    category: "riego-residencial",
    description: "Programador electrónico para 6 zonas de riego con funciones avanzadas.",
    featured: true
  },
  {
    id: 11,
    name: "Sensor de Lluvia",
    price: 450,
    image: "https://images.unsplash.com/photo-1620118972896-24c718c22dbc?q=80&w=500",
    category: "riego-residencial",
    description: "Sensor de lluvia para suspender automáticamente el riego en días lluviosos.",
    featured: false
  },
  {
    id: 12,
    name: "Kit de Riego por Goteo para Jardín",
    price: 980,
    image: "https://images.unsplash.com/photo-1555955924-a8c17aa846b2?q=80&w=500",
    category: "riego-residencial",
    description: "Kit completo para jardín residencial que incluye tubería, goteros y accesorios.",
    featured: true
  },
  // Tubería PVC
  {
    id: 13,
    name: "Tubo PVC Hidráulico 4\" (6m)",
    price: 450,
    image: "https://images.unsplash.com/photo-1582140161441-63e1614aec7b?q=80&w=500",
    category: "tuberia-pvc",
    description: "Tubo de PVC hidráulico de 4 pulgadas, longitud 6 metros, clase 10.",
    featured: false
  },
  {
    id: 14,
    name: "Codo PVC 90° 2\"",
    price: 45,
    image: "https://images.unsplash.com/photo-1597539967132-aa2a8b5d7f4a?q=80&w=500",
    category: "tuberia-pvc",
    description: "Codo de PVC de 90 grados, diámetro 2 pulgadas, cedula 40.",
    featured: true
  },
  {
    id: 15,
    name: "Válvula de Bola PVC 1\"",
    price: 85,
    image: "https://images.unsplash.com/photo-1622383863643-91a732644b7e?q=80&w=500",
    category: "tuberia-pvc",
    description: "Válvula de bola de PVC de 1 pulgada para control de flujo.",
    featured: false
  }
];

const Tienda = () => {
  const { categoria } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  // Get current category data
  const currentCategory = categoria && productCategories[categoria as keyof typeof productCategories];

  // Filter products based on category, search term, and price range
  const filteredProducts = productData.filter(product => {
    const matchesCategory = !categoria || product.category === categoria;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Function to add product to cart
  const addToCart = (productId: number) => {
    const product = productData.find(p => p.id === productId);
    if (product) {
      toast.success(`${product.name} agregado al carrito`, {
        description: "El producto ha sido agregado a tu carrito."
      });
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
        <img
          src={currentCategory ? currentCategory.heroImage : "https://images.unsplash.com/photo-1623019396807-b82cba204a39?q=80&w=2000"}
          alt={currentCategory ? currentCategory.title : "Tienda Hidroiin"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 md:px-10">
          <div className="max-w-4xl">
            <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-4">
              {currentCategory ? currentCategory.title : "Tienda Hidroiin"}
            </h1>
            <p className="text-white/90 text-xl md:text-2xl">
              {currentCategory ? currentCategory.description : "Productos de alta calidad para sistemas de riego y gestión del agua"}
            </p>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar / Filters */}
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <div className="md:hidden mb-4">
                  <button 
                    className="w-full flex items-center justify-between bg-gray-100 p-3 rounded-md"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <span className="font-medium">Filtros</span>
                    {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
                
                <div className={cn(
                  "space-y-6",
                  { "hidden md:block": !showFilters }
                )}>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Categorías</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link 
                          to="/tienda" 
                          className={cn(
                            "block py-1 hover:text-hidroin-green transition-colors",
                            !categoria && "text-hidroin-green font-medium"
                          )}
                        >
                          Todos los productos
                        </Link>
                      </li>
                      {Object.entries(productCategories).map(([key, value]) => (
                        <li key={key}>
                          <Link 
                            to={`/tienda/${key}`} 
                            className={cn(
                              "block py-1 hover:text-hidroin-green transition-colors",
                              categoria === key && "text-hidroin-green font-medium"
                            )}
                          >
                            {value.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Precio</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Filtros</h3>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="featured">
                        <AccordionTrigger className="text-base font-normal">Destacados</AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-2">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" className="rounded text-hidroin-green focus:ring-hidroin-green" />
                              <span>Productos destacados</span>
                            </label>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="availability">
                        <AccordionTrigger className="text-base font-normal">Disponibilidad</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" className="rounded text-hidroin-green focus:ring-hidroin-green" defaultChecked />
                              <span>En stock</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" className="rounded text-hidroin-green focus:ring-hidroin-green" />
                              <span>Pedido especial</span>
                            </label>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            </aside>
            
            {/* Main Content */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Buscar productos..."
                    className="pl-10 py-6"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Product Results */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">
                  Mostrando {filteredProducts.length} productos
                </p>
                <select className="bg-white border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-hidroin-green">
                  <option>Más recientes</option>
                  <option>Precio: menor a mayor</option>
                  <option>Precio: mayor a menor</option>
                  <option>Nombre: A-Z</option>
                </select>
              </div>
              
              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {product.featured && (
                          <div className="absolute top-3 left-3 bg-hidroin-green text-white text-xs font-semibold px-2 py-1 rounded">
                            Destacado
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-hidroin-darkblue mb-2 group-hover:text-hidroin-blue transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-hidroin-darkblue">
                            ${product.price.toLocaleString()}
                          </span>
                          <Button 
                            className="bg-hidroin-blue hover:bg-hidroin-blue/90"
                            onClick={() => addToCart(product.id)}
                          >
                            <ShoppingCart className="h-5 w-5 mr-1" />
                            Agregar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-6">No se encontraron productos que coincidan con tus criterios.</p>
                  <Button 
                    className="bg-hidroin-green hover:bg-hidroin-lightgreen"
                    onClick={() => {
                      setSearchTerm('');
                      setPriceRange([0, 10000]);
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              )}
              
              {/* Pagination */}
              {filteredProducts.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-50">&laquo;</button>
                    <button className="px-3 py-1 rounded bg-hidroin-green text-white">1</button>
                    <button className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-50">2</button>
                    <button className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-50">3</button>
                    <button className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-50">&raquo;</button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Banner */}
      <section className="bg-hidroin-darkblue py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">
            ¿Necesitas asesoría sobre nuestros productos?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">
            Nuestros expertos pueden ayudarte a encontrar la solución ideal para tu proyecto.
            Contáctanos para recibir atención personalizada.
          </p>
          <Link 
            to="/contacto" 
            className="btn-primary text-lg py-3 px-10 inline-flex"
          >
            Solicitar asesoría <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Tienda;
