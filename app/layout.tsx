import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Academia de Choferes Punta — Sacá tu licencia sin dramas",
  description: "La academia de choferes de referencia en Punta del Este y Maldonado. Clases de autos y motos, instructores certificados, gestoría IDM completa.",
  keywords: "academia choferes punta del este, licencia conducir maldonado, clases manejo uruguay, autoescuela punta del este",
  openGraph: {
    title: "Academia de Choferes Punta",
    description: "Sacá tu licencia sin dramas. Clases personalizadas, instructores certificados.",
    url: "https://academiadechoferespunta.com.uy",
    siteName: "Academia de Choferes Punta",
    locale: "es_UY",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
