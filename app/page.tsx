import Link from "next/link";
import Image from "next/image";
import NetworkBackground from "@/components/NetworkBackground";
import CircuitBackground from "@/components/CircuitBackground";
import ServerBackground from "@/components/ServerBackground";
import { featuredTools, tools, CATEGORY_LABELS, CATEGORY_DESCRIPTIONS, type Category } from "@/lib/tools";
import { articles } from "@/lib/articles";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

const CATEGORY_ICONS: Record<Category, { svg: React.ReactNode; color: string; bg: string }> = {
  shared: {
    color: "#2563EB", bg: "#EFF6FF",
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  vps: {
    color: "#EA580C", bg: "#FFF7ED",
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  },
  dedicated: {
    color: "#0F172A", bg: "#F1F5F9",
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="12" y2="15"/><circle cx="15" cy="15" r="1.5" fill="currentColor" stroke="none"/></svg>,
  },
  storage: {
    color: "#7C3AED", bg: "#F5F3FF",
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  },
  managed: {
    color: "#16A34A", bg: "#F0FDF4",
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  },
};

export default function HomePage() {
  const latestArticles = articles.slice(0, 3);
  // VPS Special ($3/mo) is the lead product — most compelling entry offer
  const heroTool = featuredTools.find(t => t.slug === "interserver-vps-review") ?? featuredTools[0];

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, #fff 0%, #fdf9f6 60%, #fff8f3 100%)",
        borderBottom: "1px solid var(--border)",
        padding: "80px 0 72px",
        position: "relative",
        overflow: "hidden",
      }}>
        <NetworkBackground />
        <div style={{
          position: "absolute", top: "-100px", right: "-100px",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(242,101,34,0.1) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 440px", gap: "64px", alignItems: "center" }}>

            {/* Left */}
            <div>
              <div className="eyebrow">Web Hosting · Cloud VPS · Dedicated Servers</div>

              <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", marginBottom: "20px", lineHeight: "1.05" }}>
                Find the Right Server<br />
                <span style={{ color: "var(--accent)" }}>for Your Project.</span>
              </h1>

              <p style={{ fontSize: "1.1rem", color: "var(--fg-body)", lineHeight: "1.8", maxWidth: "500px", marginBottom: "36px" }}>
                In-depth benchmarks of web hosting, cloud VPS, dedicated servers, and storage providers — so you pick the right infrastructure, not just the cheapest ad.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/reviews" className="btn-primary">
                  Compare Providers →
                </Link>
                <Link href="/blog" className="btn-outline">
                  Read Hosting Guides
                </Link>
              </div>

              {/* Trust bar */}
              <div style={{ display: "flex", gap: "32px", marginTop: "44px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
                {[
                  { value: `${tools.length}+`, label: "Providers Reviewed" },
                  { value: `${articles.length}`, label: "Hosting Guides" },
                  { value: "100%", label: "Independent" },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, fontSize: "1.75rem", color: "var(--fg)", letterSpacing: "-0.03em" }}>
                      {s.value}
                    </div>
                    <div className="label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Hero feature card */}
            {heroTool && (
              <div style={{
                background: "#fff",
                border: "2px solid var(--accent)",
                borderRadius: "16px",
                padding: "32px",
                boxShadow: "0 8px 40px rgba(242,101,34,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                  <span className="badge badge-orange">{heroTool.badge}</span>
                  <span className="label">{CATEGORY_LABELS[heroTool.category]}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "10px", background: heroTool.logoBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                    <Image
                      src={heroTool.heroImage}
                      alt={heroTool.heroImageAlt}
                      width={36}
                      height={36}
                      style={{ objectFit: "contain" }}
                      unoptimized
                    />
                  </div>
                  <div>
                    <h2 style={{ fontSize: "1.4rem", margin: 0 }}>{heroTool.name}</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                      {"★★★★★".split("").map((_s, i) => (
                        <span key={i} style={{ color: "#F59E0B", fontSize: "0.85rem" }}>★</span>
                      ))}
                      <span className="label" style={{ marginLeft: "4px" }}>{heroTool.rating.toFixed(1)}/5.0</span>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: "0.9rem", color: "var(--fg-body)", lineHeight: "1.7", marginBottom: "20px" }}>
                  {heroTool.tagline}
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
                  {heroTool.specs.slice(0, 4).map((row) => (
                    <div key={row.label} style={{ padding: "10px 12px", background: "#FEF3EC", borderRadius: "8px" }}>
                      <div className="label" style={{ color: "var(--accent-dark)", marginBottom: "2px" }}>{row.label}</div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--fg)" }}>{row.value}</div>
                    </div>
                  ))}
                </div>

                <a
                  href={heroTool.affiliateHref}
                  target="_blank" rel="noopener noreferrer sponsored"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", borderRadius: "8px" }}
                >
                  {heroTool.affiliateCta} →
                </a>
                <Link href={`/reviews/${heroTool.slug}`} style={{ display: "block", textAlign: "center", marginTop: "10px", fontSize: "0.82rem", color: "var(--fg-dim)" }}>
                  Read our full review
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── PROVIDER LOGOS STRIP ────────────────────────────────── */}
      <section style={{ background: "var(--bg-white)", borderBottom: "1px solid var(--border)", padding: "14px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <span className="label" style={{ color: "var(--fg-muted)", whiteSpace: "nowrap", marginRight: "8px" }}>Tested &amp; reviewed:</span>
            {tools.map((tool) => (
              <Link key={tool.slug} href={`/reviews/${tool.slug}`} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "7px 14px 7px 8px",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  background: "#fff",
                }}>
                  {/* Logo */}
                  <div style={{
                    width: "30px", height: "30px", borderRadius: "7px",
                    background: tool.logoBg,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden",
                  }}>
                    <Image src={tool.heroImage} alt={tool.heroImageAlt} width={22} height={22} style={{ objectFit: "contain" }} unoptimized />
                  </div>
                  {/* Name + meta */}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--fg)", lineHeight: 1.2 }}>{tool.shortName}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: tool.logoFg }}>★ {tool.rating.toFixed(1)}</span>
                      <span style={{ fontSize: "0.7rem", color: "var(--fg-muted)" }}>·</span>
                      <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--fg-dim)" }}>{tool.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROVIDERS ──────────────────────────────────── */}
      <section className="section" style={{ background: "var(--bg-dark)", position: "relative", overflow: "hidden" }}>
        <ServerBackground />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px" }}>
            <div>
              <div className="eyebrow" style={{ color: "#4ADE80" }}>Top Picks</div>
              <h2 style={{ fontSize: "2rem", color: "#fff" }}>Reviewed & Benchmarked</h2>
            </div>
            <Link href="/reviews" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#4ADE80" }}>
              See all reviews →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {featuredTools.slice(0, 6).map((tool) => (
              <Link key={tool.slug} href={`/reviews/${tool.slug}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: "0", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                  {/* Card header */}
                  <div style={{
                    height: "110px",
                    background: tool.logoBg,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "0 24px",
                    position: "relative", overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute", left: "-28px", top: "-28px",
                      width: "130px", height: "130px", borderRadius: "50%",
                      background: `${tool.logoFg}18`,
                      pointerEvents: "none",
                    }} />
                    <div style={{ position: "relative", zIndex: 1, width: "80px", height: "64px", flexShrink: 0 }}>
                      <Image
                        src={tool.heroImage}
                        alt={tool.heroImageAlt}
                        fill
                        sizes="80px"
                        style={{ objectFit: "contain", objectPosition: "left center", mixBlendMode: "multiply" }}
                        unoptimized
                      />
                    </div>
                    <div style={{ textAlign: "right", position: "relative", zIndex: 1 }}>
                      <div style={{
                        fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900,
                        fontSize: "2.2rem", color: tool.logoFg, letterSpacing: "-0.03em", lineHeight: 1,
                      }}>
                        {tool.rating.toFixed(1)}
                      </div>
                      <div style={{ fontSize: "0.72rem", fontWeight: 600, color: tool.logoFg, opacity: 0.65, letterSpacing: "0.04em" }}>/5.0</div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "10px", flexGrow: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className={`badge badge-${tool.badgeColor}`}>{tool.badge}</span>
                      <span className="label">{CATEGORY_LABELS[tool.category]}</span>
                    </div>
                    <h3 style={{ fontSize: "1.1rem" }}>{tool.name}</h3>
                    <p style={{ fontSize: "0.855rem", color: "var(--fg-body)", lineHeight: "1.6", flexGrow: 1 }}>
                      {tool.tagline}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
                      <span className="price-tag">{tool.price}</span>
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--accent)" }}>Read →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOSTING GUIDES ──────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--bg-white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px" }}>
            <div>
              <div className="eyebrow">Hosting Guides</div>
              <h2 style={{ fontSize: "2rem" }}>Make the Right Infrastructure Decision</h2>
            </div>
            <Link href="/blog" style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--accent)" }}>
              All guides →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {latestArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                  <div style={{ position: "relative", height: "160px", flexShrink: 0 }}>
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width: 1200px) 33vw, 380px"
                      style={{ objectFit: "cover", objectPosition: article.imagePosition ?? "center" }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 100%)",
                    }} />
                    <div style={{ position: "absolute", bottom: "12px", left: "12px" }}>
                      <span className="badge badge-orange">{article.category}</span>
                    </div>
                  </div>

                  <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: "10px", flexGrow: 1 }}>
                    <span className="label">{article.readTime}</span>
                    <h3 style={{ fontSize: "1rem", lineHeight: "1.4" }}>{article.title}</h3>
                    <p style={{ fontSize: "0.855rem", color: "var(--fg-body)", lineHeight: "1.65", flexGrow: 1 }}>
                      {article.excerpt}
                    </p>
                    <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--accent)" }}>Read guide →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ──────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}>
        <CircuitBackground />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>Browse by Category</div>
            <h2 style={{ fontSize: "2rem" }}>What type of hosting do you need?</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px" }}>
            {CATEGORIES.map((cat) => (
              <Link key={cat} href={`/categories/${cat}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: "28px 20px", textAlign: "center", height: "100%", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "14px",
                    background: CATEGORY_ICONS[cat].bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: CATEGORY_ICONS[cat].color,
                  }}>
                    {CATEGORY_ICONS[cat].svg}
                  </div>
                  <div style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, fontSize: "0.95rem", color: "var(--fg)", letterSpacing: "-0.01em" }}>
                    {CATEGORY_LABELS[cat]}
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--fg-dim)", lineHeight: "1.5" }}>
                    {CATEGORY_DESCRIPTIONS[cat]}
                  </p>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--accent)", marginTop: "auto" }}>
                    {tools.filter(t => t.category === cat).length} reviews →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SECTION ───────────────────────────────────────── */}
      <section style={{ background: "var(--bg-dark)", padding: "72px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "2rem", color: "#fff" }}>Why Developers Trust StackAdvisor</h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", marginTop: "12px" }}>
              We benchmark before we recommend. No free trials, no vendor-sponsored content.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
            {[
              { icon: "📊", heading: "Real Benchmark Data", body: "Every review includes actual sysbench CPU scores, fio disk benchmarks, and network throughput numbers — not just specs copied from a provider's marketing page." },
              { icon: "💸", heading: "Full Cost Transparency", body: "We document renewal pricing, bandwidth overages, and add-on costs. The number you see in a review is what you'll actually pay — not a promotional headline rate." },
              { icon: "🔧", heading: "Built by Practitioners", body: "Our reviews are written by engineers who run production infrastructure. We care about uptime SLAs, support quality, and egress pricing because we pay those bills ourselves." },
            ].map((item) => (
              <div key={item.heading} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "28px" }}>
                <span style={{ fontSize: "1.8rem", display: "block", marginBottom: "14px" }}>{item.icon}</span>
                <h3 style={{ fontSize: "1.1rem", color: "#fff", marginBottom: "10px" }}>{item.heading}</h3>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: "1.75", margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
