"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import QuizModal from "./components/QuizModal";

/* ══ SVG ICONS ══ */
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
    <defs><linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="50%" stopColor="#dc2743"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs>
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

const SvgCar = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <path d="M8 30h32M12 38h4m16 0h4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M6 30l4-12h28l4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="14" cy="35" r="3" stroke="currentColor" strokeWidth="2.5"/>
    <circle cx="34" cy="35" r="3" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M16 22l2-6h12l2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const SvgMoto = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <circle cx="10" cy="34" r="6" stroke="currentColor" strokeWidth="2.5"/>
    <circle cx="38" cy="34" r="6" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M16 34h16M24 34l-4-12h8l6 8H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 22l-4-6h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="32" cy="18" r="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const SvgDoc = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <rect x="10" y="6" width="28" height="36" rx="3" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M16 16h16M16 22h16M16 28h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M30 32l4 4 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SvgBrain = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <path d="M24 10c-6 0-10 4-10 9 0 3 1.5 5.5 4 7v4h12v-4c2.5-1.5 4-4 4-7 0-5-4-9-10-9z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M20 36v4h8v-4M14 19c-3 0-5 2-5 5s2 5 5 5M34 19c3 0 5 2 5 5s-2 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const SvgShield = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <path d="M24 6L8 13v12c0 9 6.8 17.4 16 20 9.2-2.6 16-11 16-20V13L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M16 24l5 5 10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SvgGlobe = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M8 24h32M24 8c-4 4-6 9-6 16s2 12 6 16M24 8c4 4 6 9 6 16s-2 12-6 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const SvgProfLicense = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <rect x="6" y="14" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M6 20h36M14 28h8M14 33h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="36" cy="30" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M33 30l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 10v4M30 10v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const SvgSucive = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <rect x="8" y="10" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M8 18h32M16 26h4m8 0h4M16 32h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 10V8a2 2 0 014 0v2M26 10V8a2 2 0 014 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const SvgIDM = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <path d="M24 6L6 16v26h36V16L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <rect x="18" y="28" width="12" height="14" rx="1" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 24h4M28 24h4M16 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const SvgUnasev = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <path d="M24 6L8 13v12c0 9 6.8 17.4 16 20 9.2-2.6 16-11 16-20V13L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M17 24l5 5 9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SvgPsico = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M12 40c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M24 10v4M20 14l3 3M28 14l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const SvgHospital = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <rect x="8" y="14" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M16 14V10a2 2 0 012-2h12a2 2 0 012 2v4" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 28v-8M16 24h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="18" y="34" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const SvgWAContact = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <path d="M24 6C14.059 6 6 14.059 6 24c0 3.176.832 6.16 2.291 8.748L6 42l9.518-2.26A17.93 17.93 0 0024 42c9.941 0 18-8.059 18-18S33.941 6 24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M18 22c0 5.5 4.5 10 10 10 1.5 0 2.9-.3 4.1-.9l3.9.9-1-3.8c.6-1.2.9-2.6.9-4.2 0-5.5-4.5-10-10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const WheelWatermark = () => (
  <svg className="hero-wheel-bg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="2.5"/>
    <circle cx="50" cy="50" r="8" stroke="white" strokeWidth="2"/>
    {[0,45,90,135].map(a => {
      const r = (a * Math.PI) / 180;
      return <g key={a}>
        <line x1={50+8*Math.cos(r)} y1={50+8*Math.sin(r)} x2={50+44*Math.cos(r)} y2={50+44*Math.sin(r)} stroke="white" strokeWidth="1.8"/>
        <line x1={50-8*Math.cos(r)} y1={50-8*Math.sin(r)} x2={50-44*Math.cos(r)} y2={50-44*Math.sin(r)} stroke="white" strokeWidth="1.8"/>
      </g>;
    })}
  </svg>
);

function TrafficLight({ variant = "dark-to-light" }: { variant?: "dark-to-light"|"light-to-dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`traffic-transition ${variant}${active?" animated":""}`}>
      <div className="traffic-light">
        <div className="traffic-pole"></div>
        <div className="traffic-box">
          <div className="t-light t-red"></div>
          <div className="t-light t-yellow"></div>
          <div className="t-light t-green"></div>
        </div>
      </div>
    </div>
  );
}

