import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Aviso legal e información corporativa de Academia de Choferes Punta, Maldonado, Uruguay.",
  robots: "noindex, follow",
};

const LOGO = "/logo.jpg";
const FECHA = "18 de marzo de 2025";
const EMPRESA = "Academia de Choferes Punta";
const DOMINIO = "academia-punta.vercel.app";
const EMAIL = "academiadechoferespunta@gmail.com";
const PAIS = "República Oriental del Uruguay";

export default function AvisoLegalPage() {
  const navLink = { fontFamily:"Barlow Condensed,sans-serif", fontWeight:600 as const, fontSize:"0.8rem", letterSpacing:"0.12em", textTransform:"uppercase" as const, color:"rgba(255,255,255,0.65)", textDecoration:"none", whiteSpace:"nowrap" as const };

  return (
    <div style={{ fontFamily:"Barlow,sans-serif", fontWeight:300, background:"#fafaf7", color:"#2a2a2a", minHeight:"100vh" }}>

      {/* NAV */}
      <nav style={{ background:"rgba(13,13,13,0.98)", borderBottom:"2px solid #FFE600", padding:"0.9rem 2rem", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem", flexWrap:"wrap" }}>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:"0.6rem", textDecoration:"none", flexShrink:0 }}>
            <Image src={LOGO} alt="Academia Punta" width={40} height={40} unoptimized style={{ objectFit:"contain", borderRadius:"50%" }}/>
            <span style={{ fontFamily:"Bebas Neue,sans-serif", fontSize:"1.1rem", letterSpacing:"0.1em", color:"white", whiteSpace:"nowrap" }}>
              Academia <span style={{ color:"#FFE600" }}>Punta</span>
            </span>
          </Link>
          <div style={{ display:"flex", gap:"1.5rem", alignItems:"center" }}>
            <Link href="/" style={navLink}>← Inicio</Link>
            <Link href="/terminos" style={navLink}>Términos</Link>
            <Link href="/privacidad" style={navLink}>Privacidad</Link>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <div style={{ background:"#0d0d0d", padding:"4rem 2rem 3rem", borderBottom:"3px solid #FFE600" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"0.8rem" }}>
            <div style={{ width:"2.2rem", height:"3px", background:"#FFE600", borderRadius:"2px" }}></div>
            <span style={{ fontFamily:"Barlow Condensed,sans-serif", fontWeight:700, fontSize:"0.72rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"#FFE600" }}>Legal</span>
          </div>
          <h1 style={{ fontFamily:"Bebas Neue,sans-serif", fontSize:"clamp(2.5rem,6vw,5rem)", letterSpacing:"0.03em", color:"white", lineHeight:0.95 }}>
            Aviso <span style={{ color:"#FFE600" }}>legal</span>
          </h1>
          <p style={{ marginTop:"1rem", fontSize:"0.85rem", color:"rgba(255,255,255,0.4)" }}>
            Última actualización: {FECHA}
          </p>
        </div>
      </div>

      {/* CONTENIDO */}
      <main style={{ maxWidth:"860px", margin:"0 auto", padding:"4rem 2rem" }}>
        <div style={{ lineHeight:1.85, fontSize:"0.93rem", color:"#3a3a3a" }}>

          <Section title="1. Datos identificativos del titular">
            <table style={tableStyle}>
              <tbody>
                <tr><td style={tdLabel}>Denominación</td><td style={tdValue}>{EMPRESA}</td></tr>
                <tr><td style={tdLabel}>Actividad</td><td style={tdValue}>Academia de conducción habilitada — Maldonado, Uruguay</td></tr>
                <tr><td style={tdLabel}>País</td><td style={tdValue}>{PAIS}</td></tr>
                <tr><td style={tdLabel}>Departamento</td><td style={tdValue}>Maldonado</td></tr>
                <tr><td style={tdLabel}>Zona de actividad</td><td style={tdValue}>Maldonado, Punta del Este y alrededores</td></tr>
                <tr><td style={tdLabel}>Email</td><td style={tdValue}><a href={`mailto:${EMAIL}`} style={{color:"#c9a800"}}>{EMAIL}</a></td></tr>
                <tr><td style={tdLabel}>WhatsApp Autos</td><td style={tdValue}><a href="https://api.whatsapp.com/send?phone=59894774465" style={{color:"#c9a800"}}>+598 94 774 465</a></td></tr>
                <tr><td style={tdLabel}>WhatsApp Motos</td><td style={tdValue}><a href="https://api.whatsapp.com/send?phone=59898151659" style={{color:"#c9a800"}}>+598 98 151 659</a></td></tr>
                <tr><td style={tdLabel}>Sitio web</td><td style={tdValue}><a href={`https://${DOMINIO}`} style={{color:"#c9a800"}}>{DOMINIO}</a></td></tr>
                <tr><td style={tdLabel}>Instagram</td><td style={tdValue}><a href="https://www.instagram.com/academiadechoferespunta/" target="_blank" rel="noopener noreferrer" style={{color:"#c9a800"}}>@academiadechoferespunta</a></td></tr>
              </tbody>
            </table>
          </Section>

          <Section title="2. Objeto del aviso legal">
            <p>El presente Aviso Legal regula el acceso y uso del sitio web <strong>{DOMINIO}</strong>, titularidad de <strong>{EMPRESA}</strong>. El acceso y navegación por este sitio implica la aceptación expresa y plena de las condiciones aquí establecidas.</p>
          </Section>

          <Section title="3. Habilitaciones y registro">
            <p>{EMPRESA} opera como academia de conducción debidamente registrada y habilitada ante la <strong>Intendencia de Maldonado (IDM)</strong> para la enseñanza de conducción de vehículos automotores.</p>
            <p style={{marginTop:"0.8rem"}}>Los vehículos utilizados en las prácticas (autos y motos) se encuentran debidamente registrados y habilitados como coches escuela ante la IDM, cumpliendo con todas las exigencias legales vigentes (doble pedalera, señalización).</p>
            <p style={{marginTop:"0.8rem"}}>Los instructores poseen las licencias de conducir habilitantes y la acreditación de la <strong>UNASEV (Unidad Nacional de Seguridad Vial)</strong> como instructores de academias de conducir.</p>
          </Section>

          <Section title="4. Propiedad intelectual e industrial">
            <p>Todos los contenidos del sitio web, incluyendo sin carácter limitativo: textos, fotografías, imágenes, logotipos, iconos, código de programación, diseño gráfico y estructura de navegación, son propiedad exclusiva de {EMPRESA} o se encuentran debidamente licenciados.</p>
            <p style={{marginTop:"0.8rem"}}>Queda estrictamente prohibida su reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación, total o parcial, sin la autorización expresa y por escrito de {EMPRESA}.</p>
            <p style={{marginTop:"0.8rem"}}>La marca <strong>ACADEMIA DE CHOFERES PUNTA ®</strong> y el logotipo asociado son marcas registradas. Su uso no autorizado constituye una infracción de los derechos de propiedad industrial.</p>
          </Section>

          <Section title="5. Condiciones de uso del sitio web">
            <p>El usuario se compromete a hacer un uso adecuado del sitio web y de sus contenidos, sin emplearlos para:</p>
            <ul style={listStyle}>
              <li>Actividades ilícitas, ilegales o contrarias a la buena fe y al orden público</li>
              <li>Difundir contenidos racistas, xenófobos, pornográficos, de apología del terrorismo o atentatorios contra los derechos humanos</li>
              <li>Provocar daños en los sistemas físicos y lógicos de {EMPRESA} o de terceros</li>
              <li>Recopilar datos con finalidad publicitaria y enviar publicidad de cualquier clase sin previa solicitud o consentimiento</li>
            </ul>
          </Section>

          <Section title="6. Exclusión de garantías y responsabilidad">
            <p>{EMPRESA} no otorga ninguna garantía ni se hace responsable de los daños y perjuicios de cualquier naturaleza que pudieran traer causa de:</p>
            <ul style={listStyle}>
              <li>La falta de disponibilidad, mantenimiento y efectivo funcionamiento del sitio o de sus servicios y contenidos</li>
              <li>La existencia de virus, programas maliciosos o lesivos en los contenidos</li>
              <li>El uso ilícito, negligente, fraudulento o contrario al presente Aviso Legal</li>
              <li>La falta de licitud, calidad, fiabilidad, utilidad y disponibilidad de los servicios prestados por terceros y puestos a disposición en el sitio</li>
            </ul>
          </Section>

          <Section title="7. Política de enlaces">
            <p>El sitio web puede contener enlaces a sitios de terceros. {EMPRESA} no asume responsabilidad alguna sobre los contenidos, informaciones, comunicaciones, opiniones o servicios proporcionados por los sitios enlazados, ni garantiza la ausencia de virus u otros elementos lesivos.</p>
            <p style={{marginTop:"0.8rem"}}>La inclusión de un enlace no implica que {EMPRESA} avale, promueva, garantice o recomiende los sitios web enlazados o sus contenidos.</p>
          </Section>

          <Section title="8. Legislación aplicable y fuero">
            <p>El presente Aviso Legal se rige en su totalidad por la legislación vigente en la {PAIS}. Para la resolución de cualquier controversia derivada del acceso o uso del sitio, las partes, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, se someten a la jurisdicción de los Juzgados y Tribunales del departamento de <strong>Maldonado, Uruguay</strong>.</p>
          </Section>

          <Section title="9. Modificaciones">
            <p>{EMPRESA} se reserva el derecho a realizar, en cualquier momento y sin necesidad de previo aviso, modificaciones y actualizaciones del presente Aviso Legal. El usuario deberá leer atentamente este Aviso Legal cada vez que acceda al sitio web, ya que éste puede haber sido modificado.</p>
          </Section>

        </div>

        <div style={{ marginTop:"3rem", padding:"2rem", background:"white", border:"1px solid #ddd8cc", borderTop:"3px solid #FFE600", borderRadius:"4px" }}>
          <p style={{ fontFamily:"Bebas Neue,sans-serif", fontSize:"1rem", letterSpacing:"0.06em", color:"#0d0d0d", marginBottom:"1rem" }}>Ver también</p>
          <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
            <Link href="/terminos"   style={legalBtn}>Términos de Uso →</Link>
            <Link href="/privacidad" style={legalBtn}>Política de Privacidad →</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom:"2.5rem" }}>
      <h2 style={{ fontFamily:"Bebas Neue,sans-serif", fontSize:"1.3rem", letterSpacing:"0.05em", color:"#0d0d0d", marginBottom:"0.8rem", paddingBottom:"0.5rem", borderBottom:"2px solid #FFE600", display:"inline-block" }}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:"#0d0d0d", borderTop:"3px solid #FFE600", padding:"1.5rem 2rem", marginTop:"4rem" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
        <div style={{ display:"flex", gap:"1.5rem", flexWrap:"wrap" }}>
          <Link href="/terminos"    style={footerLink}>Términos de Uso</Link>
          <Link href="/privacidad"  style={footerLink}>Privacidad</Link>
          <Link href="/aviso-legal" style={footerLink}>Aviso Legal</Link>
        </div>
        <Link href="/" style={{ fontFamily:"Bebas Neue,sans-serif", fontSize:"0.9rem", letterSpacing:"0.1em", color:"#FFE600", textDecoration:"none" }}>← Volver al inicio</Link>
      </div>
    </footer>
  );
}

const listStyle: React.CSSProperties  = { paddingLeft:"1.5rem", marginTop:"0.6rem", marginBottom:"0.4rem", lineHeight:2 };
const legalBtn: React.CSSProperties   = { background:"#0d0d0d", color:"#FFE600", padding:"0.6rem 1.2rem", fontFamily:"Bebas Neue,sans-serif", fontSize:"0.88rem", letterSpacing:"0.1em", textDecoration:"none", borderRadius:"3px" };
const footerLink: React.CSSProperties = { fontSize:"0.75rem", color:"rgba(255,255,255,0.35)", textDecoration:"none", fontFamily:"Barlow Condensed,sans-serif", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" };
const tableStyle: React.CSSProperties = { width:"100%", borderCollapse:"collapse", marginTop:"0.5rem" };
const tdLabel: React.CSSProperties    = { padding:"0.6rem 1rem 0.6rem 0", fontFamily:"Barlow Condensed,sans-serif", fontWeight:700, fontSize:"0.82rem", letterSpacing:"0.06em", color:"#888", textTransform:"uppercase", whiteSpace:"nowrap", verticalAlign:"top", width:"35%" };
const tdValue: React.CSSProperties    = { padding:"0.6rem 0", borderBottom:"1px solid #eae6de", fontSize:"0.88rem", color:"#2a2a2a" };
