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
  <svg viewBox="0 0 64 40" xmlns="http://www.w3.org/2000/svg" width="40" height="28">
    {/* Carrocería principal */}
    <path d="M4 26 L8 14 Q9 12 11 12 L20 11 Q22 6 24 5 L40 5 Q43 5 45 8 L52 12 L56 12 Q58 12 59 14 L60 26 Z" fill="#2563eb"/>
    {/* Techo / ventanas */}
    <path d="M22 11 L24 6 L40 6 L44 9 L49 12 L22 12 Z" fill="#93c5fd"/>
    {/* Ventana delantera */}
    <path d="M36 6.5 L43 9 L48 12 L37 12 Z" fill="#bfdbfe" opacity="0.9"/>
    {/* Ventana trasera */}
    <path d="M23 6.5 L22 12 L36 12 L36 6.5 Z" fill="#bfdbfe" opacity="0.9"/>
    {/* Cuerpo inferior */}
    <path d="M4 26 L60 26 L60 30 Q60 32 58 32 L6 32 Q4 32 4 30 Z" fill="#1d4ed8"/>
    {/* Rueda trasera */}
    <circle cx="14" cy="32" r="6" fill="#1f2937"/>
    <circle cx="14" cy="32" r="3.5" fill="#6b7280"/>
    <circle cx="14" cy="32" r="1.5" fill="#d1d5db"/>
    {/* Rueda delantera */}
    <circle cx="50" cy="32" r="6" fill="#1f2937"/>
    <circle cx="50" cy="32" r="3.5" fill="#6b7280"/>
    <circle cx="50" cy="32" r="1.5" fill="#d1d5db"/>
    {/* Faros delanteros */}
    <rect x="56" y="17" width="5" height="4" rx="1" fill="#fef08a"/>
    <rect x="56" y="17" width="5" height="4" rx="1" fill="url(#headlight)" opacity="0.8"/>
    {/* Faros traseros */}
    <rect x="3" y="17" width="4" height="4" rx="1" fill="#fca5a5"/>
    {/* Parrilla */}
    <rect x="57" y="22" width="4" height="3" rx="0.5" fill="#93c5fd" opacity="0.7"/>
    {/* Manija */}
    <rect x="38" y="19" width="5" height="1.5" rx="0.75" fill="#93c5fd" opacity="0.6"/>
    <defs>
      <linearGradient id="headlight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fde68a"/>
        <stop offset="100%" stopColor="#fef9c3"/>
      </linearGradient>
    </defs>
  </svg>
);
const SvgMoto = () => (
  <svg viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg" width="44" height="30">
    {/* Rueda trasera */}
    <circle cx="14" cy="36" r="9" fill="#1f2937"/>
    <circle cx="14" cy="36" r="6" fill="#374151"/>
    <circle cx="14" cy="36" r="2.5" fill="#9ca3af"/>
    {/* Rueda delantera */}
    <circle cx="58" cy="36" r="9" fill="#1f2937"/>
    <circle cx="58" cy="36" r="6" fill="#374151"/>
    <circle cx="58" cy="36" r="2.5" fill="#9ca3af"/>
    {/* Chasis/frame */}
    <path d="M14 36 L20 22 L36 18 L52 22 L58 36" stroke="#dc2626" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Motor / bloque central */}
    <rect x="28" y="22" width="16" height="12" rx="3" fill="#dc2626"/>
    <rect x="30" y="24" width="12" height="8" rx="2" fill="#ef4444"/>
    {/* Depósito de combustible */}
    <ellipse cx="36" cy="18" rx="10" ry="5" fill="#b91c1c"/>
    {/* Carenado/asiento */}
    <path d="M26 18 Q36 12 46 18 L44 22 L28 22 Z" fill="#991b1b"/>
    {/* Horquilla delantera */}
    <line x1="52" y1="22" x2="58" y2="30" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="54" y1="20" x2="59" y2="30" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Manubrio */}
    <path d="M50 16 L54 20 L58 17" stroke="#4b5563" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Espejo */}
    <circle cx="50" cy="14" r="2" fill="#6b7280"/>
    {/* Escape */}
    <path d="M20 30 Q16 32 12 30" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Faro delantero */}
    <ellipse cx="61" cy="26" rx="3" ry="4" fill="#fef08a" opacity="0.9"/>
    {/* Piloto trasero */}
    <circle cx="16" cy="24" r="2" fill="#fca5a5" opacity="0.8"/>
    {/* Rayos rueda trasera */}
    {[0,60,120,180,240,300].map(a => {
      const r = a * Math.PI / 180;
      return <line key={a} x1={14+2.5*Math.cos(r)} y1={36+2.5*Math.sin(r)} x2={14+6*Math.cos(r)} y2={36+6*Math.sin(r)} stroke="#6b7280" strokeWidth="0.8"/>;
    })}
    {/* Rayos rueda delantera */}
    {[0,60,120,180,240,300].map(a => {
      const r = a * Math.PI / 180;
      return <line key={a} x1={58+2.5*Math.cos(r)} y1={36+2.5*Math.sin(r)} x2={58+6*Math.cos(r)} y2={36+6*Math.sin(r)} stroke="#6b7280" strokeWidth="0.8"/>;
    })}
  </svg>
);
const SvgDoc = () => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <rect x="8" y="4" width="26" height="34" rx="3" fill="#3b82f6"/>
    <rect x="10" y="6" width="22" height="30" rx="2" fill="#eff6ff"/>
    <path d="M14 14h16M14 19h16M14 24h10" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="34" cy="34" r="8" fill="#22c55e"/>
    <path d="M30 34l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SvgBrain = () => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <circle cx="24" cy="24" r="20" fill="#8b5cf6" opacity="0.15"/>
    <path d="M24 8 C17 8 13 13 13 18 C13 21.5 14.5 24.5 17.5 26.5 L17.5 32 L30.5 32 L30.5 26.5 C33.5 24.5 35 21.5 35 18 C35 13 31 8 24 8Z" fill="#8b5cf6"/>
    <path d="M17.5 32 L30.5 32 L30.5 36 L17.5 36Z" fill="#7c3aed" rx="2"/>
    <line x1="24" y1="8" x2="24" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M13 18 C10 18 8 20 8 23 C8 26 10 28 13 28" stroke="#7c3aed" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M35 18 C38 18 40 20 40 23 C40 26 38 28 35 28" stroke="#7c3aed" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="2" fill="white" opacity="0.7"/>
    <circle cx="28" cy="20" r="2" fill="white" opacity="0.7"/>
  </svg>
);
const SvgShield = () => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <path d="M24 4L6 11v13c0 10 7.5 19.3 18 22 10.5-2.7 18-12 18-22V11L24 4Z" fill="#0ea5e9"/>
    <path d="M24 4L6 11v13c0 10 7.5 19.3 18 22V4Z" fill="#0284c7" opacity="0.4"/>
    <path d="M15 24l6 6 12-12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SvgGlobe = () => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <circle cx="24" cy="24" r="18" fill="#0ea5e9"/>
    <ellipse cx="24" cy="24" rx="8" ry="18" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6"/>
    <line x1="6" y1="24" x2="42" y2="24" stroke="white" strokeWidth="1.5" opacity="0.6"/>
    <line x1="6" y1="17" x2="42" y2="17" stroke="white" strokeWidth="1" opacity="0.4"/>
    <line x1="6" y1="31" x2="42" y2="31" stroke="white" strokeWidth="1" opacity="0.4"/>
    <circle cx="24" cy="24" r="18" fill="none" stroke="white" strokeWidth="2"/>
    {/* Bandera UK superpuesta */}
    <rect x="29" y="8" width="14" height="10" rx="1.5" fill="#1d4ed8"/>
    <path d="M29 8L43 18M43 8L29 18" stroke="white" strokeWidth="1.5"/>
    <path d="M29 8L43 18M43 8L29 18" stroke="#dc2626" strokeWidth="0.8"/>
    <line x1="36" y1="8" x2="36" y2="18" stroke="white" strokeWidth="2.5"/>
    <line x1="29" y1="13" x2="43" y2="13" stroke="white" strokeWidth="2.5"/>
    <line x1="36" y1="8" x2="36" y2="18" stroke="#dc2626" strokeWidth="1.2"/>
    <line x1="29" y1="13" x2="43" y2="13" stroke="#dc2626" strokeWidth="1.2"/>
  </svg>
);
const SvgProfLicense = () => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <rect x="4" y="12" width="40" height="28" rx="3" fill="#f59e0b"/>
    <rect x="6" y="14" width="36" height="24" rx="2" fill="#fffbeb"/>
    <rect x="4" y="12" width="40" height="7" rx="3" fill="#d97706"/>
    <circle cx="14" cy="30" r="5" fill="#fed7aa" stroke="#f59e0b" strokeWidth="1.5"/>
    <path d="M9 38 C9 35 11 33 14 33 C17 33 19 35 19 38" fill="#fde68a" stroke="#f59e0b" strokeWidth="1"/>
    <rect x="22" y="25" width="14" height="2" rx="1" fill="#d97706"/>
    <rect x="22" y="30" width="10" height="2" rx="1" fill="#d97706" opacity="0.6"/>
    <rect x="22" y="35" width="12" height="2" rx="1" fill="#d97706" opacity="0.4"/>
    <circle cx="38" cy="37" r="5" fill="#22c55e"/>
    <path d="M35.5 37l2 2 3.5-3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgSucive = () => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
    <rect x="6" y="8" width="36" height="32" rx="3" fill="#3b82f6"/>
    <rect x="8" y="10" width="32" height="28" rx="2" fill="#eff6ff"/>
    <rect x="6" y="8" width="36" height="8" rx="3" fill="#2563eb"/>
    <rect x="10" y="22" width="6" height="5" rx="1" fill="#3b82f6"/>
    <rect x="19" y="22" width="6" height="5" rx="1" fill="#3b82f6"/>
    <rect x="28" y="22" width="6" height="5" rx="1" fill="#3b82f6"/>
    <rect x="10" y="30" width="24" height="2.5" rx="1" fill="#93c5fd"/>
    <path d="M15 9l1.5 4 1.5-4M28 9l1.5 4 1.5-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const SvgIDM = () => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
    <path d="M24 4L4 16v28h40V16L24 4Z" fill="#10b981"/>
    <path d="M24 4L4 16v28h20V4Z" fill="#059669" opacity="0.4"/>
    <rect x="18" y="28" width="12" height="16" rx="1.5" fill="white"/>
    <rect x="20" y="30" width="8" height="12" rx="1" fill="#10b981" opacity="0.3"/>
    <rect x="14" y="20" width="6" height="5" rx="1" fill="white" opacity="0.8"/>
    <rect x="28" y="20" width="6" height="5" rx="1" fill="white" opacity="0.8"/>
    <path d="M14 16h6M28 16h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const SvgUnasev = () => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
    <path d="M24 4L6 12v13c0 10.5 7.5 20.3 18 23 10.5-2.7 18-12.5 18-23V12L24 4Z" fill="#f59e0b"/>
    <path d="M24 4L6 12v13c0 10.5 7.5 20.3 18 23V4Z" fill="#d97706" opacity="0.35"/>
    <path d="M15 25l6 6 12-12" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SvgPsico = () => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
    <circle cx="24" cy="15" r="9" fill="#ec4899"/>
    <circle cx="24" cy="15" r="6.5" fill="#fce7f3"/>
    <path d="M12 42c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="#ec4899"/>
    <circle cx="21" cy="14" r="1.5" fill="#be185d"/>
    <circle cx="27" cy="14" r="1.5" fill="#be185d"/>
    <path d="M21 18 Q24 20.5 27 18" stroke="#be185d" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);
