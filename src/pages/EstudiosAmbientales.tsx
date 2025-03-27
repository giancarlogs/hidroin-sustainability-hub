
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const formSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre es requerido' }),
  email: z.string().email({ message: 'Email inválido' }),
  telefono: z.string().min(8, { message: 'Teléfono inválido' }),
  empresa: z.string().min(2, { message: 'La empresa es requerida' }),
  tipoEstudio: z.string().min(1, { message: 'Seleccione un tipo de estudio' }),
  mensaje: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres' }),
});

const EstudiosAmbientales = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      email: '',
      telefono: '',
      empresa: '',
      tipoEstudio: '',
      mensaje: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    toast.success('Formulario enviado correctamente', {
      description: 'Nos pondremos en contacto contigo pronto.',
    });
    form.reset();
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000"
          alt="Estudios Ambientales"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 md:px-10">
          <div className="max-w-4xl">
            <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-4">
              Estudios Ambientales
            </h1>
            <p className="text-white/90 text-xl md:text-2xl">
              Soluciones integrales para la sostenibilidad y protección del medio ambiente
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-hidroin-darkblue mb-6">
              Nuestros Servicios de Estudios Ambientales
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              En Hidroiin, ofrecemos una amplia gama de estudios ambientales para
              ayudar a organizaciones públicas y privadas a implementar proyectos
              sustentables que respeten y protejan nuestro entorno natural.
            </p>
            <div className="h-1 w-20 bg-hidroin-green mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Studies Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {estudiosAmbientales.map((estudio, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={estudio.imagen}
                    alt={estudio.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-hidroin-darkblue mb-3">
                    {estudio.titulo}
                  </h3>
                  <p className="text-gray-600 mb-4">{estudio.descripcion}</p>
                  <button
                    className="text-hidroin-blue font-medium hover:text-hidroin-green transition-colors inline-flex items-center"
                    onClick={() => setActiveTab(index)}
                  >
                    Más información <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Studies with Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-hidroin-darkblue mb-10 text-center">
            Conoce Más Sobre Nuestros Estudios
          </h2>

          <div className="mb-8 overflow-x-auto hidden-scrollbar">
            <div className="flex space-x-2 md:space-x-4 min-w-max">
              {estudiosAmbientales.map((estudio, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 text-sm md:text-base rounded-full whitespace-nowrap transition-colors ${
                    activeTab === index
                      ? 'bg-hidroin-green text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {estudio.titulo}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src={estudiosAmbientales[activeTab].imagen}
                  alt={estudiosAmbientales[activeTab].titulo}
                  className="w-full rounded-lg object-cover aspect-video"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-hidroin-darkblue mb-4">
                  {estudiosAmbientales[activeTab].titulo}
                </h3>
                <p className="text-gray-700 mb-6">
                  {estudiosAmbientales[activeTab].descripcionDetallada}
                </p>
                <ul className="space-y-3">
                  {estudiosAmbientales[activeTab].beneficios.map((beneficio, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-hidroin-green mr-2">✓</span>
                      <span>{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-hidroin-darkblue mb-6">
                Solicita un Estudio Ambiental
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Completa el formulario y nuestro equipo de expertos se pondrá en
                contacto contigo para analizar tu proyecto y ofrecerte la mejor
                solución.
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-hidroin-green/10 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-hidroin-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-hidroin-darkblue">Teléfono</h3>
                    <p className="text-gray-600">+52 (55) 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-hidroin-green/10 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-hidroin-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-hidroin-darkblue">Email</h3>
                    <p className="text-gray-600">info@hidroiin.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="nombre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu nombre" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="tu@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="telefono"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu teléfono" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="empresa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Empresa</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre de tu empresa" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="tipoEstudio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Estudio</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un tipo de estudio" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {estudiosAmbientales.map((estudio, index) => (
                              <SelectItem key={index} value={estudio.titulo}>
                                {estudio.titulo}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mensaje"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensaje</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Cuéntanos sobre tu proyecto"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-hidroin-green hover:bg-hidroin-lightgreen">
                    Enviar Solicitud
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Data para los estudios ambientales
const estudiosAmbientales = [
  {
    titulo: "Evaluaciones de Impacto Ambiental",
    descripcion: "Análisis detallados para evaluar y mitigar los efectos ambientales de proyectos de desarrollo.",
    descripcionDetallada: "Nuestras evaluaciones de impacto ambiental (EIA) son estudios técnicos que identifican, previenen e interpretan los impactos ambientales que producirá un proyecto en su entorno. Incluyen un análisis completo del marco legal aplicable, línea base ambiental, evaluación de impactos y plan de manejo ambiental.",
    imagen: "https://images.unsplash.com/photo-1538935732373-f7a495fea3f6?q=80&w=1000",
    beneficios: [
      "Cumplimiento de normativas ambientales vigentes",
      "Identificación de riesgos ambientales potenciales",
      "Desarrollo de medidas de mitigación efectivas",
      "Optimización de recursos y procesos del proyecto"
    ]
  },
  {
    titulo: "Estudios Técnicos Justificativos",
    descripcion: "Documentación técnica que justifica el cambio de uso de suelo en terrenos forestales.",
    descripcionDetallada: "Los Estudios Técnicos Justificativos (ETJ) son documentos necesarios para solicitar autorizaciones de cambio de uso de suelo en terrenos forestales. Analizamos las características físicas y biológicas del sitio, justificamos la necesidad del cambio y proponemos medidas de mitigación y compensación ambiental.",
    imagen: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000",
    beneficios: [
      "Justificación técnica sólida para autoridades ambientales",
      "Minimización de afectaciones al ecosistema forestal",
      "Propuestas de compensación adecuadas al impacto generado",
      "Agilización de trámites ante la SEMARNAT"
    ]
  },
  {
    titulo: "Planes de Ordenamiento Ecológico",
    descripcion: "Instrumentos de política ambiental para regular el uso del territorio considerando sus características ecológicas.",
    descripcionDetallada: "Desarrollamos Planes de Ordenamiento Ecológico Territorial (POET) que regulan e inducen el uso del suelo y las actividades productivas, con el fin de lograr la protección del medio ambiente y el aprovechamiento sustentable de los recursos naturales. Incluyen diagnóstico, pronóstico y propuesta de modelo de ordenamiento.",
    imagen: "https://images.unsplash.com/photo-1530406472580-81dc39c4babe?q=80&w=1000",
    beneficios: [
      "Planificación territorial con visión de sustentabilidad",
      "Optimización del aprovechamiento de recursos naturales",
      "Prevención de conflictos por uso del territorio",
      "Base para la toma de decisiones de desarrollo regional"
    ]
  },
  {
    titulo: "Zonificación Ecológica-Económica",
    descripcion: "Identificación de áreas con potencial de desarrollo sostenible basado en criterios ecológicos y económicos.",
    descripcionDetallada: "La Zonificación Ecológica-Económica (ZEE) es un proceso dinámico que permite identificar diferentes alternativas de uso sostenible del territorio, basado en la evaluación de sus potencialidades y limitaciones con criterios físicos, biológicos, sociales, económicos y culturales.",
    imagen: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1000",
    beneficios: [
      "Orientación para inversiones sostenibles",
      "Identificación de áreas prioritarias para conservación",
      "Reducción de conflictos socioambientales",
      "Planificación estratégica del desarrollo regional"
    ]
  },
  {
    titulo: "Inventarios de Biodiversidad",
    descripcion: "Levantamientos sistemáticos de la diversidad biológica presente en un área determinada.",
    descripcionDetallada: "Nuestros inventarios de biodiversidad documentan de manera sistemática las especies de flora y fauna presentes en un área específica. Empleamos metodologías estandarizadas para el muestreo, identificación y análisis de datos, generando líneas base robustas para la conservación y manejo de recursos naturales.",
    imagen: "https://images.unsplash.com/photo-1504472478235-9bc48ba4d60f?q=80&w=1000",
    beneficios: [
      "Documentación científica de especies presentes",
      "Identificación de especies protegidas o en peligro",
      "Base para programas de monitoreo ambiental",
      "Soporte para estudios de impacto ambiental"
    ]
  },
  {
    titulo: "Pago por Servicios Ambientales",
    descripcion: "Mecanismos financieros que compensan a propietarios de terrenos por la conservación de servicios ecosistémicos.",
    descripcionDetallada: "Diseñamos e implementamos esquemas de Pago por Servicios Ambientales (PSA) que recompensan económicamente a propietarios de terrenos que mantienen o mejoran la provisión de servicios ambientales como captura de carbono, provisión de agua, conservación de biodiversidad y belleza escénica.",
    imagen: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1000",
    beneficios: [
      "Incentivos económicos para la conservación",
      "Valoración de servicios ecosistémicos",
      "Mejora en la calidad de vida de comunidades locales",
      "Contribución a la mitigación del cambio climático"
    ]
  },
  {
    titulo: "Planes de Manejo de Recursos Naturales",
    descripcion: "Estrategias para el aprovechamiento sustentable de recursos naturales en áreas específicas.",
    descripcionDetallada: "Desarrollamos Planes de Manejo que establecen las acciones y lineamientos para el aprovechamiento sustentable de los recursos naturales en áreas determinadas. Incluyen diagnóstico, objetivos, zonificación, reglas de uso y estrategias de conservación según el tipo de recurso (forestal, vida silvestre, áreas naturales protegidas).",
    imagen: "https://images.unsplash.com/photo-1442120108414-42e7ea50d0b5?q=80&w=1000",
    beneficios: [
      "Aprovechamiento sostenible de recursos naturales",
      "Conservación de la biodiversidad local",
      "Diversificación productiva",
      "Fortalecimiento de la gobernanza local"
    ]
  },
  {
    titulo: "Inventarios de Carbono y Huella Ecológica",
    descripcion: "Cuantificación del almacenamiento de carbono en ecosistemas y evaluación del impacto ambiental de actividades.",
    descripcionDetallada: "Realizamos inventarios que cuantifican el carbono almacenado en diferentes componentes de los ecosistemas, así como mediciones de huella ecológica que evalúan el impacto de actividades humanas en términos de uso de recursos naturales y generación de emisiones de gases de efecto invernadero.",
    imagen: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1000",
    beneficios: [
      "Cuantificación de servicios ambientales de captura de carbono",
      "Identificación de áreas prioritarias para conservación",
      "Base para estrategias de reducción de emisiones",
      "Apoyo para certificaciones ambientales"
    ]
  },
  {
    titulo: "Restauración de Ecosistemas",
    descripcion: "Proyectos de recuperación de ecosistemas degradados para restablecer su funcionalidad ecológica.",
    descripcionDetallada: "Diseñamos e implementamos proyectos de restauración ecológica que buscan recuperar la estructura, función y composición de ecosistemas degradados. Empleamos técnicas de bioingeniería, reforestación con especies nativas, control de erosión y manejo adaptativo según las características específicas de cada sitio.",
    imagen: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000",
    beneficios: [
      "Recuperación de servicios ecosistémicos",
      "Incremento de biodiversidad local",
      "Mitigación de riesgos naturales",
      "Cumplimiento de obligaciones de compensación ambiental"
    ]
  },
  {
    titulo: "Planes de Resiliencia Climática",
    descripcion: "Estrategias para aumentar la capacidad de adaptación de comunidades y ecosistemas ante el cambio climático.",
    descripcionDetallada: "Desarrollamos planes que incrementan la capacidad de comunidades, infraestructuras y ecosistemas para resistir, absorber y recuperarse de los efectos del cambio climático. Incluyen análisis de vulnerabilidad, escenarios futuros, medidas de adaptación y estrategias de implementación.",
    imagen: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1000",
    beneficios: [
      "Reducción de vulnerabilidad ante eventos climáticos extremos",
      "Protección de infraestructura crítica",
      "Diversificación de medios de vida",
      "Conservación de servicios ecosistémicos clave"
    ]
  },
  {
    titulo: "Capacitación y Talleres",
    descripcion: "Programas de formación para fortalecer capacidades en gestión ambiental y desarrollo sustentable.",
    descripcionDetallada: "Ofrecemos programas de capacitación y talleres diseñados para fortalecer conocimientos y habilidades en temas ambientales. Adaptamos los contenidos a las necesidades específicas de organizaciones públicas, privadas y comunitarias, con metodologías participativas y orientadas a la aplicación práctica.",
    imagen: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1000",
    beneficios: [
      "Fortalecimiento de capacidades locales",
      "Transferencia de conocimientos técnicos",
      "Sensibilización ambiental",
      "Mejora en la toma de decisiones"
    ]
  },
  {
    titulo: "Cartografía Participativa",
    descripcion: "Mapeo colaborativo que integra conocimiento local para la gestión territorial.",
    descripcionDetallada: "Realizamos procesos de cartografía participativa que combinan tecnologías SIG con conocimiento local para crear mapas que representan visiones territoriales comunitarias. Esta metodología permite documentar recursos naturales, usos del suelo, sitios de importancia cultural y problemáticas socioambientales desde la perspectiva local.",
    imagen: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?q=80&w=1000",
    beneficios: [
      "Integración de conocimiento local en la planificación",
      "Empoderamiento comunitario",
      "Prevención y manejo de conflictos territoriales",
      "Documentación de valores culturales asociados al territorio"
    ]
  }
];

export default EstudiosAmbientales;
