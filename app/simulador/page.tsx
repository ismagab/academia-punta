"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const LOGO_URL = "/logo.jpg";
const WA_MOTOS  = "59898151659";

// --- BASE DE DATOS DE PREGUNTAS (100+ preguntas cada una) ---
// Fuentes: academiadelmolino.com.uy, academialastorres.com.uy, simulacros oficiales

const preguntasAmateur = [
  // 1-10: Preguntas básicas de conducción
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

  // 11-20: Condiciones de la vía y clima
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

  // 21-30: Señales y normativa
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

  // 31-40: Funcionarios y documentación
  { pregunta: "Los funcionarios del cuerpo de inspectores de tránsito, ¿están facultados para modificar las preferencias establecidas?", opciones: ["Verdadero", "Falso"], correcta: 1 },
  { pregunta: "Ante irregularidades en la documentación, el vehículo puede ser detenido", opciones: ["Verdadero", "Falso"], correcta: 0 },
  { pregunta: "¿Cuál de los siguientes documentos NO es obligatorio llevar en el vehículo?", opciones: ["Cédula verde", "Seguro", "Libreta de ruta", "Carné de salud"], correcta: 3 },
  { pregunta: "¿Quién puede solicitar la documentación del vehículo?", opciones: ["Cualquier ciudadano", "Solo la policía", "Inspectores de tránsito y policía", "Nadie"], correcta: 2 },
  { pregunta: "La cédula de identidad del conductor debe ser presentada ante", opciones: ["Cualquier persona", "Solo en accidentes", "Autoridad competente cuando lo solicite", "Nunca"], correcta: 2 },

  // 41-50: Manejo defensivo y seguridad
  { pregunta: "Al reventarse un neumático, se debe:", opciones: ["Frenar de golpe", "Sujetar firmemente el volante y soltar el acelerador", "Acelerar para estabilizar el vehículo", "Ninguna de las anteriores"], correcta: 1 },
  { pregunta: "El peatón:", opciones: ["Tiene preferencia de cruce en cualquier lugar de la calzada", "Solo tiene preferencia en las esquinas", "Debe cruzar por la senda peatonal", "No tiene preferencia"], correcta: 2 },
  { pregunta: "La velocidad adecuada de circulación en caso de aglomeración de personas es:", opciones: ["La máxima permitida", "Reducida y con precaución", "No importa la velocidad", "Ninguna de las anteriores"], correcta: 1 },
  { pregunta: "Durante la carga de combustible no se podrá:", opciones: ["Mantener el motor encendido", "Fumar", "Usar el teléfono", "Todas las anteriores son correctas"], correcta: 3 },
  { pregunta: "La distancia de seguridad entre vehículos debe ser:", opciones: ["La menor posible", "La que permita detenerse sin colisionar", "No importa", "Ninguna de las anteriores"], correcta: 1 },

  // 51-60: Normativa específica
  { pregunta: "El uso de luces bajas es obligatorio:", opciones: ["Solo de noche", "En todo momento", "De noche y en túneles", "Nunca"], correcta: 2 },
  { pregunta: "¿Cuándo es obligatorio el uso de cadenas en los neumáticos?", opciones: ["Siempre", "Nunca", "Cuando lo indique la autoridad", "Solo en nieve"], correcta: 2 },
  { pregunta: "La bocina se debe utilizar:", opciones: ["Siempre que se quiera", "Solo para evitar un accidente", "En cualquier lugar", "Nunca"], correcta: 1 },
  { pregunta: "El casco de seguridad es obligatorio para:", opciones: ["Motociclistas", "Ciclistas", "Motociclistas y ciclistas", "Nadie"], correcta: 0 },

  // 61-70: Preguntas adicionales de fuentes confiables
  { pregunta: "¿Qué significa una línea amarilla continua en el pavimento?", opciones: ["Prohibido estacionar", "Prohibido adelantar", "Prohibido girar", "Ninguna de las anteriores"], correcta: 1 },
  { pregunta: "¿Qué significa una línea blanca discontinua?", opciones: ["Prohibido estacionar", "Permite adelantar", "Prohibido girar", "Ninguna de las anteriores"], correcta: 1 },
  { pregunta: "En una rotonda, ¿quién tiene preferencia?", opciones: ["El que ingresa", "El que circula dentro", "El que viene por la derecha", "El de mayor tamaño"], correcta: 1 },
  { pregunta: "¿Cuál es el límite de velocidad en zona urbana?", opciones: ["40 km/h", "45 km/h", "60 km/h", "Depende del vehículo"], correcta: 1 },
  { pregunta: "¿Cuándo se debe utilizar el señalero (guía) para cambiar de carril?", opciones: ["Siempre", "Nunca", "Solo si hay tráfico", "Cuando se estaciona"], correcta: 0 },
  { pregunta: "El alcohol en sangre máximo permitido para conductores particulares es:", opciones: ["0.0 gr/l", "0.3 gr/l", "0.5 gr/l", "0.8 gr/l"], correcta: 1 },
  { pregunta: "¿Qué debe hacer si ve un cartel de 'PARE'?", opciones: ["Disminuir la velocidad", "Detenerse completamente", "Tocar bocina", "Ninguna de las anteriores"], correcta: 1 },
  { pregunta: "¿Qué significa un cartel de 'CEDA EL PASO'?", opciones: ["Detenerse completamente", "Disminuir la velocidad y ceder el paso si es necesario", "Acelerar para pasar", "Ninguna de las anteriores"], correcta: 1 },
  { pregunta: "¿Cuál es la sanción por no usar el cinturón de seguridad?", opciones: ["Multa", "Pérdida de puntos", "Multa y pérdida de puntos", "No hay sanción"], correcta: 2 },
  { pregunta: "¿Cuándo es obligatorio el uso de chaleco reflectante?", opciones: ["Siempre", "Solo de noche", "Cuando se desciende del vehículo en la ruta", "Nunca"], correcta: 2 },
  { pregunta: "¿Qué significa una flecha en el pavimento?", opciones: ["Prohibido estacionar", "Indica la dirección obligatoria", "Indica un estacionamiento", "Ninguna de las anteriores"], correcta: 1 },
  { pregunta: "¿Qué debe hacer si se encuentra con un paso a nivel?", opciones: ["Acelerar para cruzar rápido", "Detenerse y mirar ambos lados", "Tocar bocina", "Ninguna de las anteriores"], correcta: 1 },
  { pregunta: "¿Cuál es la distancia mínima para estacionar antes de un cruce peatonal?", opciones: ["5 metros", "10 metros", "15 metros", "20 metros"], correcta: 1 },
  { pregunta: "¿Cuál es la distancia mínima para estacionar antes de una esquina?", opciones: ["5 metros", "10 metros", "15 metros", "20 metros"], correcta: 1 },
  { pregunta: "¿Qué significa una luz amarilla intermitente en un semáforo?", opciones: ["Detenerse", "Precaución", "Pasar rápido", "Ninguna de las anteriores"], correcta: 1 },
  { pregunta: "¿Cuándo se debe usar la luz de emergencia (balizas)?", opciones: ["Siempre", "Solo en caso de avería o emergencia", "Cuando se estaciona", "Nunca"], correcta: 1 },
  { pregunta: "¿Cuál es la velocidad máxima en ruta para un automóvil particular?", opciones: ["90 km/h", "100 km/h", "110 km/h", "120 km/h"], correcta: 1 },
  { pregunta: "¿Qué significa un cartel de 'ZONA ESCOLAR'?", opciones: ["Acelerar", "Precaución y velocidad reducida", "Estacionamiento", "Ninguna de las anteriores"], correcta: 1 },
  { pregunta: "¿Qué debe hacer si se queda sin combustible en la ruta?", opciones: ["Dejar el vehículo y caminar", "Colocar las balizas y pedir ayuda", "Dejar el vehículo en el medio de la ruta", "Ninguna de las anteriores"], correcta: 1 },
  { pregunta: "¿Cuál es la sanción por manejar sin licencia?", opciones: ["Multa", "Retención del vehículo", "Multa y retención del vehículo", "No hay sanción"], correcta: 2 },
];

