import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { tools, getToolBySlug, getRatingLabel, CATEGORY_LABELS } from "@/lib/tools";
import NetworkBackground from "@/components/NetworkBackground";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return { title: tool.metaTitle, description: tool.metaDescription };
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const ratingColor = tool.rating >= 4.7 ? "var(--green)" : tool.rating >= 4.4 ? "var(--accent)" : "var(--grey)";

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <div style={{
        background: "var(--bg-dark)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "52px 0 48px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Same animated background as homepage */}
        <NetworkBackground />

        {/* Subtle green glow top-right */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(22,163,74,0.12) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>

          {/* Breadcrumb */}
          <nav style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "28px" }}>
            <Link href="/" style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <Link href="/reviews" style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>Reviews</Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)" }}>{tool.name}</span>
          </nav>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "52px", alignItems: "start" }}>

            {/* Left */}
            <div>
              {/* Badges */}
              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "24px" }}>
                <span className={`badge badge-${tool.badgeColor}`}>{tool.badge}</span>
                <span style={{
                  fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.08em", color: "rgba(255,255,255,0.45)",
                  background: "rgba(255,255,255,0.07)", padding: "3px 10px", borderRadius: "20px",
                }}>
                  {CATEGORY_LABELS[tool.category]}
                </span>
              </div>

              {/* Full logo */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "14px 24px",
                }}>
                  <Image
                    src={tool.heroImage}
                    alt={tool.heroImageAlt}
                    width={160}
                    height={48}
                    style={{ objectFit: "contain", objectPosition: "left center" }}
                    unoptimized
                  />
                </div>
              </div>

              {/* Title */}
              <h1 style={{
                fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
                color: "#fff",
                marginBottom: "16px",
                lineHeight: "1.1",
                letterSpacing: "-0.025em",
              }}>
                {tool.name} Review{" "}
                <span style={{ color: "var(--green)", fontStyle: "italic" }}>2026</span>
              </h1>

              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: "1.75", maxWidth: "520px", margin: 0 }}>
                {tool.tagline}
              </p>
            </div>

            {/* Right — rating + CTA card */}
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "32px 28px",
              backdropFilter: "blur(8px)",
            }}>
              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
                {/* Score ring */}
                <div style={{
                  width: "96px", height: "96px", borderRadius: "50%",
                  border: `3px solid ${ratingColor}`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: `0 0 24px ${ratingColor}40`,
                  background: `${ratingColor}0F`,
                }}>
                  <span style={{
                    fontFamily: "var(--font-archivo), sans-serif",
                    fontWeight: 900,
                    fontSize: "2.4rem",
                    color: ratingColor,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}>
                    {tool.rating.toFixed(1)}
                  </span>
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em", marginTop: "2px" }}>
                    / 5.0
                  </span>
                </div>
                <div>
                  <div style={{
                    fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: "4px",
                  }}>
                    Our Rating
                  </div>
                  <div style={{
                    fontFamily: "var(--font-archivo), sans-serif",
                    fontWeight: 900, fontSize: "1.1rem",
                    color: ratingColor,
                  }}>
                    {getRatingLabel(tool.rating)}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>
                    Tested Apr 2026
                  </div>
                </div>
              </div>

              {/* Meta rows */}
              {[
                { label: "Price", value: tool.price },
                { label: "Category", value: CATEGORY_LABELS[tool.category] },
              ].map((row) => (
                <div key={row.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.07)",
                }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)" }}>{row.label}</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#fff" }}>{row.value}</span>
                </div>
              ))}

              {/* CTA */}
              <a
                href={tool.affiliateHref}
                target="_blank" rel="noopener noreferrer sponsored"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "100%", marginTop: "20px", padding: "13px 20px",
                  background: "var(--green)", color: "#fff",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 700, fontSize: "0.875rem",
                  borderRadius: "var(--radius)", textDecoration: "none",
                  transition: "background 0.15s, transform 0.1s",
                  boxShadow: "0 2px 12px rgba(22,163,74,0.35)",
                }}
              >
                {tool.affiliateCta}
              </a>
              <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.25)", textAlign: "center", marginTop: "8px", lineHeight: "1.5" }}>
                Affiliate link — we may earn a commission at no cost to you
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────── */}
      <div style={{ background: "var(--bg)", padding: "56px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "48px", alignItems: "start" }}>
            <div>

              {/* Intro */}
              <div className="prose" style={{ marginBottom: "40px" }}>
                <div style={{ width: "36px", height: "3px", background: "var(--green)", marginBottom: "24px", borderRadius: "2px" }} />
                {tool.intro.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {/* Specs */}
              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "1.4rem", marginBottom: "16px" }}>Quick Specs</h2>
                <div style={{ background: "var(--bg-white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                  {tool.specs.map((spec, i) => (
                    <div key={spec.label} style={{ display: "grid", gridTemplateColumns: "180px 1fr", borderBottom: i < tool.specs.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <div style={{ padding: "11px 16px", background: "var(--grey-light)", borderRight: "1px solid var(--border)" }}>
                        <span className="label">{spec.label}</span>
                      </div>
                      <div style={{ padding: "11px 16px" }}>
                        <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--fg)" }}>{spec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Sections */}
              {tool.sections.map((section) => (
                <section key={section.heading} className="prose" style={{ marginBottom: "36px" }}>
                  <h2>{section.heading}</h2>
                  {section.body.map((p, i) => <p key={i}>{p}</p>)}
                </section>
              ))}

              {/* Pros / Cons */}
              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "1.4rem", marginBottom: "16px" }}>Pros & Cons</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div style={{ background: "var(--green-light)", border: "1px solid rgba(22,163,74,0.2)", borderRadius: "var(--radius)", padding: "24px" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--green-dark)", marginBottom: "14px" }}>
                      ✓ Advantages
                    </div>
                    {tool.pros.map((pro) => (
                      <div key={pro} style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                        <span style={{ color: "var(--green)", flexShrink: 0, fontWeight: 700 }}>+</span>
                        <span style={{ fontSize: "0.875rem", color: "var(--fg-body)", lineHeight: "1.5" }}>{pro}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#FFF5F5", border: "1px solid #FED7D7", borderRadius: "var(--radius)", padding: "24px" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#C53030", marginBottom: "14px" }}>
                      — Limitations
                    </div>
                    {tool.cons.map((con) => (
                      <div key={con} style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                        <span style={{ color: "#E53E3E", flexShrink: 0, fontWeight: 700 }}>—</span>
                        <span style={{ fontSize: "0.875rem", color: "var(--fg-body)", lineHeight: "1.5" }}>{con}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Verdict */}
              <section style={{ marginBottom: "40px" }}>
                <div style={{
                  background: "var(--bg-dark)",
                  borderRadius: "var(--radius)",
                  padding: "28px 32px",
                  position: "relative", overflow: "hidden",
                }}>
                  {/* green left bar */}
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: "var(--green)", borderRadius: "4px 0 0 4px" }} />
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--green)", marginBottom: "10px" }}>
                    Our Verdict
                  </div>
                  <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.8)", lineHeight: "1.8", margin: 0 }}>{tool.verdict}</p>
                </div>
              </section>

              {/* Who for */}
              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "1.4rem", marginBottom: "16px" }}>Is it right for you?</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div style={{ background: "var(--green-light)", border: "1px solid rgba(22,163,74,0.25)", borderRadius: "var(--radius)", padding: "24px" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--green-dark)", marginBottom: "10px" }}>
                      ✓ Recommended for
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--fg-body)", lineHeight: "1.7", margin: 0 }}>{tool.whoFor}</p>
                  </div>
                  <div style={{ background: "var(--grey-light)", border: "1px solid var(--border-dark)", borderRadius: "var(--radius)", padding: "24px" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--grey)", marginBottom: "10px" }}>
                      — Not ideal for
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--fg-body)", lineHeight: "1.7", margin: 0 }}>{tool.whoNotFor}</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* CTA card */}
              <div style={{
                background: "var(--bg-white)",
                border: "1px solid rgba(22,163,74,0.3)",
                borderRadius: "var(--radius)",
                padding: "24px",
                boxShadow: "0 4px 20px rgba(22,163,74,0.08)",
              }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--green)", marginBottom: "12px" }}>
                  Get {tool.shortName}
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--fg-body)", lineHeight: "1.6", marginBottom: "16px" }}>
                  Starting at {tool.price}. Tested and reviewed Apr 2026.
                </p>
                <a
                  href={tool.affiliateHref}
                  target="_blank" rel="noopener noreferrer sponsored"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: "100%", padding: "12px 20px",
                    background: "var(--green)", color: "#fff",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 700, fontSize: "0.875rem",
                    borderRadius: "var(--radius)", textDecoration: "none",
                    boxShadow: "0 2px 10px rgba(22,163,74,0.3)",
                  }}
                >
                  {tool.affiliateCta}
                </a>
              </div>

              {tool.alternatives.length > 0 && (
                <div className="card" style={{ padding: "24px" }}>
                  <div className="label" style={{ marginBottom: "14px" }}>Alternatives to Consider</div>
                  {tool.alternatives.map((alt) => (
                    <div key={alt.slug} style={{ paddingBottom: "14px", marginBottom: "14px", borderBottom: "1px solid var(--border)" }}>
                      <Link href={`/reviews/${alt.slug}`} style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--fg)" }}>
                        {alt.name} →
                      </Link>
                      <p style={{ fontSize: "0.8rem", color: "var(--fg-dim)", marginTop: "4px", lineHeight: "1.5" }}>{alt.reason}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
