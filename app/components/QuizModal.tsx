"use client";

import { useState, useEffect } from "react";

const preguntas = [
  { pregunta: "DESPUÉS DE MANEJAR POR MÁS DE 4 HS SE DEBE DESCANSAR POR LO MENOS", opciones: ["10 minutos", "20 minutos", "60 minutos"], correcta: 1 },
  { pregunta: "¿QUÉ DEBERÍA HACER CUANDO ES ADELANTADO POR OTRO VEHÍCULO?", opciones: ["Mantener la velocidad o disminuirla", "Encender las luces", "Frenar bruscamente", "Aumentar la velocidad"], correcta: 0 },
  { pregunta: "ANTES DE EMPEZAR A PASAR AL VEHÍCULO QUE VA ADELANTE, USTED DEBERÁ", opciones: ["Tocar bocina", "Colocarse en la senda derecha y prender el señalero", "Mirar por el espejo retrovisor y prender el señalero", "Hacer cambio de luces"], correcta: 2 },
  { pregunta: "¿PARA QUIÉN ES OBLIGATORIO EL CINTURÓN DE SEGURIDAD?", opciones: ["Solo para los ocupantes de los asientos traseros", "Solo para los ocupantes de los asientos delanteros", "Ninguna de las anteriores", "Para todos los ocupantes del vehículo"], correcta: 3 },
  { pregunta: "SOLO SE PUEDE ADELANTAR A OTRO VEHÍCULO POR LA DERECHA SI ESTÁ GIRANDO O SI SE DISPONE A LA IZQUIERDA", opciones: ["Verdadero", "Falso"], correcta: 0 },
  { pregunta: "EL COLOR DE LAS LUCES QUE LOS VEHÍCULOS PROYECTAN HACIA ADELANTE PUEDE SER", opciones: ["Rojas o blancas", "Verdes o blancas", "Amarillas o blancas", "Ninguna de las anteriores son correctas"], correcta: 2 },
  { pregunta: "CUANDO EL VEHÍCULO SUFRE UN DESPERFECTO EN LA CARRETERA SE DEBE COLOCAR BALIZA O TRIÁNGULO POR LO MENOS A 50 MTS", opciones: ["Verdadero", "Falso"], correcta: 0 },
  { pregunta: "CUANDO LOS NEUMÁTICOS TIENEN POCA PRESIÓN DE AIRE SE AHORRA COMBUSTIBLE", opciones: ["Verdadero", "Falso"], correcta: 1 },
  { pregunta: "SI USTED DEBE ESTACIONAR EN BAJADA", opciones: ["Deja derecho el auto y aplica el freno de mano", "Deja derecho el auto y le pone el cambio", "Aplica freno de mano y gira las ruedas hacia el cordón", "Aplica freno de mano y gira las ruedas en sentido contrario al cordón"], correcta: 2 },
  { pregunta: "SU LICENCIA PUEDE SER NEGADA SI UD. ESTÁ MENTALMENTE INCAPACITADO PARA CONDUCIR CON SEGURIDAD", opciones: ["Verdadero", "Falso"], correcta: 0 },
  { pregunta: "EL HIDROPLANEAMIENTO ES", opciones: ["Agua en el ambiente que hace difícil la conducción", "Agua en la calzada que hace que los neumáticos pierdan adherencia", "Demasiada agua en el radiador", "Precipitaciones que reducen la visibilidad"], correcta: 1 },
  { pregunta: "SI USTED DEBE ESTACIONAR EN REPECHO", opciones: ["Deja derecho el auto y aplica el freno de mano", "Deja derecho el auto y en neutral", "Aplica freno de mano y gira las ruedas hacia el cordón", "Aplica freno de mano y gira las ruedas hacia la calle"], correcta: 3 },
  { pregunta: "LA PREFERENCIA DE PASO DE UN VEHÍCULO NO REGIRÁ", opciones: ["En los cruces regulados con semáforos o agentes de tránsito", "En las vías de doble tránsito", "En los cruces no regulados", "Ninguna de las anteriores es correcta"], correcta: 0 },
  { pregunta: "EN EL CRUCE CUYO SEMÁFORO SE ENCUENTRA APAGADO O DESCOMPUESTO LA PREFERENCIA SERÁ DE", opciones: ["Los que circulan por la avenida", "Los vehículos que aparecen por la derecha", "Los que llegan 1ro al cruce", "Los vehículos que aparecen por la izquierda"], correcta: 1 },
  { pregunta: "TIENEN PREFERENCIA DE PASO CUANDO HAGAN LAS SEÑALES CORRESPONDIENTES", opciones: ["Patrulleros y bomberos", "Las ambulancias", "Los vehículos del departamento de tránsito", "Todas son correctas"], correcta: 3 },
  { pregunta: "NUNCA SE DEBE ADELANTAR A OTRO VEHÍCULO QUE ESTÁ DOBLANDO A LA DERECHA", opciones: ["Verdadero", "Falso"], correcta: 0 },
  { pregunta: "EN CONDICIONES DE TRÁNSITO NORMALES UN VEHÍCULO PODRÁ SER CONDUCIDO MARCHA ATRÁS SOLO", opciones: ["50 mts", "25 mts", "En caso de necesidad o para estacionar", "Ninguna de las anteriores"], correcta: 2 },
  { pregunta: "EN CASO DE QUEDARSE SIN FRENOS SE DEBE DEJAR QUE EL VEHÍCULO AMINORE LA VELOCIDAD EVITANDO OBSTÁCULOS", opciones: ["Verdadero", "Falso"], correcta: 0 },
  { pregunta: "CRUCE PEATONAL ES", opciones: ["Parte de la calle habilitada para ser atravesado por los peatones", "La senda de seguridad formada por la prolongación imaginaria del eje de la calzada", "Parte de la vereda donde se debe esperar hasta poder cruzar", "Ninguna de las anteriores"], correcta: 0 },
  { pregunta: "LA IDM ESTÁ FACULTADA PARA RETIRAR DE LA VÍA PÚBLICA A LOS VEHÍCULOS MAL ESTACIONADOS O EN LUGARES PROHIBIDOS", opciones: ["Verdadero", "Falso"], correcta: 0 },
  { pregunta: "AUN TOMANDO DESCANSO NO SE PUEDE CONDUCIR POR MÁS DE 9 HORAS SEGUIDAS", opciones: ["Verdadero", "Falso"], correcta: 0 },
  { pregunta: "ES NECESARIO DUPLICAR LA DISTANCIA ENTRE SU VEHÍCULO Y EL QUE LO ANTECEDE (Marque la correcta)", opciones: ["Al amanecer", "Al anochecer", "Pavimento resbaladizo", "Todas son correctas"], correcta: 3 },
  { pregunta: "PARA CONDUCIR ADECUADAMENTE ES IMPORTANTE RESPETAR LA LUZ DEL SEMÁFORO QUE ESTÁ FRENTE A UD.", opciones: ["Verdadero", "Falso"], correcta: 0 },
  { pregunta: "LA VISIÓN SE REDUCE", opciones: ["En horas de la noche", "Con el encandilamiento", "Cuando mayor velocidad se desarrolla", "Todas las anteriores son correctas"], correcta: 3 },
  { pregunta: "EL USO DEL CINTURÓN DE SEGURIDAD ES TAN IMPORTANTE EN LA CIUDAD COMO EN LA CARRETERA", opciones: ["Verdadero", "Falso"], correcta: 0 },
  { pregunta: "PARA SEÑALIZAR CON EL BRAZO UN GIRO A LA DERECHA ESTE DEBE COLOCAR EXTENDIDO HORIZONTALMENTE", opciones: ["Verdadero", "Falso"], correcta: 1 },
  { pregunta: "UD. PUEDE CIRCULAR SIN ESPEJO RETROVISOR SI SU VEHÍCULO ES DE TRANSPORTE O DE CARGA", opciones: ["Verdadero", "Falso"], correcta: 1 },
  { pregunta: "SI ME IRRITO O ME ENOJO MIENTRAS CONDUZCO, MI COMPORTAMIENTO DEBE SER", opciones: ["Continuar la marcha y llegar lo antes posible", "Detener el vehículo, estacionar y esperar a tener el control de mis emociones", "Llamar por teléfono a alguien y explicar mi situación"], correcta: 1 },
  { pregunta: "LOS PEATONES QUE CIRCULAN POR LA VEREDA TIENEN PREFERENCIA ANTE UN VEHÍCULO QUE ATRAVIESA PARA ENTRAR O SALIR DE UN GARAJE", opciones: ["Verdadero", "Falso"], correcta: 0 },
  { pregunta: "HASTA LOS 70 AÑOS DE EDAD NO SE ALTERA LA RAPIDEZ PARA REACCIONAR", opciones: ["Verdadero", "Falso"], correcta: 1 },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Estado = "idle" | "jugando" | "resultado";
type Respuesta = { pregunta: string; seleccion: number; correcta: number; correctamente: boolean };

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY + lineHeight;
}

