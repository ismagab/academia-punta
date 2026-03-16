"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// SVG iconos oficiales
const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433"/>
        <stop offset="25%" stopColor="#e6683c"/>
        <stop offset="50%" stopColor="#dc2743"/>
        <stop offset="75%" stopColor="#cc2366"/>
        <stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
    <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicio, setServicio] = useState("autos");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleContacto = () => {
    const phones: Record<string, string> = {
      autos: "59894774465",
      motos: "59898151659",
      tramites: "59894774465",
      teorica: "59894774465",
      defensivo: "59894774465",
      psicologia: "59894774465",
    };
    const labels: Record<string, string> = {
      autos: "clases de autos",
      motos: "clases de motos",
      tramites: "gestoría de trámites IDM",
      teorica: "la prueba teórica",
      defensivo: "la charla de manejo defensivo",
      psicologia: "apoyo psicológico",
    };
    const phone = phones[servicio] || phones.autos;
    const text = `Hola! Me interesa consultar sobre ${labels[servicio]}${mensaje ? `. ${mensaje}` : "."}`;
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`, "_blank");
  };

  const LOGO = "https://academiadechoferespunta.com.uy/wp-content/uploads/2022/04/ICONO-circle-cropped-g.png";

  return (
    <>
      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <a href="#hero" className="logo">
            <Image src={LOGO} alt="Academia Punta" width={40} height={40} unoptimized />
            <div className="logo-text">Academia<span>Punta</span></div>
          </a>
          <ul className="nav-links">
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#guia">Guía</a></li>
            <li><a href="#materiales">Materiales</a></li>
            <li><a href="#testimonios">Opiniones</a></li>
            <li><a href="#interes">Links</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
          <a href="#contacto" className="btn-nav">Empezar →</a>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
          <a href="#guia" onClick={() => setMenuOpen(false)}>Guía</a>
          <a href="#materiales" onClick={() => setMenuOpen(false)}>Materiales</a>
          <a href="#testimonios" onClick={() => setMenuOpen(false)}>Opiniones</a>
          <a href="#interes" onClick={() => setMenuOpen(false)}>Links de interés</a>
          <a href="#contacto" className="btn-mobile" onClick={() => setMenuOpen(false)}>Empezar ahora</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg-img"></div>
        <div className="hero-overlay"></div>
        <div className="hero-inner">
          <div className="hero-badge">🚗 Punta del Este, Maldonado — Uruguay</div>
          <h1>Tu licencia,<span>sin dramas.</span></h1>
          <p className="hero-sub">Clases personalizadas para autos y motos. Instructores certificados. Tramitamos todo por vos ante la IDM.</p>
          <div className="hero-btns">
            <a href="#contacto" className="btn-primary">Quiero empezar 🚀</a>
            <a href="#servicios" className="btn-outline">Ver servicios</a>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="num">5★</span><span className="label">Google</span></div>
            <div className="stat-div"></div>
            <div className="stat"><span className="num">+15</span><span className="label">Años</span></div>
            <div className="stat-div"></div>
            <div className="stat"><span className="num">100%</span><span className="label">Certificados</span></div>
            <div className="stat-div"></div>
            <div className="stat"><span className="num">2</span><span className="label">Modalidades</span></div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="section" id="servicios">
        <div className="section-tag">Lo que ofrecemos</div>
        <h2 className="section-title">Todo para <span>tu licencia</span></h2>
        <div className="services-grid">
          {[
            { icon: "🚗", title: "Clases de Autos", desc: "Unidades nuevas, horario amplio de lunes a sábados. Te pasamos a buscar para cada clase." },
            { icon: "🏍️", title: "Clases de Motos", desc: "En pista La Loma. Vehículo, casco y reflectivos incluidos. Clases personalizadas." },
            { icon: "📋", title: "Gestoría IDM", desc: "Hacemos todos los trámites en la Intendencia por vos. Tu tiempo vale oro." },
            { icon: "🧠", title: "Prueba Teórica", desc: "Clase de apoyo con docente. Porque el 70% reprueba sin preparación." },
            { icon: "🛡️", title: "Manejo Defensivo", desc: "Lunes, miércoles y viernes. Doble horario: 8:00 hs y 18:30 hs." },
            { icon: "🧘", title: "Apoyo Psicológico", desc: "¿Le tenés miedo al volante? Profesionales que te acompañan en el proceso." },
          ].map((s, i) => (
            <div className="service-card reveal" key={i}>
              <div className="s-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER AUTOS */}
      <div className="img-banner">
        <Image src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1600&q=80" alt="Clases de autos" width={1600} height={420} style={{ width:"100%", height:"100%", objectFit:"cover" }} unoptimized />
        <div className="img-banner-overlay">
          <div className="img-banner-text">
            <h2>Clases de autos<br /><span>personalizadas</span></h2>
            <p>Aprendé a tu ritmo con instructores pacientes y certificados. Te buscamos para cada clase.</p>
            <a href="#contacto" className="btn-primary">Consultar ahora</a>
          </div>
        </div>
      </div>

      {/* GUIA */}
      <section className="section" id="guia">
        <div className="section-tag">Paso a paso</div>
        <h2 className="section-title">Guía para <span>obtener tu licencia</span></h2>
        <div className="guia-grid">
          {[
            { num: "PASO 01", title: "Trámite en IDM", desc: "Academia Punta realiza los trámites para las diferentes licencias ante la Intendencia de Maldonado." },
            { num: "PASO 02", title: "Charla de Manejo Defensivo", desc: "Lunes, miércoles y viernes a las 8:00 hs y 18:30 hs. Presentarse con documento de identidad 5 min antes." },
            { num: "PASO 03", title: "Prueba Teórica", desc: "En la oficina de Licencias de la IDM. Coordinamos fecha y hora a tu conveniencia." },
            { num: "PASO 04", title: "Certificado de Aptitud Física", desc: "En instituciones autorizadas: SEMM, Bioeste, CASMU, Círculo Católico y más. El carnet de salud NO es válido." },
            { num: "PASO 05", title: "Prueba Práctica", desc: "En pista La Loma. Presentamos vehículo e instructor registrados y habilitados (auto y/o moto)." },
            { num: "PASO 06", title: "Clases de Manejo", desc: "Unidades nuevas. Lunes a sábados. Clases personalizadas. Pasamos a buscarte para cada clase." },
          ].map((g, i) => (
            <div className="guia-card reveal" key={i}>
              <div className="guia-num">{g.num}</div>
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MATERIALES */}
      <section className="section" id="materiales">
        <div className="section-tag">Descargá gratis</div>
        <h2 className="section-title">Materiales <span>de estudio</span></h2>
        <div className="materiales-grid">
          <div className="material-card reveal">
            <div className="material-info">
              <h3>📘 Guía Nacional de Conducción Amateur</h3>
              <p>Autos y motos — PDF oficial para prepararte</p>
            </div>
            <a href="https://academiadechoferespunta.com.uy/wp-content/uploads/2022/05/GuiaAutosYMotos.pdf" className="btn-download" target="_blank" rel="noopener noreferrer">⬇️ Descargar PDF</a>
          </div>
          <div className="material-card reveal">
            <div className="material-info">
              <h3>📗 Guía Nacional de Conducción Profesional</h3>
              <p>Licencia profesional — Material oficial completo</p>
            </div>
            <a href="https://academiadechoferespunta.com.uy/wp-content/uploads/2022/05/GuiaProfesional.pdf" className="btn-download" target="_blank" rel="noopener noreferrer">⬇️ Descargar PDF</a>
          </div>
          <div className="material-card reveal" style={{ gridColumn: "1 / -1" }}>
            <div className="material-info">
              <h3>💻 Clase de Apoyo a la Prueba Teórica</h3>
              <p>Clase virtual con docente. El 70% reprueba sin preparación — no seas parte de esa estadística.</p>
            </div>
            <a href="https://academiadechoferespunta.com.uy/clasevirtual/" className="btn-download" target="_blank" rel="noopener noreferrer">Ver clase virtual →</a>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="section" style={{ paddingTop: "0", borderTop: "none" }}>
        <div className="foto-grid">
          {[
            { src: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80", label: "Clases de Autos" },
            { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", label: "Clases de Motos" },
            { src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80", label: "Instructores Certificados" },
          ].map((foto, i) => (
            <div className="foto-item reveal" key={i}>
              <Image src={foto.src} alt={foto.label} width={800} height={600} style={{ width:"100%", height:"100%", objectFit:"cover" }} unoptimized />
              <div className="foto-label">{foto.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER MOTOS */}
      <div className="img-banner">
        <Image src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1600&q=80" alt="Clases de motos" width={1600} height={420} style={{ width:"100%", height:"100%", objectFit:"cover" }} unoptimized />
        <div className="img-banner-overlay">
          <div className="img-banner-text">
            <h2>Clases de motos<br /><span>en pista La Loma</span></h2>
            <p>Vehículo, casco y reflectivos incluidos. Lunes a sábados.</p>
            <a href="#contacto" className="btn-primary">Consultar ahora</a>
          </div>
        </div>
      </div>

      {/* TESTIMONIOS */}
      <section className="section" id="testimonios">
        <div className="section-tag">Opiniones reales</div>
        <h2 className="section-title">Lo que dicen <span>nuestros alumnos</span></h2>
        <div className="testi-grid">
          {[
            { texto: "Súper recomendado. Un placer tomar clases con Darío. Profesional y con paciencia infinita.", autor: "Romi Giedzinski" },
            { texto: "Gracias a Fernando pude aprobar sin problemas. Paciencia y dedicación total. ¡100% recomendable!", autor: "Evelyn Schlenzak" },
            { texto: "Flota impecable, instructores excelentes. 10/10 en todo. Muy agradecido.", autor: "Gabriel URU" },
            { texto: "100% recomendable. Rápido aprendizaje y buena predisposición de los instructores.", autor: "Martin Gannuso" },
            { texto: "Enseñan con paciencia y dedicación. ¡Gracias por hacerlo con tan buena onda!", autor: "Melisa Alvarez" },
            { texto: "Herramienta y atención de primera. Lo recomiendo para todo el que necesite este servicio.", autor: "Mauro Corbo" },
          ].map((t, i) => (
            <div className="testi-card reveal" key={i}>
              <div className="stars">★★★★★</div>
              <p>&ldquo;{t.texto}&rdquo;</p>
              <div className="author">{t.autor}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PAGINAS DE INTERES */}
      <section className="section" id="interes">
        <div className="section-tag">Recursos útiles</div>
        <h2 className="section-title">Páginas <span>de interés</span></h2>
        <div className="interes-grid">
          {[
            { icon: "🚗", title: "Permiso de Conducción — SUCIVE", desc: "Trámites de permiso en web oficial", url: "https://www.sucive.gub.uy/formulario_punc?0" },
            { icon: "📋", title: "Licencia de Conducir — IDM", desc: "Trámite en Intendencia de Maldonado", url: "https://www.maldonado.gub.uy/tramites/tramites-licencias-conducir" },
            { icon: "🛡️", title: "Unidad Nacional de Seguridad Vial", desc: "UNASEV — Seguridad vial en Uruguay", url: "https://www.gub.uy/unidad-nacional-seguridad-vial/" },
            { icon: "🧘", title: "Lic. Psicóloga Ana Claudia Martínez", desc: "Asistencia psicológica para conductores", url: "http://www.consultoriopsicologico.wordpress.com/" },
            { icon: "📝", title: "Examen Teórico Online", desc: "Practicá el examen teórico con Academia Punta", url: "https://academiadechoferespunta.com.uy/prueba" },
            { icon: "💬", title: "Contacto directo por WhatsApp", desc: "Te respondemos al toque", url: "https://api.whatsapp.com/send?phone=59894774465" },
          ].map((item, i) => (
            <a className="interes-card reveal" href={item.url} key={i} target="_blank" rel="noopener noreferrer">
              <div className="interes-icon">{item.icon}</div>
              <div><h3>{item.title}</h3><p>{item.desc}</p></div>
            </a>
          ))}
        </div>
      </section>

      {/* REDES SOCIALES */}
      <section className="section" style={{ paddingTop: "0", borderTop: "none" }}>
        <div className="section-tag">Seguinos</div>
        <h2 className="section-title">Nuestras <span>redes sociales</span></h2>
        <div className="redes-grid">
          <a href="https://www.instagram.com/academiadechoferespunta/" className="red-card reveal" target="_blank" rel="noopener noreferrer">
            <div className="red-icon"><IconInstagram /></div>
            <div><div className="red-label">Instagram</div><div className="red-sub">@academiadechoferespunta</div></div>
          </a>
          <a href="https://www.facebook.com/Academia-de-choferes-Punta-339658393468083" className="red-card reveal" target="_blank" rel="noopener noreferrer">
            <div className="red-icon"><IconFacebook /></div>
            <div><div className="red-label">Facebook</div><div className="red-sub">Academia de Choferes Punta</div></div>
          </a>
          <a href="https://api.whatsapp.com/send?phone=59894774465" className="red-card reveal" target="_blank" rel="noopener noreferrer">
            <div className="red-icon"><IconWhatsApp /></div>
            <div><div className="red-label">WhatsApp Autos</div><div className="red-sub">094 774 465</div></div>
          </a>
          <a href="https://api.whatsapp.com/send?phone=59898151659" className="red-card reveal" target="_blank" rel="noopener noreferrer">
            <div className="red-icon"><IconWhatsApp /></div>
            <div><div className="red-label">WhatsApp Motos</div><div className="red-sub">098 151 659</div></div>
          </a>
        </div>
      </section>

      {/* MAPA */}
      <section className="section" style={{ paddingTop: "0", borderTop: "none" }}>
        <div className="section-tag">Dónde estamos</div>
        <h2 className="section-title">Maldonado, <span>Uruguay</span></h2>
        <div className="mapa-wrapper reveal">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26176.04!2d-54.9516!3d-34.9013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x957511348d9fc7b7%3A0xe755a1d8711427e8!2sAcademia%20de%20Choferes%20Punta!5e0!3m2!1ses!2suy!4v1"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Academia de Choferes Punta"
          ></iframe>
        </div>
      </section>

      {/* CTA BAND */}
      <div className="cta-band">
        <div className="cta-band-inner">
          <h2>¿Listo para sacar<br />tu licencia hoy?</h2>
          <div className="cta-band-btns">
            <a href="https://api.whatsapp.com/send?phone=59894774465&text=Quiero%20empezar%20ahora." className="btn-dark" target="_blank" rel="noopener noreferrer">
              <IconWhatsApp /> Autos — 094 774 465
            </a>
            <a href="https://api.whatsapp.com/send?phone=59898151659&text=Quiero%20empezar%20ahora." className="btn-dark" target="_blank" rel="noopener noreferrer">
              <IconWhatsApp /> Motos — 098 151 659
            </a>
          </div>
        </div>
      </div>

      {/* CONTACTO */}
      <section className="section" id="contacto">
        <div className="section-tag">Escribinos</div>
        <h2 className="section-title">Elegí tu servicio y <span>contactanos</span></h2>
        <div className="contacto-grid">
          <div className="contacto-info">
            <h3>Información de contacto</h3>
            <div className="contacto-item">
              <div className="contacto-item-icon">🚗</div>
              <div className="contacto-item-text"><strong>WhatsApp — Autos</strong><p>094 774 465</p></div>
            </div>
            <div className="contacto-item">
              <div className="contacto-item-icon">🏍️</div>
              <div className="contacto-item-text"><strong>WhatsApp — Motos</strong><p>098 151 659</p></div>
            </div>
            <div className="contacto-item">
              <div className="contacto-item-icon">📍</div>
              <div className="contacto-item-text"><strong>Ubicación</strong><p>Maldonado, Uruguay<br />Punta del Este y alrededores</p></div>
            </div>
            <div className="contacto-item">
              <div className="contacto-item-icon">🕐</div>
              <div className="contacto-item-text"><strong>Horario de clases</strong><p>Lunes a Sábados — Horario amplio y flexible</p></div>
            </div>
            <div className="contacto-item">
              <div className="contacto-item-icon">📸</div>
              <div className="contacto-item-text"><strong>Instagram</strong><p>@academiadechoferespunta</p></div>
            </div>
          </div>

          <div className="contacto-form">
            <h3>Seleccioná tu consulta y te abrimos WhatsApp</h3>
            <div className="form-group">
              <label>¿Qué servicio te interesa?</label>
              <select value={servicio} onChange={(e) => setServicio(e.target.value)}>
                <option value="autos">🚗 Clases de Autos</option>
                <option value="motos">🏍️ Clases de Motos</option>
                <option value="tramites">📋 Gestoría de Trámites IDM</option>
                <option value="teorica">🧠 Prueba Teórica</option>
                <option value="defensivo">🛡️ Charla de Manejo Defensivo</option>
                <option value="psicologia">🧘 Apoyo Psicológico</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tu consulta (opcional)</label>
              <textarea placeholder="Contanos tu situación o pregunta..." value={mensaje} onChange={(e) => setMensaje(e.target.value)}></textarea>
            </div>
            <button className="btn-wa-form" onClick={handleContacto}>
              <svg className="wa-btn-icon" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Enviar por WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#hero" className="footer-brand-logo">
                <Image src={LOGO} alt="Academia Punta Logo" width={45} height={45} unoptimized />
                <div className="footer-logo-text">Academia<span>Punta</span></div>
              </a>
              <p>La academia de choferes de referencia en Punta del Este y Maldonado, Uruguay. Más de 15 años formando conductores seguros.</p>
              <div className="footer-social">
                <a href="https://www.instagram.com/academiadechoferespunta/" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <IconInstagram />
                </a>
                <a href="https://www.facebook.com/Academia-de-choferes-Punta-339658393468083" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <IconFacebook />
                </a>
                <a href="https://api.whatsapp.com/send?phone=59894774465" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <IconWhatsApp />
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Servicios</h4>
              <ul>
                <li><a href="#servicios">Clases de Autos</a></li>
                <li><a href="#servicios">Clases de Motos</a></li>
                <li><a href="#servicios">Gestoría IDM</a></li>
                <li><a href="#servicios">Prueba Teórica</a></li>
                <li><a href="#servicios">Manejo Defensivo</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Recursos</h4>
              <ul>
                <li><a href="#guia">Guía de Licencia</a></li>
                <li><a href="#materiales">Materiales de Estudio</a></li>
                <li><a href="#interes">Páginas de Interés</a></li>
                <li><a href="https://academiadechoferespunta.com.uy/prueba" target="_blank" rel="noopener noreferrer">Examen Teórico</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contacto</h4>
              <ul>
                <li><a href="https://api.whatsapp.com/send?phone=59894774465">094 774 465 — Autos</a></li>
                <li><a href="https://api.whatsapp.com/send?phone=59898151659">098 151 659 — Motos</a></li>
                <li><a href="#contacto">Formulario de contacto</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2025 Academia de Choferes Punta — Maldonado, Uruguay</span>
            <span>academiadechoferespunta.com.uy</span>
          </div>
        </div>
      </footer>

      {/* WA FLOTANTE */}
      <a href="https://api.whatsapp.com/send?phone=59894774465" className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <IconWhatsApp />
      </a>
    </>
  );
}
