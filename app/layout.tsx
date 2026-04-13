import type { Metadata } from "next";
import "./globals.css";

const DOMAIN = "https://academiadechoferespunta.com";

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: {
    default: "Academia de Choferes Punta | Licencias en Maldonado y Punta del Este",
    template: "%s | Academia de Choferes Punta",
  },
  description:
    "Academia de choferes líder en Maldonado y Punta del Este, Uruguay. Clases de autos, motos G1 G2 G3, clases en inglés, gestoría IDM, manejo defensivo, licencias profesionales. Instructores certificados UNASEV. +15 años. 4.9★ Google.",
  keywords: [
    "academia choferes punta del este",
    "licencia conducir maldonado",
    "clases manejo punta del este",
    "autoescuela maldonado uruguay",
    "clases manejo maldonado",
    "academia punta choferes",
    "licencia autos motos uruguay",
    "instructor manejo punta del este",
    "gestoría licencia IDM maldonado",
    "manejo defensivo maldonado",
    "prueba teórica licencia uruguay",
    "clases moto pista la loma",
    "clases moto G1 uruguay",
    "clases moto G2 uruguay",
    "clases moto G3 uruguay",
    "licencia moto G1 maldonado",
    "licencia moto G2 maldonado",
    "licencia moto G3 maldonado",
    "licencia profesional vehículos especiales uruguay",
    "licencia profesional maldonado",
    "licencia vehículos especiales uruguay",
    "apoyo psicológico manejo uruguay",
    "psicóloga conductores maldonado",
    "driving lessons english punta del este",
    "driving school english punta del este",
    "clases de inglés manejo uruguay",
    "academia choferes maldonado uruguay",
    "sacar licencia punta del este",
    "renovar licencia maldonado",
    "licencia B maldonado",
    "licencia A1 A2 A3 uruguay",
  ],
  authors: [{ name: "Academia de Choferes Punta" }],
  creator: "Academia de Choferes Punta",
  publisher: "Academia de Choferes Punta",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Academia de Choferes Punta | Licencias en Maldonado y Punta del Este",
    description:
      "Clases personalizadas de autos y motos G1 G2 G3. Clases en inglés. Licencias profesionales. Instructores certificados UNASEV. Gestoría IDM completa. 4.9★ en Google con 677 reseñas.",
    url: DOMAIN,
    siteName: "Academia de Choferes Punta",
    images: [
      {
        url: "/logo.jpg",
        width: 512,
        height: 512,
        alt: "Academia de Choferes Punta — Maldonado, Uruguay",
      },
    ],
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Academia de Choferes Punta | Licencias en Maldonado",
    description:
      "Sacá tu licencia sin dramas. Autos, motos G1/G2/G3, clases en inglés, licencias profesionales. Instructores certificados. Punta del Este, Uruguay.",
    images: ["/logo.jpg"],
  },
  alternates: { canonical: DOMAIN },
  icons: {
    icon: [{ url: "/logo.jpg", type: "image/jpeg" }],
    apple: { url: "/logo.jpg" },
    shortcut: "/logo.jpg",
  },
  category: "education",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "EducationalOrganization", "DrivingSchool"],
      "@id": `${DOMAIN}/#organization`,
      name: "Academia de Choferes Punta",
      alternateName: ["Academia Punta", "Academia Choferes Punta del Este"],
      description:
        "Academia de choferes en Maldonado y Punta del Este, Uruguay. Clases de autos y motos G1 G2 G3, licencias profesionales para vehículos especiales, clases en inglés, gestoría IDM, manejo defensivo. Más de 15 años. Instructores certificados UNASEV.",
      url: DOMAIN,
      logo: {
        "@type": "ImageObject",
        url: `${DOMAIN}/logo.jpg`,
        width: 512,
        height: 512,
      },
      image: `${DOMAIN}/logo.jpg`,
      telephone: ["+59894774465", "+59898151659", "+59893312019"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Maldonado",
        addressRegion: "Maldonado",
        addressCountry: "UY",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -34.9013,
        longitude: -54.9516,
      },
      areaServed: [
        { "@type": "City", name: "Maldonado" },
        { "@type": "City", name: "Punta del Este" },
        { "@type": "City", name: "San Carlos" },
        { "@type": "City", name: "Piriápolis" },
        { "@type": "AdministrativeArea", name: "Departamento de Maldonado" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "08:00",
          closes: "20:00",
        },
      ],
      priceRange: "$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "677",
        bestRating: "5",
        worstRating: "1",
      },
      sameAs: [
        "https://www.facebook.com/Academia-de-choferes-Punta-339658393468083",
        "https://www.instagram.com/academiadechoferespunta/",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de Academia de Choferes Punta",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Clases de Manejo de Autos",
              description:
                "Clases personalizadas en Chevrolets nuevos con doble mando. Lunes a sábados. Te pasamos a buscar.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Clases de Motos G1",
              description:
                "Clases para licencia de moto categoría G1 en pista La Loma. Vehículo, casco y reflectivos incluidos.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Clases de Motos G2",
              description:
                "Clases para licencia de moto categoría G2 en pista La Loma con BMW G310.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Clases de Motos G3",
              description:
                "Clases para licencia de moto categoría G3 en pista La Loma con BMW G310.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Licencias Profesionales — Vehículos Especiales",
              description:
                "Formación para licencias profesionales de vehículos especiales ante la IDM Maldonado.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Gestoría de Trámites IDM",
              description:
                "Realizamos todos los trámites ante la Intendencia de Maldonado. Tu tiempo vale oro.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Manejo Defensivo",
              description:
                "Charlas lunes, miércoles y viernes. Dos horarios: 8:00 y 18:30.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Apoyo Prueba Teórica",
              description:
                "Clase con docente. El 70% reprueba sin preparación.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Driving Lessons in English",
              description:
                "Driving lessons in English for international visitors and residents in Punta del Este, Uruguay. Contact: +598 93 312 019.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${DOMAIN}/#website`,
      url: DOMAIN,
      name: "Academia de Choferes Punta",
      publisher: { "@id": `${DOMAIN}/#organization` },
      inLanguage: ["es-UY", "en"],
      potentialAction: {
        "@type": "SearchAction",
        target: `${DOMAIN}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cuánto tarda sacar la licencia de conducir en Maldonado?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El proceso toma entre 2 y 6 semanas. Academia Punta coordina todas las instancias: trámite IDM, charla defensivo, prueba teórica, aptitud física y prueba práctica.",
          },
        },
        {
          "@type": "Question",
          name: "¿Hacen los trámites en la IDM de Maldonado?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Ofrecemos gestoría completa para realizar todos los trámites ante la Intendencia de Maldonado.",
          },
        },
        {
          "@type": "Question",
          name: "¿Tienen clases de manejo de motos en Punta del Este?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Clases en pista La Loma con BMW G310 para categorías G1, G2 y G3. Proporcionamos vehículo, casco y reflectivos. Lunes a sábados.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué categorías de motos enseñan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dictamos clases para las tres categorías de motos: G1 (hasta 50cc), G2 (hasta 125cc) y G3 (más de 125cc). Todas en pista La Loma con instructores certificados UNASEV.",
          },
        },
        {
          "@type": "Question",
          name: "¿Ofrecen licencias profesionales para vehículos especiales?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Brindamos formación y gestoría para licencias profesionales de vehículos especiales ante la Intendencia de Maldonado.",
          },
        },
        {
          "@type": "Question",
          name: "¿Ofrecen clases de manejo en inglés?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! We offer driving lessons in English for international visitors and residents in Punta del Este, Uruguay. Contact us via WhatsApp at +598 93 312 019.",
          },
        },
        {
          "@type": "Question",
          name: "¿Dónde se hace la prueba práctica?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La prueba práctica se realiza en pista La Loma, único lugar habilitado por la IDM. Academia Punta presenta vehículo e instructor certificados.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué documentos necesito para sacar la licencia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Documento de identidad, certificado de aptitud física de institución autorizada, y completar la charla de manejo defensivo. Academia Punta te guía en todo el proceso.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-UY">
      <head>
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <meta name="geo.region" content="UY-MA" />
        <meta name="geo.placename" content="Maldonado, Uruguay" />
        <meta name="geo.position" content="-34.9013;-54.9516" />
        <meta name="ICBM" content="-34.9013, -54.9516" />
        <meta name="theme-color" content="#1a1a2e" />
        <meta name="format-detection" content="telephone=yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
