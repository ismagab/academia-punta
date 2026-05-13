import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Quiénes Somos — Academia de Choferes Punta",
  description: "Conocé al equipo de Academia Punta. Instructores certificados por UNASEV con más de 15 años formando conductores en Maldonado, Uruguay.",
};

const LOGO = "/logo.jpg";

// Fotos del equipo — colocar en /public/equipo/
const JUANCARLOS_FOTO = "/equipo/juancarlos.png";
const DARIO_FOTO      = "/equipo/dario.png";
const FERNANDO_FOTO   = "/equipo/fernando.png";
const ALICIA_FOTO     = "/equipo/alicia.png";
const ELSY_FOTO       = "/equipo/elsy.png";
const ANA_FOTO        = "/equipo/psicologa-generica.png";

// WhatsApp links
const WA_AUTOS  = "https://api.whatsapp.com/send?phone=59894774465&text=Quiero%20empezar%20ahora.";
const WA_MOTOS  = "https://api.whatsapp.com/send?phone=59898151659&text=Quiero%20empezar%20ahora.";

export default function NosotrosPage() {
  const navLinkStyle = {
    fontFamily:"Barlow Condensed,sans-serif", fontWeight:600 as const, fontSize:"0.8rem",
    letterSpacing:"0.12em", textTransform:"uppercase" as const,
    color:"rgba(255,255,255,0.65)", textDecoration:"none", whiteSpace:"nowrap" as const,
  };

  const team = [
    {
      num: "01",
      foto: JUANCARLOS_FOTO,
      alt: "Juan Carlos Sosa — Instructor Categoría A",
      badge: "🚗 Instructor",
      name: "Juan Carlos Sosa",
      acred: "Instructor de categoría: A · Clases disponibles en Inglés",
      lic: "Licencia: Cat. A",
      whatsapp: WA_AUTOS,
      waLabel: "WhatsApp · 094 774 465",
    },
    {
      num: "02",
      foto: DARIO_FOTO,
      alt: "Darío Agesta — Instructor múltiples categorías",
      badge: "🏍️ Instructor",
      name: "Darío Agesta",
      acred: "Instructor para categorías: A, B, C, D, F, H, G1 y G3",
      lic: "Licencias: Cat. A · B · C · D · F · H · G1 · G3",
      whatsapp: WA_MOTOS,
      waLabel: "WhatsApp · 098 151 659",
    },
    {
      num: "03",
      foto: FERNANDO_FOTO,
      alt: "Fernando Agesta — Instructor y Docente",
      badge: "🎓 Instructor & Docente",
      name: "Fernando Agesta",
      acred: "Instructor para categorías: A, G1, G2 y G3 · Docente para clases de apoyo teórico amateur y profesional",
      lic: "Licencias: Cat. A · G1 · G2 · G3",
      whatsapp: WA_MOTOS,
      waLabel: "WhatsApp · 098 151 659",
    },
    {
      num: "04",
      foto: ALICIA_FOTO,
      alt: "Alicia Rodríguez — Instructora Categoría A",
      badge: "🚗 Instructora",
      name: "Alicia Rodríguez",
      acred: "Instructora de categoría: A",
      lic: "Licencia: Cat. A",
      whatsapp: WA_AUTOS,
      waLabel: "WhatsApp · 094 774 465",
    },
    {
      num: "05",
      foto: ELSY_FOTO,
      alt: "Elsy Sosa — Instructora Categoría A",
      badge: "🚗 Instructora",
      name: "Elsy Sosa",
      acred: "Instructora de categoría: A",
      lic: "Licencia: Cat. A",
      whatsapp: WA_AUTOS,
      waLabel: "WhatsApp · 094 774 465",
    },
  ];

  return (
    <>
      {/* ── ESTILOS INLINE DE LA PÁGINA ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fafaf7; color: #2a2a2a; font-family: 'Barlow', sans-serif; font-weight: 300; }
        ::selection { background: #FFE600; color: #000; }

        /* ── TARJETA INSTRUCTOR ── */
        .team-card {
          background: #0d0d0d;
          border: 1px solid #1e1e1e;
          border-top: 3px solid #FFE600;
          border-radius: 4px;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
        }

        .team-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,230,0,0.2);
        }

        .team-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: #111;
        }

        .team-photo-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(13,13,13,1)    0%,
            rgba(13,13,13,0.6) 35%,
            rgba(13,13,13,0)   65%
          );
          z-index: 1;
          transition: opacity 0.4s;
        }

        .team-photo-wrap::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: #FFE600;
          z-index: 2;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .team-card:hover .team-photo-wrap::before {
          transform: scaleX(1);
        }

        .team-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          filter: grayscale(20%) contrast(1.05);
          transition: transform 0.6s ease, filter 0.4s ease;
        }

        .team-card:hover .team-photo {
          transform: scale(1.06);
          filter: grayscale(0%) contrast(1.08);
        }

        .team-role-badge {
          position: absolute;
          bottom: 1rem; left: 1.2rem;
          z-index: 3;
          background: #FFE600;
          color: #000;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          padding: 0.25rem 0.8rem;
          border-radius: 2px;
        }

        .team-num {
          position: absolute;
          top: 0.5rem; right: 0.8rem;
          z-index: 3;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 5rem;
          color: rgba(255,230,0,0.08);
          line-height: 1;
          pointer-events: none;
          transition: color 0.4s;
        }

        .team-card:hover .team-num {
          color: rgba(255,230,0,0.15);
        }

        .team-info {
          padding: 1.5rem 1.6rem 2rem;
        }

        .team-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 0.04em;
          color: white;
          margin-bottom: 0.3rem;
          line-height: 1.1;
        }

        .team-acred {
          font-size: 0.83rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
          margin-bottom: 0.6rem;
        }

        .team-lic {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.3);
          font-style: italic;
          margin-bottom: 1.2rem;
        }

        .team-links {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .team-link {
          padding: 0.4rem 0.9rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          text-decoration: none;
          border-radius: 2px;
          transition: opacity 0.2s, transform 0.2s;
          display: inline-block;
        }

        .team-link:hover { opacity: 0.85; transform: translateY(-1px); }

        /* ── TARJETA ANA (psicóloga) ── */
        .ana-card {
          background: #0d0d0d;
          border: 1px solid #1e1e1e;
          border-top: 3px solid #FFE600;
          border-radius: 4px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
        }

        @media (max-width: 600px) {
          .ana-card { grid-template-columns: 1fr; }
        }

        .ana-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,230,0,0.2);
        }

        .ana-photo-wrap {
          position: relative;
          width: 100%;
          min-height: 280px;
          overflow: hidden;
          background: #111;
        }

        .ana-photo-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(13,13,13,0) 60%, rgba(13,13,13,0.9) 100%);
          z-index: 1;
        }

        @media (max-width: 600px) {
          .ana-photo-wrap::after {
            background: linear-gradient(to top, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0) 60%);
          }
        }

        .ana-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 15%;
          filter: grayscale(20%) contrast(1.05);
          transition: transform 0.6s ease, filter 0.4s ease;
        }

        .ana-card:hover .ana-photo {
          transform: scale(1.04);
          filter: grayscale(0%) contrast(1.08);
        }

        .ana-info {
          padding: 2rem 2rem 2rem 1.8rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Valores cards */
        .valor-card {
          background: white;
          border: 1px solid #ddd8cc;
          border-left: 4px solid #FFE600;
          padding: 1.5rem;
          border-radius: 0 4px 4px 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .valor-card:hover {
          transform: translateX(4px);
          box-shadow: -4px 0 0 #FFE600, 4px 8px 24px rgba(0,0,0,0.06);
        }

        /* Vehículos cards */
        .vehiculo-card {
          background: white;
          border: 1px solid #ddd8cc;
          border-top: 3px solid #FFE600;
          padding: 2rem;
          border-radius: 4px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .vehiculo-card::after {
          content: '';
          position: absolute;
          bottom: -15px; right: -15px;
          width: 80px; height: 80px;
          border-radius: 50%;
          border: 2px solid #FFE600;
          opacity: 0.08;
          transition: opacity 0.3s, transform 0.3s;
        }

        .vehiculo-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.08); }
        .vehiculo-card:hover::after { opacity: 0.2; transform: scale(1.2); }

        /* CTA */
        .cta-section {
          background: #FFE600;
          padding: 3.5rem 2rem;
          border-radius: 4px;
          text-align: center;
        }

        /* Divisor de sección psicóloga */
        .psi-section-label {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          margin-bottom: 0.8rem;
          margin-top: 3rem;
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{background:"rgba(13,13,13,0.98)",borderBottom:"2px solid #FFE600",padding:"0.9rem 2rem",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",flexWrap:"wrap"}}>
          <Link href="/" style={{display:"flex",alignItems:"center",gap:"0.6rem",textDecoration:"none",flexShrink:0}}>
            <Image src={LOGO} alt="Academia Punta" width={40} height={40} unoptimized style={{objectFit:"contain"}}/>
            <span style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1.1rem",letterSpacing:"0.1em",color:"white",whiteSpace:"nowrap"}}>
              Academia <span style={{color:"#FFE600"}}>Punta</span>
            </span>
          </Link>
          <div style={{display:"flex",gap:"1.5rem",alignItems:"center",flexWrap:"wrap"}}>
            <Link href="/#servicios"   style={navLinkStyle}>Servicios</Link>
            <Link href="/#guia"        style={navLinkStyle}>Guía</Link>
            <Link href="/#materiales"  style={navLinkStyle}>Materiales</Link>
            <Link href="/#testimonios" style={navLinkStyle}>Opiniones</Link>
            <Link href="/#contacto" style={{background:"#FFE600",color:"#000",padding:"0.5rem 1.3rem",fontFamily:"Bebas Neue,sans-serif",fontSize:"0.95rem",letterSpacing:"0.1em",textDecoration:"none",borderRadius:"2px",whiteSpace:"nowrap"}}>
              Contacto →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HEADER OSCURO ── */}
      <div style={{background:"#0d0d0d",padding:"5rem 2rem 4rem",borderBottom:"3px solid #FFE600",position:"relative",overflow:"hidden"}}>
        {/* Volante watermark */}
        <svg style={{position:"absolute",right:"-2%",top:"50%",transform:"translateY(-50%)",width:"min(380px,40vw)",opacity:0.04,pointerEvents:"none"}} viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="2.5"/>
          <circle cx="50" cy="50" r="8" stroke="white" strokeWidth="2"/>
          {[0,45,90,135].map(a=>{const rad=(a*Math.PI)/180;return<g key={a}><line x1={50+8*Math.cos(rad)} y1={50+8*Math.sin(rad)} x2={50+44*Math.cos(rad)} y2={50+44*Math.sin(rad)} stroke="white" strokeWidth="1.8"/><line x1={50-8*Math.cos(rad)} y1={50-8*Math.sin(rad)} x2={50-44*Math.cos(rad)} y2={50-44*Math.sin(rad)} stroke="white" strokeWidth="1.8"/></g>;})}
        </svg>
        <div style={{maxWidth:"1200px",margin:"0 auto",position:"relative",zIndex:1}}>
          <Link href="/" style={{display:"inline-flex",alignItems:"center",gap:"0.4rem",color:"rgba(255,255,255,0.35)",textDecoration:"none",fontFamily:"Barlow Condensed,sans-serif",fontSize:"0.78rem",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"1.5rem"}}>
            ← Volver al inicio
          </Link>
          <div style={{display:"flex",alignItems:"center",gap:"0.7rem",marginBottom:"0.8rem"}}>
            <div style={{width:"2.2rem",height:"3px",background:"#FFE600",borderRadius:"2px"}}></div>
            <span style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:"0.72rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#FFE600"}}>Conocenos</span>
          </div>
          <h1 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(3rem,7vw,6rem)",letterSpacing:"0.03em",color:"white",lineHeight:0.95}}>
            Quiénes <br/><span style={{color:"#FFE600"}}>somos</span>
          </h1>
          <p style={{marginTop:"1.2rem",fontSize:"1rem",color:"rgba(255,255,255,0.5)",maxWidth:"480px",lineHeight:1.75}}>
            Más de 15 años formando conductores responsables en Punta del Este y Maldonado, Uruguay.
          </p>
        </div>
      </div>

      <main style={{maxWidth:"1200px",margin:"0 auto",padding:"4rem 2rem"}}>

        {/* ══ EQUIPO — INSTRUCTORES ══ */}
        <section style={{marginBottom:"5rem"}}>
          <div style={{display:"flex",alignItems:"center",gap:"0.7rem",marginBottom:"0.8rem"}}>
            <div style={{width:"2.2rem",height:"3px",background:"#FFE600",borderRadius:"2px"}}></div>
            <span style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:"0.72rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#c9a800"}}>El equipo</span>
          </div>
          <h2 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(2rem,4vw,3.5rem)",letterSpacing:"0.04em",color:"#0d0d0d",marginBottom:"2.5rem"}}>
            Nuestros <span style={{color:"#c9a800"}}>instructores</span>
          </h2>

          {/* Grid de 5 instructores */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"2rem"}}>
            {team.map((m) => (
              <div key={m.num} className="team-card">
                <div className="team-photo-wrap">
                  <span className="team-num">{m.num}</span>
                  <Image
                    src={m.foto}
                    alt={m.alt}
                    width={400} height={500}
                    className="team-photo"
                    unoptimized
                  />
                  <span className="team-role-badge">{m.badge}</span>
                </div>
                <div className="team-info">
                  <div className="team-name">{m.name}</div>
                  <p className="team-acred">{m.acred}</p>
                  <p className="team-lic">{m.lic}</p>
                  <div className="team-links">
                    <a
                      href={m.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-link"
                      style={{background:"#25D366",color:"white"}}
                    >
                      📱 {m.waLabel}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── ANA CLAUDIA — tarjeta horizontal destacada ── */}
          <div className="psi-section-label">
            <div style={{width:"2.2rem",height:"3px",background:"#FFE600",borderRadius:"2px"}}></div>
            <span style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:"0.72rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#c9a800"}}>Equipo de apoyo</span>
          </div>

          <div className="ana-card">
            {/* Foto */}
            <div className="ana-photo-wrap">
              <Image
                src={ANA_FOTO}
                alt="Psicóloga Colaboradora"
                width={400} height={500}
                className="ana-photo"
                unoptimized
              />
              <span style={{
                position:"absolute", bottom:"1rem", left:"1rem",
                zIndex:3, background:"#FFE600", color:"#000",
                fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.85rem",
                letterSpacing:"0.12em", padding:"0.25rem 0.8rem", borderRadius:"2px"
              }}>🧘 Psicóloga Colaboradora</span>
            </div>
            {/* Info */}
            <div className="ana-info">
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"1.6rem",letterSpacing:"0.04em",color:"white",marginBottom:"0.4rem",lineHeight:1.1}}>
                Lic. Psic. Ana Claudia Martínez
              </div>
              <p style={{fontSize:"0.83rem",color:"rgba(255,255,255,0.5)",lineHeight:1.7,marginBottom:"0.5rem"}}>
                Egresada UCUDAL 2005 · Orientación en ansiedad, fobia y estrés al volante
              </p>
              <p style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.3)",fontStyle:"italic",marginBottom:"0.4rem"}}>
                Descuento en arancel para alumnos de la academia
              </p>
              <p style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.3)",fontStyle:"italic",marginBottom:"1.4rem"}}>
                Consultorio privado desde 2006 · Ministerio del Interior
              </p>
              <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
                <a href="https://www.facebook.com/amartinezeguren" target="_blank" rel="noopener noreferrer"
                  className="team-link" style={{background:"#1877F2",color:"white"}}>Facebook</a>
                <a href="https://www.consultoriopsicologico.wordpress.com" target="_blank" rel="noopener noreferrer"
                  className="team-link" style={{background:"#444",color:"white"}}>Sitio web</a>
              </div>
            </div>
          </div>
        </section>

        {/* ══ MISIÓN Y VISIÓN ══ */}
        <section style={{marginBottom:"4rem"}}>
          <div style={{display:"flex",alignItems:"center",gap:"0.7rem",marginBottom:"0.8rem"}}>
            <div style={{width:"2.2rem",height:"3px",background:"#FFE600",borderRadius:"2px"}}></div>
            <span style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:"0.72rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#c9a800"}}>Nuestra empresa</span>
          </div>
          <h2 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(2rem,4vw,3.5rem)",letterSpacing:"0.04em",color:"#0d0d0d",marginBottom:"2rem"}}>
            Misión <span style={{color:"#c9a800"}}>y visión</span>
          </h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem"}}>
            {[
              {icon:"🎯",titulo:"Misión",texto:"Formar conductores responsables a través de altos estándares de calidad, contribuyendo a un mejor nivel de manejo y responsabilidad en el tránsito, impartido por instructores calificados."},
              {icon:"👁️",titulo:"Visión",texto:"Cada día nos esforzamos por convertirnos en un referente en el sector de la formación de conductores, aumentando el compromiso que sentimos con la seguridad vial."},
            ].map((v,i)=>(
              <div key={i} style={{background:"white",border:"1px solid #ddd8cc",borderTop:"3px solid #FFE600",padding:"2rem 1.8rem",borderRadius:"4px"}}>
                <div style={{fontSize:"2.2rem",marginBottom:"0.8rem"}}>{v.icon}</div>
                <h3 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1.4rem",letterSpacing:"0.05em",color:"#0d0d0d",marginBottom:"0.5rem"}}>{v.titulo}</h3>
                <p style={{fontSize:"0.88rem",lineHeight:1.75,color:"#555"}}>{v.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ VALORES ══ */}
        <section style={{marginBottom:"4rem"}}>
          <h2 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(2rem,4vw,3.5rem)",letterSpacing:"0.04em",color:"#0d0d0d",marginBottom:"2rem"}}>
            Nuestros <span style={{color:"#c9a800"}}>valores</span>
          </h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1.2rem"}}>
            {[
              {icon:"👤",titulo:"Cliente",texto:"Analizamos las preferencias de cada aspirante para ajustar el proceso de enseñanza a sus necesidades individuales."},
              {icon:"⭐",titulo:"Calidad",texto:"Servicio superior a las expectativas del cliente, en búsqueda de su plena satisfacción en cada etapa."},
              {icon:"💡",titulo:"Innovación",texto:"Analizamos nuevas tecnologías y tendencias para adaptar y actualizar nuestro servicio continuamente."},
              {icon:"🎓",titulo:"Profesionalismo",texto:"Profesionales calificados con capacitación continua acorde a los mejores estándares de calidad."},
            ].map((v,i)=>(
              <div key={i} className="valor-card">
                <div style={{fontSize:"1.8rem",marginBottom:"0.7rem"}}>{v.icon}</div>
                <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1.1rem",letterSpacing:"0.06em",color:"#0d0d0d",marginBottom:"0.4rem"}}>{v.titulo}</div>
                <p style={{fontSize:"0.85rem",lineHeight:1.7,color:"#555"}}>{v.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ VEHÍCULOS ══ */}
        <section style={{marginBottom:"4rem"}}>
          <h2 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(2rem,4vw,3.5rem)",letterSpacing:"0.04em",color:"#0d0d0d",marginBottom:"2rem"}}>
            Nuestros <span style={{color:"#c9a800"}}>vehículos</span>
          </h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.5rem"}}>
            {[
              {emoji:"🚗",titulo:"Autos",cat:"Licencia Categoría A",modelo:<span style={{fontWeight:700,color:"#000"}}>Vehículos autorizados por la intendencia</span>,desc:"Registrado y habilitado en IDM como Coche Escuela. Cuenta con doble pedalera y señalización para prácticas en vía pública y examen práctico."},
              {emoji:"🏍️",titulo:"Motos",cat:"Licencia Categoría G2",modelo:<span style={{fontWeight:700,color:"#000"}}>Motos autorizados por la intendencia</span>,desc:"Habilitado para entrenamiento en pista La Loma — único lugar habilitado por IDM — y para la prueba práctica de obtención de licencia de motos."},
            ].map((v,i)=>(
              <div key={i} className="vehiculo-card">
                <div style={{fontSize:"2.5rem",marginBottom:"0.8rem"}}>{v.emoji}</div>
                <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1.3rem",letterSpacing:"0.05em",color:"#0d0d0d",marginBottom:"0.2rem"}}>{v.titulo}</div>
                <div style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:"0.75rem",letterSpacing:"0.12em",textTransform:"uppercase",color:"#c9a800",marginBottom:"0.3rem"}}>{v.cat}</div>
                <div style={{fontSize:"0.88rem",color:"#888",marginBottom:"0.8rem"}}>{v.modelo}</div>
                <p style={{fontSize:"0.87rem",lineHeight:1.7,color:"#555"}}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CTA ══ */}
        <div className="cta-section">
          <h2 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(2rem,4vw,3rem)",letterSpacing:"0.04em",color:"#000",marginBottom:"1.5rem"}}>
            ¿Listo para empezar con nosotros?
          </h2>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
            <a href={WA_AUTOS} target="_blank" rel="noopener noreferrer"
              style={{background:"#000",color:"#FFE600",padding:"1rem 2rem",fontFamily:"Bebas Neue,sans-serif",fontSize:"1rem",letterSpacing:"0.1em",textDecoration:"none",borderRadius:"3px",display:"inline-flex",alignItems:"center",gap:"0.5rem"}}>
              📱 Autos — 094 774 465
            </a>
            <a href={WA_MOTOS} target="_blank" rel="noopener noreferrer"
              style={{background:"#000",color:"#FFE600",padding:"1rem 2rem",fontFamily:"Bebas Neue,sans-serif",fontSize:"1rem",letterSpacing:"0.1em",textDecoration:"none",borderRadius:"3px",display:"inline-flex",alignItems:"center",gap:"0.5rem"}}>
              📱 Motos — 098 151 659
            </a>
          </div>
        </div>

      </main>

      {/* ── FOOTER ── */}
      <footer style={{background:"#0d0d0d",borderTop:"3px solid #FFE600",padding:"1.5rem 2rem",marginTop:"4rem"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
          <span style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.25)"}}>© 2025 Academia de Choferes Punta — Maldonado, Uruguay</span>
          <Link href="/" style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"0.9rem",letterSpacing:"0.1em",color:"#FFE600",textDecoration:"none"}}>← Volver al inicio</Link>
        </div>
      </footer>
    </>
  );
}
