import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad y protección de datos de Academia de Choferes Punta, conforme a la Ley 18.331 de Uruguay.",
  robots: "noindex, follow",
};

const LOGO = "/logo.jpg";
const FECHA = "18 de marzo de 2025";
const EMPRESA = "Academia de Choferes Punta";
const DOMINIO = "academia-punta.vercel.app";
const EMAIL = "academiadechoferespunta@gmail.com";

export default function PrivacidadPage() {
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
            Política de <span style={{ color:"#FFE600" }}>privacidad</span>
          </h1>
          <p style={{ marginTop:"1rem", fontSize:"0.85rem", color:"rgba(255,255,255,0.4)" }}>
            Última actualización: {FECHA} · Conforme a la Ley N° 18.331 de Uruguay
          </p>
        </div>
      </div>

      {/* CONTENIDO */}
      <main style={{ maxWidth:"860px", margin:"0 auto", padding:"4rem 2rem" }}>

        {/* Aviso destacado Ley 18.331 */}
        <div style={{ background:"#fff9e6", border:"1px solid #FFE600", borderLeft:"4px solid #FFE600", padding:"1.2rem 1.5rem", borderRadius:"0 4px 4px 0", marginBottom:"2.5rem" }}>
          <p style={{ fontFamily:"Bebas Neue,sans-serif", fontSize:"0.95rem", letterSpacing:"0.05em", color:"#0d0d0d", marginBottom:"0.3rem" }}>🛡️ Marco legal aplicable</p>
          <p style={{ fontSize:"0.85rem", color:"#555", lineHeight:1.7 }}>
            Esta política se rige por la <strong>Ley N° 18.331 de Protección de Datos Personales</strong> y sus decretos reglamentarios, así como por el Decreto N° 414/009. {EMPRESA} está comprometida con la protección de la privacidad de sus usuarios.
          </p>
        </div>

        <div style={{ lineHeight:1.85, fontSize:"0.93rem", color:"#3a3a3a" }}>

          <Section title="1. Responsable del tratamiento">
            <p><strong>{EMPRESA}</strong> es la responsable del tratamiento de los datos personales recopilados a través del sitio web <strong>{DOMINIO}</strong> y de los canales de contacto (WhatsApp, email).</p>
            <p style={{marginTop:"0.8rem"}}>Contacto del responsable: <a href={`mailto:${EMAIL}`} style={{color:"#c9a800"}}>{EMAIL}</a></p>
          </Section>

          <Section title="2. Datos que recopilamos">
            <p>Recopilamos datos personales únicamente cuando el usuario los proporciona de forma voluntaria, en los siguientes casos:</p>
            <ul style={listStyle}>
              <li><strong>Contacto por WhatsApp:</strong> número de teléfono y contenido de los mensajes enviados</li>
              <li><strong>Contacto por email:</strong> dirección de correo electrónico y contenido del mensaje</li>
              <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia (a través de herramientas de análisis anónimas)</li>
            </ul>
            <p style={{marginTop:"0.8rem"}}>No recopilamos datos sensibles, datos de menores de edad, ni datos de pago a través de este sitio.</p>
          </Section>

          <Section title="3. Finalidad del tratamiento">
            <p>Los datos personales recopilados se utilizan exclusivamente para:</p>
            <ul style={listStyle}>
              <li>Responder consultas y solicitudes de información sobre nuestros servicios</li>
              <li>Gestionar la contratación y prestación de servicios de enseñanza de conducción</li>
              <li>Coordinar clases, turnos y trámites administrativos</li>
              <li>Mejorar la calidad del sitio web y nuestros servicios</li>
              <li>Comunicaciones relacionadas con los servicios contratados</li>
            </ul>
            <p style={{marginTop:"0.8rem"}}><strong>No realizamos marketing directo sin consentimiento previo</strong>. No vendemos, cedemos ni compartimos datos personales con terceros con fines comerciales.</p>
          </Section>

          <Section title="4. Base jurídica del tratamiento">
            <p>El tratamiento de datos se basa en:</p>
            <ul style={listStyle}>
              <li><strong>Consentimiento del interesado:</strong> cuando el usuario inicia el contacto voluntariamente</li>
              <li><strong>Ejecución de un contrato:</strong> cuando los datos son necesarios para prestar el servicio solicitado</li>
              <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios y comunicarnos con clientes actuales</li>
            </ul>
          </Section>

          <Section title="5. Conservación de los datos">
            <p>Los datos personales se conservan únicamente durante el tiempo necesario para cumplir con la finalidad para la que fueron recopilados, y en ningún caso más allá de lo permitido por la legislación uruguaya aplicable.</p>
            <p style={{marginTop:"0.8rem"}}>Los datos de contacto de clientes se conservan durante la relación comercial y hasta 5 años después de la última prestación de servicios, salvo obligación legal de conservación mayor.</p>
          </Section>

          <Section title="6. Derechos del titular de los datos">
            <p>Conforme a la Ley N° 18.331, usted tiene derecho a:</p>
            <ul style={listStyle}>
              <li><strong>Acceso:</strong> conocer qué datos personales suyos tratamos</li>
              <li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos</li>
              <li><strong>Cancelación (supresión):</strong> solicitar la eliminación de sus datos</li>
              <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos en determinadas circunstancias</li>
            </ul>
            <p style={{marginTop:"0.8rem"}}>Para ejercer cualquiera de estos derechos, contáctenos en: <a href={`mailto:${EMAIL}`} style={{color:"#c9a800"}}>{EMAIL}</a></p>
            <p style={{marginTop:"0.6rem"}}>También puede presentar una reclamación ante la <strong>Unidad Reguladora y de Control de Datos Personales (URCDP)</strong> de Uruguay: <a href="https://www.gub.uy/unidad-reguladora-control-datos-personales" target="_blank" rel="noopener noreferrer" style={{color:"#c9a800"}}>www.gub.uy/urcdp</a></p>
          </Section>

          <Section title="7. Cookies y tecnologías de seguimiento">
            <p>Este sitio web puede utilizar cookies técnicas necesarias para su correcto funcionamiento. No utilizamos cookies de publicidad ni de seguimiento entre sitios de terceros.</p>
            <p style={{marginTop:"0.8rem"}}>Podemos utilizar herramientas de análisis de tráfico web (como Vercel Analytics) que procesan datos de navegación de forma anonimizada para mejorar el rendimiento del sitio.</p>
          </Section>

          <Section title="8. Seguridad de los datos">
            <p>{EMPRESA} implementa medidas técnicas y organizativas razonables para proteger los datos personales contra accesos no autorizados, pérdida, alteración o divulgación. El sitio web opera bajo protocolo HTTPS.</p>
            <p style={{marginTop:"0.8rem"}}>No obstante, ningún sistema de transmisión de datos por internet es completamente seguro, por lo que no podemos garantizar la seguridad absoluta.</p>
          </Section>

          <Section title="9. Transferencias internacionales">
            <p>Los datos pueden ser procesados en servidores ubicados fuera de Uruguay, gestionados por Vercel Inc. (proveedor de alojamiento web). Vercel cumple con estándares internacionales de protección de datos.</p>
          </Section>

          <Section title="10. Cambios en esta política">
            <p>Podemos actualizar esta Política de Privacidad periódicamente. Cualquier cambio significativo será comunicado publicando la nueva versión en esta página con la fecha de actualización.</p>
          </Section>

          <Section title="11. Contacto">
            <p>Para cualquier consulta sobre esta Política de Privacidad o el tratamiento de sus datos:</p>
            <ul style={listStyle}>
              <li>Email: <a href={`mailto:${EMAIL}`} style={{color:"#c9a800"}}>{EMAIL}</a></li>
              <li>WhatsApp: <a href="https://api.whatsapp.com/send?phone=59894774465" style={{color:"#c9a800"}}>094 774 465</a></li>
            </ul>
          </Section>

        </div>

        <div style={{ marginTop:"3rem", padding:"2rem", background:"white", border:"1px solid #ddd8cc", borderTop:"3px solid #FFE600", borderRadius:"4px" }}>
          <p style={{ fontFamily:"Bebas Neue,sans-serif", fontSize:"1rem", letterSpacing:"0.06em", color:"#0d0d0d", marginBottom:"1rem" }}>Ver también</p>
          <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
            <Link href="/terminos" style={legalBtn}>Términos de Uso →</Link>
            <Link href="/aviso-legal" style={legalBtn}>Aviso Legal →</Link>
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

const listStyle: React.CSSProperties = { paddingLeft:"1.5rem", marginTop:"0.6rem", marginBottom:"0.4rem", lineHeight:2 };
const legalBtn: React.CSSProperties = { background:"#0d0d0d", color:"#FFE600", padding:"0.6rem 1.2rem", fontFamily:"Bebas Neue,sans-serif", fontSize:"0.88rem", letterSpacing:"0.1em", textDecoration:"none", borderRadius:"3px" };
const footerLink: React.CSSProperties = { fontSize:"0.75rem", color:"rgba(255,255,255,0.35)", textDecoration:"none", fontFamily:"Barlow Condensed,sans-serif", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" };
