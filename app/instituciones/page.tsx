import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Instituciones de Aptitud Física — Academia de Choferes Punta",
  description: "Lista completa de instituciones autorizadas para realizar el certificado de aptitud física requerido para obtener la licencia de conducir en Maldonado, Uruguay.",
};

const LOGO = "/logo.jpg";

const instituciones = [
  { nombre:"Asistencial Médica",         lugares:["Aiguá","Gregorio Aznárez","La Barra","Pan de Azúcar","Piriápolis","Punta del Este"] },
  { nombre:"Asociación Española",         lugares:["Maldonado","Piriápolis"] },
  { nombre:"Bioeste",                     lugares:["Maldonado","San Carlos"] },
  { nombre:"Cardiomóvil",                 lugares:["Maldonado"] },
  { nombre:"CASMU",                       lugares:["Maldonado"] },
  { nombre:"Círculo Católico",            lugares:["Maldonado","Piriápolis"] },
  { nombre:"Clínica Camino de los Gauchos",lugares:["Maldonado"] },
  { nombre:"Clínica Punta del Este",      lugares:["Punta del Este"] },
  { nombre:"Clínica San Fernando",        lugares:["Maldonado"] },
  { nombre:"Hemocentro",                  lugares:["Banco de Sangre de Maldonado"] },
  { nombre:"Laboratorio AguaLab",         lugares:["Maldonado"] },
  { nombre:"Laboratorio Cavica",          lugares:["Maldonado"] },
  { nombre:"Sanatorio SEMM Mautone",      lugares:["Aiguá","Maldonado","Pan de Azúcar","Piriápolis"] },
];

