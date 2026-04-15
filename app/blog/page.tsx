import Link from "next/link";
import { articles } from "@/lib/articles";
import ServerBackground from "@/components/ServerBackground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hosting Tips & Guides 2026 — StackAdvisor",
  description: "Practical hosting guides: shared vs VPS, how to choose a provider, dedicated server benchmarks, and storage cost breakdowns.",
};

export default function BlogPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <div style={{
        background: "var(--bg-dark)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "64px 0 56px",
        position: "relative",
        overflow: "hidden",
      }}>
        <ServerBackground />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: "#60A5FA",
            marginBottom: "16px",
          }}>
            <span style={{ display: "inline-block", width: "20px", height: "2px", background: "#60A5FA", borderRadius: "2px" }} />
            Hosting Tips
          </div>

          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "#fff",
            marginBottom: "16px",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}>
            Guides to Pick the{" "}
            <span style={{ color: "#60A5FA" }}>Right Infrastructure</span>
          </h1>

          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", maxWidth: "520px", lineHeight: 1.75, margin: 0 }}>
            Practical breakdowns on shared hosting, cloud VPS, dedicated servers, and storage — written by engineers who run production infrastructure.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: "32px", marginTop: "36px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { value: `${articles.length}`, label: "Guides Published" },
              { value: "100%", label: "Independent" },
              { value: "2026", label: "Up to Date" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, fontSize: "1.6rem", color: "#fff", letterSpacing: "-0.03em" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ARTICLES GRID ────────────────────────────────────── */}
      <div style={{ background: "var(--bg)", padding: "56px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {articles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center",
                      padding: "3px 10px", borderRadius: "20px",
                      fontSize: "0.7rem", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.06em",
                      background: "#EFF6FF", color: "#1D4ED8",
                    }}>
                      {article.category}
                    </span>
                    <span className="label">{article.readTime}</span>
                    <span className="label">
                      {new Date(article.publishDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <h2 style={{ fontSize: "1.2rem", lineHeight: "1.35" }}>{article.title}</h2>
                  <p style={{ fontSize: "0.9rem", color: "var(--fg-body)", lineHeight: "1.7", flexGrow: 1 }}>
                    {article.excerpt}
                  </p>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#2563EB" }}>Read tip →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