const SvgHospital = () => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
    <rect x="6" y="12" width="36" height="32" rx="2" fill="#ef4444"/>
    <path d="M14 12V8a2 2 0 012-2h16a2 2 0 012 2v4" fill="#dc2626"/>
    <rect x="6" y="12" width="36" height="7" fill="#dc2626"/>
    <rect x="20" y="20" width="8" height="14" rx="1" fill="white"/>
    <rect x="17" y="23" width="14" height="8" rx="1" fill="white"/>
    <rect x="20" y="36" width="8" height="8" rx="1" fill="#fecaca"/>
  </svg>
);
const SvgWAContact = () => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
    <circle cx="24" cy="24" r="20" fill="#25d366"/>
    <path d="M33 29.5c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.3 1.6-.2.3-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-.9-.8-2-2.2-2.2-2.7-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.3.1-.5 0-.7-.1-.2-.9-2.2-1.2-3-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.4s1.5 3.9 1.7 4.2c.2.3 2.9 4.4 7 6.2 1 .4 1.7.7 2.3.9 1 .3 1.9.3 2.6.2.8-.1 2.4-1 2.7-1.9.3-.9.3-1.7.2-1.9-.1-.1-.3-.2-.7-.4z" fill="white"/>
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
    title: <>TU LICENCIA<span className="highlight">A UN CLICK</span><span className="tagline">Academia Punta</span></>,
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
    ctaLabel: "Contact us on WhatsApp →",
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