function RoadDivider({ variant = "dark-to-light" }: { variant?: "dark-to-light"|"light-to-dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`traffic-transition ${variant}${active?" animated":""}`}></div>;
}

function GoogleStars({ count }: { count: number }) {
  return <div style={{display:"flex",gap:"2px"}}>{[...Array(5)].map((_,i)=><svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i<count?"#FBBC04":"#ddd"}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}</div>;
}

const reviews = [
  {nombre:"Romi Giedzinski",  inicial:"R",color:"#E91E63",estrellas:5,fecha:"hace 2 meses", texto:"Súper recomendado! Un placer tomar clases con Darío. Profesional y con una paciencia infinita."},
  {nombre:"Cesar Sanchez",    inicial:"C",color:"#2196F3",estrellas:5,fecha:"hace 3 meses", texto:"Excelente experiencia. Totalmente recomendable. Muy agradecido al instructor Fernando."},
  {nombre:"Guillermo Cortes", inicial:"G",color:"#4CAF50",estrellas:5,fecha:"hace 4 meses", texto:"Excelente academia, muy comprometidos los instructores."},
  {nombre:"Evelyn Schlenzak", inicial:"E",color:"#FF9800",estrellas:5,fecha:"hace 1 mes",   texto:"Muy agradecida con Fernando. Gracias a su paciencia pude aprobar sin problemas. ¡100% recomendable!"},
  {nombre:"Martin Gannuso",   inicial:"M",color:"#9C27B0",estrellas:5,fecha:"hace 5 meses", texto:"100% recomendable!!! Rápido aprendizaje y buena predisposición de los instructores."},
  {nombre:"Gabriel URU",      inicial:"G",color:"#00BCD4",estrellas:5,fecha:"hace 2 meses", texto:"Excelentes instructores, flota impecable. 10/10 en todo. Super recomendados."},
  {nombre:"Mauro Corbo",      inicial:"M",color:"#FF5722",estrellas:5,fecha:"hace 6 meses", texto:"Herramienta y atención de primera. Lo recomiendo a todos."},
  {nombre:"Mauricio González",inicial:"M",color:"#607D8B",estrellas:5,fecha:"hace 3 meses", texto:"Puntual y buen trato, recomendable."},
  {nombre:"Melisa Alvarez",   inicial:"M",color:"#F44336",estrellas:5,fecha:"hace 1 mes",   texto:"Excelente academia. Enseñan con mucha paciencia. ¡Gracias por hacerlo con tan buena onda!"},
  {nombre:"Lucas Fernández",  inicial:"L",color:"#3F51B5",estrellas:5,fecha:"hace 2 semanas",texto:"Muy buena atención desde el primer momento. Instructores pacientes y profesionales."},
];

function ReviewSlider() {
  const [current,setCurrent]=useState(0);
  const [anim,setAnim]=useState(false);
  const [dir,setDir]=useState<"l"|"r">("r");
  const autoRef=useRef<ReturnType<typeof setInterval>|null>(null);
  const goTo=(idx:number,d:"l"|"r")=>{if(anim)return;setDir(d);setAnim(true);setTimeout(()=>{setCurrent(idx);setAnim(false);},320);};
  const prev=()=>goTo(current===0?reviews.length-1:current-1,"l");
  const next=useCallback(()=>goTo(current===reviews.length-1?0:current+1,"r"),[current,anim]);
  useEffect(()=>{autoRef.current=setInterval(next,4500);return()=>{if(autoRef.current)clearInterval(autoRef.current);};},[next]);
  const r=reviews[current];
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:"2rem",marginBottom:"1.5rem",padding:"1.5rem 2rem",background:"var(--white)",border:"1px solid var(--border)",borderTop:"3px solid var(--yellow)",borderRadius:"4px",flexWrap:"wrap"}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"3.2rem",color:"var(--black)",lineHeight:1}}>4.9</div>
          <GoogleStars count={5}/>
          <div style={{fontSize:"0.72rem",color:"var(--muted)",marginTop:"0.3rem"}}>677 reseñas</div>
        </div>
        <div style={{flex:1,minWidth:"160px"}}>
          {[5,4,3,2,1].map(n=>(
            <div key={n} style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.3rem"}}>
              <span style={{fontSize:"0.7rem",color:"var(--muted)",minWidth:"0.7rem"}}>{n}</span>
              <div style={{flex:1,height:"5px",background:"var(--cream2)",borderRadius:"3px",overflow:"hidden"}}>
                <div style={{height:"100%",background:"#FBBC04",width:n===5?"95%":n===4?"4%":"1%",borderRadius:"3px"}}></div>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
          <a href="https://www.google.com/search?q=Academia+de+Choferes+Punta+Maldonado#lrd=0x957511348d9fc7b7:0xe755a1d8711427e8,1" target="_blank" rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",gap:"0.5rem",background:"var(--black)",color:"var(--yellow)",padding:"0.6rem 1.2rem",fontFamily:"Bebas Neue,sans-serif",fontSize:"0.85rem",letterSpacing:"0.1em",textDecoration:"none",borderRadius:"3px",whiteSpace:"nowrap"}}>
            <IconGoogle/> Ver en Google
          </a>
          <a href="https://www.google.com/search?hl=es-UY&gl=uy&q=Academia+de+Choferes+Punta#lrd=0x957511348d9fc7b7:0xe755a1d8711427e8,3" target="_blank" rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",gap:"0.5rem",background:"var(--yellow)",color:"var(--black)",padding:"0.6rem 1.2rem",fontFamily:"Bebas Neue,sans-serif",fontSize:"0.85rem",letterSpacing:"0.1em",textDecoration:"none",borderRadius:"3px",whiteSpace:"nowrap"}}>
            ⭐ Dejanos una reseña
          </a>
        </div>
      </div>
      <div style={{background:"var(--white)",border:"1px solid var(--border)",borderBottom:"3px solid var(--yellow)",padding:"2rem",borderRadius:"4px",transition:anim?"opacity 0.32s,transform 0.32s":"none",opacity:anim?0:1,transform:anim?(dir==="r"?"translateX(-18px)":"translateX(18px)"):"translateX(0)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1rem"}}>
          <div style={{display:"flex",alignItems:"center",gap:"0.8rem"}}>
            <div style={{width:"2.8rem",height:"2.8rem",borderRadius:"50%",background:r.color,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Bebas Neue,sans-serif",fontSize:"1.2rem",color:"white",flexShrink:0}}>{r.inicial}</div>
            <div>
              <div style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:"1rem",color:"var(--black)",letterSpacing:"0.03em"}}>{r.nombre}</div>
              <div style={{fontSize:"0.72rem",color:"var(--muted)"}}>{r.fecha}</div>
            </div>
          </div>
          <IconGoogle/>
        </div>
        <div style={{marginBottom:"0.8rem"}}><GoogleStars count={r.estrellas}/></div>
        <p style={{fontSize:"0.92rem",lineHeight:1.75,color:"var(--text2)",fontStyle:"italic"}}>&ldquo;{r.texto}&rdquo;</p>
        <div style={{display:"flex",alignItems:"center",gap:"0.4rem",marginTop:"1.2rem",paddingTop:"1rem",borderTop:"1px solid var(--border2)",fontSize:"0.72rem",color:"var(--muted)"}}>
          <IconGoogle/><span>Publicado en Google Maps</span>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"1rem"}}>
        <button onClick={prev} style={{background:"var(--black)",border:"none",color:"var(--yellow)",width:"2.8rem",height:"2.8rem",cursor:"pointer",fontSize:"1rem",fontFamily:"Bebas Neue,sans-serif",borderRadius:"3px"}}>←</button>
        <div style={{display:"flex",gap:"0.4rem"}}>{reviews.map((_,i)=><button key={i} onClick={()=>goTo(i,i>current?"r":"l")} style={{width:i===current?"1.6rem":"0.45rem",height:"0.45rem",borderRadius:"4px",background:i===current?"var(--yellow)":"var(--border)",border:"none",cursor:"pointer",padding:0,transition:"all 0.3s"}}/>)}</div>
        <button onClick={next} style={{background:"var(--black)",border:"none",color:"var(--yellow)",width:"2.8rem",height:"2.8rem",cursor:"pointer",fontSize:"1rem",fontFamily:"Bebas Neue,sans-serif",borderRadius:"3px"}}>→</button>
      </div>
      <div style={{textAlign:"center",marginTop:"0.7rem",fontSize:"0.7rem",color:"var(--muted)"}}>{current+1} / {reviews.length}</div>
    </div>
  );
}

