import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// 1. Setup Font
// Inter untuk teks body (modern & bersih)
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

// Playfair Display untuk judul (elegan & klasik)
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

// 2. Metadata Lengkap (SEO & Social Share)
export const metadata: Metadata = {
  title: "The Wedding of Romeo & Juliet",
  description: "Minggu, 24 Agustus 2025. Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di pernikahan kami.",
  
  // Metadata untuk Social Media (WhatsApp, Instagram, Facebook)
  openGraph: {
    title: "The Wedding of Romeo & Juliet",
    description: "Minggu, 24 Agustus 2025. Mohon doa restu Anda.",
    // url: "https://domain-kamu.com", // (Opsional) Isi jika sudah deploy
    siteName: "Romeo & Juliet Wedding",
    
    // Gambar Thumbnail (Muncul saat link dishare di WA)
    // Pastikan file 'og-image.png' ada di folder public/images/
    images: [
      {
        url: "/images/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Romeo & Juliet Wedding Invitation",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  
  // Icon di tab browser
  icons: {
    icon: "/favicon.ico",
    // apple: "/apple-touch-icon.png", // (Opsional) Icon untuk iPhone home screen
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-paper-50 text-sage-900 selection:bg-sage-200 selection:text-sage-900 overflow-x-hidden`}>
        
        {/* Background Texture Global (Pola Kertas Halus) */}
        {/* Menggunakan pattern online yang ringan sebagai overlay */}
        <div className="fixed inset-0 z-0 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>
        
        {/* Konten Utama */}
        <main className="relative z-10 w-full min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}