/* ══ LIGHTBOX ══ */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div onClick={onClose} style={{
      position:"fixed",inset:0,zIndex:9999,
      background:"rgba(0,0,0,0.92)",
      display:"flex",alignItems:"center",justifyContent:"center",
      cursor:"zoom-out",backdropFilter:"blur(6px)",
      animation:"fadeIn 0.2s ease",
    }}>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
      <div onClick={e => e.stopPropagation()} style={{
        position:"relative",maxWidth:"92vw",maxHeight:"88vh",
        borderRadius:"8px",overflow:"hidden",
        boxShadow:"0 25px 80px rgba(0,0,0,0.7)",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} style={{display:"block",maxWidth:"92vw",maxHeight:"88vh",objectFit:"contain"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0.75rem 1rem",background:"linear-gradient(to top,rgba(0,0,0,0.75),transparent)",fontFamily:"Barlow Condensed,sans-serif",color:"rgba(255,255,255,0.85)",fontSize:"0.85rem",letterSpacing:"0.05em"}}>{alt}</div>
      </div>
      <button onClick={onClose} style={{
        position:"fixed",top:"1.2rem",right:"1.2rem",
        background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",
        color:"white",width:"2.6rem",height:"2.6rem",borderRadius:"50%",
        cursor:"pointer",fontSize:"1.2rem",display:"flex",alignItems:"center",justifyContent:"center",
        backdropFilter:"blur(4px)",
      }}>✕</button>
    </div>
  );
}

/* ══ FLEET CAROUSEL ══ */
const fleetItems = [
  {src:"/fotos/1001079125.jpg", label:"Instructores", cat:"Instructores"},
  {src:"/fotos/1001079209.jpg", label:"Auto", cat:"Auto"},
  {src:"/fotos/1001079134.jpg", label:"Auto", cat:"Auto"},
  {src:"/fotos/1001079143.jpg", label:"Auto", cat:"Auto"},
  {src:"/fotos/1001079146.jpg", label:"Auto", cat:"Auto"},
  {src:"/fotos/1001079170.jpg", label:"Auto", cat:"Auto"},
  {src:"/fotos/1001079137.jpg", label:"Moto", cat:"Moto"},
  {src:"/fotos/1001079116.jpg", label:"Moto", cat:"Moto"},
  {src:"/fotos/1001079161.jpg", label:"Instructores", cat:"Instructores"},
];

function FleetCarousel() {
  const [current, setCurrent] = useState(0);
  const [anim, setAnim] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval>|null>(null);
  const [lightbox, setLightbox] = useState<{src:string;alt:string}|null>(null);
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
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)}/>}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(3,1fr)",
        gap:"1rem",
        transition: anim ? "opacity 0.4s,transform 0.4s" : "none",
        opacity: anim ? 0.4 : 1,
        transform: anim ? "scale(0.98)" : "scale(1)",
      }}>
        {visible.map((f, i) => (
          <div key={i} onClick={() => setLightbox({src:f.src, alt:f.label})} style={{
            position:"relative",aspectRatio:"4/3",overflow:"hidden",
            borderRadius:"6px",border:"1px solid rgba(255,255,255,0.08)",
            cursor:"zoom-in",
          }}>
            <Image src={f.src} alt={f.label} width={600} height={450}
              style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.6s"}}
              unoptimized/>
            <div style={{
              position:"absolute",inset:0,
              background:"linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 55%)",
            }}/>
            {/* Zoom hint */}
            <div style={{position:"absolute",top:"0.6rem",right:"0.6rem",background:"rgba(0,0,0,0.5)",borderRadius:"4px",padding:"0.2rem 0.4rem",backdropFilter:"blur(4px)"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
            </div>
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

/* ══ INSTRUCTOR CAROUSEL ══ */
const instructorSlides = [
  {src:"/fotos/1001079176.jpg", name:"Moto",      role:"Pista La Loma — G1, G2, G3"},
  {src:"/fotos/1001079215.jpg", name:"Instructores",role:"Clases personalizadas"},
  {src:"/fotos/1001079203.jpg", name:"Instructores",     role:"Más de 8 años formando conductores"},
  {src:"/fotos/1001079128.jpg", name:"Auto",  role:"Doble mando — Licencia Categoría A"},
  {src:"/fotos/1001079188.jpg", name:"Instructores",         role:"Clases de autos"},
  {src:"/fotos/1001079218.jpg", name:"Instructores",    role:"Punta del Este & Maldonado"},
];

function InstructorCarousel() {
  const [current, setCurrent] = useState(0);
  const [anim, setAnim] = useState(false);
  const [dir, setDir] = useState<"l"|"r">("r");
  const [lightbox, setLightbox] = useState<{src:string;alt:string}|null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval>|null>(null);
  const visibleCount = 3;
  const total = instructorSlides.length;

  const goTo = useCallback((idx: number, d: "l"|"r") => {
    if (anim) return;
    setDir(d);
    setAnim(true);
    setTimeout(() => { setCurrent(idx); setAnim(false); }, 380);
  }, [anim]);

  const next = useCallback(() => goTo(current >= total - visibleCount ? 0 : current + 1, "r"), [current, anim, goTo]);
  const prev = useCallback(() => goTo(current === 0 ? total - visibleCount : current - 1, "l"), [current, anim, goTo]);

  useEffect(() => {
    autoRef.current = setInterval(next, 4200);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [next]);

  const visible = [
    instructorSlides[current % total],
    instructorSlides[(current + 1) % total],
    instructorSlides[(current + 2) % total],
  ];

  return (
    <div style={{position:"relative"}}>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)}/>}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(3,1fr)",
        gap:"1rem",
        transition: anim ? "opacity 0.38s,transform 0.38s" : "none",
        opacity: anim ? 0.35 : 1,
        transform: anim ? (dir==="r"?"translateX(-12px)":"translateX(12px)") : "translateX(0)",
      }}>
        {visible.map((f, i) => (
          <div key={i} onClick={() => setLightbox({src:f.src, alt:f.name})} style={{
            position:"relative",aspectRatio:"3/4",overflow:"hidden",
            borderRadius:"8px",border:"1px solid rgba(255,255,255,0.1)",
            boxShadow:"0 4px 20px rgba(0,0,0,0.35)",
            cursor:"zoom-in",
          }}>
            <Image src={f.src} alt={f.name} width={600} height={800}
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transition:"transform 0.6s"}}
              unoptimized/>
            <div style={{
              position:"absolute",inset:0,
              background:"linear-gradient(to top,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.1) 55%,transparent 100%)",
            }}/>
            {/* Zoom hint */}
            <div style={{position:"absolute",top:"0.6rem",right:"0.6rem",background:"rgba(0,0,0,0.5)",borderRadius:"4px",padding:"0.2rem 0.4rem",backdropFilter:"blur(4px)"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
            </div>
            <div style={{position:"absolute",bottom:"1rem",left:"1rem",right:"1rem"}}>
              <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1.05rem",color:"white",letterSpacing:"0.06em",lineHeight:1.2}}>{f.name}</div>
              <div style={{fontFamily:"Barlow Condensed,sans-serif",fontSize:"0.75rem",color:"rgba(255,255,255,0.6)",letterSpacing:"0.05em",marginTop:"0.2rem"}}>{f.role}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"1.2rem"}}>
        <button onClick={prev} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",color:"white",width:"2.4rem",height:"2.4rem",borderRadius:"50%",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"}}>‹</button>
        <div style={{display:"flex",gap:"0.4rem"}}>
          {Array.from({length: total - visibleCount + 1}).map((_,i) => (
            <button key={i} onClick={() => goTo(i, i > current ? "r" : "l")} style={{
              width: i === current ? "1.4rem" : "0.4rem",
              height:"0.4rem",borderRadius:"3px",
              background: i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
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
  const footerRef = useRef<HTMLElement>(null); // kept for layout reference
  /* Estado para abrir el simulador desde el nav */
  const [simOpen, setSimOpen]     = useState(false);
  /* Idioma: detecta automáticamente el idioma del dispositivo */
  const [lang, setLang] = useState<"es"|"en">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("academiaPuntaLang");
      if (stored === "en" || stored === "es") return stored as "es"|"en";
      const browser = navigator.language || "";
      return browser.toLowerCase().startsWith("en") ? "en" : "es";
    }
    return "es";
  });

  const toggleLang = () => {
    const next = lang === "es" ? "en" : "es";
    setLang(next);
    if (typeof window !== "undefined") localStorage.setItem("academiaPuntaLang", next);
  };

  /* Textos traducidos */
  const t = {
    navNosotros:   lang==="en" ? "About us"       : "Nosotros",
    navServicios:  lang==="en" ? "Services"        : "Servicios",
    navGuia:       lang==="en" ? "Guide"           : "Guía",
    navMateriales: lang==="en" ? "Materials"       : "Materiales",
    navOpiniones:  lang==="en" ? "Reviews"         : "Opiniones",
    navSimulador:  lang==="en" ? "🧠 Start Simulator" : "🧠 Iniciar Simulador",
    navContacto:   lang==="en" ? "Contact"         : "Contacto",
    navCta:        lang==="en" ? "Get started →"   : "Empezar →",
    navCtaMobile:  lang==="en" ? "Get started"     : "Empezar ahora",
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
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
      tramites:"gestoría de trámites IDM", teorica:"el simulador de prueba teórica",
      defensivo:"clases de apoyo para prueba teórica", psicologia:"apoyo psicológico",
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
            <li><Link href="/nosotros" style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:600,fontSize:"0.8rem",letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(255,255,255,0.65)",textDecoration:"none"}}>{t.navNosotros}</Link></li>
            <li><a href="#servicios">{t.navServicios}</a></li>
            <li><a href="#guia">{t.navGuia}</a></li>
            <li><a href="#materiales">{t.navMateriales}</a></li>
            <li><a href="#testimonios">{t.navOpiniones}</a></li>
            <li>
              {/* Link directo al Simulador — abre el modal flotante */}
              <button onClick={() => setSimOpen(true)} style={{
                background:"none",border:"none",cursor:"pointer",padding:0,
                fontFamily:"Barlow Condensed,sans-serif",fontWeight:600,
                fontSize:"0.8rem",letterSpacing:"0.12em",textTransform:"uppercase",
                color:"var(--yellow)",
              }}>{t.navSimulador}</button>
            </li>
            <li><a href="#contacto">{t.navContacto}</a></li>
          </ul>
          {/* Language switcher */}
          <button onClick={toggleLang} title={lang==="es"?"Switch to English":"Cambiar a Español"} style={{
            background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",
            color:"white",borderRadius:"4px",cursor:"pointer",
            padding:"0.28rem 0.6rem",fontFamily:"Barlow Condensed,sans-serif",
            fontWeight:700,fontSize:"0.75rem",letterSpacing:"0.1em",
            display:"flex",alignItems:"center",gap:"0.3rem",flexShrink:0,
            transition:"background 0.2s",
          }}>
            {lang==="es" ? "🇬🇧 EN" : "🇺🇾 ES"}
          </button>
          <a href="#contacto" className="btn-nav">{t.navCta}</a>
          <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Menú">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div className={`mobile-menu${menuOpen?" open":""}`}>
          <Link href="/nosotros" onClick={()=>setMenuOpen(false)} style={{fontFamily:"Barlow Condensed,sans-serif",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,0.65)",textDecoration:"none",padding:"0.75rem 0",borderBottom:"1px solid rgba(255,255,255,0.08)",fontSize:"0.95rem"}}>{t.navNosotros}</Link>
          <a href="#servicios"   onClick={()=>setMenuOpen(false)}>{t.navServicios}</a>
          <a href="#guia"        onClick={()=>setMenuOpen(false)}>{t.navGuia}</a>
          <a href="#materiales"  onClick={()=>setMenuOpen(false)}>{t.navMateriales}</a>
          <a href="#testimonios" onClick={()=>setMenuOpen(false)}>{t.navOpiniones}</a>
          {/* Simulador en mobile menu */}
          <button onClick={()=>{setSimOpen(true);setMenuOpen(false);}} style={{
            background:"none",border:"none",cursor:"pointer",textAlign:"left",width:"100%",
            fontFamily:"Barlow Condensed,sans-serif",fontWeight:600,letterSpacing:"0.1em",
            textTransform:"uppercase",color:"var(--yellow)",
            padding:"0.75rem 0",borderBottom:"1px solid rgba(255,255,255,0.08)",fontSize:"0.95rem",
          }}>{t.navSimulador}</button>
          {/* Language toggle en mobile */}
          <button onClick={()=>{toggleLang();}} style={{
            background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",
            color:"white",borderRadius:"4px",cursor:"pointer",width:"fit-content",
            padding:"0.5rem 1rem",fontFamily:"Barlow Condensed,sans-serif",
            fontWeight:700,fontSize:"0.85rem",letterSpacing:"0.1em",margin:"0.5rem 0",
          }}>
            {lang==="es" ? "🇬🇧 Switch to English" : "🇺🇾 Cambiar a Español"}
          </button>
          <a href="#contacto" className="btn-mobile" onClick={()=>setMenuOpen(false)}>{t.navCtaMobile}</a>
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
            {icon:<SvgCar/>,      title:"Clases de Autos",             desc:"LICENCIA CATEGORÍA A. Vehículos registrados y habilitados en IDM. Cuentan con doble pedalera e identificación de auto escuela para clases y pruebas prácticas en Pista La Loma y en la vía pública."},
            {icon:<SvgMoto/>,     title:"Clases de Motos G1, G2 y G3", desc:"En pista La Loma. Vehículo, casco y reflectivos incluidos. VEHÍCULO CAT. G2: HONDA WAVE 110 — CAT. G3: BMW G310r"},
            {icon:<SvgDoc/>,      title:"Gestoría IDM",                 desc:"Hacemos todos los trámites en la Intendencia por vos. Tu tiempo vale oro."},
            {icon:<SvgBrain/>,    title:"Clases de apoyo para PRUEBA TEÓRICA", desc:"Clase de apoyo con docente. El 70% reprueba sin preparación."},
            {icon:<SvgShield/>,   title:"Manejo Defensivo",             desc:"Lunes, miércoles y viernes. Doble horario: 8:00 y 18:30 hs."},
            {icon:<SvgGlobe/>,    title:"Clases en Inglés",             desc:"Need driving lessons in English? We offer classes for international visitors."},
            {icon:<SvgProfLicense/>, title:"Licencias Profesionales",  desc:"Vehículos especiales. Formación y gestoría ante la IDM Maldonado."},
          ].map((s,i) => (
            <div className="service-card reveal" key={i} style={{transitionDelay:`${i*0.08}s`}}>
              <span className="s-icon" style={{color:"#1a1a2e",display:"flex",alignItems:"center",justifyContent:"center",width:"3.5rem",height:"3.5rem",background:"linear-gradient(135deg,#e8eaf6 0%,#c5cae9 100%)",borderRadius:"12px",marginBottom:"1rem",border:"1px solid rgba(63,81,181,0.18)",boxShadow:"0 2px 8px rgba(63,81,181,0.10)"}}>{s.icon}</span>
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
            <h2 style={{color:"#fff",fontWeight:900,textShadow:"0 2px 12px rgba(0,0,0,0.85),0 1px 4px rgba(0,0,0,0.9)"}}>Nuestra <span>flota</span></h2>
            <p style={{color:"#fff",fontWeight:700,textShadow:"0 1px 8px rgba(0,0,0,0.9),0 1px 3px rgba(0,0,0,0.95)"}}>Autos nuevos con doble mando registrados y habilitados en IDM como Coche Escuela.</p>
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
              {title:"¿CUÁNDO HACERLO?",  desc:"Tu instructor/a te asesorará para saber cuándo y cómo poder obtenerlo."},
              {title:"Clases de apoyo para prueba teórica",    desc:"Se coordina con el docente de la academia. Formato presencial o virtual."},
              {title:"Simulador de prueba teórica",    desc:"Buscalo aquí para evaluar tus conocimientos y entrenar para la prueba.", link2:true},
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
                {g.link2 && (
                  <Link href="/simulador" style={{display:"inline-flex",alignItems:"center",gap:"0.4rem",marginTop:"0.7rem",color:"#FFE600",fontFamily:"Barlow Condensed,sans-serif",fontWeight:700,fontSize:"0.78rem",letterSpacing:"0.12em",textTransform:"uppercase",textDecoration:"none"}}>
                    🧠 Ir al Simulador →
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
            <div className="material-info"><h3>💻 Clase Virtual — Apoyo Teórico</h3><p>Clase con docente online o presencial. El 70% reprueba sin preparación.</p></div>
            <a href="https://api.whatsapp.com/send?phone=59898151659" className="btn-download" target="_blank" rel="noopener noreferrer">CONSULTANOS →</a>
          </div>
        </div>
      </section>

      {/* FLOTA */}
      <div className="section-dark">
        <div className="section-inner">
          <div className="section-tag"><span>Nuestros vehículos</span></div>
          <h2 className="section-title reveal-left">Flota <span>de la academia</span></h2>
          <p style={{color:"rgba(255,255,255,0.55)",marginBottom:"1.5rem",fontSize:"0.9rem"}}>Vehículos nuevos, registrados y habilitados</p>
          <FleetCarousel/>
        </div>
      </div>

      {/* BANNER MOTOS */}
      <div className="img-banner">
        <Image src="/fotos/1001079137.jpg" alt="Clases de moto BMW G310 — Academia Punta" width={1600} height={420} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 30%"}} unoptimized/>
        <div className="img-banner-overlay">
          <div className="img-banner-text">
            <h2 style={{color:"#fff",fontWeight:900,textShadow:"0 2px 12px rgba(0,0,0,0.85),0 1px 4px rgba(0,0,0,0.9)"}}>Clases de <span>motos</span></h2>
            <p style={{color:"#fff",fontWeight:700,textShadow:"0 1px 8px rgba(0,0,0,0.9),0 1px 3px rgba(0,0,0,0.95)"}}>En pista La Loma. Vehículo, casco y reflectivos incluidos. VEHÍCULO CAT. G2: HONDA WAVE 110 — CAT. G3: BMW G310r. Lunes a sábados.</p>
            <a href="https://api.whatsapp.com/send?phone=59898151659&text=Quiero%20clases%20de%20motos." target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:"0.45rem",background:"rgba(37,211,102,0.92)",color:"#000",padding:"0.55rem 1.1rem",fontFamily:"Barlow Condensed,sans-serif",fontSize:"0.85rem",letterSpacing:"0.08em",textDecoration:"none",borderRadius:"4px",fontWeight:700,backdropFilter:"blur(4px)",border:"1px solid rgba(255,255,255,0.2)"}}>
              <span style={{width:"18px",height:"18px",display:"inline-flex",flexShrink:0}}><IconWhatsAppGreen/></span> Motos — 098 151 659
            </a>
          </div>
        </div>
      </div>

      {/* BANNER INGLÉS */}
      <div className="img-banner" style={{height:"260px"}}>
        <Image src="/fotos/1001079155.jpg" alt="Driving lessons in English" width={1600} height={260} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 60%",filter:"brightness(0.25)"}} unoptimized/>
        {/* Franja amarilla superior */}
        <div style={{position:"absolute",top:0,left:0,right:0,height:"4px",background:"#FFE600",zIndex:3}}/>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"1rem",padding:"2rem",textAlign:"center",zIndex:2}}>
          <div style={{display:"flex",gap:"0.6rem",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:"1.8rem"}}>🇬🇧</span>
            <p style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"clamp(1.6rem,4vw,2.6rem)",color:"#fff",fontWeight:900,letterSpacing:"0.1em",margin:0,textShadow:"0 2px 12px rgba(0,0,0,0.9),0 1px 4px rgba(0,0,0,0.95)"}}>Driving lessons in English</p>
          </div>
          <p style={{color:"#fff",fontWeight:700,fontSize:"0.88rem",margin:0,letterSpacing:"0.05em",fontFamily:"Barlow Condensed,sans-serif",textShadow:"0 1px 8px rgba(0,0,0,0.9),0 1px 3px rgba(0,0,0,0.95)"}}>International visitors welcome · Certified instructors · Punta del Este, Uruguay</p>
          <a href="https://api.whatsapp.com/send?phone=59893312019&text=Hi!%20I%20need%20driving%20lessons%20in%20English." target="_blank" rel="noopener noreferrer" style={{
            display:"inline-flex",alignItems:"center",gap:"0.6rem",
            background:"#FFE600",color:"#000",
            padding:"0.7rem 1.6rem",
            fontFamily:"Bebas Neue,sans-serif",fontSize:"1rem",letterSpacing:"0.12em",
            textDecoration:"none",borderRadius:"4px",fontWeight:700,
            boxShadow:"0 4px 20px rgba(255,230,0,0.35)",
            border:"2px solid #FFE600",
          }}>
            <span style={{width:"18px",height:"18px",display:"inline-flex",flexShrink:0}}><IconWhatsApp/></span>
            Contact us — +598 93 312 019
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
          <InstructorCarousel/>
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
                <div className="interes-icon" style={{color:"#1a1a2e",background:"linear-gradient(135deg,#e8eaf6 0%,#c5cae9 100%)",padding:"0.6rem",borderRadius:"10px",display:"inline-flex",marginBottom:"0.2rem",border:"1px solid rgba(63,81,181,0.15)",boxShadow:"0 2px 8px rgba(63,81,181,0.10)"}}>{item.icon}</div>
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
          <p style={{color:"rgba(255,255,255,0.5)",marginBottom:"1rem",fontSize:"0.85rem"}}>Punta del Este – Maldonado – Piriápolis</p>
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
          <h2 className="reveal">¿Listo para obtener<br/>tu licencia?</h2>
          <div className="cta-band-btns">
            <a href="https://api.whatsapp.com/send?phone=59894774465&text=Quiero%20empezar%20ahora." className="btn-dark reveal" target="_blank" rel="noopener noreferrer">
              <IconWhatsAppGreen/> Autos — 094 774 465
            </a>
            <a href="https://api.whatsapp.com/send?phone=59898151659&text=Quiero%20empezar%20ahora." className="btn-dark reveal" target="_blank" rel="noopener noreferrer">
              <IconWhatsAppGreen/> Motos — 098 151 659
            </a>
            <a href="https://api.whatsapp.com/send?phone=59893312019&text=Hi!%20I%20need%20driving%20lessons%20in%20English." className="btn-dark reveal" target="_blank" rel="noopener noreferrer" style={{background:"#FFE600",borderColor:"#FFE600",color:"#000",boxShadow:"0 4px 16px rgba(255,230,0,0.3)"}}>
              <IconWhatsApp/> English — 093 312 019
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
                {icon:"📍", strong:"Ubicación",           text:"Uruguay, Punta del Este – Maldonado – Piriápolis"},
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
                  <option value="teorica">🧠 Simulador de Prueba Teórica</option>
                  <option value="defensivo">🛡️ Clases de Apoyo para Prueba Teórica</option>
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
      <footer style={{marginBottom:0,paddingBottom:0,display:"block"}}>
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#hero" className="footer-brand-logo">
                <Image src={LOGO} alt="Logo" width={42} height={42} unoptimized/>
                <div className="footer-logo-text">Academia <span>Punta</span></div>
              </a>
              <p>Academia de Choferes Punta, referente en Punta del Este – Maldonado – Piriápolis; con más de 15 años formando conductores seguros.</p>
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