/* ══ HERO CAROUSEL — 3 slides (slide de "cambio de categoría" eliminado) ══ */
const heroSlides = [
  {
    src: "/fotos/1001029674.jpg",
    alt: "Cambiá de licencia sin drama — Academia Punta",
    badge: "🚗 Punta del Este, Maldonado — Uruguay",
    title: <>Tu licencia,<span className="highlight">sin dramas.</span><span className="tagline">Academia Punta</span></>,
    sub: "Clases personalizadas para autos y motos. Instructores certificados. Tramitamos todo ante la IDM.",
    ctaLabel: "Quiero empezar 🚀",
    ctaHref: "#contacto",
  },
  {
    src: "/fotos/1001029695.jpg",
    alt: "Driving lessons in English — Academia Punta",
    badge: "🇬🇧 English lessons available",
    title: <>Driving lessons<span className="highlight" style={{fontFamily:"Bebas Neue,sans-serif"}}>in English</span><span className="tagline" style={{fontFamily:"Bebas Neue,sans-serif"}}>For everyone</span></>,
    sub: "International visitors and residents welcome. Certified instructors. WhatsApp: +598 93 312 019",
    ctaLabel: "Contact us on WhatsApp",
    ctaHref: "https://api.whatsapp.com/send?phone=59893312019&text=Hi!%20I%20need%20driving%20lessons%20in%20English.",
    ctaExternal: true,
  },
  {
    src: "/fotos/1001029686.jpg",
    alt: "Clases de moto G1 G2 G3 — Academia Punta",
    badge: "🏍️ Pista La Loma — Maldonado",
    title: <>Clases de motos<span className="highlight">G1, G2 y G3</span><span className="tagline">Casco incluido</span></>,
    sub: "BMW G310. Vehículo, casco y reflectivos incluidos. Lunes a sábados en pista La Loma.",
    ctaLabel: "Consultar motos",
    ctaHref: "https://api.whatsapp.com/send?phone=59898151659&text=Quiero%20clases%20de%20motos.",
    ctaExternal: true,
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next"|"prev">("next");
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);

  const goTo = useCallback((idx: number, dir: "next"|"prev") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 600);
  }, [animating]);

  const next = useCallback(() => goTo(current === heroSlides.length - 1 ? 0 : current + 1, "next"), [current, goTo]);
  const prev = useCallback(() => goTo(current === 0 ? heroSlides.length - 1 : current - 1, "prev"), [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const slide = heroSlides[current];

  return (
    /* FIX DESKTOP: overflow:hidden en el section para que el carrusel no se desborde */
    <section className="hero" id="hero" style={{overflow:"hidden"}}>
      {/* Slides background — todos position:absolute para no romper el layout en desktop */}
      {heroSlides.map((s, i) => (
        <div key={i} className="hero-photo" style={{
          opacity: i === current ? 1 : 0,
          transition: "opacity 0.7s ease",
          position: "absolute",
          inset: 0,
          zIndex: i === current ? 1 : 0,
        }}>
          <Image src={s.src} alt={s.alt} width={1600} height={900}
            style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 60%"}}
            priority={i === 0} unoptimized={i !== 0}/>
        </div>
      ))}
      <div className="hero-overlay" style={{zIndex:2}}></div>
      <WheelWatermark/>

      {/* Content */}
      <div className="hero-inner" style={{zIndex:3}}>
        <div className="hero-badge"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? (direction === "next" ? "translateY(-10px)" : "translateY(10px)") : "translateY(0)",
            transition: "opacity 0.5s, transform 0.5s",
          }}>
          {slide.badge}
        </div>
        <h1 style={{
          opacity: animating ? 0 : 1,
          transform: animating ? (direction === "next" ? "translateX(-20px)" : "translateX(20px)") : "translateX(0)",
          transition: "opacity 0.55s 0.05s, transform 0.55s 0.05s",
        }}>
          {slide.title}
        </h1>
        <p className="hero-sub" style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.5s 0.1s, transform 0.5s 0.1s",
        }}>
          {slide.sub}
        </p>
        <div className="hero-btns" style={{
          opacity: animating ? 0 : 1,
          transition: "opacity 0.5s 0.15s",
        }}>
          {slide.ctaExternal ? (
            <a href={slide.ctaHref} className="btn-primary" target="_blank" rel="noopener noreferrer">{slide.ctaLabel}</a>
          ) : (
            <a href={slide.ctaHref} className="btn-primary">{slide.ctaLabel}</a>
          )}
          <a href="#servicios" className="btn-outline">Ver servicios</a>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="num">4.9★</span><span className="label">Google</span></div>
          <div className="stat"><span className="num">677</span><span className="label">Reseñas</span></div>
          <div className="stat"><span className="num">+15</span><span className="label">Años</span></div>
          <div className="stat"><span className="num">100%</span><span className="label">Certificados</span></div>
        </div>
      </div>

      {/* Carousel controls */}
      <button onClick={prev} aria-label="Anterior" style={{
        position:"absolute",left:"1.2rem",top:"50%",transform:"translateY(-50%)",
        zIndex:4,background:"rgba(0,0,0,0.45)",border:"1px solid rgba(255,255,255,0.2)",
        color:"white",width:"2.6rem",height:"2.6rem",borderRadius:"50%",
        cursor:"pointer",fontSize:"1.1rem",backdropFilter:"blur(4px)",
        display:"flex",alignItems:"center",justifyContent:"center",
        transition:"background 0.2s",
      }}>‹</button>
      <button onClick={next} aria-label="Siguiente" style={{
        position:"absolute",right:"1.2rem",top:"50%",transform:"translateY(-50%)",
        zIndex:4,background:"rgba(0,0,0,0.45)",border:"1px solid rgba(255,255,255,0.2)",
        color:"white",width:"2.6rem",height:"2.6rem",borderRadius:"50%",
        cursor:"pointer",fontSize:"1.1rem",backdropFilter:"blur(4px)",
        display:"flex",alignItems:"center",justifyContent:"center",
        transition:"background 0.2s",
      }}>›</button>

      {/* Dots */}
      <div style={{
        position:"absolute",bottom:"5.5rem",left:"50%",transform:"translateX(-50%)",
        zIndex:4,display:"flex",gap:"0.5rem",alignItems:"center",
      }}>
        {heroSlides.map((_,i) => (
          <button key={i} onClick={() => goTo(i, i > current ? "next" : "prev")} aria-label={`Slide ${i+1}`} style={{
            width: i === current ? "1.8rem" : "0.5rem",
            height:"0.5rem",borderRadius:"4px",
            background: i === current ? "var(--yellow)" : "rgba(255,255,255,0.45)",
            border:"none",cursor:"pointer",padding:0,
            transition:"all 0.35s cubic-bezier(0.4,0,0.2,1)",
          }}/>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{
        position:"absolute",bottom:0,left:0,height:"3px",
        background:"var(--yellow)",zIndex:4,
        width:`${((current+1)/heroSlides.length)*100}%`,
        transition:"width 0.6s ease",
      }}/>
    </section>
  );
}

