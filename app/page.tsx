"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import QuizModal from "./components/QuizModal";

/* ── ICONOS SVG ── */
const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const IconWhatsAppGreen = () => (
  <svg viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433"/>
        <stop offset="50%" stopColor="#dc2743"/>
        <stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
    <path fill="url(#ig)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const IconGoogle = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

/* ── SVG AUTO HERO ── */
const HeroCar = () => (
  <svg className="hero-car" viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 65 L8 52 L28 32 L85 22 L148 22 L182 44 L210 44 L212 65 Z" fill="#1a1a1a" stroke="#FFE600" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M70 44 L85 26 L145 26 L165 44 Z" fill="#111" stroke="#FFE600" strokeWidth="2"/>
    <line x1="115" y1="22" x2="115" y2="44" stroke="#FFE600" strokeWidth="1.5" opacity="0.5"/>
    <ellipse cx="55" cy="67" rx="19" ry="19" fill="#111" stroke="#FFE600" strokeWidth="2.5"/>
    <ellipse cx="55" cy="67" rx="9" ry="9" fill="#FFE600" opacity="0.3"/>
    <ellipse cx="168" cy="67" rx="19" ry="19" fill="#111" stroke="#FFE600" strokeWidth="2.5"/>
    <ellipse cx="168" cy="67" rx="9" ry="9" fill="#FFE600" opacity="0.3"/>
    <line x1="8" y1="65" x2="212" y2="65" stroke="#FFE600" strokeWidth="1.5" opacity="0.4"/>
    <rect x="185" y="42" width="22" height="8" rx="2" fill="#FFE600" opacity="0.8"/>
    <rect x="10" y="50" width="12" height="6" rx="2" fill="white" opacity="0.6"/>
  </svg>
);

/* ── SVG MOTO RIDER ── */
const MotoRider = () => (
  <svg className="moto-rider" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="22" cy="46" rx="13" ry="13" fill="#111" stroke="#FFE600" strokeWidth="2"/>
    <ellipse cx="78" cy="46" rx="13" ry="13" fill="#111" stroke="#FFE600" strokeWidth="2"/>
    <path d="M22 33 L35 18 L60 18 L75 33 L78 33" stroke="#FFE600" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M48 18 L52 8 L65 8 L68 18" stroke="#FFE600" strokeWidth="2" strokeLinecap="round"/>
    <path d="M35 18 L48 33 L75 33" stroke="#FFE600" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="50" cy="4" r="5" fill="#FFE600" opacity="0.7"/>
    <line x1="50" y1="9" x2="50" y2="18" stroke="#FFE600" strokeWidth="2"/>
  </svg>
);

/* ── VOLANTE SVG ── */
const WheelWatermark = () => (
  <svg className="hero-wheel-bg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="2.5"/>
    <circle cx="50" cy="50" r="8" stroke="white" strokeWidth="2"/>
    {[0,45,90,135].map(a => {
      const rad = (a * Math.PI) / 180;
      return (
        <g key={a}>
          <line x1={50 + 8*Math.cos(rad)} y1={50 + 8*Math.sin(rad)} x2={50 + 44*Math.cos(rad)} y2={50 + 44*Math.sin(rad)} stroke="white" strokeWidth="1.8"/>
          <line x1={50 - 8*Math.cos(rad)} y1={50 - 8*Math.sin(rad)} x2={50 - 44*Math.cos(rad)} y2={50 - 44*Math.sin(rad)} stroke="white" strokeWidth="1.8"/>
        </g>
      );
    })}
  </svg>
);

/* ── GOOGLE STARS ── */
function GoogleStars({ count }: { count: number }) {
  return (
    <div style={{ display:"flex", gap:"2px" }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? "#FBBC04" : "#ddd"}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
}

/* ── REVIEWS ── */
const reviews = [
  { nombre:"Romi Giedzinski", inicial:"R", color:"#E91E63", estrellas:5, fecha:"hace 2 meses", texto:"Súper recomendado! Un placer tomar clases con Darío. Profesional y con una paciencia infinita." },
  { nombre:"Cesar Sanchez", inicial:"C", color:"#2196F3", estrellas:5, fecha:"hace 3 meses", texto:"Excelente experiencia. Totalmente recomendable. Muy agradecido al instructor Fernando." },
  { nombre:"Guillermo Cortes", inicial:"G", color:"#4CAF50", estrellas:5, fecha:"hace 4 meses", texto:"Excelente academia, muy comprometidos los instructores." },
  { nombre:"Evelyn Schlenzak", inicial:"E", color:"#FF9800", estrellas:5, fecha:"hace 1 mes", texto:"Estoy muy agradecida con Fernando. Gracias a su paciencia pude aprobar sin problemas. ¡100% recomendable!" },
  { nombre:"Martin Gannuso", inicial:"M", color:"#9C27B0", estrellas:5, fecha:"hace 5 meses", texto:"100% recomendable!!! Rápido aprendizaje y buena predisposición de los instructores." },
  { nombre:"Gabriel URU", inicial:"G", color:"#00BCD4", estrellas:5, fecha:"hace 2 meses", texto:"Excelentes instructores, flota impecable. 10/10 en todo. Super recomendados." },
  { nombre:"Mauro Corbo", inicial:"M", color:"#FF5722", estrellas:5, fecha:"hace 6 meses", texto:"Herramienta y atención de primera. Lo recomiendo a todos los que necesiten este servicio." },
  { nombre:"Mauricio González", inicial:"M", color:"#607D8B", estrellas:5, fecha:"hace 3 meses", texto:"Puntual y buen trato, recomendable." },
  { nombre:"Melisa Alvarez", inicial:"M", color:"#F44336", estrellas:5, fecha:"hace 1 mes", texto:"Excelente academia. Enseñan con mucha paciencia. ¡Gracias por hacerlo con tan buena onda!" },
  { nombre:"Lucas Fernández", inicial:"L", color:"#3F51B5", estrellas:5, fecha:"hace 2 semanas", texto:"Muy buena atención desde el primer momento. Instructores pacientes y profesionales." },
];

function ReviewSlider() {
  const [current, setCurrent] = useState(0);
  const [anim, setAnim] = useState(false);
  const [dir, setDir] = useState<"l"|"r">("r");
  const autoRef = useRef<ReturnType<typeof setInterval>|null>(null);

  const goTo = (idx: number, d: "l"|"r") => {
    if (anim) return;
    setDir(d); setAnim(true);
    setTimeout(() => { setCurrent(idx); setAnim(false); }, 320);
  };

  const prev = () => goTo(current===0?reviews.length-1:current-1,"l");
  const next = () => goTo(current===reviews.length-1?0:current+1,"r");

  useEffect(() => {
    autoRef.current = setInterval(next, 4500);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [current]);

  const r = reviews[current];

  return (
    <div>
      {/* Resumen */}
      <div style={{ display:"flex", alignItems:"center", gap:"2rem", marginBottom:"1.5rem", padding:"1.5rem 2rem", background:"var(--white)", border:"1px solid var(--border)", borderTop:"3px solid var(--yellow)", borderRadius:"4px", flexWrap:"wrap" }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontFamily:"Bebas Neue, sans-serif", fontSize:"3.2rem", color:"var(--black)", lineHeight:1 }}>4.9</div>
          <GoogleStars count={5} />
          <div style={{ fontSize:"0.72rem", color:"var(--muted)", marginTop:"0.3rem" }}>677 reseñas</div>
        </div>
        <div style={{ flex:1, minWidth:"160px" }}>
          {[5,4,3,2,1].map(n => (
            <div key={n} style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.3rem" }}>
              <span style={{ fontSize:"0.7rem", color:"var(--muted)", minWidth:"0.7rem" }}>{n}</span>
              <div style={{ flex:1, height:"5px", background:"var(--cream2)", borderRadius:"3px", overflow:"hidden" }}>
                <div style={{ height:"100%", background:"#FBBC04", width:n===5?"95%":n===4?"4%":"1%", borderRadius:"3px" }}></div>
              </div>
            </div>
          ))}
        </div>
        <a href="https://www.google.com/search?q=Academia+de+Choferes+Punta+Maldonado#lrd=0x957511348d9fc7b7:0xe755a1d8711427e8,1"
          target="_blank" rel="noopener noreferrer"
          style={{ display:"flex", alignItems:"center", gap:"0.5rem", background:"var(--black)", color:"var(--yellow)", padding:"0.7rem 1.3rem", fontFamily:"Bebas Neue, sans-serif", fontSize:"0.9rem", letterSpacing:"0.1em", textDecoration:"none", borderRadius:"3px" }}>
          <IconGoogle /> Ver en Google
        </a>
      </div>

      {/* Slide */}
      <div style={{ background:"var(--white)", border:"1px solid var(--border)", borderBottom:"3px solid var(--yellow)", padding:"2rem", borderRadius:"4px", transition: anim?"opacity 0.32s, transform 0.32s":"none", opacity:anim?0:1, transform:anim?(dir==="r"?"translateX(-18px)":"translateX(18px)"):"translateX(0)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.8rem" }}>
            <div style={{ width:"2.8rem", height:"2.8rem", borderRadius:"50%", background:r.color, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Bebas Neue, sans-serif", fontSize:"1.2rem", color:"white", flexShrink:0 }}>{r.inicial}</div>
            <div>
              <div style={{ fontFamily:"Barlow Condensed, sans-serif", fontWeight:700, fontSize:"1rem", color:"var(--black)", letterSpacing:"0.03em" }}>{r.nombre}</div>
              <div style={{ fontSize:"0.72rem", color:"var(--muted)" }}>{r.fecha}</div>
            </div>
          </div>
          <IconGoogle />
        </div>
        <div style={{ marginBottom:"0.8rem" }}><GoogleStars count={r.estrellas} /></div>
        <p style={{ fontSize:"0.92rem", lineHeight:1.75, color:"var(--text2)", fontStyle:"italic" }}>&ldquo;{r.texto}&rdquo;</p>
        <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginTop:"1.2rem", paddingTop:"1rem", borderTop:"1px solid var(--border2)", fontSize:"0.72rem", color:"var(--muted)" }}>
          <IconGoogle /><span>Publicado en Google Maps</span>
        </div>
      </div>

      {/* Controles */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"1rem" }}>
        <button onClick={prev} style={{ background:"var(--black)", border:"none", color:"var(--yellow)", width:"2.8rem", height:"2.8rem", cursor:"pointer", fontSize:"1rem", fontFamily:"Bebas Neue, sans-serif", borderRadius:"3px" }}>←</button>
        <div style={{ display:"flex", gap:"0.4rem" }}>
          {reviews.map((_,i) => (
            <button key={i} onClick={()=>goTo(i,i>current?"r":"l")} style={{ width:i===current?"1.6rem":"0.45rem", height:"0.45rem", borderRadius:"4px", background:i===current?"var(--yellow)":"var(--border)", border:"none", cursor:"pointer", padding:0, transition:"all 0.3s" }} />
          ))}
        </div>
        <button onClick={next} style={{ background:"var(--black)", border:"none", color:"var(--yellow)", width:"2.8rem", height:"2.8rem", cursor:"pointer", fontSize:"1rem", fontFamily:"Bebas Neue, sans-serif", borderRadius:"3px" }}>→</button>
      </div>
      <div style={{ textAlign:"center", marginTop:"0.7rem", fontSize:"0.7rem", color:"var(--muted)" }}>{current+1} / {reviews.length}</div>
    </div>
  );
}

/* ══════════════════════════════════════ */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicio, setServicio] = useState("autos");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Reveal observer — soporte para reveal, reveal-left, reveal-right
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 90);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // Animar líneas de carretera en transiciones
    const roads = document.querySelectorAll(".transition-dark-to-light, .transition-light-to-dark");
    const roadObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("road-animated");
          // Animar la moto
          const moto = entry.target.querySelector(".moto-rider");
          if (moto) moto.classList.add("riding");
          roadObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    roads.forEach(el => roadObserver.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      roadObserver.disconnect();
    };
  }, []);

  const handleContacto = () => {
    const phones: Record<string,string> = { autos:"59894774465", motos:"59898151659", tramites:"59894774465", teorica:"59894774465", defensivo:"59894774465", psicologia:"59894774465" };
    const labels: Record<string,string> = { autos:"clases de autos", motos:"clases de motos", tramites:"gestoría de trámites IDM", teorica:"la prueba teórica", defensivo:"la charla de manejo defensivo", psicologia:"apoyo psicológico" };
    const phone = phones[servicio]||phones.autos;
    const text = `Hola! Me interesa consultar sobre ${labels[servicio]}${mensaje?`. ${mensaje}`:"."}`; 
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`,"_blank");
  };

  const LOGO = "https://academiadechoferespunta.com.uy/wp-content/uploads/2022/04/ICONO-circle-cropped-g.png";

  return (
    <>
      {/* NAV */}
      <nav className={scrolled?"scrolled":""}>
        <div className="nav-inner">
          <a href="#hero" className="logo">
            <Image src={LOGO} alt="Academia Punta" width={44} height={44} unoptimized />
            <div className="logo-text">Academia <span>Punta</span></div>
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
          <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Menú">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div className={`mobile-menu${menuOpen?" open":""}`}>
          <a href="#servicios" onClick={()=>setMenuOpen(false)}>Servicios</a>
          <a href="#guia" onClick={()=>setMenuOpen(false)}>Guía</a>
          <a href="#materiales" onClick={()=>setMenuOpen(false)}>Materiales</a>
          <a href="#testimonios" onClick={()=>setMenuOpen(false)}>Opiniones</a>
          <a href="#interes" onClick={()=>setMenuOpen(false)}>Links de interés</a>
          <a href="#contacto" className="btn-mobile" onClick={()=>setMenuOpen(false)}>Empezar ahora</a>
        </div>
      </nav>

      {/* HERO — fondo negro */}
      <section className="hero" id="hero">
        <div className="hero-photo">
          <Image src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&q=80" alt="Hero" width={1600} height={900} style={{width:"100%",height:"100%",objectFit:"cover"}} unoptimized/>
        </div>
        <div className="hero-overlay"></div>
        <WheelWatermark />
        <div className="hero-road"></div>
        <HeroCar />
        <div className="hero-inner">
          <div className="hero-badge">🚗 Punta del Este, Maldonado — Uruguay</div>
          <h1>
            Tu licencia,
            <span className="highlight">sin dramas.</span>
            <span className="tagline">Academia Punta</span>
          </h1>
          <p className="hero-sub">Clases personalizadas para autos y motos. Instructores certificados. Tramitamos todo ante la IDM.</p>
          <div className="hero-btns">
            <a href="#contacto" className="btn-primary">Quiero empezar 🚀</a>
            <a href="#servicios" className="btn-outline">Ver servicios</a>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="num">4.9★</span><span className="label">Google</span></div>
            <div className="stat"><span className="num">677</span><span className="label">Reseñas</span></div>
            <div className="stat"><span className="num">+15</span><span className="label">Años</span></div>
            <div className="stat"><span className="num">100%</span><span className="label">Certificados</span></div>
          </div>
        </div>
      </section>

      {/* TRANSICIÓN negro → crema con moto */}
      <div className="transition-dark-to-light">
        <MotoRider />
      </div>

      {/* SERVICIOS — crema */}
      <section className="section" id="servicios">
        <div className="section-tag"><span>Lo que ofrecemos</span></div>
        <h2 className="section-title reveal-left">Todo para <span>tu licencia</span></h2>
        <div className="services-grid">
          {[
            {icon:"🚗",title:"Clases de Autos",desc:"Unidades nuevas, lunes a sábados. Te pasamos a buscar para cada clase."},
            {icon:"🏍️",title:"Clases de Motos",desc:"En pista La Loma. Vehículo, casco y reflectivos incluidos."},
            {icon:"📋",title:"Gestoría IDM",desc:"Hacemos todos los trámites en la Intendencia por vos. Tu tiempo vale oro."},
            {icon:"🧠",title:"Prueba Teórica",desc:"Clase de apoyo con docente. El 70% reprueba sin preparación."},
            {icon:"🛡️",title:"Manejo Defensivo",desc:"Lunes, miércoles y viernes. Doble horario: 8:00 y 18:30 hs."},
            {icon:"🧘",title:"Apoyo Psicológico",desc:"¿Le tenés miedo al volante? Profesionales que te acompañan."},
          ].map((s,i) => (
            <div className="service-card reveal" key={i} style={{transitionDelay:`${i*0.08}s`}}>
              <span className="s-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER AUTOS */}
      <div className="img-banner">
        <Image src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1600&q=80" alt="Autos" width={1600} height={420} style={{width:"100%",height:"100%",objectFit:"cover"}} unoptimized/>
        <div className="img-banner-overlay">
          <div className="img-banner-text">
            <h2>Clases de autos<br/><span>personalizadas</span></h2>
            <p>Aprendé a tu ritmo. Te buscamos para cada clase.</p>
            <a href="#contacto" className="btn-primary">Consultar ahora</a>
          </div>
        </div>
      </div>

      {/* TRANSICIÓN crema → oscuro */}
      <div className="transition-light-to-dark">
        <MotoRider />
      </div>

      {/* GUIA — oscuro */}
      <div className="section-dark" id="guia">
        <div className="section-inner">
          <div className="section-tag"><span>Paso a paso</span></div>
          <h2 className="section-title reveal-left">Guía para <span>obtener tu licencia</span></h2>
          <div className="guia-grid">
            {[
              {num:"01",title:"Trámite en IDM",desc:"Realizamos los trámites para las diferentes licencias ante la Intendencia de Maldonado."},
              {num:"02",title:"Charla Defensivo",desc:"Lunes, miércoles y viernes. 8:00 hs y 18:30 hs. Documento de identidad."},
              {num:"03",title:"Prueba Teórica",desc:"En la oficina de Licencias IDM. Coordinamos fecha a tu conveniencia."},
              {num:"04",title:"Aptitud Física",desc:"Instituciones autorizadas: SEMM, Bioeste, CASMU, Círculo Católico y más."},
              {num:"05",title:"Prueba Práctica",desc:"En pista La Loma con nuestro vehículo e instructor habilitado."},
              {num:"06",title:"¡Licencia!",desc:"Gestionamos el trámite final. Vos solo disfrutás el resultado."},
            ].map((g,i) => (
              <div className="guia-card reveal" key={i} style={{transitionDelay:`${i*0.1}s`}}>
                <div className="guia-num">{g.num}</div>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRANSICIÓN oscuro → crema */}
      <div className="transition-dark-to-light">
        <MotoRider />
      </div>

      {/* MATERIALES — crema */}
      <section className="section" id="materiales">
        <div className="section-tag"><span>Descargá gratis</span></div>
        <h2 className="section-title reveal-left">Materiales <span>de estudio</span></h2>
        <div className="materiales-grid">
          <div className="material-card reveal-left">
            <div className="material-info">
              <h3>📘 Guía Amateur</h3>
              <p>Autos y motos — PDF oficial</p>
            </div>
            <a href="https://academiadechoferespunta.com.uy/wp-content/uploads/2022/05/GuiaAutosYMotos.pdf" className="btn-download" target="_blank" rel="noopener noreferrer">⬇️ Descargar</a>
          </div>
          <div className="material-card reveal-right">
            <div className="material-info">
              <h3>📗 Guía Profesional</h3>
              <p>Licencia profesional — PDF completo</p>
            </div>
            <a href="https://academiadechoferespunta.com.uy/wp-content/uploads/2022/05/GuiaProfesional.pdf" className="btn-download" target="_blank" rel="noopener noreferrer">⬇️ Descargar</a>
          </div>
          <div className="material-card reveal" style={{gridColumn:"1 / -1"}}>
            <div className="material-info">
              <h3>💻 Clase Virtual — Apoyo Teórico</h3>
              <p>Clase con docente online. El 70% reprueba sin preparación.</p>
            </div>
            <a href="https://academiadechoferespunta.com.uy/clasevirtual/" className="btn-download" target="_blank" rel="noopener noreferrer">Ver clase →</a>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <div className="section-cream2">
        <div className="section-inner">
          <div className="foto-grid">
            {[
              {src:"https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",label:"Clases de Autos"},
              {src:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",label:"Clases de Motos"},
              {src:"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",label:"Instructores Certificados"},
            ].map((foto,i) => (
              <div className="foto-item reveal" key={i} style={{transitionDelay:`${i*0.12}s`}}>
                <Image src={foto.src} alt={foto.label} width={800} height={600} style={{width:"100%",height:"100%",objectFit:"cover"}} unoptimized/>
                <div className="foto-label">{foto.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BANNER MOTOS */}
      <div className="img-banner">
        <Image src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1600&q=80" alt="Motos" width={1600} height={420} style={{width:"100%",height:"100%",objectFit:"cover"}} unoptimized/>
        <div className="img-banner-overlay">
          <div className="img-banner-text">
            <h2>Motos<br/><span>pista La Loma</span></h2>
            <p>Vehículo, casco y reflectivos incluidos. Lunes a sábados.</p>
            <a href="#contacto" className="btn-primary">Consultar ahora</a>
          </div>
        </div>
      </div>

      {/* TESTIMONIOS — crema */}
      <section className="section" id="testimonios">
        <div className="section-tag"><span>Opiniones reales</span></div>
        <h2 className="section-title reveal-left">Lo que dicen en <span>Google</span></h2>
        <ReviewSlider />
      </section>

      {/* TRANSICIÓN crema → oscuro */}
      <div className="transition-light-to-dark">
        <MotoRider />
      </div>

      {/* INTERES — oscuro (SIN Examen Teórico Online) */}
      <div className="section-dark" id="interes">
        <div className="section-inner">
          <div className="section-tag"><span>Recursos útiles</span></div>
          <h2 className="section-title reveal-left">Páginas <span>de interés</span></h2>
          <div className="interes-grid">
            {[
              {icon:"🚗",title:"Permiso — SUCIVE",desc:"Trámites de permiso en web oficial",url:"https://www.sucive.gub.uy/formulario_punc?0"},
              {icon:"📋",title:"Licencia — IDM",desc:"Trámite en Intendencia de Maldonado",url:"https://www.maldonado.gub.uy/tramites/tramites-licencias-conducir"},
              {icon:"🛡️",title:"UNASEV",desc:"Unidad Nacional de Seguridad Vial",url:"https://www.gub.uy/unidad-nacional-seguridad-vial/"},
              {icon:"🧘",title:"Psicóloga A.C. Martínez",desc:"Asistencia psicológica para conductores",url:"http://www.consultoriopsicologico.wordpress.com/"},
              {icon:"💬",title:"Contacto WhatsApp",desc:"Te respondemos al toque",url:"https://api.whatsapp.com/send?phone=59894774465"},
            ].map((item,i) => (
              <a className="interes-card reveal" href={item.url} key={i} target="_blank" rel="noopener noreferrer" style={{transitionDelay:`${i*0.1}s`}}>
                <div className="interes-icon">{item.icon}</div>
                <div><h3>{item.title}</h3><p>{item.desc}</p></div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* TRANSICIÓN oscuro → crema */}
      <div className="transition-dark-to-light">
        <MotoRider />
      </div>

      {/* REDES — crema */}
      <section className="section">
        <div className="section-tag"><span>Seguinos</span></div>
        <h2 className="section-title reveal-left">Nuestras <span>redes</span></h2>
        <div className="redes-grid">
          {[
            {href:"https://www.instagram.com/academiadechoferespunta/",icon:<IconInstagram/>,label:"Instagram",sub:"@academiadechoferespunta"},
            {href:"https://www.facebook.com/Academia-de-choferes-Punta-339658393468083",icon:<IconFacebook/>,label:"Facebook",sub:"Academia de Choferes Punta"},
            {href:"https://api.whatsapp.com/send?phone=59894774465",icon:<IconWhatsAppGreen/>,label:"WhatsApp Autos",sub:"094 774 465"},
            {href:"https://api.whatsapp.com/send?phone=59898151659",icon:<IconWhatsAppGreen/>,label:"WhatsApp Motos",sub:"098 151 659"},
          ].map((r,i) => (
            <a key={i} href={r.href} className="red-card reveal" target="_blank" rel="noopener noreferrer" style={{transitionDelay:`${i*0.1}s`}}>
              <div className="red-icon">{r.icon}</div>
              <div><div className="red-label">{r.label}</div><div className="red-sub">{r.sub}</div></div>
            </a>
          ))}
        </div>
      </section>

      {/* TRANSICIÓN crema → oscuro */}
      <div className="transition-light-to-dark">
        <MotoRider />
      </div>

      {/* MAPA — oscuro */}
      <div className="section-dark">
        <div className="section-inner">
          <div className="section-tag"><span>Dónde estamos</span></div>
          <h2 className="section-title reveal-left">Maldonado, <span>Uruguay</span></h2>
          <div className="mapa-wrapper reveal">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26176.04!2d-54.9516!3d-34.9013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x957511348d9fc7b7%3A0xe755a1d8711427e8!2sAcademia%20de%20Choferes%20Punta!5e0!3m2!1ses!2suy!4v1" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa Academia Punta"></iframe>
          </div>
        </div>
      </div>

      {/* CTA BAND — amarillo con semáforo */}
      <div className="cta-band">
        <div className="cta-band-inner">
          <div className="semaforo reveal">
            <div className="semaforo-luz semaforo-rojo"></div>
            <div className="semaforo-luz semaforo-amarillo"></div>
            <div className="semaforo-luz semaforo-verde"></div>
          </div>
          <h2 className="reveal">¿Listo para sacar<br/>tu licencia hoy?</h2>
          <div className="cta-band-btns">
            <a href="https://api.whatsapp.com/send?phone=59894774465&text=Quiero%20empezar%20ahora." className="btn-dark reveal" target="_blank" rel="noopener noreferrer">
              <IconWhatsAppGreen /> Autos — 094 774 465
            </a>
            <a href="https://api.whatsapp.com/send?phone=59898151659&text=Quiero%20empezar%20ahora." className="btn-dark reveal" target="_blank" rel="noopener noreferrer">
              <IconWhatsAppGreen /> Motos — 098 151 659
            </a>
          </div>
        </div>
      </div>

      {/* CONTACTO — oscuro */}
      <div className="section-dark" id="contacto">
        <div className="section-inner">
          <div className="section-tag"><span>Escribinos</span></div>
          <h2 className="section-title reveal-left">Elegí tu servicio y <span>contactanos</span></h2>
          <div className="contacto-grid">
            <div className="contacto-info reveal-left">
              <h3>Información de contacto</h3>
              {[
                {icon:"🚗",strong:"WhatsApp — Autos",text:"094 774 465"},
                {icon:"🏍️",strong:"WhatsApp — Motos",text:"098 151 659"},
                {icon:"📍",strong:"Ubicación",text:"Maldonado, Uruguay — Punta del Este y alrededores"},
                {icon:"🕐",strong:"Horario de clases",text:"Lunes a Sábados — Amplio y flexible"},
                {icon:"📸",strong:"Instagram",text:"@academiadechoferespunta"},
              ].map((c,i) => (
                <div className="contacto-item" key={i}>
                  <div className="contacto-item-icon">{c.icon}</div>
                  <div className="contacto-item-text"><strong>{c.strong}</strong><p>{c.text}</p></div>
                </div>
              ))}
            </div>
            <div className="contacto-form reveal-right">
              <h3>Seleccioná y te abrimos WhatsApp</h3>
              <div className="form-group">
                <label>¿Qué servicio te interesa?</label>
                <select value={servicio} onChange={e=>setServicio(e.target.value)}>
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
                <textarea placeholder="Contanos tu situación..." value={mensaje} onChange={e=>setMensaje(e.target.value)}></textarea>
              </div>
              <button className="btn-wa-form" onClick={handleContacto}>
                <svg className="wa-btn-icon" viewBox="0 0 24 24" fill="black"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Enviar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#hero" className="footer-brand-logo">
                <Image src={LOGO} alt="Logo" width={42} height={42} unoptimized/>
                <div className="footer-logo-text">Academia <span>Punta</span></div>
              </a>
              <p>La academia de choferes de referencia en Punta del Este y Maldonado, Uruguay. Más de 15 años formando conductores seguros.</p>
              <div className="footer-social">
                <a href="https://www.instagram.com/academiadechoferespunta/" className="social-btn" target="_blank" rel="noopener noreferrer"><IconInstagram/></a>
                <a href="https://www.facebook.com/Academia-de-choferes-Punta-339658393468083" className="social-btn" target="_blank" rel="noopener noreferrer"><IconFacebook/></a>
                <a href="https://api.whatsapp.com/send?phone=59894774465" className="social-btn" target="_blank" rel="noopener noreferrer"><IconWhatsAppGreen/></a>
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
                <li><a href="#materiales">Materiales PDF</a></li>
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
            <a href="https://api.whatsapp.com/send?phone=50373260136" className="vortex-credit" target="_blank" rel="noopener noreferrer">
              ⚡ Diseñado por VORTEX
            </a>
          </div>
        </div>
      </footer>

      {/* WA FLOTANTE */}
      <a href="https://api.whatsapp.com/send?phone=59894774465" className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <IconWhatsApp />
      </a>

      <QuizModal />
    </>
  );
}
