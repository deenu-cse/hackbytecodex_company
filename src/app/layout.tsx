import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "lenis/react";
import Footer from "@/components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  metadataBase: new URL("https://hacbytecodex.com"),
  title: {
    default: "HacByteCodex | Digital Solutions Agency Haridwar",
    template: "%s | HacByteCodex",
  },
  description:
    "HacByteCodex delivers premium digital solutions in Haridwar and Uttarakhand — web development, app development, CRM, digital marketing, chrome extensions, advertisements, video editing, and social media handling.",
  keywords: [
    "digital solutions Haridwar",
    "Uttarakhand digital agency",
    "web development Haridwar",
    "app development Uttarakhand",
    "CRM development Haridwar",
    "digital marketing Haridwar",
    "chrome extension development",
    "video editing services",
    "social media management Uttarakhand",
  ],
  openGraph: {
    title: "HacByteCodex | Digital Solutions Agency Haridwar",
    description:
      "Premium web, app, CRM, marketing, advertising, video editing, and social media solutions for Haridwar and Uttarakhand businesses.",
    url: "https://hacbytecodex.com",
    siteName: "HacByteCodex",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HacByteCodex | Digital Solutions Agency Haridwar",
    description:
      "Premium web, app, CRM, marketing, advertising, video editing, and social media solutions for Haridwar and Uttarakhand businesses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'HacByteCodex',
              description:
                'HacByteCodex is a Haridwar digital agency specializing in web development, app development, CRM, digital marketing, chrome extensions, advertisements, video editing, and social media handling.',
              url: 'https://hacbytecodex.com',
              logo: 'https://hacbytecodex.com/logo.png',
              telephone: '+91 63788 37030',
              areaServed: ['Haridwar', 'Uttarakhand', 'India'],
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Haridwar, Uttarakhand',
                addressLocality: 'Haridwar',
                addressRegion: 'Uttarakhand',
                postalCode: '249401',
                addressCountry: 'IN',
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  contactType: 'customer support',
                  telephone: '+91 63788 37030',
                  areaServed: 'IN',
                  availableLanguage: ['English', 'Hindi'],
                },
              ],
              sameAs: [
                'https://www.linkedin.com/',
                'https://www.facebook.com/',
              ],
            })
          }}
        />
      </head>

      <body>
        <ReactLenis root options={{ lerp: 0.08, duration: 1.2, syncTouch: true }}>
          {children}
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}