/* ══ FLEET CAROUSEL ══ */
const fleetItems = [
  {src:"/fotos/1001079125.jpg", label:"Toda la flota", cat:"Equipo"},
  {src:"/fotos/1001079209.jpg", label:"Flota en rambla", cat:"Autos"},
  {src:"/fotos/1001079134.jpg", label:"Citroën C3 — BED 7080", cat:"Auto"},
  {src:"/fotos/1001079143.jpg", label:"Chevrolet — BEC 2806", cat:"Auto"},
  {src:"/fotos/1001079146.jpg", label:"Suzuki Alto — BEC 9215", cat:"Auto"},
  {src:"/fotos/1001079170.jpg", label:"Chevrolet RS — BEC 7380", cat:"Auto"},
  {src:"/fotos/1001079137.jpg", label:"BMW G310 — Motos G2/G3", cat:"Moto"},
  {src:"/fotos/1001079116.jpg", label:"Honda Wave — Motos G1", cat:"Moto"},
  {src:"/fotos/1001079161.jpg", label:"Flota en Punta del Este", cat:"Flota"},
];

function FleetCarousel() {
  const [current, setCurrent] = useState(0);
  const [anim, setAnim] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval>|null>(null);
  const visibleCount = 3;
  const total = fleetItems.length;

  const goTo = (idx: number) => {
    if (anim) return;
    setAnim(true);
    setTimeout(() => { setCurrent(idx); setAnim(false); }, 400);
  };
  const next = useCallback(() => goTo(current >= total - visibleCount ? 0 : current + 1), [current, anim]);
  const prev = useCallback(() => goTo(current === 0 ? total - visibleCount : current - 1), [current, anim]);

  useEffect(() => {
    autoRef.current = setInterval(next, 4000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [next]);

  const visible = [
    fleetItems[current % total],
    fleetItems[(current + 1) % total],
    fleetItems[(current + 2) % total],
  ];

  return (
    <div style={{position:"relative"}}>
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(3,1fr)",
        gap:"1rem",
        transition: anim ? "opacity 0.4s,transform 0.4s" : "none",
        opacity: anim ? 0.4 : 1,
        transform: anim ? "scale(0.98)" : "scale(1)",
      }}>
        {visible.map((f, i) => (
          <div key={i} style={{
            position:"relative",aspectRatio:"4/3",overflow:"hidden",
            borderRadius:"6px",border:"1px solid rgba(255,255,255,0.08)",
          }}>
            <Image src={f.src} alt={f.label} width={600} height={450}
              style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.6s"}}
              unoptimized/>
            <div style={{
              position:"absolute",inset:0,
              background:"linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 55%)",
            }}/>
            <div style={{position:"absolute",bottom:"0.8rem",left:"0.8rem",right:"0.8rem"}}>
              <span style={{
                display:"inline-block",background:"var(--yellow)",color:"var(--black)",
                fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,
                fontSize:"0.62rem",letterSpacing:"0.1em",textTransform:"uppercase",
                padding:"0.15rem 0.5rem",borderRadius:"2px",marginBottom:"0.3rem",
              }}>{f.cat}</span>
              <div style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:600,fontSize:"0.85rem",color:"white",letterSpacing:"0.04em"}}>{f.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"1.2rem"}}>
        <button onClick={prev} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",color:"white",width:"2.4rem",height:"2.4rem",borderRadius:"50%",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"}}>‹</button>
        <div style={{display:"flex",gap:"0.4rem"}}>
          {Array.from({length: total - visibleCount + 1}).map((_,i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === current ? "1.4rem" : "0.4rem",
              height:"0.4rem",borderRadius:"3px",
              background: i === current ? "var(--yellow)" : "rgba(255,255,255,0.3)",
              border:"none",cursor:"pointer",padding:0,transition:"all 0.3s",
            }}/>
          ))}
        </div>
        <button onClick={next} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",color:"white",width:"2.4rem",height:"2.4rem",borderRadius:"50%",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"}}>›</button>
      </div>
    </div>
  );
}

