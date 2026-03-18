import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Quiénes Somos — Academia de Choferes Punta",
  description: "Conocé al equipo de Academia Punta. Instructores certificados por UNASEV con más de 15 años formando conductores en Maldonado, Uruguay.",
};

const LOGO = "https://academiadechoferespunta.com.uy/wp-content/uploads/2022/04/ICONO-circle-cropped-g.png";

export default function NosotrosPage() {
  const navLinkStyle = {
    fontFamily:"Barlow Condensed,sans-serif", fontWeight:600 as const, fontSize:"0.8rem",
    letterSpacing:"0.12em", textTransform:"uppercase" as const,
    color:"rgba(255,255,255,0.65)", textDecoration:"none", whiteSpace:"nowrap" as const,
  };

  return (
    <div style={{fontFamily:"Barlow,sans-serif",fontWeight:300,background:"#fafaf7",color:"#2a2a2a",minHeight:"100vh"}}>

      {/* NAV */}
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

      {/* HEADER OSCURO */}
      <div style={{background:"#0d0d0d",padding:"5rem 2rem 4rem",borderBottom:"3px solid #FFE600",position:"relative",overflow:"hidden"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",position:"relative",zIndex:1}}>
          <Link href="/" style={{display:"inline-flex",alignItems:"center",gap:"0.4rem",color:"rgba(255,255,255,0.4)",textDecoration:"none",fontFamily:"Barlow Condensed,sans-serif",fontSize:"0.78rem",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"1.5rem"}}>
            ← Volver al inicio
          </Link>
          <div style={{display:"flex",alignItems:"center",gap:"0.7rem",marginBottom:"0.8rem"}}>
            <div style={{width:"2.2rem",height:"3px",background:"#FFE600",borderRadius:"2px"}}></div>
            <span style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:"0.72rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#FFE600"}}>Conocenos</span>
          </div>
          <h1 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(3rem,7vw,6rem)",letterSpacing:"0.03em",color:"white",lineHeight:0.95}}>
            Quiénes <br/><span style={{color:"#FFE600"}}>somos</span>
          </h1>
          <p style={{marginTop:"1.2rem",fontSize:"1rem",color:"rgba(255,255,255,0.55)",maxWidth:"480px",lineHeight:1.75}}>
            Más de 15 años formando conductores responsables en Punta del Este y Maldonado, Uruguay.
          </p>
        </div>
      </div>

      <main style={{maxWidth:"1200px",margin:"0 auto",padding:"4rem 2rem"}}>

        {/* MISIÓN Y VISIÓN */}
        <section style={{marginBottom:"4rem"}}>
          <h2 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",letterSpacing:"0.04em",color:"#0d0d0d",marginBottom:"1.5rem"}}>
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

        {/* VALORES */}
        <section style={{marginBottom:"4rem"}}>
          <h2 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",letterSpacing:"0.04em",color:"#0d0d0d",marginBottom:"1.5rem"}}>
            Nuestros <span style={{color:"#c9a800"}}>valores</span>
          </h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1.2rem"}}>
            {[
              {icon:"👤",titulo:"Cliente",texto:"Analizamos las preferencias de cada aspirante para ajustar el proceso de enseñanza a sus necesidades individuales."},
              {icon:"⭐",titulo:"Calidad",texto:"Servicio superior a las expectativas del cliente, en búsqueda de su plena satisfacción en cada etapa."},
              {icon:"💡",titulo:"Innovación",texto:"Analizamos nuevas tecnologías y tendencias para adaptar y actualizar nuestro servicio continuamente."},
              {icon:"🎓",titulo:"Profesionalismo",texto:"Profesionales calificados con capacitación continua acorde a los mejores estándares de calidad."},
            ].map((v,i)=>(
              <div key={i} style={{background:"white",border:"1px solid #ddd8cc",borderLeft:"3px solid #FFE600",padding:"1.5rem",borderRadius:"0 4px 4px 0"}}>
                <div style={{fontSize:"1.8rem",marginBottom:"0.7rem"}}>{v.icon}</div>
                <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1.1rem",letterSpacing:"0.06em",color:"#0d0d0d",marginBottom:"0.4rem"}}>{v.titulo}</div>
                <p style={{fontSize:"0.85rem",lineHeight:1.7,color:"#555"}}>{v.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EQUIPO */}
        <section style={{marginBottom:"4rem"}}>
          <h2 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",letterSpacing:"0.04em",color:"#0d0d0d",marginBottom:"1.5rem"}}>
            Nuestro <span style={{color:"#c9a800"}}>equipo</span>
          </h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.5rem"}}>
            {[
              {emoji:"🚗",nombre:"Darío Agesta Catania",rol:"Instructor de Autos",acred:"Acreditado por UNASEV — Curso de Instructores de Academias de Conducir",lic:"Licencias: Cat. E · Cat. F · Cat. G3",fb:"https://www.facebook.com/dario.agesta",ig:"https://www.instagram.com/darioagestarun/"},
              {emoji:"🏍️",nombre:"Fernando Agesta Catania",rol:"Instructor de Motos",acred:"Instructor de manejo · Maestro en Educación Primaria",lic:"Licencias: Cat. E · Cat. B · Cat. G3",fb:"https://www.facebook.com/NanoAgesta6",ig:"https://www.instagram.com/nanoagesta/"},
              {emoji:"🧘",nombre:"Lic. Psic. Ana Claudia Martínez",rol:"Psicóloga Colaboradora",acred:"Egresada UCUDAL 2005 · Orientación en ansiedad, fobia y estrés al volante",lic:"Descuento en aranceles para alumnos de la academia",fb:"https://www.facebook.com/amartinezeguren",web:"https://www.consultoriopsicologico.wordpress.com"},
            ].map((p,i)=>(
              <div key={i} style={{background:"#0d0d0d",border:"1px solid #222",borderTop:"3px solid #FFE600",padding:"2.2rem 2rem",borderRadius:"4px"}}>
                <div style={{fontSize:"2.8rem",marginBottom:"1rem"}}>{p.emoji}</div>
                <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1.4rem",letterSpacing:"0.04em",color:"white",marginBottom:"0.2rem"}}>{p.nombre}</div>
                <div style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:"0.78rem",letterSpacing:"0.15em",textTransform:"uppercase",color:"#FFE600",marginBottom:"0.8rem"}}>{p.rol}</div>
                <p style={{fontSize:"0.86rem",lineHeight:1.7,color:"rgba(255,255,255,0.6)",marginBottom:"0.4rem"}}>{p.acred}</p>
                <p style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.35)",marginBottom:"1.2rem",fontStyle:"italic"}}>{p.lic}</p>
                <div style={{display:"flex",gap:"0.6rem",flexWrap:"wrap"}}>
                  {p.fb && <a href={p.fb} target="_blank" rel="noopener noreferrer" style={{background:"#1877F2",color:"white",padding:"0.4rem 0.9rem",fontFamily:"Bebas Neue,sans-serif",fontSize:"0.85rem",letterSpacing:"0.08em",textDecoration:"none",borderRadius:"3px"}}>Facebook</a>}
                  {p.ig && <a href={p.ig} target="_blank" rel="noopener noreferrer" style={{background:"#dc2743",color:"white",padding:"0.4rem 0.9rem",fontFamily:"Bebas Neue,sans-serif",fontSize:"0.85rem",letterSpacing:"0.08em",textDecoration:"none",borderRadius:"3px"}}>Instagram</a>}
                  {p.web && <a href={p.web} target="_blank" rel="noopener noreferrer" style={{background:"#444",color:"white",padding:"0.4rem 0.9rem",fontFamily:"Bebas Neue,sans-serif",fontSize:"0.85rem",letterSpacing:"0.08em",textDecoration:"none",borderRadius:"3px"}}>Sitio web</a>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VEHÍCULOS */}
        <section style={{marginBottom:"4rem"}}>
          <h2 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",letterSpacing:"0.04em",color:"#0d0d0d",marginBottom:"1.5rem"}}>
            Nuestros <span style={{color:"#c9a800"}}>vehículos</span>
          </h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.5rem"}}>
            {[
              {emoji:"🚗",titulo:"Autos",cat:"Licencia Categoría A",modelo:"Chevrolet Onix RS Turbo (2022)",desc:"Registrado y habilitado en IDM como Coche Escuela. Cuenta con doble pedalera y señalización para prácticas en vía pública y examen práctico."},
              {emoji:"🏍️",titulo:"Motos",cat:"Licencia Categoría G2",modelo:"BMW G310 / Honda Wave 110cc",desc:"Habilitado para entrenamiento en pista La Loma — único lugar habilitado por IDM — y para la prueba práctica de obtención de licencia de motos."},
            ].map((v,i)=>(
              <div key={i} style={{background:"white",border:"1px solid #ddd8cc",borderTop:"3px solid #FFE600",padding:"2rem",borderRadius:"4px"}}>
                <div style={{fontSize:"2.5rem",marginBottom:"0.8rem"}}>{v.emoji}</div>
                <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1.3rem",letterSpacing:"0.05em",color:"#0d0d0d",marginBottom:"0.2rem"}}>{v.titulo}</div>
                <div style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:"0.75rem",letterSpacing:"0.12em",textTransform:"uppercase",color:"#c9a800",marginBottom:"0.3rem"}}>{v.cat}</div>
                <div style={{fontSize:"0.88rem",color:"#888",marginBottom:"0.8rem"}}>{v.modelo}</div>
                <p style={{fontSize:"0.87rem",lineHeight:1.7,color:"#555"}}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{background:"#FFE600",padding:"3rem 2rem",borderRadius:"4px",textAlign:"center"}}>
          <h2 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(2rem,4vw,3rem)",letterSpacing:"0.04em",color:"#000",marginBottom:"1.5rem"}}>
            ¿Listo para empezar con nosotros?
          </h2>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
            <a href="https://api.whatsapp.com/send?phone=59894774465&text=Quiero%20empezar%20ahora." target="_blank" rel="noopener noreferrer"
              style={{background:"#000",color:"#FFE600",padding:"1rem 2rem",fontFamily:"Bebas Neue,sans-serif",fontSize:"1rem",letterSpacing:"0.1em",textDecoration:"none",borderRadius:"3px"}}>
              📱 Autos — 094 774 465
            </a>
            <a href="https://api.whatsapp.com/send?phone=59898151659&text=Quiero%20empezar%20ahora." target="_blank" rel="noopener noreferrer"
              style={{background:"#000",color:"#FFE600",padding:"1rem 2rem",fontFamily:"Bebas Neue,sans-serif",fontSize:"1rem",letterSpacing:"0.1em",textDecoration:"none",borderRadius:"3px"}}>
              📱 Motos — 098 151 659
            </a>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer style={{background:"#0d0d0d",borderTop:"3px solid #FFE600",padding:"1.5rem 2rem"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
          <span style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.25)"}}>© 2025 Academia de Choferes Punta</span>
          <Link href="/" style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"0.9rem",letterSpacing:"0.1em",color:"#FFE600",textDecoration:"none"}}>← Volver al inicio</Link>
        </div>
      </footer>

    </div>
  );
}