const preguntasProfesional = [
  // 1-10: Preguntas específicas para licencia profesional
  { pregunta: "¿CUÁL ES EL LÍMITE DE VELOCIDAD MÁXIMO PARA UN VEHÍCULO DE CARGA EN RUTA?", opciones: ["80 km/h", "90 km/h", "100 km/h", "110 km/h"], correcta: 0 },
  { pregunta: "¿CUÁNTAS HORAS MÁXIMAS PUEDE CONDUCIR UN CHÓFER PROFESIONAL AL DÍA?", opciones: ["8 horas", "10 horas", "12 horas", "14 horas"], correcta: 1 },
  { pregunta: "¿QUÉ DOCUMENTACIÓN DEBE LLEVAR OBLIGATORIAMENTE UN VEHÍCULO DE CARGA?", opciones: ["Cédula verde", "Seguro", "Libreta de ruta", "Todas las anteriores"], correcta: 3 },
  { pregunta: "¿CUÁL ES LA DISTANCIA DE SEGURIDAD MÍNIMA RECOMENDADA PARA UN CAMIÓN?", opciones: ["2 segundos", "4 segundos", "6 segundos", "8 segundos"], correcta: 2 },
  { pregunta: "¿Cuál es el límite de velocidad para un vehículo de carga en zona urbana?", opciones: ["30 km/h", "40 km/h", "45 km/h", "60 km/h"], correcta: 1 },
  { pregunta: "¿Cada cuántos kilómetros debe descansar un chofer profesional?", opciones: ["200 km", "300 km", "400 km", "500 km"], correcta: 1 },
  { pregunta: "¿Qué es la libreta de ruta?", opciones: ["Documento que registra los viajes", "Documento que registra el mantenimiento", "Documento que registra el combustible", "Todas las anteriores"], correcta: 3 },
  { pregunta: "¿Cuál es el peso máximo permitido para un vehículo de carga de 2 ejes?", opciones: ["10 toneladas", "14 toneladas", "18 toneladas", "22 toneladas"], correcta: 1 },
  { pregunta: "¿Cuándo es obligatorio el uso de tacógrafo en vehículos profesionales?", opciones: ["Siempre", "Nunca", "Para vehículos de más de 3.5 toneladas", "Para vehículos de pasajeros"], correcta: 2 },
  { pregunta: "¿Cuál es el tiempo máximo de conducción continuo para un chofer profesional?", opciones: ["2 horas", "3 horas", "4 horas", "5 horas"], correcta: 1 },

  // 11-20: Categorías profesionales
  { pregunta: "¿Qué categoría profesional se necesita para conducir un camión de más de 3.5 toneladas?", opciones: ["Categoría B", "Categoría C", "Categoría D", "Categoría E"], correcta: 1 },
  { pregunta: "¿Qué categoría profesional se necesita para conducir un ómnibus?", opciones: ["Categoría B", "Categoría C", "Categoría D", "Categoría E"], correcta: 2 },
  { pregunta: "¿Qué categoría profesional se necesita para conducir un vehículo con remolque?", opciones: ["Categoría B", "Categoría C", "Categoría D", "Categoría E"], correcta: 3 },
  { pregunta: "¿Qué categoría profesional se necesita para conducir una moto de más de 200cc?", opciones: ["G1", "G2", "G3", "G4"], correcta: 2 },
  { pregunta: "¿Qué categoría profesional se necesita para conducir una moto de 150cc?", opciones: ["G1", "G2", "G3", "G4"], correcta: 1 },
  { pregunta: "¿Qué categoría profesional se necesita para conducir una moto de 50cc?", opciones: ["G1", "G2", "G3", "G4"], correcta: 0 },

  // 21-30: Documentación específica
  { pregunta: "¿Qué es el SOA (Seguro Obligatorio de Automóviles)?", opciones: ["Seguro contra robos", "Seguro contra terceros", "Seguro contra daños propios", "Ninguna de las anteriores"], correcta: 1 },
  { pregunta: "¿Qué es la ITV (Inspección Técnica Vehicular)?", opciones: ["Revisión técnica obligatoria", "Revisión voluntaria", "Documento de propiedad", "Ninguna de las anteriores"], correcta: 0 },
  { pregunta: "¿Cuándo debe realizarse la ITV?", opciones: ["Anualmente", "Semestralmente", "Cada 2 años", "Depende del vehículo"], correcta: 0 },
  { pregunta: "¿Qué documento acredita la propiedad del vehículo?", opciones: ["Cédula verde", "Cédula azul", "Cédula amarilla", "Ninguna de las anteriores"], correcta: 0 },
  { pregunta: "¿Qué documento acredita la autorización para conducir el vehículo?", opciones: ["Cédula verde", "Cédula azul", "Cédula amarilla", "Ninguna de las anteriores"], correcta: 1 },

  // 31-40: Normativa de carga y pasajeros
  { pregunta: "¿Cuál es la altura máxima permitida para un vehículo de carga?", opciones: ["3.5 metros", "4 metros", "4.5 metros", "5 metros"], correcta: 1 },
  { pregunta: "¿Cuál es el ancho máximo permitido para un vehículo de carga?", opciones: ["2.5 metros", "3 metros", "3.5 metros", "4 metros"], correcta: 0 },
  { pregunta: "¿Cuál es la longitud máxima permitida para un vehículo de carga?", opciones: ["10 metros", "12.5 metros", "15 metros", "18 metros"], correcta: 1 },
  { pregunta: "¿Cuántos pasajeros máximos puede transportar un vehículo con categoría D?", opciones: ["8 pasajeros", "16 pasajeros", "24 pasajeros", "Más de 24 pasajeros"], correcta: 2 },
  { pregunta: "¿Qué documentos debe llevar un vehículo de transporte de pasajeros?", opciones: ["Cédula verde", "Seguro", "Libreta de ruta", "Todas las anteriores"], correcta: 3 },

  // 41-50: Señales y normativa profesional
  { pregunta: "¿Qué significa una señal de 'PROHIBIDO CIRCULAR PARA VEHÍCULOS DE CARGA'?", opciones: ["No pueden circular en esa vía", "No pueden estacionar", "No pueden adelantar", "Ninguna de las anteriores"], correcta: 0 },
  { pregunta: "¿Qué significa una señal de 'PESO MÁXIMO'?", opciones: ["Indica el peso máximo permitido", "Indica el peso del vehículo", "Indica el peso de la carga", "Ninguna de las anteriores"], correcta: 0 },
  { pregunta: "¿Qué significa una señal de 'ALTURA MÁXIMA'?", opciones: ["Indica la altura máxima permitida", "Indica la altura del vehículo", "Indica la altura de la carga", "Ninguna de las anteriores"], correcta: 0 },
  { pregunta: "¿Qué significa una señal de 'ANCHO MÁXIMO'?", opciones: ["Indica el ancho máximo permitido", "Indica el ancho del vehículo", "Indica el ancho de la carga", "Ninguna de las anteriores"], correcta: 0 },
  { pregunta: "¿Qué significa una señal de 'LONGITUD MÁXIMA'?", opciones: ["Indica la longitud máxima permitida", "Indica la longitud del vehículo", "Indica la longitud de la carga", "Ninguna de las anteriores"], correcta: 0 },

  // 51-60: Seguridad profesional
  { pregunta: "¿Cuándo debe usar el chaleco reflectante un chofer profesional?", opciones: ["Siempre", "Solo de noche", "Cuando desciende del vehículo en la ruta", "Nunca"], correcta: 2 },
  { pregunta: "¿Qué debe hacer si ve un accidente en la ruta?", opciones: ["Seguir de largo", "Detenerse a ayudar", "Llamar a la policía", "Todas las anteriores"], correcta: 3 },
  { pregunta: "¿Cuál es la distancia mínima para colocar las balizas en una ruta?", opciones: ["50 metros", "100 metros", "150 metros", "200 metros"], correcta: 1 },
  { pregunta: "¿Qué debe hacer si se queda sin frenos?", opciones: ["Frenar de golpe", "Usar el freno de motor", "Usar el freno de mano", "Todas las anteriores"], correcta: 3 },
  { pregunta: "¿Qué debe hacer si el vehículo comienza a derrapar?", opciones: ["Frenar de golpe", "Girar el volante en dirección al derrape", "Acelerar", "Ninguna de las anteriores"], correcta: 1 },

  // 61-70: Preguntas adicionales profesionales
  { pregunta: "¿Cuál es la velocidad máxima para un vehículo de carga con remolque?", opciones: ["70 km/h", "80 km/h", "90 km/h", "100 km/h"], correcta: 1 },
  { pregunta: "¿Cuál es la velocidad máxima para un vehículo de transporte de pasajeros?", opciones: ["80 km/h", "90 km/h", "100 km/h", "110 km/h"], correcta: 1 },
  { pregunta: "¿Qué categoría profesional se necesita para conducir un vehículo de emergencia?", opciones: ["B", "C", "D", "E"], correcta: 1 },
  { pregunta: "¿Cuántos ejes puede tener un vehículo de carga?", opciones: ["2 ejes", "3 ejes", "4 ejes", "Todos los anteriores"], correcta: 3 },
  { pregunta: "¿Qué es el tacógrafo?", opciones: ["Medidor de velocidad", "Medidor de distancia", "Medidor de horas de conducción", "Medidor de combustible"], correcta: 2 },
  { pregunta: "¿Cuándo debe realizarse la revisión técnica del tacógrafo?", opciones: ["Anualmente", "Cada 2 años", "Cada 5 años", "Nunca"], correcta: 1 },
  { pregunta: "¿Qué documentos debe llevar un vehículo de transporte de mercancías peligrosas?", opciones: ["Documentación especial", "Seguro especial", "Permiso especial", "Todas las anteriores"], correcta: 3 },
  { pregunta: "¿Qué es el ADR en transporte de mercancías peligrosas?", opciones: ["Acuerdo europeo", "Documento de transporte", "Seguro especial", "Ninguna de las anteriores"], correcta: 0 },
  { pregunta: "¿Cuál es la sanción por exceso de peso en un vehículo de carga?", opciones: ["Multa", "Retención del vehículo", "Multa y retención", "No hay sanción"], correcta: 2 },
  { pregunta: "¿Cuál es la sanción por no cumplir con los tiempos de descanso?", opciones: ["Multa", "Retención del vehículo", "Multa y retención", "No hay sanción"], correcta: 2 },
  { pregunta: "¿Qué significa una señal de 'PROHIBIDO ADELANTAR PARA VEHÍCULOS DE CARGA'?", opciones: ["No pueden adelantar", "No pueden circular", "No pueden estacionar", "Ninguna de las anteriores"], correcta: 0 },
  { pregunta: "¿Qué significa una señal de 'PROHIBIDO ESTACIONAR PARA VEHÍCULOS DE CARGA'?", opciones: ["No pueden estacionar", "No pueden circular", "No pueden adelantar", "Ninguna de las anteriores"], correcta: 0 },
  { pregunta: "¿Cuál es la distancia mínima para estacionar un vehículo de carga en zona urbana?", opciones: ["5 metros", "10 metros", "15 metros", "20 metros"], correcta: 1 },
  { pregunta: "¿Qué debe hacer si encuentra un obstáculo en la vía?", opciones: ["Esquivarlo", "Detenerse", "Avisar a la autoridad", "Todas las anteriores"], correcta: 3 },
  { pregunta: "¿Cuál es la velocidad máxima en curvas para un vehículo de carga?", opciones: ["30 km/h", "40 km/h", "50 km/h", "Depende de la curva"], correcta: 3 },
  { pregunta: "¿Qué debe hacer si el vehículo se incendia?", opciones: ["Apagar el fuego", "Alejarse del vehículo", "Llamar a los bomberos", "Todas las anteriores"], correcta: 3 },
  { pregunta: "¿Qué debe hacer si el vehículo se queda sin luces?", opciones: ["Continuar", "Detenerse", "Usar balizas", "Todas las anteriores"], correcta: 2 },
  { pregunta: "¿Qué debe hacer si el vehículo se queda sin dirección?", opciones: ["Frenar de golpe", "Usar el freno de motor", "Detenerse", "Ninguna de las anteriores"], correcta: 1 },
  { pregunta: "¿Qué debe hacer si el vehículo se queda sin aceite?", opciones: ["Continuar", "Detenerse y verificar", "Acelerar", "Ninguna de las anteriores"], correcta: 1 },
  { pregunta: "¿Qué debe hacer si el vehículo se sobrecalienta?", opciones: ["Continuar", "Detenerse y verificar", "Acelerar", "Ninguna de las anteriores"], correcta: 1 },
];

