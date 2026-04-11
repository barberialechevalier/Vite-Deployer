import React, { useState, useEffect } from "react";
import { Menu, X, MessageCircle, MapPin, Phone, Instagram, Facebook, Star, ChevronLeft, ChevronRight, Check } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/524428091575";

const packages = [
  {
    name: "Paquete Básico",
    includes: ["Corte", "Perfilado de ceja", "Mascarilla"],
  },
  {
    name: "Paquete Clásico",
    includes: ["Corte", "Barba", "Mascarilla"],
  },
  {
    name: "Paquete Completo",
    includes: ["Corte", "Barba", "Perfilado de ceja", "Mascarilla"],
  },
  {
    name: "Paquete Premium",
    includes: ["Corte", "Barba", "Mascarilla", "Perfilado de ceja"],
  },
];

const testimonials = [
  {
    name: "Alfredo Avilés",
    text: "100% recomendable. Excelente atención, ambiente limpio y profesional. Cortes de gran calidad y muy buen trato al cliente. Sin duda, un lugar al que volvería.",
  },
  {
    name: "Juan Rodríguez",
    text: "Muy buen servicio, el lugar es agradable y trabajan con mucho cuidado en los detalles. Me gustó bastante cómo quedó mi corte, se nota que saben lo que hacen.",
  },
  {
    name: "Norberto Gerónimo",
    text: "Excelente servicio, súper atentos y profesionales. En relación calidad-precio, de lo mejor. Totalmente recomendado.",
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Servicios", href: "#servicios" },
    { name: "Paquetes", href: "#paquetes" },
    { name: "Galería", href: "#galeria" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0D0D0D]/95 backdrop-blur-md py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#">
          <img
            src="/__mockup/images/logo-le-chevalier.png"
            alt="Le Chevalier"
            className="h-20 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white/80 hover:text-[#C9A14A] transition-colors text-sm uppercase tracking-widest font-medium"
            >
              {link.name}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#C9A14A] text-[#C9A14A] px-6 py-2 hover:bg-[#C9A14A] hover:text-black transition-all duration-300 text-sm uppercase tracking-widest font-semibold"
          >
            Agendar
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#0D0D0D] border-t border-white/10 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white/80 hover:text-[#C9A14A] transition-colors text-lg uppercase tracking-widest"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const FadeInSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const TestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A14A]/5 rounded-full blur-3xl -z-10" />
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <FadeInSection>
          <div className="flex justify-center gap-1 mb-10">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-7 h-7 text-[#C9A14A]" fill="currentColor" />
            ))}
          </div>
          <p className="text-[#C9A14A] text-sm font-bold tracking-[0.3em] uppercase mb-4">Lo que dicen nuestros clientes</p>
          <h3 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-20">Reseñas Reales</h3>
        </FadeInSection>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4 md:px-16">
                  <blockquote className="font-['Playfair_Display'] text-xl md:text-2xl text-white/90 leading-relaxed italic mb-10">
                    "{t.text}"
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-14 h-14 bg-[#1F1F1F] border border-[#C9A14A]/30 rounded-full flex items-center justify-center font-['Playfair_Display'] text-2xl text-[#C9A14A]">
                      {t.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold uppercase tracking-widest text-sm">{t.name}</p>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} fill="currentColor" className="text-[#C9A14A]" size={13} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-14">
            <button
              onClick={prev}
              className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:border-[#C9A14A] hover:text-[#C9A14A] transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "w-8 h-2 bg-[#C9A14A]" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:border-[#C9A14A] hover:text-[#C9A14A] transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export function LeChevalie() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-['Inter'] selection:bg-[#C9A14A] selection:text-black overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dsizvri4u/image/upload/v1775921559/WhatsApp_Image_2025-10-06_at_11.53.41_PM_1_loaevm.jpg"
            alt="Le Chevalier Barbershop"
            className="w-full h-full object-cover opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
        </div>

        <div className="container mx-auto px-6 z-10 text-center max-w-4xl mt-12">
          <FadeInSection>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight">
              Deja que tu cabello <br />
              <span className="text-[#C9A14A] italic">hable por ti</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/80 mb-12 font-light tracking-wide max-w-2xl mx-auto">
              Estilo, precisión y experiencia en cada servicio.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#C9A14A] text-black px-10 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300"
              >
                Agenda ahora
              </a>
              <a
                href="#servicios"
                className="w-full sm:w-auto border border-white/30 text-white px-10 py-4 font-bold uppercase tracking-widest hover:border-[#C9A14A] hover:text-[#C9A14A] transition-all duration-300"
              >
                Ver servicios
              </a>
            </div>
          </FadeInSection>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
          <span className="text-white/50 text-xs tracking-widest uppercase mb-2">Descubre</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#C9A14A] to-transparent" />
        </div>
      </section>

      {/* Differentials Section */}
      <section className="py-20 bg-[#1F1F1F] border-y border-white/5">
        <div className="container mx-auto px-6">
          <FadeInSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                "Atención personalizada",
                "Ambiente profesional",
                "Productos de calidad",
                "Resultados que se notan",
              ].map((diff, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center border border-[#C9A14A]/30 rounded-full mb-4 text-[#C9A14A]">
                    <Check size={20} />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-lg md:text-xl text-white/90">{diff}</h3>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-32 relative">
        <div className="container mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-20">
              <h2 className="text-[#C9A14A] text-sm font-bold tracking-[0.3em] uppercase mb-4">La Maestría</h2>
              <h3 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold">Nuestros Servicios</h3>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Cortes */}
            <FadeInSection className="delay-100">
              <div className="bg-[#1F1F1F] p-10 border border-white/5 hover:border-[#C9A14A]/30 transition-colors duration-500 group">
                <h4 className="font-['Playfair_Display'] text-3xl mb-8 text-white group-hover:text-[#C9A14A] transition-colors">Cortes</h4>
                <ul className="space-y-6">
                  {["Corte para caballero", "Corte para niño", "Arreglo de cejas"].map((item, i) => (
                    <li key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="text-white/80 font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>

            {/* Barba */}
            <FadeInSection className="delay-200">
              <div className="bg-[#1F1F1F] p-10 border border-white/5 hover:border-[#C9A14A]/30 transition-colors duration-500 group">
                <h4 className="font-['Playfair_Display'] text-3xl mb-8 text-white group-hover:text-[#C9A14A] transition-colors">Barba</h4>
                <ul className="space-y-6">
                  {["Barba y bigote", "Perfilado de barba", "Ritual de barba"].map((item, i) => (
                    <li key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="text-white/80 font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>

            {/* Adicionales */}
            <FadeInSection className="delay-300">
              <div className="bg-[#1F1F1F] p-10 border border-white/5 hover:border-[#C9A14A]/30 transition-colors duration-500 group">
                <h4 className="font-['Playfair_Display'] text-3xl mb-8 text-white group-hover:text-[#C9A14A] transition-colors">Adicionales</h4>
                <ul className="space-y-6">
                  {["Limpieza facial", "Mascarilla", "Bambuterapia"].map((item, i) => (
                    <li key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="text-white/80 font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="paquetes" className="py-32 bg-[#1F1F1F]">
        <div className="container mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-20">
              <h2 className="text-[#C9A14A] text-sm font-bold tracking-[0.3em] uppercase mb-4">Experiencias Completas</h2>
              <h3 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6">Paquetes Exclusivos</h3>
              <p className="text-white/60 font-light text-lg">Elige el paquete ideal para tu estilo</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {packages.map((pkg, i) => (
              <FadeInSection key={i} className={`delay-${(i+1)*100}`}>
                <div className="bg-[#0D0D0D] border border-white/10 p-8 h-full flex flex-col hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A14A]/5 rounded-bl-full -z-0 group-hover:scale-150 transition-transform duration-700" />
                  <h4 className="font-['Playfair_Display'] text-2xl mb-6 text-[#C9A14A] z-10">{pkg.name}</h4>
                  <ul className="space-y-4 mb-8 flex-grow z-10">
                    {pkg.includes.map((item, j) => (
                      <li key={j} className="flex items-start text-white/80 font-light text-sm">
                        <span className="text-[#C9A14A] mr-3 mt-1 text-xs">◆</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto block text-center border border-white/20 py-3 text-xs uppercase tracking-widest hover:bg-[#C9A14A] hover:border-[#C9A14A] hover:text-black transition-colors z-10"
                  >
                    Elegir Paquete
                  </a>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-32">
        <div className="container mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-20">
              <h2 className="text-[#C9A14A] text-sm font-bold tracking-[0.3em] uppercase mb-4">El Arte</h2>
              <h3 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold">Nuestro Trabajo</h3>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {[
              "https://res.cloudinary.com/dsizvri4u/image/upload/v1775921540/WhatsApp_Image_2025-12-01_at_7.32.53_PM_1_m31pr7.jpg",
              "https://res.cloudinary.com/dsizvri4u/image/upload/v1775921540/WhatsApp_Image_2025-12-01_at_7.32.52_PM_3_p4iihq.jpg",
              "https://res.cloudinary.com/dsizvri4u/image/upload/v1775921561/WhatsApp_Image_2025-12-01_at_7.32.52_PM_1_zgtqml.jpg",
              "https://res.cloudinary.com/dsizvri4u/image/upload/v1775921561/WhatsApp_Image_2025-12-01_at_7.32.52_PM_2_mor1yt.jpg",
            ].map((url, i) => (
              <FadeInSection key={i}>
                <div className="relative aspect-square overflow-hidden group">
                  <img
                    src={url}
                    alt={`Galería ${i + 1}`}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-32 bg-[#1F1F1F]">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <FadeInSection>
            <h2 className="text-[#C9A14A] text-sm font-bold tracking-[0.3em] uppercase mb-4">Cuidado Personal</h2>
            <h3 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-8">Productos Premium</h3>
            <p className="text-white/80 font-light text-lg mb-12">
              Productos de calidad para mantener tu estilo todo el día.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Pomadas originales", "Aceites para barba", "Lociones", "Polvo texturizador", "Cera en polvo"].map((prod, i) => (
                <span key={i} className="px-6 py-3 border border-white/10 bg-[#0D0D0D] text-white/70 text-sm uppercase tracking-wider font-light hover:border-[#C9A14A]/50 transition-colors">
                  {prod}
                </span>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Testimonials Slider */}
      <TestimonialsSlider />

      {/* Facade + Map Section */}
      <section className="py-20 bg-[#0D0D0D] border-t border-white/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeInSection>
            <p className="text-[#C9A14A] text-sm font-bold tracking-[0.3em] uppercase text-center mb-3">Encuéntranos</p>
            <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-center mb-14">
              Ubícanos fácilmente en Plaza Real
            </h3>
          </FadeInSection>

          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Facade image */}
            <FadeInSection className="lg:w-1/2">
              <div className="h-full min-h-[320px] rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
                <img
                  src="https://res.cloudinary.com/dsizvri4u/image/upload/v1775923687/WhatsApp_Image_2026-04-01_at_7.32.42_PM_b6l5je.jpg"
                  alt="Fachada Barbería Le Chevalier"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </FadeInSection>

            {/* Google Maps */}
            <FadeInSection className="lg:w-1/2">
              <div className="h-full min-h-[320px] rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d939.5!2d-100.285262!3d20.5873017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d343575feec8a7%3A0x34262e761ec6bf81!2sBarberia%20Le%20Chevalier!5e0!3m2!1ses!2smx!4v1744000000001!5m2!1ses!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "320px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[40%] contrast-110"
                />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section id="contacto" className="border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 md:p-24 flex flex-col justify-center bg-[#1F1F1F]">
            <FadeInSection>
              <h2 className="text-[#C9A14A] text-sm font-bold tracking-[0.3em] uppercase mb-4">Visítanos</h2>
              <h3 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-12">Reserva tu momento</h3>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-[#C9A14A]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h5 className="text-white uppercase tracking-widest text-sm mb-2 font-bold">Dirección</h5>
                    <p className="text-white/60 font-light">Plaza Real, Real Solare, Querétaro</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-[#C9A14A]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h5 className="text-white uppercase tracking-widest text-sm mb-2 font-bold">Teléfono</h5>
                    <p className="text-white/60 font-light">442 809 1575</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-xl font-['Playfair_Display'] mb-8 text-white/90">
                  Agenda tu cita fácilmente dando clic en el botón de WhatsApp.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#C9A14A] text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300"
                >
                  <MessageCircle size={20} />
                  Agendar ahora
                </a>
              </div>
            </FadeInSection>
          </div>

          <div className="h-[400px] lg:h-auto min-h-[500px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d939.5!2d-100.285262!3d20.5873017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d343575feec8a7%3A0x34262e761ec6bf81!2sBarberia%20Le%20Chevalier!5e0!3m2!1ses!2smx!4v1744000000001!5m2!1ses!2smx"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[60%] contrast-125 opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0D0D] pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#C9A14A] mb-6 tracking-wider uppercase">
                Le Chevalier
              </h2>
              <p className="text-white/50 font-light max-w-xs leading-relaxed">
                El ritual del caballero moderno. Experiencia, precisión y lujo en el corazón de Querétaro.
              </p>
            </div>
            
            <div>
              <h4 className="text-white uppercase tracking-widest text-sm font-bold mb-6">Enlaces</h4>
              <ul className="space-y-4 text-white/50 font-light">
                <li><a href="#servicios" className="hover:text-[#C9A14A] transition-colors">Servicios</a></li>
                <li><a href="#paquetes" className="hover:text-[#C9A14A] transition-colors">Paquetes</a></li>
                <li><a href="#galeria" className="hover:text-[#C9A14A] transition-colors">Galería</a></li>
                <li><a href="#contacto" className="hover:text-[#C9A14A] transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-widest text-sm font-bold mb-6">Redes Sociales</h4>
              <p className="text-white/50 font-light mb-6">
                Síguenos y mantente al día con nuestros trabajos.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/barberialechevalier?igsh=aW5rbnJpYWo0cGR2&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-[#C9A14A] hover:text-black hover:border-[#C9A14A] transition-all">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/share/1BpRxKz8zv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-[#C9A14A] hover:text-black hover:border-[#C9A14A] transition-all">
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs font-light tracking-wider uppercase">
            <p>&copy; {new Date().getFullYear()} Barbería & Spa Le Chevalier.</p>
            <p>Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 z-50 group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded text-sm font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
          ¡Agenda tu cita!
        </span>
      </a>
    </div>
  );
}

export default LeChevalie;