export default function InstitucionesPage() {
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
            <Link href="/#guia"       style={navLinkStyle}>Guía</Link>
            <Link href="/#servicios"  style={navLinkStyle}>Servicios</Link>
            <Link href="/nosotros"    style={navLinkStyle}>Nosotros</Link>
            <Link href="/#contacto" style={{background:"#FFE600",color:"#000",padding:"0.5rem 1.3rem",fontFamily:"Bebas Neue,sans-serif",fontSize:"0.95rem",letterSpacing:"0.1em",textDecoration:"none",borderRadius:"2px",whiteSpace:"nowrap"}}>
              Contacto →
            </Link>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <div style={{background:"#0d0d0d",padding:"5rem 2rem 4rem",borderBottom:"3px solid #FFE600",position:"relative",overflow:"hidden"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",position:"relative",zIndex:1}}>
          <Link href="/#guia" style={{display:"inline-flex",alignItems:"center",gap:"0.4rem",color:"rgba(255,255,255,0.4)",textDecoration:"none",fontFamily:"Barlow Condensed,sans-serif",fontSize:"0.78rem",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"1.5rem"}}>
            ← Volver a la guía
          </Link>
          <div style={{display:"flex",alignItems:"center",gap:"0.7rem",marginBottom:"0.8rem"}}>
            <div style={{width:"2.2rem",height:"3px",background:"#FFE600",borderRadius:"2px"}}></div>
            <span style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:"0.72rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#FFE600"}}>Paso 4 de la guía</span>
          </div>
          <h1 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(2.5rem,6vw,5.5rem)",letterSpacing:"0.03em",color:"white",lineHeight:0.95}}>
            Certificado de <br/><span style={{color:"#FFE600"}}>aptitud física</span>
          </h1>
          <p style={{marginTop:"1.2rem",fontSize:"1rem",color:"rgba(255,255,255,0.55)",maxWidth:"540px",lineHeight:1.75}}>
            Instituciones autorizadas para realizar el examen médico requerido para obtener tu licencia de conducir en Maldonado.
          </p>
        </div>
      </div>

      <main style={{maxWidth:"1200px",margin:"0 auto",padding:"4rem 2rem"}}>

        {/* AVISO */}
        <div style={{background:"#fff3cd",border:"1px solid #ffc107",borderLeft:"4px solid #e53935",padding:"1.2rem 1.5rem",borderRadius:"0 4px 4px 0",marginBottom:"3rem",display:"flex",alignItems:"flex-start",gap:"0.8rem"}}>
          <span style={{fontSize:"1.5rem",flexShrink:0}}>⚠️</span>
          <div>
            <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1.1rem",letterSpacing:"0.05em",color:"#c62828",marginBottom:"0.3rem"}}>Atención importante</div>
            <p style={{fontSize:"0.88rem",color:"#555",lineHeight:1.6}}>
              El carnet de salud <strong>NO es válido</strong> para el certificado de aptitud física. Debés concurrir específicamente a una de las instituciones autorizadas listadas abajo.
            </p>
          </div>
        </div>

        {/* LISTA */}
        <section style={{marginBottom:"4rem"}}>
          <h2 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",letterSpacing:"0.04em",color:"#0d0d0d",marginBottom:"0.5rem"}}>
            Instituciones <span style={{color:"#c9a800"}}>autorizadas</span>
          </h2>
          <p style={{fontSize:"0.88rem",color:"#888",marginBottom:"1.8rem"}}>{instituciones.length} instituciones habilitadas por IDM Maldonado</p>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1rem"}}>
            {instituciones.map((inst,i)=>(
              <div key={i} style={{background:"white",border:"1px solid #ddd8cc",borderLeft:"4px solid #FFE600",padding:"1.2rem 1.4rem",borderRadius:"0 4px 4px 0",transition:"box-shadow 0.2s"}}>
                <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.5rem"}}>
                  <span style={{fontSize:"1.2rem"}}>🏥</span>
                  <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1rem",letterSpacing:"0.04em",color:"#0d0d0d"}}>{inst.nombre}</div>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:"0.4rem"}}>
                  {inst.lugares.map((lugar,j)=>(
                    <span key={j} style={{background:"#f4f2ec",color:"#555",padding:"0.2rem 0.6rem",fontSize:"0.75rem",borderRadius:"2px",fontFamily:"Barlow Condensed,sans-serif",fontWeight:600,letterSpacing:"0.06em"}}>
                      📍 {lugar}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INFO EXTRA */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1.2rem",marginBottom:"4rem"}}>
          {[
            {icon:"📋",titulo:"¿Qué llevar?",texto:"Presentate con tu documento de identidad. El médico evaluará tu aptitud física general para conducir."},
            {icon:"⏱️",titulo:"¿Cuándo hacerlo?",texto:"Se realiza luego de la charla de manejo defensivo y antes de la prueba práctica. Academia Punta coordina las fechas."},
            {icon:"✅",titulo:"¿Qué evalúan?",texto:"Visión, audición, capacidad de reacción y aptitud física general. El proceso es rápido y sencillo."},
          ].map((c,i)=>(
            <div key={i} style={{background:"#0d0d0d",border:"1px solid #222",padding:"1.5rem",borderRadius:"4px",borderTop:"3px solid #FFE600"}}>
              <div style={{fontSize:"1.8rem",marginBottom:"0.6rem"}}>{c.icon}</div>
              <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1.1rem",letterSpacing:"0.05em",color:"#FFE600",marginBottom:"0.4rem"}}>{c.titulo}</div>
              <p style={{fontSize:"0.85rem",lineHeight:1.7,color:"rgba(255,255,255,0.55)"}}>{c.texto}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{background:"#FFE600",padding:"2.5rem 2rem",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1.5rem"}}>
          <div>
            <h2 style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1.8rem",letterSpacing:"0.04em",color:"#000",marginBottom:"0.3rem"}}>
              ¿Tenés dudas sobre el proceso?
            </h2>
            <p style={{fontSize:"0.88rem",color:"rgba(0,0,0,0.6)"}}>Academia Punta coordina todos los trámites por vos.</p>
          </div>
          <a href="https://api.whatsapp.com/send?phone=59894774465&text=Tengo%20dudas%20sobre%20el%20certificado%20de%20aptitud%20f%C3%ADsica." target="_blank" rel="noopener noreferrer"
            style={{background:"#000",color:"#FFE600",padding:"1rem 2rem",fontFamily:"Bebas Neue,sans-serif",fontSize:"1rem",letterSpacing:"0.1em",textDecoration:"none",borderRadius:"3px",whiteSpace:"nowrap"}}>
            📱 Consultar por WhatsApp
          </a>
        </div>

      </main>

      {/* FOOTER */}
      <footer style={{background:"#0d0d0d",borderTop:"3px solid #FFE600",padding:"1.5rem 2rem"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
          <span style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.25)"}}>© 2025 Academia de Choferes Punta — Maldonado, Uruguay</span>
          <Link href="/" style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"0.9rem",letterSpacing:"0.1em",color:"#FFE600",textDecoration:"none"}}>← Volver al inicio</Link>
        </div>
      </footer>

    </div>
  );
}