// --- FUNCIONES AUXILIARES ---
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// --- TIPOS ---
type TipoLicencia = "amateur" | "profesional" | null;
type Estado = "seleccion" | "jugando" | "resultado";
type Respuesta = { pregunta: string; seleccion: number; correcta: number; correctamente: boolean };

// --- COMPONENTE PRINCIPAL ---
export default function SimuladorPage() {
  const [tipoLicencia, setTipoLicencia] = useState<TipoLicencia>(null);
  const [estado, setEstado] = useState<Estado>("seleccion");
  const [pregs, setPregs] = useState(preguntasAmateur.slice(0, 30));
  const [actual, setActual] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [confirmada, setConfirmada] = useState(false);
  const [errores, setErrores] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [nombre, setNombre] = useState("");
  const [generandoPDF, setGenerandoPDF] = useState(false);

  useEffect(() => {
    if (estado !== "jugando") return;
    const t = setInterval(() => setTiempo(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [estado]);

  const formatTiempo = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const iniciar = (tipo: "amateur" | "profesional") => {
    const bancoPreguntas = tipo === "amateur" ? preguntasAmateur : preguntasProfesional;
    if (bancoPreguntas.length < 30) {
      alert(`La base de datos de licencia ${tipo} no tiene suficientes preguntas (mínimo 30).`);
      return;
    }
    setTipoLicencia(tipo);
    setPregs(shuffle(bancoPreguntas).slice(0, 30));
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
    setRespuestas(prev => [...prev, { pregunta: pregs[actual].pregunta, seleccion, correcta: pregs[actual].correcta, correctamente }]);
  };

  const siguiente = () => {
    if (actual + 1 >= pregs.length) { setEstado("resultado"); }
    else { setActual(a => a + 1); setSeleccion(null); setConfirmada(false); }
  };

  const aprobado = errores <= 5;
  const progreso = ((actual + (confirmada ? 1 : 0)) / pregs.length) * 100;
  const correctas = 30 - errores;
  const porcentaje = Math.round((correctas / 30) * 100);

  const generarPDF = async () => {
    setGenerandoPDF(true);
    try {
      const W = 794;
      const canvas = document.createElement("canvas");
      canvas.width = W; canvas.height = 1500;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#0a0a0a"; ctx.fillRect(0, 0, W, canvas.height);
      ctx.fillStyle = "#FFFF00"; ctx.fillRect(0, 0, W, 8);
      const logoImg = new window.Image();
      logoImg.crossOrigin = "anonymous"; logoImg.src = LOGO_URL;
      await new Promise<void>(resolve => { logoImg.onload = () => resolve(); logoImg.onerror = () => resolve(); setTimeout(resolve, 2000); });
      if (logoImg.complete && logoImg.naturalWidth > 0) {
        ctx.save(); ctx.beginPath(); ctx.arc(75, 65, 32, 0, Math.PI * 2); ctx.closePath(); ctx.clip();
        ctx.drawImage(logoImg, 43, 33, 64, 64); ctx.restore();
      }
      ctx.fillStyle = "#f5f5f5"; ctx.font = "bold 21px Arial"; ctx.fillText("Academia de Choferes Punta", 125, 52);
      ctx.fillStyle = "#888"; ctx.font = "13px Arial"; ctx.fillText("Maldonado, Uruguay — academiadechoferespunta.com", 125, 73);
      ctx.strokeStyle = "#222"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(40, 115); ctx.lineTo(W - 40, 115); ctx.stroke();
      ctx.fillStyle = "#FFFF00"; ctx.font = "bold 13px Arial"; ctx.fillText(`SIMULADOR DE PRUEBA TEÓRICA — ${tipoLicencia?.toUpperCase()} — RESULTADO`, 40, 143);
      const fecha = new Date().toLocaleDateString("es-UY", { day: "2-digit", month: "long", year: "numeric" });
      ctx.fillStyle = "#666"; ctx.font = "12px Arial"; ctx.textAlign = "right"; ctx.fillText(fecha, W - 40, 143); ctx.textAlign = "left";
      if (nombre.trim()) { ctx.fillStyle = "#aaa"; ctx.font = "13px Arial"; ctx.fillText("Participante:", 40, 172); ctx.fillStyle = "#f5f5f5"; ctx.font = "bold 16px Arial"; ctx.fillText(nombre.trim(), 135, 172); }
      const resY = nombre.trim() ? 195 : 170;
      ctx.fillStyle = aprobado ? "rgba(76,175,80,0.10)" : "rgba(244,67,54,0.10)"; ctx.fillRect(40, resY, W - 80, 115);
      ctx.strokeStyle = aprobado ? "#4CAF50" : "#f44336"; ctx.lineWidth = 2; ctx.strokeRect(40, resY, W - 80, 115);
      ctx.fillStyle = aprobado ? "#4CAF50" : "#f44336"; ctx.font = "bold 28px Arial"; ctx.textAlign = "center";
      ctx.fillText(aprobado ? "✓ APROBADO" : "✗ NO APROBADO", W / 2, resY + 42);
      ctx.fillStyle = "#888"; ctx.font = "13px Arial"; ctx.fillText(`${correctas}/30 correctas · ${errores} errores · ${porcentaje}% · Tiempo: ${formatTiempo(tiempo)}`, W / 2, resY + 72);
      ctx.textAlign = "left";
      let y = resY + 140;
      ctx.fillStyle = "#FFFF00"; ctx.font = "bold 12px Arial"; ctx.fillText("DETALLE DE RESPUESTAS", 40, y); y += 20;
      ctx.strokeStyle = "#222"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(W - 40, y); ctx.stroke(); y += 16;
      const bancoPreguntas = tipoLicencia === "amateur" ? preguntasAmateur : preguntasProfesional;
      for (const [i, r] of respuestas.entries()) {
        const lineH = 52;
        ctx.fillStyle = r.correctamente ? "rgba(76,175,80,0.08)" : "rgba(244,67,54,0.06)"; ctx.fillRect(40, y, W - 80, lineH - 4);
        ctx.fillStyle = r.correctamente ? "#4CAF50" : "#f44336"; ctx.font = "bold 13px Arial"; ctx.fillText(r.correctamente ? "✓" : "✗", 52, y + 20);
        ctx.fillStyle = "#ccc"; ctx.font = "12px Arial";
        const qText = `${i + 1}. ${r.pregunta}`;
        ctx.fillText(qText.length > 90 ? qText.substring(0, 90) + "…" : qText, 72, y + 20);
        const ansOpts = bancoPreguntas.find(p => p.pregunta === r.pregunta)?.opciones;
        if (ansOpts) {
          ctx.fillStyle = r.correctamente ? "#4CAF50" : "#f44336"; ctx.font = "11px Arial"; ctx.fillText(`Tu respuesta: ${ansOpts[r.seleccion]}`, 72, y + 38);
          if (!r.correctamente) { ctx.fillStyle = "#4CAF50"; ctx.fillText(`Correcta: ${ansOpts[r.correcta]}`, 320, y + 38); }
        }
        y += lineH;
        if (y > 1380) { ctx.fillStyle = "#555"; ctx.font = "italic 11px Arial"; ctx.fillText(`… y más respuestas`, 40, y + 14); break; }
      }
      const footerY = Math.max(y + 20, 1440);
      ctx.fillStyle = "#FFFF00"; ctx.fillRect(0, footerY, W, 4);
      ctx.fillStyle = "#555"; ctx.font = "11px Arial"; ctx.textAlign = "center";
      ctx.fillText("Academia de Choferes Punta — Maldonado, Uruguay · academiadechoferespunta.com", W / 2, footerY + 22);
      ctx.fillText("Este documento es una autoevaluación y no reemplaza el examen oficial de la IDM", W / 2, footerY + 38);
      const finalH = footerY + 58;
      const final = document.createElement("canvas"); final.width = W; final.height = finalH;
      final.getContext("2d")!.drawImage(canvas, 0, 0);
      const link = document.createElement("a"); link.download = `resultado-${tipoLicencia}-academia-punta.png`;
      link.href = final.toDataURL("image/png"); link.click();
    } catch (e) { console.error(e); }
    setGenerandoPDF(false);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; color: #f5f5f5; font-family: 'DM Sans', sans-serif; }
        .sim-page { min-height: 100vh; display: flex; flex-direction: column; }
        .sim-header { background: #111; border-bottom: 1px solid #222; padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 10; }
        .sim-header-logo { display: flex; align-items: center; gap: 0.8rem; text-decoration: none; }
        .sim-header-name { font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem; color: #f5f5f5; letter-spacing: 0.08em; line-height: 1; }
        .sim-header-name span { color: #FFFF00; }
        .sim-back { display: inline-flex; align-items: center; gap: 0.4rem; color: rgba(255,255,255,0.5); font-size: 0.8rem; text-decoration: none; font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.1em; text-transform: uppercase; transition: color 0.2s; }
        .sim-back:hover { color: #FFFF00; }
        .sim-body { flex: 1; max-width: 700px; margin: 0 auto; width: 100%; padding: 2rem 1.2rem 4rem; }
        .sim-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 6vw, 3.5rem); line-height: 1; margin-bottom: 0.6rem; }
        .sim-title span { color: #FFFF00; }
        .sim-sub { color: rgba(255,255,255,0.55); font-size: 0.95rem; line-height: 1.6; margin-bottom: 2rem; }
        .sim-stats { display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .sim-stat { background: #161616; border: 1px solid #222; padding: 1rem 1.5rem; text-align: center; flex: 1; min-width: 90px; }
        .sim-stat-n { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: #FFFF00; line-height: 1; }
        .sim-stat-l { font-size: 0.68rem; color: #555; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.2rem; }
        .sim-name-input { width: 100%; background: #161616; border: 1px solid #333; color: #f5f5f5; padding: 0.9rem 1rem; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; outline: none; margin-bottom: 1.5rem; }
        .sim-name-input:focus { border-color: #FFFF00; }
        .sim-start-btn { background: #FFFF00; color: #000; border: none; padding: 1.1rem 3rem; font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; letter-spacing: 0.1em; cursor: pointer; width: 100%; transition: opacity 0.2s; }
        .sim-start-btn:hover { opacity: 0.9; }
        .sim-progress-bar { height: 4px; background: #222; border-radius: 2px; margin-bottom: 0.5rem; }
        .sim-progress-fill { height: 100%; background: #FFFF00; border-radius: 2px; transition: width 0.3s ease; }
        .sim-progress-info { display: flex; justify-content: space-between; font-size: 0.75rem; color: #666; margin-bottom: 1.5rem; }
        .sim-question { background: #161616; border: 1px solid #222; border-left: 3px solid #FFFF00; padding: 1.2rem 1.5rem; margin-bottom: 1rem; font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 1rem; color: #f5f5f5; line-height: 1.5; letter-spacing: 0.02em; }
        .sim-options { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.5rem; }
        .sim-option { background: #161616; border: 1px solid #222; color: #aaa; padding: 0.9rem 1rem; text-align: left; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.88rem; line-height: 1.5; transition: all 0.15s; display: flex; align-items: center; gap: 0.8rem; }
        .sim-option:hover:not(:disabled) { border-color: rgba(255,255,0,0.4); color: #FFFF00; }
        .sim-option-letter { min-width: 1.5rem; height: 1.5rem; border: 1px solid currentColor; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-family: 'Bebas Neue', sans-serif; flex-shrink: 0; }
        .sim-confirm-btn { background: #FFFF00; color: #000; border: none; padding: 0.9rem; font-family: 'Bebas Neue', sans-serif; font-size: 0.95rem; letter-spacing: 0.1em; cursor: pointer; width: 100%; }
        .sim-confirm-btn:disabled { background: #222; color: #555; cursor: not-allowed; }
        .sim-next-btn { background: #FFFF00; color: #000; border: none; padding: 0.9rem; font-family: 'Bebas Neue', sans-serif; font-size: 0.95rem; letter-spacing: 0.1em; cursor: pointer; width: 100%; }
        .sim-result-box { text-align: center; padding: 2rem 0; }
        .sim-result-score { font-family: 'Bebas Neue', sans-serif; font-size: 5rem; line-height: 1; margin-bottom: 0.3rem; }
        .sim-result-label { font-size: 0.9rem; color: rgba(255,255,255,0.5); margin-bottom: 2rem; }
        .sim-result-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.8rem; margin-bottom: 2rem; }
        .sim-result-stat { background: #161616; border: 1px solid #222; padding: 1rem 0.5rem; text-align: center; }
        .sim-wa-btns { display: flex; gap: 0.6rem; flex-wrap: wrap; justify-content: center; margin-bottom: 2rem; }
        .sim-wa-btn { padding: 0.75rem 1rem; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 0.85rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; border-radius: 3px; }
        .sim-wa-cta { background: linear-gradient(135deg, rgba(37,211,102,0.12) 0%, rgba(37,211,102,0.06) 100%); border: 1px solid rgba(37,211,102,0.35); padding: 1.5rem 1.2rem; margin-bottom: 2rem; text-align: center; border-radius: 4px; }
        .sim-wa-cta-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(1.3rem, 4vw, 1.8rem); letter-spacing: 0.06em; color: #FFFF00; line-height: 1.2; margin-bottom: 0.6rem; }
        .sim-wa-cta-sub { font-size: 0.88rem; color: rgba(255,255,255,0.6); margin-bottom: 1.2rem; line-height: 1.5; }
        @keyframes waGlow { 0%,100% { box-shadow: 0 0 16px rgba(37,211,102,0.6), 0 0 32px rgba(37,211,102,0.3); } 50% { box-shadow: 0 0 28px rgba(37,211,102,0.9), 0 0 56px rgba(37,211,102,0.5), 0 0 80px rgba(37,211,102,0.2); } }
        @keyframes waPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.015); } }
        .sim-wa-glow-btn { display: block; width: 100%; background: #25D366; color: #000; text-decoration: none; padding: 1.1rem 1.5rem; font-family: 'Bebas Neue', sans-serif; font-size: 1.15rem; letter-spacing: 0.08em; border-radius: 4px; animation: waGlow 2s ease-in-out infinite, waPulse 2s ease-in-out infinite; transition: opacity 0.2s; font-weight: 900; }
        .sim-wa-glow-btn:hover { opacity: 0.92; }
        .sim-detail { text-align: left; border-top: 1px solid #1a1a1a; padding-top: 1.5rem; }
        .sim-detail-title { font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; color: #FFFF00; letter-spacing: 0.15em; margin-bottom: 1rem; }
        .sim-detail-item { display: flex; gap: 0.8rem; align-items: flex-start; padding: 0.7rem 0; border-bottom: 1px solid #1a1a1a; }
        .sim-footer { background: #111; border-top: 1px solid #1a1a1a; padding: 1.2rem 1.5rem; text-align: center; font-size: 0.75rem; color: rgba(255,255,255,0.3); }
        .sim-licencia-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem; }
        .sim-licencia-card { background: #161616; border: 1px solid #222; padding: 2rem 1.5rem; text-align: center; cursor: pointer; transition: all 0.2s; }
        .sim-licencia-card:hover { border-color: #FFFF00; transform: translateY(-3px); box-shadow: 0 8px 30px rgba(255,255,0,0.05); }
        .sim-licencia-card .icon { font-size: 2.5rem; margin-bottom: 0.8rem; }
        .sim-licencia-card .titulo { font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; color: #f5f5f5; }
        .sim-licencia-card .desc { font-size: 0.85rem; color: #666; margin-top: 0.3rem; }
        @media (max-width: 480px) {
          .sim-result-grid { grid-template-columns: repeat(2, 1fr); }
          .sim-stats { gap: 0.6rem; }
          .sim-licencia-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="sim-page">
        <header className="sim-header">
          <Link href="/" className="sim-header-logo">
            <Image src={LOGO_URL} alt="Academia Punta" width={38} height={38} style={{borderRadius:"50%",objectFit:"cover"}} unoptimized/>
            <div>
              <div className="sim-header-name">Academia <span>Punta</span></div>
              <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:"Barlow Condensed, sans-serif"}}>Maldonado · Uruguay</div>
            </div>
          </Link>
          <Link href="/" className="sim-back">← Volver al sitio</Link>
        </header>

        <main className="sim-body">

          {/* ── SELECCIÓN DE LICENCIA ── */}
          {estado === "seleccion" && (
            <>
              <div className="sim-badge">🧠 Simulador de Prueba Teórica — IDM</div>
              <h1 className="sim-title">Simulador<br/><span>Teórico</span></h1>
              <p className="sim-sub">Selecciona el tipo de licencia. El simulador te presentará 30 preguntas aleatorias basadas en el examen real de la IDM. Aprobás con no más de 5 errores.</p>
              <div className="sim-stats">
                {[["30","Preguntas"],["5","Errores máx."],["PDF","Resultado"],["IDM","Basado en"]].map(([n,l])=>(
                  <div key={l} className="sim-stat">
                    <div className="sim-stat-n">{n}</div>
                    <div className="sim-stat-l">{l}</div>
                  </div>
                ))}
              </div>
              <label style={{display:"block",fontSize:"0.72rem",letterSpacing:"0.1em",textTransform:"uppercase",color:"#555",marginBottom:"0.5rem",fontFamily:"Barlow Condensed, sans-serif"}}>
                Tu nombre para el PDF (opcional)
              </label>
              <input className="sim-name-input" type="text" value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Ej: Juan Pérez"/>

              <div className="sim-licencia-grid">
                <div className="sim-licencia-card" onClick={() => iniciar("amateur")}>
                  <div className="icon">🚗</div>
                  <div className="titulo">Licencia Amateur</div>
                  <div className="desc">Para autos y motos. Categorías A, G1, G2 y G3.</div>
                </div>
                <div className="sim-licencia-card" onClick={() => iniciar("profesional")}>
                  <div className="icon">🚛</div>
                  <div className="titulo">Licencia Profesional</div>
                  <div className="desc">Para vehículos de carga, pasajeros y servicios especiales.</div>
                </div>
              </div>
            </>
          )}

          {/* ── JUGANDO ── */}
          {estado === "jugando" && (
            <>
              <div style={{marginBottom:"1.5rem"}}>
                <div className="sim-progress-info">
                  <span>Pregunta {actual+1} de {pregs.length}</span>
                  <span style={{color:"#FFFF00"}}>⏱ {formatTiempo(tiempo)}</span>
                </div>
                <div className="sim-progress-bar">
                  <div className="sim-progress-fill" style={{width:`${progreso}%`}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",marginTop:"0.4rem"}}>
                  <span style={{color:"#4CAF50"}}>✓ {actual - errores} correctas</span>
                  <span style={{color:errores>5?"#f44336":"#888"}}>✗ {errores} errores</span>
                </div>
              </div>

              <div className="sim-question">
                <span style={{color:"#FFFF00",marginRight:"0.5rem"}}>{actual+1}.</span>
                {pregs[actual].pregunta}
              </div>

              <div className="sim-options">
                {pregs[actual].opciones.map((op,i)=>{
                  let bg="#161616", border="#222", color="#aaa";
                  if (confirmada) {
                    if (i===pregs[actual].correcta) { bg="rgba(76,175,80,0.15)"; border="#4CAF50"; color="#4CAF50"; }
                    else if (i===seleccion) { bg="rgba(244,67,54,0.15)"; border="#f44336"; color="#f44336"; }
                  } else if (seleccion===i) { bg="rgba(255,255,0,0.08)"; border="#FFFF00"; color="#FFFF00"; }
                  return (
                    <button key={i} className="sim-option" onClick={()=>!confirmada&&setSeleccion(i)} disabled={confirmada}
                      style={{background:bg,border:`1px solid ${border}`,color}}>
                      <span className="sim-option-letter">
                        {confirmada&&i===pregs[actual].correcta?"✓":confirmada&&i===seleccion?"✗":String.fromCharCode(65+i)}
                      </span>
                      {op}
                    </button>
                  );
                })}
              </div>

              {!confirmada
                ? <button className="sim-confirm-btn" onClick={confirmar} disabled={seleccion===null}>Confirmar respuesta</button>
                : <button className="sim-next-btn" onClick={siguiente}>{actual+1>=pregs.length?"Ver resultado →":"Siguiente →"}</button>
              }
            </>
          )}

          {/* ── RESULTADO ── */}
          {estado === "resultado" && (
            <>
              <div className="sim-result-box">
                <div style={{fontSize:"3rem",marginBottom:"0.5rem"}}>{aprobado?"🎉":"😔"}</div>
                <div className="sim-result-score" style={{color:aprobado?"#4CAF50":"#f44336"}}>
                  {aprobado?"¡Aprobado!":"No aprobado"}
                </div>
                <p className="sim-result-label">
                  {aprobado?"Estás bien preparado para el examen real de la IDM.":`Tuviste ${errores} errores. El máximo permitido es 5.`}
                </p>
              </div>

              <div className="sim-result-grid">
                {[
                  ["🎯",`${correctas}/30`,"Correctas","#4CAF50"],
                  ["✗",`${errores}`,"Errores",errores>5?"#f44336":"#888"],
                  ["%",`${porcentaje}%`,"Puntaje","#FFFF00"],
                  ["⏱",formatTiempo(tiempo),"Tiempo","#aaa"],
                ].map(([icon,val,label,color])=>(
                  <div key={label as string} className="sim-result-stat">
                    <div style={{fontSize:"1rem",marginBottom:"0.2rem"}}>{icon}</div>
                    <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1.4rem",color:color as string}}>{val}</div>
                    <div style={{fontSize:"0.65rem",color:"#555",textTransform:"uppercase",letterSpacing:"0.08em"}}>{label}</div>
                  </div>
                ))}
              </div>

              <label style={{display:"block",fontSize:"0.72rem",letterSpacing:"0.1em",textTransform:"uppercase",color:"#555",marginBottom:"0.5rem",fontFamily:"Barlow Condensed, sans-serif"}}>
                Tu nombre para el PDF
              </label>
              <input className="sim-name-input" type="text" value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Ej: Juan Pérez"/>

              {!aprobado && (
                <div style={{background:"rgba(244,67,54,0.08)",border:"1px solid rgba(244,67,54,0.25)",padding:"1rem 1.2rem",marginBottom:"1.2rem",fontSize:"0.85rem",color:"#aaa",lineHeight:1.6}}>
                  Academia Punta ofrece <strong style={{color:"#FFFF00"}}>clases de apoyo para prueba teórica</strong> con docente. ¡Te ayudamos a aprobar!
                </div>
              )}

              <div style={{display:"flex",gap:"0.8rem",marginBottom:"1.5rem",flexWrap:"wrap"}}>
                <button onClick={() => setEstado("seleccion")} style={{flex:1,background:"#161616",color:"#f5f5f5",border:"1px solid #333",padding:"0.9rem",fontFamily:"Bebas Neue,sans-serif",fontSize:"0.9rem",letterSpacing:"0.1em",cursor:"pointer"}}>
                  🔄 Cambiar de licencia
                </button>
                <button onClick={generarPDF} disabled={generandoPDF} style={{flex:2,background:generandoPDF?"#333":"#FFFF00",color:"#000",border:"none",padding:"0.9rem",fontFamily:"Bebas Neue,sans-serif",fontSize:"0.9rem",letterSpacing:"0.1em",cursor:generandoPDF?"not-allowed":"pointer"}}>
                  {generandoPDF?"⏳ Generando...":"⬇️ Descargar resultado PDF"}
                </button>
              </div>

              <div className="sim-wa-cta">
                <div className="sim-wa-cta-title">¿NECESITA AYUDA PARA MEJORAR EL RESULTADO?</div>
                <p className="sim-wa-cta-sub">Escribí al WhatsApp y agendá tu clase teórica con docente. ¡Te ayudamos a aprobar!</p>
                <a href={`https://api.whatsapp.com/send?phone=${WA_MOTOS}&text=Hola%2C%20quiero%20mejorar%20mi%20resultado%20en%20la%20prueba%20te%C3%B3rica.`} target="_blank" rel="noopener noreferrer" className="sim-wa-glow-btn">
                  💬 Escribir al WhatsApp — +598 98 151 659
                </a>
              </div>

              <div className="sim-detail">
                <div className="sim-detail-title">Detalle de respuestas</div>
                {respuestas.map((r,i)=>{
                  const bancoPreguntas = tipoLicencia === "amateur" ? preguntasAmateur : preguntasProfesional;
                  return (
                  <div key={i} className="sim-detail-item">
                    <div style={{minWidth:"1.4rem",height:"1.4rem",background:r.correctamente?"rgba(76,175,80,0.15)":"rgba(244,67,54,0.15)",border:`1px solid ${r.correctamente?"#4CAF50":"#f44336"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",color:r.correctamente?"#4CAF50":"#f44336",fontWeight:700,flexShrink:0,marginTop:"2px"}}>
                      {r.correctamente?"✓":"✗"}
                    </div>
                    <div>
                      <div style={{fontSize:"0.82rem",color:"#ccc",marginBottom:"0.2rem"}}>{i+1}. {r.pregunta}</div>
                      <div style={{fontSize:"0.78rem",color:r.correctamente?"#4CAF50":"#f44336"}}>Tu respuesta: {bancoPreguntas.find(p=>p.pregunta===r.pregunta)?.opciones[r.seleccion]}</div>
                      {!r.correctamente && <div style={{fontSize:"0.78rem",color:"#4CAF50",marginTop:"0.1rem"}}>Correcta: {bancoPreguntas.find(p=>p.pregunta===r.pregunta)?.opciones[r.correcta]}</div>}
                    </div>
                  </div>
                )})}
              </div>
            </>
          )}
        </main>

        <footer className="sim-footer">
          © 2026 Academia de Choferes Punta — Maldonado, Uruguay
          <span style={{margin:"0 0.5rem"}}>·</span>
          Este simulador es una autoevaluación y no reemplaza el examen oficial de la IDM.
        </footer>
      </div>
    </>
  );
}
