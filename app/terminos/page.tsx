import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Términos de Uso",
  description: "Términos y condiciones de uso del sitio web de Academia de Choferes Punta, Maldonado, Uruguay.",
  robots: "noindex, follow",
};

const LOGO = "/logo.jpg";
const FECHA = "18 de marzo de 2025";
const EMPRESA = "Academia de Choferes Punta";
const DOMINIO = "academia-punta.vercel.app";
const EMAIL = "academiadechoferespunta@gmail.com";
const PAIS = "República Oriental del Uruguay";

export default function TerminosPage() {
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
            <Link href="/privacidad" style={navLink}>Privacidad</Link>
            <Link href="/aviso-legal" style={navLink}>Aviso Legal</Link>
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
            Términos <span style={{ color:"#FFE600" }}>de uso</span>
          </h1>
          <p style={{ marginTop:"1rem", fontSize:"0.85rem", color:"rgba(255,255,255,0.4)" }}>
            Última actualización: {FECHA}
          </p>
        </div>
      </div>

      {/* CONTENIDO */}
      <main style={{ maxWidth:"860px", margin:"0 auto", padding:"4rem 2rem" }}>
        <div style={{ lineHeight:1.85, fontSize:"0.93rem", color:"#3a3a3a" }}>

          <Section title="1. Identificación del titular">
            <p>El presente sitio web, accesible en <strong>{DOMINIO}</strong>, es titularidad de <strong>{EMPRESA}</strong>, academia de conducción registrada y habilitada ante la Intendencia de Maldonado (IDM), con actividad en Maldonado y Punta del Este, {PAIS}.</p>
            <p style={{marginTop:"0.8rem"}}>Contacto: <a href={`mailto:${EMAIL}`} style={{color:"#c9a800"}}>{EMAIL}</a></p>
          </Section>

          <Section title="2. Objeto y aceptación">
            <p>El acceso y uso de este sitio web implica la aceptación plena y sin reservas de los presentes Términos de Uso. Si no está de acuerdo con alguna de estas condiciones, le rogamos que no acceda ni utilice este sitio.</p>
            <p style={{marginTop:"0.8rem"}}>{EMPRESA} se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio.</p>
          </Section>

          <Section title="3. Descripción de los servicios">
            <p>A través de este sitio web, {EMPRESA} informa sobre los siguientes servicios:</p>
            <ul style={listStyle}>
              <li>Clases de manejo de autos y motocicletas</li>
              <li>Gestoría de trámites ante la Intendencia de Maldonado (IDM)</li>
              <li>Charlas de manejo defensivo</li>
              <li>Apoyo para la prueba teórica de conducción</li>
              <li>Apoyo psicológico para conductores en colaboración con profesional independiente</li>
              <li>Clases de manejo en idioma inglés</li>
            </ul>
            <p style={{marginTop:"0.8rem"}}>La contratación efectiva de servicios se realiza por vía telefónica o a través de WhatsApp. Este sitio tiene carácter informativo y no constituye por sí solo un contrato de prestación de servicios.</p>
          </Section>

          <Section title="4. Uso correcto del sitio">
            <p>El usuario se compromete a utilizar el sitio web de conformidad con la ley, la moral, las buenas costumbres y el orden público. Queda prohibido:</p>
            <ul style={listStyle}>
              <li>Reproducir, copiar, distribuir o comunicar públicamente el contenido del sitio sin autorización expresa</li>
              <li>Utilizar el sitio con fines fraudulentos, ilegales o contrarios a los presentes términos</li>
              <li>Introducir o difundir virus informáticos o cualquier otro sistema dañino</li>
              <li>Intentar acceder a secciones restringidas del sitio</li>
              <li>Suplantar la identidad de {EMPRESA} o de sus representantes</li>
            </ul>
          </Section>

          <Section title="5. Propiedad intelectual">
            <p>Todos los contenidos del sitio web — incluyendo textos, imágenes, fotografías, logotipos, diseño, código fuente y estructura — son propiedad de {EMPRESA} o de sus licenciantes, y están protegidos por la legislación uruguaya e internacional sobre propiedad intelectual.</p>
            <p style={{marginTop:"0.8rem"}}>Queda expresamente prohibida la reproducción total o parcial de los contenidos sin autorización escrita previa de {EMPRESA}.</p>
          </Section>

          <Section title="6. Responsabilidad">
            <p>{EMPRESA} no garantiza la disponibilidad continua e ininterrumpida del sitio web. Tampoco se responsabiliza por:</p>
            <ul style={listStyle}>
              <li>Daños derivados del uso o imposibilidad de uso del sitio</li>
              <li>Errores u omisiones en los contenidos</li>
              <li>La disponibilidad o contenido de sitios web de terceros enlazados</li>
              <li>Virus u otros elementos dañinos que pudieran afectar equipos informáticos</li>
            </ul>
          </Section>

          <Section title="7. Enlaces a terceros">
            <p>El sitio puede contener enlaces a sitios web de terceros (SUCIVE, IDM Maldonado, UNASEV, plataformas de redes sociales, WhatsApp) sobre los cuales {EMPRESA} no tiene control ni responsabilidad sobre su contenido, funcionamiento o política de privacidad.</p>
          </Section>

          <Section title="8. Legislación aplicable y jurisdicción">
            <p>Los presentes Términos de Uso se rigen por la legislación vigente en la {PAIS}. Para la resolución de cualquier controversia derivada del acceso o uso de este sitio, las partes se someten a la jurisdicción de los tribunales competentes de Maldonado, Uruguay, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.</p>
          </Section>

          <Section title="9. Contacto">
            <p>Para cualquier consulta sobre estos Términos de Uso, puede contactarnos en:</p>
            <ul style={listStyle}>
              <li>Email: <a href={`mailto:${EMAIL}`} style={{color:"#c9a800"}}>{EMAIL}</a></li>
              <li>WhatsApp Autos: <a href="https://api.whatsapp.com/send?phone=59894774465" style={{color:"#c9a800"}}>094 774 465</a></li>
              <li>WhatsApp Motos: <a href="https://api.whatsapp.com/send?phone=59898151659" style={{color:"#c9a800"}}>098 151 659</a></li>
            </ul>
          </Section>

        </div>

        {/* Links otras páginas legales */}
        <div style={{ marginTop:"3rem", padding:"2rem", background:"white", border:"1px solid #ddd8cc", borderTop:"3px solid #FFE600", borderRadius:"4px" }}>
          <p style={{ fontFamily:"Bebas Neue,sans-serif", fontSize:"1rem", letterSpacing:"0.06em", color:"#0d0d0d", marginBottom:"1rem" }}>Ver también</p>
          <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
            <Link href="/privacidad" style={legalBtn}>Política de Privacidad →</Link>
            <Link href="/aviso-legal" style={legalBtn}>Aviso Legal →</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ── COMPONENTES AUXILIARES ── */
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
          <Link href="/terminos"   style={footerLink}>Términos de Uso</Link>
          <Link href="/privacidad" style={footerLink}>Privacidad</Link>
          <Link href="/aviso-legal" style={footerLink}>Aviso Legal</Link>
        </div>
        <Link href="/" style={{ fontFamily:"Bebas Neue,sans-serif", fontSize:"0.9rem", letterSpacing:"0.1em", color:"#FFE600", textDecoration:"none" }}>← Volver al inicio</Link>
      </div>
    </footer>
  );
}

const listStyle: React.CSSProperties = { paddingLeft:"1.5rem", marginTop:"0.6rem", marginBottom:"0.4rem", lineHeight:2 };
const legalBtn: React.CSSProperties = { background:"#0d0d0d", color:"#FFE600", padding:"0.6rem 1.2rem", fontFamily:"Bebas Neue,sans-serif", fontSize:"0.88rem", letterSpacing:"0.1em", textDecoration:"none", borderRadius:"3px" };
const footerLink: React.CSSProperties = { fontSize:"0.75rem", color:"rgba(255,255,255,0.35)", textDecoration:"none", fontFamily:"Barlow Condensed,sans-serif", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" };
