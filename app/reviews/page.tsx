import Link from "next/link";
import { tools, CATEGORY_LABELS, type Category } from "@/lib/tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Hosting Reviews 2026 — Compared & Ranked | StackAdvisor",
  description: "Honest, independent reviews of web hosting, cloud VPS, dedicated servers, and storage providers. Real benchmark data, uptime stats, and support quality ratings.",
};

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

export default function ReviewsPage() {
  return (
    <>
      <div style={{ background: "var(--bg-white)", borderBottom: "1px solid var(--border)", padding: "56px 0 48px" }}>
        <div className="container">
          <div className="eyebrow">Hosting Reviews</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "16px" }}>Web Hosting & Server Reviews</h1>
          <p style={{ fontSize: "1rem", color: "var(--fg-body)", maxWidth: "560px" }}>
            Independent benchmarks of web hosting, cloud VPS, dedicated servers, and storage providers. Every review is based on real testing — no vendor influence, no sponsored rankings.
          </p>
        </div>
      </div>

      <div style={{ background: "var(--bg)", padding: "56px 0" }}>
        <div className="container">
          {CATEGORIES.map((cat) => {
            const catTools = tools.filter((t) => t.category === cat);
            if (!catTools.length) return null;
            return (
              <section key={cat} style={{ marginBottom: "56px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "16px", borderBottom: "2px solid var(--border)" }}>
                  <h2 style={{ fontSize: "1.4rem" }}>{CATEGORY_LABELS[cat]}</h2>
                  <span className="label">{catTools.length} review{catTools.length !== 1 ? "s" : ""}</span>
                </div>

                <div style={{ display: "grid", gap: "12px" }}>
                  {catTools.map((tool) => (
                    <Link key={tool.slug} href={`/reviews/${tool.slug}`} style={{ textDecoration: "none" }}>
                      <div className="card" style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "80px 1fr auto", gap: "24px", alignItems: "center" }}>
                        <div style={{ textAlign: "center" }}>
                          <div className="score-num" style={{ fontSize: "2rem" }}>{tool.rating.toFixed(1)}</div>
                          <div className="label">/5.0</div>
                        </div>

                        <div>
                          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px" }}>
                            <h3 style={{ fontSize: "1.1rem" }}>{tool.name}</h3>
                            <span className={`badge badge-${tool.badgeColor}`}>{tool.badge}</span>
                          </div>
                          <p style={{ fontSize: "0.875rem", color: "var(--fg-body)" }}>{tool.tagline}</p>
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--fg)", marginBottom: "6px" }}>{tool.price}</div>
                          <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--accent)" }}>Read review →</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
