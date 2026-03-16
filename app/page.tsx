"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <>
      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <a href="#hero" className="logo">Academia<span>Punta</span></a>
          <ul className="nav-links">
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#proceso">Proceso</a></li>
            <li><a href="#testimonios">Opiniones</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
          <a href="https://api.whatsapp.com/send?phone=59894774465&text=Quiero%20empezar%20ahora." className="btn-nav" target="_blank" rel="noopener noreferrer">
            Empezar →
          </a>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
          <a href="#proceso" onClick={() => setMenuOpen(false)}>Proceso</a>
          <a href="#testimonios" onClick={() => setMenuOpen(false)}>Opiniones</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
          <a href="https://api.whatsapp.com/send?phone=59894774465" className="btn-mobile" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
            Empezar ahora
          </a>
        </div>
      </nav>

      {/* HERO con imagen de fondo */}
      <section className="hero" id="hero">
        <div className="hero-bg-img"></div>
        <div className="hero-overlay"></div>
        <div className="hero-inner">
          <div className="hero-badge">🚗 Punta del Este, Uruguay</div>
          <h1>Tu licencia,<span>sin dramas.</span></h1>
          <p className="hero-sub">
            Clases personalizadas para autos y motos. Instructores certificados.
            Tramitamos todo por vos ante la IDM.
          </p>
          <div className="hero-btns">
            <a href="https://api.whatsapp.com/send?phone=59894774465&text=Quiero%20empezar%20ahora." className="btn-primary" target="_blank" rel="noopener noreferrer">
              Quiero empezar 🚀
            </a>
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
            { icon: "🧠", title: "Prueba Teórica", desc: "Clase de apoyo con docente. Porque el 70% reprueba sin preparación adecuada." },
            { icon: "🛡️", title: "Manejo Defensivo", desc: "Charlas lunes, miércoles y viernes. Doble horario: 8:00 hs y 18:30 hs." },
            { icon: "🧘", title: "Apoyo Psicológico", desc: "¿Le tenés miedo al volante? Tenemos profesionales que te acompañan en el proceso." },
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
        <Image
          src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1600&q=80"
          alt="Clases de manejo en autos"
          width={1600}
          height={420}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          unoptimized
        />
        <div className="img-banner-overlay">
          <div className="img-banner-text">
            <h2>Clases de autos<br /><span>personalizadas</span></h2>
            <p>Aprendé a tu ritmo con instructores pacientes y certificados. Pasamos a buscarte para cada clase.</p>
            <a href="https://api.whatsapp.com/send?phone=59894774465&text=Quiero%20clases%20de%20autos." className="btn-primary" target="_blank" rel="noopener noreferrer">
              Consultar ahora
            </a>
          </div>
        </div>
      </div>

      {/* PROCESO */}
      <section className="section" id="proceso">
        <div className="section-tag">Cómo funciona</div>
        <h2 className="section-title">Del cero a tu <span>licencia</span></h2>
        <div className="steps">
          {[
            { num: "01", title: "Clases de manejo", desc: "Aprendé con instructores habilitados. Vehículo de la academia incluido." },
            { num: "02", title: "Charla de manejo defensivo", desc: "Instancia obligatoria. La coordinamos a tu horario." },
            { num: "03", title: "Certificado de aptitud física", desc: "Te damos la lista completa de instituciones autorizadas en Maldonado." },
            { num: "04", title: "Prueba teórica", desc: "Con clase de apoyo opcional. Coordinamos fecha en la oficina IDM." },
            { num: "05", title: "Prueba práctica", desc: "En pista La Loma con nuestro vehículo e instructor habilitado." },
            { num: "06", title: "¡Licencia en mano!", desc: "Gestionamos el trámite final. Vos solo disfrutás el resultado." },
          ].map((step, i) => (
            <div className="step reveal" key={i}>
              <div className="step-num">{step.num}</div>
              <div className="step-body">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALERÍA DE FOTOS */}
      <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="section-tag">Nuestras clases</div>
        <h2 className="section-title">Aprendé con los <span>mejores</span></h2>
        <div className="foto-grid">
          {[
            { src: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80", label: "Clases de Autos" },
            { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", label: "Clases de Motos" },
            { src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80", label: "Pista La Loma" },
          ].map((foto, i) => (
            <div className="foto-item reveal" key={i}>
              <Image
                src={foto.src}
                alt={foto.label}
                width={800}
                height={600}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                unoptimized
              />
              <div className="foto-label">{foto.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER MOTOS */}
      <div className="img-banner">
        <Image
          src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1600&q=80"
          alt="Clases de motos"
          width={1600}
          height={420}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          unoptimized
        />
        <div className="img-banner-overlay">
          <div className="img-banner-text">
            <h2>Clases de motos<br /><span>en pista La Loma</span></h2>
            <p>Proporcionamos vehículo, casco y reflectivos. Horarios de lunes a sábados.</p>
            <a href="https://api.whatsapp.com/send?phone=59898151659&text=Quiero%20clases%20de%20motos." className="btn-primary" target="_blank" rel="noopener noreferrer">
              Consultar ahora
            </a>
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

      {/* CTA BAND */}
      <div className="cta-band">
        <div className="cta-band-inner">
          <h2>¿Listo para sacar<br />tu licencia hoy?</h2>
          <div className="cta-band-btns">
            <a href="https://api.whatsapp.com/send?phone=59894774465&text=Quiero%20empezar%20ahora." className="btn-dark" target="_blank" rel="noopener noreferrer">
              📱 WhatsApp — Autos
            </a>
            <a href="https://api.whatsapp.com/send?phone=59898151659&text=Quiero%20empezar%20ahora." className="btn-dark" target="_blank" rel="noopener noreferrer">
              📱 WhatsApp — Motos
            </a>
          </div>
        </div>
      </div>

      {/* CONTACTO */}
      <section className="section contacto" id="contacto">
        <div className="section-tag">Contacto</div>
        <h2 className="section-title">¿Tenés alguna <span>consulta?</span></h2>
        <p className="contacto-sub">Escribinos por WhatsApp y te respondemos al toque.</p>
        <div className="contacto-btns">
          <a href="https://api.whatsapp.com/send?phone=59894774465&text=Quiero%20empezar%20ahora." className="btn-wa" target="_blank" rel="noopener noreferrer">
            📱 WhatsApp — Autos
          </a>
          <a href="https://api.whatsapp.com/send?phone=59898151659&text=Quiero%20empezar%20ahora." className="btn-wa" target="_blank" rel="noopener noreferrer">
            📱 WhatsApp — Motos
          </a>
        </div>
        <div className="redes">
          <a href="https://www.instagram.com/academiadechoferespunta/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/Academia-de-choferes-Punta-339658393468083" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-logo">Academia<span>Punta</span></div>
          <p>La academia de choferes de referencia en Maldonado, Uruguay.</p>
          <div className="footer-links">
            <a href="#servicios">Servicios</a>
            <a href="#proceso">Proceso</a>
            <a href="#testimonios">Opiniones</a>
            <a href="#contacto">Contacto</a>
          </div>
          <div className="footer-copy">© 2025 Academia de Choferes Punta — Maldonado, Uruguay</div>
        </div>
      </footer>

      {/* WA FLOTANTE */}
      <a href="https://api.whatsapp.com/send?phone=59894774465" className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        💬
      </a>
    </>
  );
}