/* ══ MAIN ══ */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [servicio, setServicio]   = useState("autos");
  const [mensaje, setMensaje]     = useState("");
  const footerRef = useRef<HTMLElement>(null); // kept for potential future use
  /* Estado para abrir el simulador desde el nav */
  const [simOpen, setSimOpen]     = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setShowQuiz(rect.top > window.innerHeight - 80);
      }
    };
    window.addEventListener("scroll", onScroll);
    const els = document.querySelectorAll(".reveal,.reveal-left,.reveal-right");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(()=>e.target.classList.add("visible"),i*90); obs.unobserve(e.target); }});
    }, {threshold:0.1});
    els.forEach(el => obs.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  const handleContacto = () => {
    const phones: Record<string,string> = {
      autos:"59894774465", motos:"59898151659",
      tramites:"59894774465", teorica:"59894774465",
      defensivo:"59894774465", psicologia:"59894774465",
      ingles:"59893312019",
    };
    const labels: Record<string,string> = {
      autos:"clases de autos", motos:"clases de motos",
      tramites:"gestoría de trámites IDM", teorica:"la prueba teórica",
      defensivo:"la charla de manejo defensivo", psicologia:"apoyo psicológico",
      ingles:"driving lessons in English",
    };
    const phone = phones[servicio] || phones.autos;
    const text = `Hola! Me interesa consultar sobre ${labels[servicio]}${mensaje?`. ${mensaje}`:"."}`;
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`, "_blank");
  };

  const LOGO = "/logo.jpg";

  return (
    <>
      {/* ══ NAV ══ */}
      <nav className={scrolled?"scrolled":""}>
        <div className="nav-inner">
          <a href="#hero" className="logo">
            <Image src={LOGO} alt="Academia Punta" width={44} height={44} unoptimized/>
            <div className="logo-text">Academia <span>Punta</span></div>
          </a>
          <ul className="nav-links">
            <li><Link href="/nosotros" style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:600,fontSize:"0.8rem",letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(255,255,255,0.65)",textDecoration:"none"}}>Nosotros</Link></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#guia">Guía</a></li>
            <li><a href="#materiales">Materiales</a></li>
            <li><a href="#testimonios">Opiniones</a></li>
            <li>
              {/* Link directo al Simulador — abre el modal flotante */}
              <button onClick={() => setSimOpen(true)} style={{
                background:"none",border:"none",cursor:"pointer",padding:0,
                fontFamily:"Barlow Condensed,sans-serif",fontWeight:600,
                fontSize:"0.8rem",letterSpacing:"0.12em",textTransform:"uppercase",
                color:"var(--yellow)",
              }}>🧠 Simulador</button>
            </li>
            <li>
              <button onClick={()=>setSimOpen(true)} style={{background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:"0.8rem",letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--yellow)"}}>🧠 Simulador</button>
            </li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
          <a href="#contacto" className="btn-nav">Empezar →</a>
          <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Menú">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div className={`mobile-menu${menuOpen?" open":""}`}>
          <Link href="/nosotros" onClick={()=>setMenuOpen(false)} style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,0.65)",textDecoration:"none",padding:"0.75rem 0",borderBottom:"1px solid rgba(255,255,255,0.08)",fontSize:"0.95rem"}}>Nosotros</Link>
          <a href="#servicios"   onClick={()=>setMenuOpen(false)}>Servicios</a>
          <a href="#guia"        onClick={()=>setMenuOpen(false)}>Guía</a>
          <a href="#materiales"  onClick={()=>setMenuOpen(false)}>Materiales</a>
          <a href="#testimonios" onClick={()=>setMenuOpen(false)}>Opiniones</a>
          {/* Simulador en mobile menu */}
          <button onClick={()=>{setSimOpen(true);setMenuOpen(false);}} style={{
            background:"none",border:"none",cursor:"pointer",textAlign:"left",width:"100%",
            fontFamily:"Barlow Condensed,sans-serif",fontWeight:600,letterSpacing:"0.1em",
            textTransform:"uppercase",color:"var(--yellow)",
            padding:"0.75rem 0",borderBottom:"1px solid rgba(255,255,255,0.08)",fontSize:"0.95rem",
          }}>🧠 Simulador Teórico</button>
          <button onClick={()=>{setSimOpen(true);setMenuOpen(false);}} style={{background:"none",border:"none",cursor:"pointer",textAlign:"left",width:"100%",fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--yellow)",padding:"0.75rem 0",borderBottom:"1px solid rgba(255,255,255,0.08)",fontSize:"0.95rem"}}>🧠 Simulador Teórico</button>
          <a href="#contacto" className="btn-mobile" onClick={()=>setMenuOpen(false)}>Empezar ahora</a>
        </div>
      </nav>

      {/* ══ HERO CAROUSEL ══ */}
      <HeroCarousel/>

      {/* SEMÁFORO 1 */}
      <TrafficLight variant="dark-to-light"/>

      {/* ══ SERVICIOS ══ */}
      <section className="section" id="servicios">
        <div className="section-tag"><span>Lo que ofrecemos</span></div>
        <h2 className="section-title reveal-left">Todo para <span>tu licencia</span></h2>
        <div className="services-grid">
          {[
            {icon:<SvgCar/>,      title:"Clases de Autos",             desc:"Unidades nuevas, lunes a sábados. Te pasamos a buscar para cada clase."},
            {icon:<SvgMoto/>,     title:"Clases de Motos G1, G2 y G3", desc:"En pista La Loma. Vehículo, casco y reflectivos incluidos. BMW G310."},
            {icon:<SvgDoc/>,      title:"Gestoría IDM",                 desc:"Hacemos todos los trámites en la Intendencia por vos. Tu tiempo vale oro."},
            {icon:<SvgBrain/>,    title:"Prueba Teórica",               desc:"Clase de apoyo con docente. El 70% reprueba sin preparación."},
            {icon:<SvgShield/>,   title:"Manejo Defensivo",             desc:"Lunes, miércoles y viernes. Doble horario: 8:00 y 18:30 hs."},
            {icon:<SvgGlobe/>,    title:"Clases en Inglés",             desc:"Need driving lessons in English? We offer classes for international visitors."},
            {icon:<SvgProfLicense/>, title:"Licencias Profesionales",  desc:"Vehículos especiales. Formación y gestoría ante la IDM Maldonado."},
          ].map((s,i) => (
            <div className="service-card reveal" key={i} style={{transitionDelay:`${i*0.08}s`}}>
              <span className="s-icon" style={{color:"var(--yellow)",display:"flex",alignItems:"center",justifyContent:"center",width:"3.5rem",height:"3.5rem",background:"rgba(255,230,0,0.1)",borderRadius:"10px",marginBottom:"1rem",border:"1px solid rgba(255,230,0,0.15)"}}>{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER FLOTA */}
      <div className="img-banner">
        <Image src="/fotos/1001079218.jpg" alt="Equipo Academia Punta" width={1600} height={420} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 40%"}} unoptimized/>
        <div className="img-banner-overlay">
          <div className="img-banner-text">
            <h2>Nuestra <span>flota</span></h2>
            <p>Chevrolets nuevos con doble mando registrados y habilitados en IDM como Coche Escuela.</p>
            <a href="#contacto" className="btn-primary">Reservar clase</a>
          </div>
        </div>
      </div>

      {/* CARRETERA crema→oscuro */}
      <RoadDivider variant="light-to-dark"/>

      {/* ══ GUIA ══ */}
      <div className="section-dark" id="guia">
        <div className="section-inner">
          <div className="section-tag"><span>Paso a paso</span></div>
          <h2 className="section-title reveal-left">Guía para <span>obtener tu licencia</span></h2>
          <div className="guia-grid">
            {[
              {title:"Trámite en IDM",   desc:"Realizamos los trámites para las diferentes licencias ante la Intendencia de Maldonado."},
              {title:"Charla Defensivo",  desc:"Lunes, miércoles y viernes. 8:00 hs y 18:30 hs. Con documento de identidad, 5 min antes."},
              {title:"Prueba Teórica",    desc:"En la oficina de Licencias IDM. Coordinamos fecha a tu conveniencia."},
              {title:"Aptitud Física",    desc:"Concurrí a una institución autorizada. El carnet de salud NO es válido.", link:true},
              {title:"Prueba Práctica",   desc:"En pista La Loma con nuestro vehículo e instructor habilitado."},
              {title:"¡Licencia!",        desc:"Gestionamos el trámite final. Vos solo disfrutás el resultado."},
            ].map((g, i) => (
              <div className="guia-card reveal" key={i} style={{transitionDelay:`${i*0.1}s`}}>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
                {g.link && (
                  <Link href="/instituciones" style={{display:"inline-flex",alignItems:"center",gap:"0.4rem",marginTop:"0.7rem",color:"#FFE600",fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:"0.78rem",letterSpacing:"0.12em",textTransform:"uppercase",textDecoration:"none"}}>
                    Ver instituciones →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CARRETERA oscuro→crema */}
      <RoadDivider variant="dark-to-light"/>

      {/* ══ MATERIALES ══ */}
      <section className="section" id="materiales">
        <div className="section-tag"><span>Descargá gratis</span></div>
        <h2 className="section-title reveal-left">Materiales <span>de estudio</span></h2>
        <div className="materiales-grid">
          <div className="material-card reveal-left">
            <div className="material-info"><h3>📘 Guía Amateur</h3><p>Autos y motos — PDF oficial</p></div>
            <a href="/pdfs/GuiaAutosYMotos.pdf" className="btn-download" target="_blank" rel="noopener noreferrer">⬇️ Descargar</a>
          </div>
          <div className="material-card reveal-right">
            <div className="material-info"><h3>📗 Guía Profesional</h3><p>Licencia profesional — PDF completo</p></div>
            <a href="/pdfs/GuiaProfesional.pdf" className="btn-download" target="_blank" rel="noopener noreferrer">⬇️ Descargar</a>
          </div>
          <div className="material-card reveal" style={{gridColumn:"1 / -1"}}>
            <div className="material-info"><h3>💻 Clase Virtual — Apoyo Teórico</h3><p>Clase con docente online. El 70% reprueba sin preparación.</p></div>
            <a href="https://www.youtube.com/@academiadechoferespunta" className="btn-download" target="_blank" rel="noopener noreferrer">Ver clase →</a>
          </div>
        </div>
      </section>

      {/* FLOTA */}
      <div className="section-dark">
        <div className="section-inner">
          <div className="section-tag"><span>Nuestros vehículos</span></div>
          <h2 className="section-title reveal-left">Flota <span>de la academia</span></h2>
          <p style={{color:"rgba(255,255,255,0.55)",marginBottom:"1.5rem",fontSize:"0.9rem"}}>5 autos · 3 motos categorías G1, G2 y G3</p>
          <FleetCarousel/>
        </div>
      </div>

      {/* BANNER MOTOS */}
      <div className="img-banner">
        <Image src="/fotos/1001079137.jpg" alt="Clases de moto BMW G310 — Academia Punta" width={1600} height={420} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 30%"}} unoptimized/>
        <div className="img-banner-overlay">
          <div className="img-banner-text">
            <h2>Clases de <span>motos</span></h2>
            <p>BMW G310 con casco y reflectivos. Pista La Loma, lunes a sábados. Categorías G1, G2 y G3.</p>
            <a href="https://api.whatsapp.com/send?phone=59898151659&text=Quiero%20clases%20de%20motos." target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:"0.6rem",background:"#25D366",color:"#000",padding:"0.75rem 1.4rem",fontFamily:"Bebas Neue,sans-serif",fontSize:"1rem",letterSpacing:"0.1em",textDecoration:"none",borderRadius:"3px",fontWeight:700}}>
              <IconWhatsAppGreen/> Motos — 098 151 659
            </a>
          </div>
        </div>
      </div>

      {/* BANNER INGLÉS */}
      <div className="img-banner" style={{height:"220px"}}>
        <Image src="/fotos/1001079155.jpg" alt="Driving lessons in English" width={1600} height={220} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 60%",filter:"brightness(0.3)"}} unoptimized/>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"1rem",padding:"2rem",textAlign:"center",zIndex:2}}>
          <div style={{display:"flex",gap:"0.5rem",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:"1.5rem"}}>🇬🇧</span>
            <p style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",color:"white",letterSpacing:"0.08em",margin:0}}>Driving lessons in English</p>
          </div>
          <p style={{color:"rgba(255,255,255,0.75)",fontSize:"0.9rem",margin:0}}>International visitors welcome · Certified instructors</p>
          <a href="https://api.whatsapp.com/send?phone=59893312019&text=Hi!%20I%20need%20driving%20lessons%20in%20English." className="btn-primary" target="_blank" rel="noopener noreferrer" style={{background:"#e53935",animation:"none",display:"inline-flex",alignItems:"center",gap:"0.5rem"}}>
            <IconWhatsAppGreen/> Contact us — +598 93 312 019
          </a>
        </div>
      </div>

      {/* CARRETERA → oscuro */}
      <RoadDivider variant="light-to-dark"/>

      {/* GALERÍA */}
      <div className="section-dark">
        <div className="section-inner">
          <div className="section-tag"><span>En acción</span></div>
          <h2 className="section-title reveal-left">Aprendé con <span>los mejores</span></h2>
          <div className="foto-grid">
            {[
              {src:"/fotos/1001079176.jpg",label:"Clase de motos — Pista La Loma"},
              {src:"/fotos/1001079215.jpg",label:"Instructor en acción"},
              {src:"/fotos/1001079203.jpg",label:"Equipo Academia Punta"},
              {src:"/fotos/1001079128.jpg",label:"Instructor con Chevrolet"},
              {src:"/fotos/1001079188.jpg",label:"Instructora — Suzuki Alto"},
              {src:"/fotos/1001079218.jpg",label:"Toda la academia"},
            ].map((f, i) => (
              <div className="foto-item reveal" key={i} style={{transitionDelay:`${i*0.1}s`}}>
                <Image src={f.src} alt={f.label} width={800} height={600} style={{width:"100%",height:"100%",objectFit:"cover"}} unoptimized/>
                <div className="foto-label">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CARRETERA oscuro→crema */}
      <RoadDivider variant="dark-to-light"/>

      {/* TESTIMONIOS */}
      <section className="section" id="testimonios">
        <div className="section-tag"><span>Opiniones reales</span></div>
        <h2 className="section-title reveal-left">Lo que dicen en <span>Google</span></h2>
        <ReviewSlider/>
      </section>

      {/* CARRETERA crema→oscuro */}
      <RoadDivider variant="light-to-dark"/>

      {/* INTERES */}
      <div className="section-dark" id="interes">
        <div className="section-inner">
          <div className="section-tag"><span>Recursos útiles</span></div>
          <h2 className="section-title reveal-left">Páginas <span>de interés</span></h2>
          <div className="interes-grid">
            {[
              {icon:<SvgSucive/>,   title:"Permiso — SUCIVE",            desc:"Trámites de permiso oficial",              url:"https://www.sucive.gub.uy/formulario_punc?0"},
              {icon:<SvgIDM/>,      title:"Licencia — IDM",              desc:"Trámite en Intendencia Maldonado",          url:"https://www.maldonado.gub.uy/tramites/tramites-licencias-conducir"},
              {icon:<SvgUnasev/>,   title:"UNASEV",                      desc:"Unidad Nacional de Seguridad Vial",         url:"https://www.gub.uy/unidad-nacional-seguridad-vial/"},
              {icon:<SvgPsico/>,    title:"Psicóloga A.C. Martínez",     desc:"Asistencia psicológica para conductores",   url:"http://www.consultoriopsicologico.wordpress.com/"},
              {icon:<SvgHospital/>, title:"Aptitud Física",              desc:"Lista de centros autorizados",              url:"/instituciones"},
              {icon:<SvgWAContact/>,title:"Contacto WhatsApp",           desc:"Te respondemos al toque",                  url:"https://api.whatsapp.com/send?phone=59894774465"},
            ].map((item, i) => (
              <a className="interes-card reveal" href={item.url} key={i}
                target={item.url.startsWith("/")?"_self":"_blank"} rel="noopener noreferrer"
                style={{transitionDelay:`${i*0.1}s`}}>
                <div className="interes-icon" style={{color:"var(--yellow)",background:"rgba(255,230,0,0.08)",padding:"0.5rem",borderRadius:"8px",display:"inline-flex",marginBottom:"0.2rem"}}>{item.icon}</div>
                <div><h3>{item.title}</h3><p>{item.desc}</p></div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CARRETERA oscuro→crema */}
      <RoadDivider variant="dark-to-light"/>

      {/* REDES */}
      <section className="section">
        <div className="section-tag"><span>Seguinos</span></div>
        <h2 className="section-title reveal-left">Nuestras <span>redes</span></h2>
        <div className="redes-grid">
          {[
            {href:"https://www.instagram.com/academiadechoferespunta/",icon:<IconInstagram/>,label:"Instagram",sub:"@academiadechoferespunta"},
            {href:"https://www.facebook.com/Academia-de-choferes-Punta-339658393468083",icon:<IconFacebook/>,label:"Facebook",sub:"Academia de Choferes Punta"},
            {href:"https://api.whatsapp.com/send?phone=59894774465",icon:<IconWhatsAppGreen/>,label:"WhatsApp Autos",sub:"094 774 465"},
            {href:"https://api.whatsapp.com/send?phone=59898151659",icon:<IconWhatsAppGreen/>,label:"WhatsApp Motos",sub:"098 151 659"},
            {href:"https://api.whatsapp.com/send?phone=59893312019",icon:<IconWhatsAppGreen/>,label:"WhatsApp Inglés",sub:"093 312 019"},
          ].map((r, i) => (
            <a key={i} href={r.href} className="red-card reveal" target="_blank" rel="noopener noreferrer" style={{transitionDelay:`${i*0.1}s`}}>
              <div className="red-icon">{r.icon}</div>
              <div><div className="red-label">{r.label}</div><div className="red-sub">{r.sub}</div></div>
            </a>
          ))}
        </div>
      </section>

      {/* CARRETERA crema→oscuro */}
      <RoadDivider variant="light-to-dark"/>

      {/* MAPA */}
      <div className="section-dark">
        <div className="section-inner">
          <div className="section-tag"><span>Dónde estamos</span></div>
          <h2 className="section-title reveal-left">Maldonado, <span>Uruguay</span></h2>
          <div className="mapa-wrapper reveal">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26176.04!2d-54.9516!3d-34.9013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x957511348d9fc7b7%3A0xe755a1d8711427e8!2sAcademia%20de%20Choferes%20Punta!5e0!3m2!1ses!2suy!4v1" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa Academia Punta"></iframe>
          </div>
        </div>
      </div>

      {/* Degradado oscuro→amarillo */}
      <div style={{height:"40px",background:"linear-gradient(to bottom,#181818 0%,#FFE600 100%)"}}></div>

      {/* CTA */}
      <div className="cta-band">
        <div className="cta-band-inner">
          <div className="semaforo-cta reveal">
            <div className="sem-luz sem-rojo"></div>
            <div className="sem-luz sem-amarillo"></div>
            <div className="sem-luz sem-verde"></div>
          </div>
          <h2 className="reveal">¿Listo para sacar<br/>tu licencia hoy?</h2>
          <div className="cta-band-btns">
            <a href="https://api.whatsapp.com/send?phone=59894774465&text=Quiero%20empezar%20ahora." className="btn-dark reveal" target="_blank" rel="noopener noreferrer">
              <IconWhatsAppGreen/> Autos — 094 774 465
            </a>
            <a href="https://api.whatsapp.com/send?phone=59898151659&text=Quiero%20empezar%20ahora." className="btn-dark reveal" target="_blank" rel="noopener noreferrer">
              <IconWhatsAppGreen/> Motos — 098 151 659
            </a>
            <a href="https://api.whatsapp.com/send?phone=59893312019&text=Hi!%20I%20need%20driving%20lessons%20in%20English." className="btn-dark reveal" target="_blank" rel="noopener noreferrer" style={{background:"#e53935",borderColor:"#e53935"}}>
              <IconWhatsAppGreen/> English — 093 312 019
            </a>
          </div>
        </div>
      </div>

      {/* CONTACTO */}
      <div className="section-dark" id="contacto">
        <div className="section-inner">
          <div className="section-tag"><span>Escribinos</span></div>
          <h2 className="section-title reveal-left">Elegí tu servicio y <span>contactanos</span></h2>
          <div className="contacto-grid">
            <div className="contacto-info reveal-left">
              <h3>Información de contacto</h3>
              {[
                {icon:"🚗", strong:"WhatsApp — Autos",   text:"094 774 465"},
                {icon:"🏍️",strong:"WhatsApp — Motos",   text:"098 151 659"},
                {icon:"🇬🇧",strong:"WhatsApp — Inglés",  text:"093 312 019"},
                {icon:"📍", strong:"Ubicación",           text:"Maldonado, Uruguay — Punta del Este y alrededores"},
                {icon:"🕐", strong:"Horario de clases",   text:"Lunes a Sábados — Amplio y flexible"},
                {icon:"📸", strong:"Instagram",           text:"@academiadechoferespunta"},
              ].map((c, i) => (
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
                  <option value="motos">🏍️ Clases de Motos G1 / G2 / G3</option>
                  <option value="ingles">🇬🇧 Driving lessons in English</option>
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
      <footer ref={footerRef} style={{marginBottom:0,paddingBottom:0}}>
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
                <li><a href="#servicios">Clases de Motos G1/G2/G3</a></li>
                <li><a href="#servicios">Gestoría IDM</a></li>
                <li><a href="#servicios">Prueba Teórica</a></li>
                <li><a href="#servicios">Clases en Inglés</a></li>
                <li><a href="#servicios">Licencias Profesionales</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Academia</h4>
              <ul>
                <li><Link href="/nosotros" style={{fontSize:"0.83rem",color:"rgba(255,255,255,0.4)",textDecoration:"none"}}>Quiénes Somos</Link></li>
                <li><a href="#guia">Guía de Licencia</a></li>
                <li><Link href="/instituciones" style={{fontSize:"0.83rem",color:"rgba(255,255,255,0.4)",textDecoration:"none"}}>Instituciones Médicas</Link></li>
                <li><a href="#materiales">Materiales PDF</a></li>
                <li>
                  <Link href="/simulador" style={{fontSize:"0.83rem",color:"rgba(255,255,0,0.5)",textDecoration:"none"}}>🧠 Simulador Teórico</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contacto</h4>
              <ul>
                <li><a href="https://api.whatsapp.com/send?phone=59894774465">094 774 465 — Autos</a></li>
                <li><a href="https://api.whatsapp.com/send?phone=59898151659">098 151 659 — Motos</a></li>
                <li><a href="https://api.whatsapp.com/send?phone=59893312019">093 312 019 — English</a></li>
                <li><a href="https://www.google.com/search?q=Academia+de+Choferes+Punta+Maldonado#lrd=0x957511348d9fc7b7:0xe755a1d8711427e8,3" target="_blank" rel="noopener noreferrer">⭐ Dejanos una reseña</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Academia de Choferes Punta — Maldonado, Uruguay</span>
            <div style={{display:"flex",gap:"1.2rem",flexWrap:"wrap",justifyContent:"center"}}>
              <Link href="/terminos"   style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.3)",textDecoration:"none",fontFamily:"Barlow Condensed,sans-serif",letterSpacing:"0.08em",textTransform:"uppercase"}}>Términos</Link>
              <Link href="/privacidad" style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.3)",textDecoration:"none",fontFamily:"Barlow Condensed,sans-serif",letterSpacing:"0.08em",textTransform:"uppercase"}}>Privacidad</Link>
              <Link href="/aviso-legal" style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.3)",textDecoration:"none",fontFamily:"Barlow Condensed,sans-serif",letterSpacing:"0.08em",textTransform:"uppercase"}}>Aviso Legal</Link>
            </div>
            <a href="https://api.whatsapp.com/send?phone=50373260136" className="vortex-credit" target="_blank" rel="noopener noreferrer">
              ⚡ Diseñado por VORTEX
            </a>
          </div>
        </div>
      </footer>

      {/* WA float */}
      <a href="https://api.whatsapp.com/send?phone=59894774465" className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <IconWhatsApp/>
      </a>

      {/* QuizModal — siempre visible, botón flotante nunca se oculta */}
      <QuizModal forceOpen={simOpen} onForceClose={() => setSimOpen(false)}/>
    </>
  );
}
