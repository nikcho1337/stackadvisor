import type { Metadata } from "next";
import { Archivo_Black, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const archivo = Archivo_Black({
  weight: "400",
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "StackAdvisor — Web Hosting & Server Reviews",
    template: "%s | StackAdvisor",
  },
  description:
    "Independent benchmarks and honest reviews of web hosting, cloud VPS, dedicated servers, and storage providers. Real performance data, no vendor influence.",
  metadataBase: new URL("https://stackadvisor.io"),
  openGraph: {
    type: "website",
    siteName: "StackAdvisor",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        {/* ── Announcement bar ── */}
        <div style={{
          background: "linear-gradient(90deg, #1D4ED8 0%, #2563EB 50%, #1D4ED8 100%)",
          padding: "8px 0",
          textAlign: "center",
        }}>
          <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <span style={{
              background: "rgba(255,255,255,0.18)", color: "#fff",
              fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.08em", padding: "2px 8px", borderRadius: "4px",
            }}>New</span>
            <span style={{
              display: "flex", alignItems: "center", gap: "4px",
              background: "rgba(255,255,255,0.12)", borderRadius: "4px",
              padding: "3px 8px",
            }}>
              <img src="/flags/us.png" height="13" width="13" alt="US" style={{ display: "block" }} />
              <img src="/flags/br.png" height="13" width="13" alt="BR" style={{ display: "block" }} />
            </span>
            <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.92)", fontWeight: 500 }}>
              InterServer VPS from <strong style={{ color: "#fff" }}>$3/mo</strong> — price locked forever. No renewal surprises.
            </span>
            <a href="/reviews/interserver-vps-review" className="announce-btn" style={{
              fontSize: "0.78rem", fontWeight: 700, color: "#fff",
              background: "rgba(255,255,255,0.15)", borderRadius: "4px",
              padding: "2px 10px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)",
              whiteSpace: "nowrap",
            }}>
              Read review →
            </a>
          </div>
        </div>
        <Nav />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