export default function QuizModal() {
  const [abierto, setAbierto] = useState(false);
  const [estado, setEstado] = useState<Estado>("idle");
  const [pregs, setPregs] = useState(preguntas.slice(0, 30));
  const [actual, setActual] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [confirmada, setConfirmada] = useState(false);
  const [errores, setErrores] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [mostrarAnuncio, setMostrarAnuncio] = useState(false);
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [nombre, setNombre] = useState("");
  const [generandoPDF, setGenerandoPDF] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMostrarAnuncio(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (estado !== "jugando") return;
    const t = setInterval(() => setTiempo(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [estado]);

  const formatTiempo = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const iniciar = () => {
    setPregs(shuffle(preguntas).slice(0, 30));
    setActual(0);
    setSeleccion(null);
    setConfirmada(false);
    setErrores(0);
    setTiempo(0);
    setRespuestas([]);
    setEstado("jugando");
  };

  const confirmar = () => {
    if (seleccion === null) return;
    setConfirmada(true);
    const correctamente = seleccion === pregs[actual].correcta;
    if (!correctamente) setErrores(e => e + 1);
    setRespuestas(prev => [...prev, {
      pregunta: pregs[actual].pregunta,
      seleccion,
      correcta: pregs[actual].correcta,
      correctamente,
    }]);
  };

  const siguiente = () => {
    if (actual + 1 >= pregs.length) {
      setEstado("resultado");
    } else {
      setActual(a => a + 1);
      setSeleccion(null);
      setConfirmada(false);
    }
  };

  const aprobado = errores <= 5;
  const progreso = ((actual + (confirmada ? 1 : 0)) / pregs.length) * 100;
  const correctas = 30 - errores;
  const porcentaje = Math.round((correctas / 30) * 100);

  const generarPDF = async () => {
    setGenerandoPDF(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 794;
      canvas.height = 1400;
      const ctx = canvas.getContext("2d")!;

      // Fondo oscuro
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Header band
      ctx.fillStyle = "#FFFF00";
      ctx.fillRect(0, 0, canvas.width, 8);

      // Logo círculo (simulado con canvas)
      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.src = "https://academiadechoferespunta.com.uy/wp-content/uploads/2022/04/ICONO-circle-cropped-g.png";

      await new Promise<void>((resolve) => {
        logoImg.onload = () => resolve();
        logoImg.onerror = () => resolve();
        setTimeout(resolve, 2000);
      });

      // Logo
      if (logoImg.complete && logoImg.naturalWidth > 0) {
        ctx.drawImage(logoImg, 40, 30, 70, 70);
      } else {
        ctx.fillStyle = "#FFFF00";
        ctx.beginPath();
        ctx.arc(75, 65, 35, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.font = "bold 18px Arial";
        ctx.textAlign = "center";
        ctx.fillText("AP", 75, 72);
        ctx.textAlign = "left";
      }

      // Nombre academia
      ctx.fillStyle = "#f5f5f5";
      ctx.font = "bold 22px Arial";
      ctx.fillText("Academia de Choferes Punta", 125, 55);
      ctx.fillStyle = "#888";
      ctx.font = "14px Arial";
      ctx.fillText("Maldonado, Uruguay — academiadechoferespunta.com.uy", 125, 78);
      ctx.fillStyle = "#666";
      ctx.font = "12px Arial";
      ctx.fillText("WhatsApp Autos: 094 774 465  |  Motos: 098 151 659", 125, 96);

      // Línea separadora
      ctx.strokeStyle = "#222";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(40, 115);
      ctx.lineTo(754, 115);
      ctx.stroke();

      // Título certificado
      ctx.fillStyle = "#FFFF00";
      ctx.font = "bold 13px Arial";
      ctx.fillText("SIMULADOR DE PRUEBA TEÓRICA — RESULTADO", 40, 145);

      // Fecha
      const fecha = new Date().toLocaleDateString("es-UY", { day: "2-digit", month: "long", year: "numeric" });
      ctx.fillStyle = "#666";
      ctx.font = "12px Arial";
      ctx.textAlign = "right";
      ctx.fillText(fecha, 754, 145);
      ctx.textAlign = "left";

      // Nombre participante
      if (nombre.trim()) {
        ctx.fillStyle = "#aaa";
        ctx.font = "13px Arial";
        ctx.fillText("Participante:", 40, 175);
        ctx.fillStyle = "#f5f5f5";
        ctx.font = "bold 16px Arial";
        ctx.fillText(nombre.trim(), 130, 175);
      }

      // Caja resultado
      const resultY = nombre.trim() ? 200 : 175;
      ctx.fillStyle = aprobado ? "rgba(76,175,80,0.1)" : "rgba(244,67,54,0.1)";
      ctx.fillRect(40, resultY, 714, 120);
      ctx.strokeStyle = aprobado ? "#4CAF50" : "#f44336";
      ctx.lineWidth = 2;
      ctx.strokeRect(40, resultY, 714, 120);

      // Resultado texto
      ctx.fillStyle = aprobado ? "#4CAF50" : "#f44336";
      ctx.font = "bold 32px Arial";
      ctx.textAlign = "center";
      ctx.fillText(aprobado ? "✓ APROBADO" : "✗ NO APROBADO", 397, resultY + 45);

      ctx.fillStyle = "#aaa";
      ctx.font = "14px Arial";
      ctx.fillText(
        aprobado
          ? "Resultado satisfactorio — Máximo 5 errores permitidos"
          : `Resultado no satisfactorio — ${errores} errores (máximo permitido: 5)`,
        397, resultY + 75
      );

      ctx.fillStyle = "#888";
      ctx.font = "12px Arial";
      ctx.fillText("Este es un simulador de autoevaluación — No es un certificado oficial de la IDM", 397, resultY + 100);
      ctx.textAlign = "left";

      // Stats
      const statsY = resultY + 140;
      const stats = [
        { label: "Correctas", val: `${correctas}/30`, color: "#4CAF50" },
        { label: "Errores", val: `${errores}`, color: errores > 5 ? "#f44336" : "#888" },
        { label: "Porcentaje", val: `${porcentaje}%`, color: "#FFFF00" },
        { label: "Tiempo", val: formatTiempo(tiempo), color: "#aaa" },
      ];

      stats.forEach((s, i) => {
        const x = 40 + i * 180;
        ctx.fillStyle = "#161616";
        ctx.fillRect(x, statsY, 165, 70);
        ctx.strokeStyle = "#222";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, statsY, 165, 70);
        ctx.fillStyle = s.color;
        ctx.font = "bold 24px Arial";
        ctx.textAlign = "center";
        ctx.fillText(s.val, x + 82, statsY + 35);
        ctx.fillStyle = "#666";
        ctx.font = "11px Arial";
        ctx.fillText(s.label.toUpperCase(), x + 82, statsY + 55);
      });
      ctx.textAlign = "left";

      // Línea
      ctx.strokeStyle = "#222";
      ctx.beginPath();
      ctx.moveTo(40, statsY + 90);
      ctx.lineTo(754, statsY + 90);
      ctx.stroke();

      // Detalle de respuestas
      ctx.fillStyle = "#FFFF00";
      ctx.font = "bold 13px Arial";
      ctx.fillText("DETALLE DE RESPUESTAS", 40, statsY + 115);

      let y = statsY + 140;
      respuestas.forEach((r, i) => {
        if (y > 1340) return;

        // Fondo alternado
        ctx.fillStyle = i % 2 === 0 ? "#111" : "#0d0d0d";
        ctx.fillRect(40, y - 15, 714, 50);

        // Número
        ctx.fillStyle = "#555";
        ctx.font = "bold 11px Arial";
        ctx.fillText(`${i + 1}.`, 48, y + 5);

        // Pregunta
        ctx.fillStyle = "#ccc";
        ctx.font = "11px Arial";
        const pregTruncada = r.pregunta.length > 60 ? r.pregunta.substring(0, 60) + "..." : r.pregunta;
        ctx.fillText(pregTruncada, 68, y);

        // Respuesta dada
        ctx.fillStyle = "#888";
        ctx.font = "10px Arial";
        const respTruncada = preguntas.find(p => p.pregunta === r.pregunta)?.opciones[r.seleccion] || "";
        const respCorta = respTruncada.length > 55 ? respTruncada.substring(0, 55) + "..." : respTruncada;
        ctx.fillText(`Tu respuesta: ${respCorta}`, 68, y + 18);

        // Indicador correcto/incorrecto
        ctx.fillStyle = r.correctamente ? "#4CAF50" : "#f44336";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "right";
        ctx.fillText(r.correctamente ? "✓" : "✗", 750, y + 8);
        ctx.textAlign = "left";

        y += 52;
      });

      // Footer
      const footerY = Math.max(y + 20, 1340);
      ctx.fillStyle = "#FFFF00";
      ctx.fillRect(0, footerY, canvas.width, 4);

      ctx.fillStyle = "#555";
      ctx.font = "11px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Academia de Choferes Punta — Maldonado, Uruguay", 397, footerY + 25);
      ctx.fillText("Este documento es una autoevaluación y no reemplaza el examen oficial de la IDM", 397, footerY + 42);

      // Ajustar altura del canvas al contenido real
      const finalHeight = footerY + 60;
      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = 794;
      finalCanvas.height = finalHeight;
      const finalCtx = finalCanvas.getContext("2d")!;
      finalCtx.drawImage(canvas, 0, 0);

      // Descargar
      const link = document.createElement("a");
      link.download = `resultado-prueba-teorica-academia-punta.png`;
      link.href = finalCanvas.toDataURL("image/png");
      link.click();

    } catch (e) {
      console.error("Error generando PDF:", e);
    }
    setGenerandoPDF(false);
  };

  return (
    <>
      {/* ANUNCIO FLOTANTE */}
      {mostrarAnuncio && !abierto && (
        <div style={{
          position: "fixed", bottom: "6rem", left: "1.5rem", zIndex: 199,
          background: "#111", border: "1px solid #FFFF00", maxWidth: "280px",
          boxShadow: "0 8px 32px rgba(255,255,0,0.15)",
          animation: "slideInLeft 0.5s ease both",
        }}>
          <button onClick={() => setMostrarAnuncio(false)} style={{
            position: "absolute", top: "0.5rem", right: "0.5rem",
            background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "1rem",
          }}>×</button>
          <div style={{ padding: "1.2rem 1.5rem" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "0.7rem", color: "#FFFF00", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              🧠 Prueba Teórica
            </div>
            <p style={{ fontSize: "0.85rem", color: "#ddd", lineHeight: 1.5, marginBottom: "1rem" }}>
              ¿Estás listo para el examen? Probá con nuestro simulador de 30 preguntas y bajá tu resultado en PDF.
            </p>
            <button onClick={() => { setAbierto(true); setMostrarAnuncio(false); }} style={{
              background: "#FFFF00", color: "#000", border: "none",
              padding: "0.7rem 1.2rem", fontFamily: "Syne, sans-serif",
              fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", width: "100%",
            }}>
              Hacer el simulador →
            </button>
          </div>
          <style>{`
            @keyframes slideInLeft {
              from { opacity: 0; transform: translateX(-20px); }
              to { opacity: 1; transform: translateX(0); }
            }
          `}</style>
        </div>
      )}

      {/* BOTÓN FIJO */}
      {!abierto && (
        <button onClick={() => setAbierto(true)} style={{
          position: "fixed", bottom: "1.5rem", left: "1.5rem", zIndex: 199,
          background: "#111", border: "1px solid #FFFF00", color: "#FFFF00",
          padding: "0.7rem 1.2rem", fontFamily: "Syne, sans-serif",
          fontWeight: 700, fontSize: "0.78rem", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          🧠 Simulador Teórico
        </button>
      )}

      {/* MODAL */}
      {abierto && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          background: "rgba(0,0,0,0.88)", display: "flex",
          alignItems: "center", justifyContent: "center", padding: "1rem",
        }}
          onClick={(e) => { if (e.target === e.currentTarget) setAbierto(false); }}
        >
          <div style={{
            background: "#111", border: "1px solid #222",
            width: "100%", maxWidth: "640px", maxHeight: "92vh",
            overflowY: "auto", position: "relative",
          }}>
            {/* Header */}
            <div style={{
              padding: "1.2rem 1.5rem", borderBottom: "1px solid #222",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              position: "sticky", top: 0, background: "#111", zIndex: 1,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://academiadechoferespunta.com.uy/wp-content/uploads/2022/04/ICONO-circle-cropped-g.png" alt="Logo" style={{ width: "2rem", height: "2rem", objectFit: "contain" }} />
                <div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "#f5f5f5" }}>Simulador Teórico</div>
                  <div style={{ fontSize: "0.72rem", color: "#666" }}>Academia de Choferes Punta</div>
                </div>
              </div>
              <button onClick={() => setAbierto(false)} style={{
                background: "none", border: "1px solid #333", color: "#aaa",
                width: "2rem", height: "2rem", cursor: "pointer", fontSize: "1rem",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>×</button>
            </div>

            <div style={{ padding: "1.5rem" }}>

              {/* INICIO */}
              {estado === "idle" && (
                <div style={{ textAlign: "center", padding: "1rem 0" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚗</div>
                  <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#f5f5f5", marginBottom: "0.8rem" }}>
                    Prueba Teórica — Autoevaluación
                  </h2>
                  <p style={{ fontSize: "0.88rem", color: "#888", lineHeight: 1.7, maxWidth: "420px", margin: "0 auto 1.5rem" }}>
                    30 preguntas aleatorias similares al examen real de la IDM. Aprobás si no tenés más de 5 errores. Al finalizar podés bajar tu resultado en PDF.
                  </p>
                  <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                    {[["30", "Preguntas"], ["5", "Errores máx."], ["PDF", "Resultado"]].map(([n, l]) => (
                      <div key={l} style={{ background: "#161616", border: "1px solid #222", padding: "1rem 1.5rem", textAlign: "center" }}>
                        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#FFFF00" }}>{n}</div>
                        <div style={{ fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em" }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: "1.2rem", textAlign: "left", maxWidth: "380px", margin: "0 auto 1.2rem" }}>
                    <label style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.4rem" }}>
                      Tu nombre (para el PDF, opcional)
                    </label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      placeholder="Ej: Juan Pérez"
                      style={{
                        width: "100%", background: "#161616", border: "1px solid #333",
                        color: "#f5f5f5", padding: "0.8rem 1rem",
                        fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                  </div>
                  <button onClick={iniciar} style={{
                    background: "#FFFF00", color: "#000", border: "none",
                    padding: "1rem 2.5rem", fontFamily: "Syne, sans-serif",
                    fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
                  }}>
                    Comenzar simulador
                  </button>
                </div>
              )}

              {/* JUGANDO */}
              {estado === "jugando" && (
                <div>
                  <div style={{ marginBottom: "1.2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#666", marginBottom: "0.4rem" }}>
                      <span>Pregunta {actual + 1} de {pregs.length}</span>
                      <span style={{ color: "#FFFF00" }}>⏱ {formatTiempo(tiempo)}</span>
                    </div>
                    <div style={{ height: "4px", background: "#222", borderRadius: "2px" }}>
                      <div style={{ height: "100%", background: "#FFFF00", borderRadius: "2px", width: `${progreso}%`, transition: "width 0.3s ease" }}></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", marginTop: "0.4rem" }}>
                      <span style={{ color: "#4CAF50" }}>✓ {actual - errores} correctas</span>
                      <span style={{ color: errores > 5 ? "#f44336" : "#888" }}>✗ {errores} errores</span>
                    </div>
                  </div>

                  <div style={{
                    background: "#161616", border: "1px solid #222", padding: "1.2rem",
                    marginBottom: "1rem", fontFamily: "Syne, sans-serif",
                    fontWeight: 700, fontSize: "0.9rem", color: "#f5f5f5", lineHeight: 1.5,
                  }}>
                    <span style={{ color: "#FFFF00", marginRight: "0.5rem" }}>{actual + 1}.</span>
                    {pregs[actual].pregunta}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.2rem" }}>
                    {pregs[actual].opciones.map((op, i) => {
                      let bg = "#161616", border = "#222", color = "#aaa";
                      if (confirmada) {
                        if (i === pregs[actual].correcta) { bg = "rgba(76,175,80,0.15)"; border = "#4CAF50"; color = "#4CAF50"; }
                        else if (i === seleccion) { bg = "rgba(244,67,54,0.15)"; border = "#f44336"; color = "#f44336"; }
                      } else if (seleccion === i) {
                        bg = "rgba(255,255,0,0.08)"; border = "#FFFF00"; color = "#FFFF00";
                      }
                      return (
                        <button key={i} onClick={() => !confirmada && setSeleccion(i)} style={{
                          background: bg, border: `1px solid ${border}`, color,
                          padding: "0.9rem 1rem", textAlign: "left",
                          cursor: confirmada ? "default" : "pointer",
                          fontFamily: "DM Sans, sans-serif", fontSize: "0.88rem",
                          lineHeight: 1.5, transition: "all 0.2s",
                          display: "flex", alignItems: "center", gap: "0.8rem",
                        }}>
                          <span style={{
                            minWidth: "1.4rem", height: "1.4rem", border: `1px solid ${border}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "0.7rem", fontFamily: "Syne, sans-serif", fontWeight: 700, flexShrink: 0,
                          }}>
                            {confirmada && i === pregs[actual].correcta ? "✓" : confirmada && i === seleccion ? "✗" : String.fromCharCode(65 + i)}
                          </span>
                          {op}
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: "flex", gap: "0.8rem" }}>
                    {!confirmada ? (
                      <button onClick={confirmar} disabled={seleccion === null} style={{
                        background: seleccion !== null ? "#FFFF00" : "#222",
                        color: seleccion !== null ? "#000" : "#555",
                        border: "none", padding: "0.9rem 2rem",
                        fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.85rem",
                        cursor: seleccion !== null ? "pointer" : "not-allowed", flex: 1,
                      }}>
                        Confirmar respuesta
                      </button>
                    ) : (
                      <button onClick={siguiente} style={{
                        background: "#FFFF00", color: "#000", border: "none",
                        padding: "0.9rem 2rem", fontFamily: "Syne, sans-serif",
                        fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", flex: 1,
                      }}>
                        {actual + 1 >= pregs.length ? "Ver resultado" : "Siguiente →"}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* RESULTADO */}
              {estado === "resultado" && (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: "0.8rem" }}>{aprobado ? "🎉" : "😔"}</div>
                  <h2 style={{
                    fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.8rem",
                    color: aprobado ? "#4CAF50" : "#f44336", marginBottom: "0.4rem",
                  }}>
                    {aprobado ? "¡Aprobado!" : "No aprobado"}
                  </h2>
                  <p style={{ fontSize: "0.88rem", color: "#888", marginBottom: "1.5rem" }}>
                    {aprobado
                      ? "Excelente. Estás bien preparado para el examen real de la IDM."
                      : `Tuviste ${errores} errores. El máximo permitido es 5. ¡Seguí practicando!`}
                  </p>

                  {/* Stats */}
                  <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                    {[
                      ["🎯", `${correctas}/30`, "Correctas", "#4CAF50"],
                      ["✗", `${errores}`, "Errores", errores > 5 ? "#f44336" : "#888"],
                      ["%", `${porcentaje}%`, "Puntaje", "#FFFF00"],
                      ["⏱", formatTiempo(tiempo), "Tiempo", "#aaa"],
                    ].map(([icon, val, label, color]) => (
                      <div key={label} style={{ background: "#161616", border: "1px solid #222", padding: "1rem", textAlign: "center", minWidth: "90px" }}>
                        <div style={{ fontSize: "1rem", marginBottom: "0.2rem" }}>{icon}</div>
                        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.3rem", color }}>{val}</div>
                        <div style={{ fontSize: "0.68rem", color: "#555", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Campo nombre para PDF */}
                  <div style={{ marginBottom: "1.2rem", textAlign: "left" }}>
                    <label style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "0.4rem" }}>
                      Tu nombre para el PDF (opcional)
                    </label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      placeholder="Ej: Juan Pérez"
                      style={{
                        width: "100%", background: "#161616", border: "1px solid #333",
                        color: "#f5f5f5", padding: "0.8rem 1rem",
                        fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", outline: "none",
                      }}
                    />
                  </div>

                  {!aprobado && (
                    <div style={{
                      background: "rgba(244,67,54,0.08)", border: "1px solid rgba(244,67,54,0.25)",
                      padding: "1rem 1.2rem", marginBottom: "1.2rem",
                      fontSize: "0.85rem", color: "#aaa", lineHeight: 1.6, textAlign: "left",
                    }}>
                      ¿Necesitás apoyo? Academia Punta ofrece una <strong style={{ color: "#FFFF00" }}>clase de apoyo a la prueba teórica</strong> con docente. Te ayudamos a aprobar.
                    </div>
                  )}

                  {/* Botones */}
                  <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                    <button onClick={iniciar} style={{
                      background: "#161616", color: "#f5f5f5", border: "1px solid #333",
                      padding: "0.9rem 1.4rem", fontFamily: "Syne, sans-serif",
                      fontWeight: 700, fontSize: "0.85rem", cursor: "pointer",
                    }}>
                      🔄 Reintentar
                    </button>
                    <button
                      onClick={generarPDF}
                      disabled={generandoPDF}
                      style={{
                        background: generandoPDF ? "#333" : "#FFFF00",
                        color: "#000", border: "none",
                        padding: "0.9rem 1.4rem", fontFamily: "Syne, sans-serif",
                        fontWeight: 700, fontSize: "0.85rem",
                        cursor: generandoPDF ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", gap: "0.5rem",
                      }}
                    >
                      {generandoPDF ? "⏳ Generando..." : "⬇️ Bajar resultado PDF"}
                    </button>
                    <a
                      href="https://api.whatsapp.com/send?phone=59894774465&text=Hola%2C%20quiero%20consultar%20sobre%20la%20clase%20de%20apoyo%20a%20la%20prueba%20te%C3%B3rica."
                      target="_blank" rel="noopener noreferrer"
                      style={{
                        background: "#25D366", color: "#000",
                        padding: "0.9rem 1.4rem", fontFamily: "Syne, sans-serif",
                        fontWeight: 700, fontSize: "0.85rem", textDecoration: "none",
                        display: "inline-flex", alignItems: "center", gap: "0.5rem",
                      }}
                    >
                      💬 Consultar clase de apoyo
                    </a>
                  </div>

                  {/* Detalle respuestas */}
                  <div style={{ textAlign: "left", borderTop: "1px solid #222", paddingTop: "1.2rem" }}>
                    <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "0.8rem", color: "#FFFF00", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>
                      Detalle de respuestas
                    </div>
                    {respuestas.map((r, i) => (
                      <div key={i} style={{
                        display: "flex", gap: "0.8rem", alignItems: "flex-start",
                        padding: "0.7rem 0", borderBottom: "1px solid #1a1a1a",
                      }}>
                        <div style={{
                          minWidth: "1.4rem", height: "1.4rem",
                          background: r.correctamente ? "rgba(76,175,80,0.15)" : "rgba(244,67,54,0.15)",
                          border: `1px solid ${r.correctamente ? "#4CAF50" : "#f44336"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.75rem", color: r.correctamente ? "#4CAF50" : "#f44336",
                          fontWeight: 700, flexShrink: 0, marginTop: "2px",
                        }}>
                          {r.correctamente ? "✓" : "✗"}
                        </div>
                        <div>
                          <div style={{ fontSize: "0.82rem", color: "#ccc", marginBottom: "0.2rem" }}>
                            {i + 1}. {r.pregunta}
                          </div>
                          <div style={{ fontSize: "0.78rem", color: r.correctamente ? "#4CAF50" : "#f44336" }}>
                            Tu respuesta: {preguntas.find(p => p.pregunta === r.pregunta)?.opciones[r.seleccion]}
                          </div>
                          {!r.correctamente && (
                            <div style={{ fontSize: "0.78rem", color: "#4CAF50", marginTop: "0.1rem" }}>
                              Correcta: {preguntas.find(p => p.pregunta === r.pregunta)?.opciones[r.correcta]}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
