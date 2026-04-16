import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolsByCategory, CATEGORY_LABELS, CATEGORY_DESCRIPTIONS, type Category } from "@/lib/tools";
import type { Metadata } from "next";

interface Props { params: Promise<{ category: string }> }

const VALID: Category[] = ["shared", "vps", "dedicated", "storage", "managed"];

export async function generateStaticParams() {
  return VALID.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!VALID.includes(category as Category)) return {};
  const label = CATEGORY_LABELS[category as Category];
  return {
    title: `Best ${label} Providers 2026 — Compared & Ranked`,
    description: `Honest benchmarks and reviews of the best ${label.toLowerCase()} providers. Real uptime data, pricing breakdowns, and support quality ratings.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!VALID.includes(category as Category)) notFound();
  const cat = category as Category;
  const catTools = getToolsByCategory(cat);

  return (
    <>
      <div style={{ background: "var(--bg-white)", borderBottom: "1px solid var(--border)", padding: "56px 0 48px" }}>
        <div className="container">
          <nav style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
            <Link href="/" style={{ fontSize: "0.82rem", color: "var(--fg-dim)" }}>Home</Link>
            <span style={{ color: "var(--fg-muted)" }}>/</span>
            <Link href="/reviews" style={{ fontSize: "0.82rem", color: "var(--fg-dim)" }}>Reviews</Link>
            <span style={{ color: "var(--fg-muted)" }}>/</span>
            <span style={{ fontSize: "0.82rem", color: "var(--fg)" }}>{CATEGORY_LABELS[cat]}</span>
          </nav>
          <div className="eyebrow">{CATEGORY_LABELS[cat]}</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "12px" }}>
            Best {CATEGORY_LABELS[cat]} Providers
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--fg-body)" }}>{CATEGORY_DESCRIPTIONS[cat]}</p>
        </div>
      </div>

      <div style={{ background: "var(--bg)", padding: "56px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gap: "14px" }}>
            {catTools.map((tool) => (
              <Link key={tool.slug} href={`/reviews/${tool.slug}`} style={{ textDecoration: "none" }}>
                <div className="card review-card" style={{ padding: "24px 28px", display: "grid", gridTemplateColumns: "80px 1fr auto", gap: "24px", alignItems: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div className="score-num" style={{ fontSize: "2rem" }}>{tool.rating.toFixed(1)}</div>
                    <div className="label">/5.0</div>
                  </div>
                  <div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px" }}>
                      <h2 style={{ fontSize: "1.15rem" }}>{tool.name}</h2>
                      <span className={`badge badge-${tool.badgeColor}`}>{tool.badge}</span>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--fg-body)" }}>{tool.tagline}</p>
                  </div>
                  <div className="review-card-cta" style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 600, marginBottom: "6px" }}>{tool.price}</div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--accent)" }}>Read review →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
