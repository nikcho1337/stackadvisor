import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-dark)", color: "#fff", marginTop: "auto" }}>

      {/* Main footer */}
      <div className="container" style={{ padding: "56px 24px 40px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px" }}>

        {/* Brand */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <span style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, fontSize: "1.2rem", color: "#fff", letterSpacing: "-0.03em" }}>Stack</span>
            <span style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, fontSize: "1.2rem", color: "var(--accent)", letterSpacing: "-0.03em" }}>Advisor</span>
            <span style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", marginLeft: "1px", marginBottom: "8px" }}>.io</span>
          </div>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: "1.7", maxWidth: "260px" }}>
            Independent benchmarks and honest reviews of web hosting, cloud VPS, dedicated servers, and storage providers.
          </p>
          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", lineHeight: "1.6" }}>
            We earn affiliate commissions when you sign up through our links — at no extra cost to you. This never influences our ratings or recommendations.
          </p>
        </div>

        {/* Top Providers */}
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>Top Providers</p>
          {[
            { href: "/reviews/interserver-vps-review", label: "InterServer VPS — $3/mo" },
            { href: "/reviews/interserver-web-hosting-review", label: "InterServer Web Hosting" },
            { href: "/reviews/interserver-email-hosting-review", label: "InterServer Email" },
            { href: "/reviews/serversp-dedicated-review", label: "ServerSP Dedicated — $169/mo" },
            { href: "/reviews", label: "All Reviews →" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", marginBottom: "10px", transition: "color 0.15s" }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Hosting Guides */}
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>Hosting Guides</p>
          {[
            { href: "/blog/shared-hosting-vs-vps", label: "Shared Hosting vs VPS" },
            { href: "/blog/best-vps-hosting-2026", label: "Best VPS in 2026" },
            { href: "/blog/dedicated-server-vs-vps", label: "Dedicated vs VPS" },
            { href: "/blog/storage-server-vs-object-storage", label: "Storage Server Guide" },
            { href: "/blog", label: "All Guides →" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", marginBottom: "10px" }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Company */}
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>Company</p>
          {[
            { href: "/about", label: "About Us" },
            { href: "/about#methodology", label: "Our Methodology" },
            { href: "/about#disclosure", label: "Affiliate Disclosure" },
            { href: "/reviews", label: "All Reviews" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", marginBottom: "10px" }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container" style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
            © 2026 StackAdvisor.io — All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
