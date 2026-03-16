"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
      tramites: "gestoría de trámites",
      teorica: "la prueba teórica",
      defensivo: "la charla de manejo defensivo",
      psicologia: "apoyo psicológico",
    };
    const phone = phones[servicio] || phones.autos;
    const text = `Hola! Me interesa consultar sobre ${labels[servicio] || servicio}${mensaje ? `. ${mensaje}` : "."}`;
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <a href="#hero" className="logo">Academia<span>Punta</span></a>
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
          <p className="hero-sub">
            Clases personalizadas para autos y motos. Instructores certificados.
            Tramitamos todo por vos ante la IDM.
          </p>
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
            { icon: "🧠", title: "Prueba Teórica", desc: "Clase de apoyo con docente. Porque el 70% reprueba sin preparación adecuada." },
            { icon: "🛡️", title: "Manejo Defensivo", desc: "Charlas lunes, miércoles y viernes. Doble horario: 8:00 hs y 18:30 hs." },
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

      {/* GUIA PARA LICENCIAS */}
      <section className="section" id="guia">
        <div className="section-tag">Paso a paso</div>
        <h2 className="section-title">Guía para <span>obtener tu licencia</span></h2>
        <div className="guia-grid">
          {[
            { num: "PASO 01", title: "Trámite en IDM", desc: "Academia Punta realiza los trámites para las diferentes licencias ante la Intendencia de Maldonado." },
            { num: "PASO 02", title: "Charla de Manejo Defensivo", desc: "Lunes, miércoles y viernes a las 8:00 hs y 18:30 hs. Presentarse con documento de identidad 5 min antes." },
            { num: "PASO 03", title: "Prueba Teórica", desc: "En la oficina de Licencias de conducir de la IDM. Coordinamos fecha y hora a tu conveniencia." },
            { num: "PASO 04", title: "Certificado de Aptitud Física", desc: "En instituciones autorizadas: SEMM, Bioeste, CASMU, Círculo Católico, Asistencial Médica y más. ATENCIÓN: el carnet de salud NO es válido." },
            { num: "PASO 05", title: "Prueba Práctica", desc: "En pista La Loma. Presentamos vehículo e instructor registrados y habilitados (auto y/o moto)." },
            { num: "PASO 06", title: "Clases de Manejo", desc: "Unidades nuevas. Amplio horario lunes a sábados. Clases personalizadas. Pasamos a buscarte." },
          ].map((g, i) => (
            <div className="guia-card reveal" key={i}>
              <div className="guia-num">{g.num}</div>
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MATERIALES DE ESTUDIO */}
      <section className="section" id="materiales">
        <div className="section-tag">Descargá gratis</div>
        <h2 className="section-title">Materiales <span>de estudio</span></h2>
        <div className="materiales-grid">
          <div className="material-card reveal">
            <div className="material-info">
              <h3>📘 Guía Nacional de Conducción Amateur</h3>
              <p>Autos y motos — Descargá el PDF oficial para prepararte</p>
            </div>
            <a href="https://academiadechoferespunta.com.uy/wp-content/uploads/2022/05/GuiaAutosYMotos.pdf" className="btn-download" target="_blank" rel="noopener noreferrer">
              ⬇️ Descargar PDF
            </a>
          </div>
          <div className="material-card reveal">
            <div className="material-info">
              <h3>📗 Guía Nacional de Conducción Profesional</h3>
              <p>Licencia profesional — Material oficial completo</p>
            </div>
            <a href="https://academiadechoferespunta.com.uy/wp-content/uploads/2022/05/GuiaProfesional.pdf" className="btn-download" target="_blank" rel="noopener noreferrer">
              ⬇️ Descargar PDF
            </a>
          </div>
          <div className="material-card reveal" style={{ gridColumn: "1 / -1" }}>
            <div className="material-info">
              <h3>💻 Clase de Apoyo a la Prueba Teórica</h3>
              <p>Clase virtual con docente para prepararte y aprobar el teórico. El 70% reprueba sin preparación.</p>
            </div>
            <a href="https://academiadechoferespunta.com.uy/clasevirtual/" className="btn-download" target="_blank" rel="noopener noreferrer">
              Ver clase virtual →
            </a>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="section" style={{ paddingTop: "0" }}>
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
            { icon: "🚗", title: "Permiso de Conducción — SUCIVE", desc: "Web oficial de SUCIVE para trámites de permiso", url: "https://www.sucive.gub.uy/formulario_punc?0" },
            { icon: "📋", title: "Licencia de Conducir — IDM", desc: "Trámite de licencia en Intendencia de Maldonado", url: "https://www.maldonado.gub.uy/tramites/tramites-licencias-conducir" },
            { icon: "🛡️", title: "Unidad Nacional de Seguridad Vial", desc: "UNASEV — Seguridad vial en Uruguay", url: "https://www.gub.uy/unidad-nacional-seguridad-vial/" },
            { icon: "🧘", title: "Lic. Psicóloga Ana Claudia Martínez", desc: "Servicio de asistencia psicológica para conductores", url: "http://www.consultoriopsicologico.wordpress.com/" },
            { icon: "📝", title: "Examen Teórico — Academia Punta", desc: "Practicá el examen teórico online con nosotros", url: "https://academiadechoferespunta.com.uy/prueba" },
            { icon: "💬", title: "Contacto directo", desc: "Escribinos por WhatsApp y te respondemos al toque", url: "https://api.whatsapp.com/send?phone=59894774465" },
          ].map((item, i) => (
            <a className="interes-card reveal" href={item.url} key={i} target="_blank" rel="noopener noreferrer">
              <div className="interes-icon">{item.icon}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* REDES SOCIALES */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="section-tag">Seguinos</div>
        <h2 className="section-title">Nuestras <span>redes sociales</span></h2>
        <div className="redes-grid">
          <a href="https://www.instagram.com/academiadechoferespunta/" className="red-card reveal" target="_blank" rel="noopener noreferrer">
            <div className="red-icon">📸</div>
            <div>
              <span>Instagram</span>
              <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.2rem" }}>@academiadechoferespunta</p>
            </div>
          </a>
          <a href="https://www.facebook.com/Academia-de-choferes-Punta-339658393468083" className="red-card reveal" target="_blank" rel="noopener noreferrer">
            <div className="red-icon">👍</div>
            <div>
              <span>Facebook</span>
              <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.2rem" }}>Academia de Choferes Punta</p>
            </div>
          </a>
          <a href="https://api.whatsapp.com/send?phone=59894774465" className="red-card reveal" target="_blank" rel="noopener noreferrer">
            <div className="red-icon">💬</div>
            <div>
              <span>WhatsApp Autos</span>
              <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.2rem" }}>094 774 465</p>
            </div>
          </a>
          <a href="https://api.whatsapp.com/send?phone=59898151659" className="red-card reveal" target="_blank" rel="noopener noreferrer">
            <div className="red-icon">💬</div>
            <div>
              <span>WhatsApp Motos</span>
              <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.2rem" }}>098 151 659</p>
            </div>
          </a>
        </div>
      </section>

      {/* MAPA */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="section-tag">Dónde estamos</div>
        <h2 className="section-title">Maldonado, <span>Uruguay</span></h2>
        <div className="mapa-wrapper reveal">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.0!2d-54.95!3d-34.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x957511348d9fc7b7%3A0xe755a1d8711427e8!2sAcademia%20de%20Choferes%20Punta!5e0!3m2!1ses!2suy!4v1"
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
            <a href="https://api.whatsapp.com/send?phone=59894774465&text=Quiero%20empezar%20ahora." className="btn-dark" target="_blank" rel="noopener noreferrer">📱 Autos — 094 774 465</a>
            <a href="https://api.whatsapp.com/send?phone=59898151659&text=Quiero%20empezar%20ahora." className="btn-dark" target="_blank" rel="noopener noreferrer">📱 Motos — 098 151 659</a>
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
              <div className="contacto-item-text">
                <strong>WhatsApp — Autos</strong>
                <p>094 774 465</p>
              </div>
            </div>
            <div className="contacto-item">
              <div className="contacto-item-icon">🏍️</div>
              <div className="contacto-item-text">
                <strong>WhatsApp — Motos</strong>
                <p>098 151 659</p>
              </div>
            </div>
            <div className="contacto-item">
              <div className="contacto-item-icon">📍</div>
              <div className="contacto-item-text">
                <strong>Ubicación</strong>
                <p>Maldonado, Uruguay<br />Punta del Este y alrededores</p>
              </div>
            </div>
            <div className="contacto-item">
              <div className="contacto-item-icon">🕐</div>
              <div className="contacto-item-text">
                <strong>Horario de clases</strong>
                <p>Lunes a Sábados<br />Horario amplio y flexible</p>
              </div>
            </div>
            <div className="contacto-item">
              <div className="contacto-item-icon">📸</div>
              <div className="contacto-item-text">
                <strong>Instagram</strong>
                <p>@academiadechoferespunta</p>
              </div>
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
              <textarea
                placeholder="Contanos tu situación o pregunta..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              ></textarea>
            </div>
            <button className="btn-wa-form" onClick={handleContacto}>
              💬 Enviar por WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">Academia<span>Punta</span></div>
              <p>La academia de choferes de referencia en Punta del Este y Maldonado, Uruguay. Más de 15 años formando conductores seguros.</p>
              <div className="footer-social">
                <a href="https://www.instagram.com/academiadechoferespunta/" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
                <a href="https://www.facebook.com/Academia-de-choferes-Punta-339658393468083" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Facebook">fb</a>
                <a href="https://api.whatsapp.com/send?phone=59894774465" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">wa</a>
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
            <span>Diseño web moderno</span>
          </div>
        </div>
      </footer>

      {/* WA FLOTANTE */}
      <a href="https://api.whatsapp.com/send?phone=59894774465" className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        💬
      </a>
    </>
  );
}
