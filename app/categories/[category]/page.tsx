import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolsByCategory, CATEGORY_LABELS, type Category } from "@/lib/tools";
import { CATEGORY_OVERVIEW } from "@/lib/categories";
import type { Metadata } from "next";

interface Props { params: Promise<{ category: string }> }

const VALID: Category[] = ["shared", "vps", "dedicated", "storage", "managed"];

export async function generateStaticParams() {
  return VALID.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!VALID.includes(category as Category)) return {};
  const overview = CATEGORY_OVERVIEW[category as Category];
  return {
    title: overview.metaTitle,
    description: overview.metaDescription,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!VALID.includes(category as Category)) notFound();
  const cat = category as Category;
  const catTools = getToolsByCategory(cat);
  const overview = CATEGORY_OVERVIEW[cat];

  return (
    <>
      {/* Hero */}
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
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "16px" }}>
            {overview.hero}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--fg-body)", maxWidth: "740px", lineHeight: 1.6 }}>
            {overview.intro}
          </p>
        </div>
      </div>

      {/* Provider cards */}
      {catTools.length > 0 && (
        <div style={{ background: "var(--bg)", padding: "48px 0", borderBottom: "1px solid var(--border)" }}>
          <div className="container">
            <h2 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>
              Top {CATEGORY_LABELS[cat]} providers
            </h2>
            <div style={{ display: "grid", gap: "14px" }}>
              {catTools.map((tool) => (
                <Link key={tool.slug} href={`/reviews/${tool.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card review-card" style={{ padding: "24px 28px", display: "grid", gridTemplateColumns: "80px 1fr auto", gap: "24px", alignItems: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <div className="score-num" style={{ fontSize: "2rem" }}>{tool.rating.toFixed(1)}</div>
                      <div className="label">/5.0</div>
                    </div>
                    <div>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
                        <h3 style={{ fontSize: "1.15rem" }}>{tool.name}</h3>
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
      )}

      {catTools.length === 0 && (
        <div style={{ background: "var(--bg)", padding: "32px 0", borderBottom: "1px solid var(--border)" }}>
          <div className="container">
            <div className="card" style={{ padding: "24px", textAlign: "center" }}>
              <p style={{ fontSize: "0.95rem", color: "var(--fg-body)", marginBottom: 0 }}>
                Provider reviews in this category are coming soon. The category buyer&apos;s guide and FAQs below cover what to look for when evaluating options.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Highlights */}
      <div style={{ background: "var(--bg-white)", padding: "48px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>
            Why {CATEGORY_LABELS[cat]}
          </h2>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {overview.highlights.map((h, i) => (
              <div key={i} className="card" style={{ padding: "24px" }}>
                <h3 style={{ fontSize: "1.05rem", marginBottom: "10px" }}>{h.heading}</h3>
                <p style={{ fontSize: "0.92rem", color: "var(--fg-body)", lineHeight: 1.6, marginBottom: 0 }}>
                  {h.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What to look for */}
      <div style={{ background: "var(--bg)", padding: "48px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "8px" }}>
            What to look for
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--fg-body)", marginBottom: "24px", maxWidth: "680px" }}>
            The factors that actually determine whether a {CATEGORY_LABELS[cat].toLowerCase()} provider is worth it — beyond the marketing copy.
          </p>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {overview.whatToLookFor.map((h, i) => (
              <div key={i} className="card" style={{ padding: "24px" }}>
                <h3 style={{ fontSize: "1.05rem", marginBottom: "10px" }}>{h.heading}</h3>
                <p style={{ fontSize: "0.92rem", color: "var(--fg-body)", lineHeight: 1.6, marginBottom: 0 }}>
                  {h.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Best for / Not for */}
      <div style={{ background: "var(--bg-white)", padding: "48px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="card" style={{ padding: "24px" }}>
              <div className="eyebrow" style={{ color: "var(--green)" }}>Best for</div>
              <p style={{ fontSize: "0.95rem", color: "var(--fg-body)", lineHeight: 1.6, marginTop: "8px", marginBottom: 0 }}>
                {overview.bestFor}
              </p>
            </div>
            <div className="card" style={{ padding: "24px" }}>
              <div className="eyebrow" style={{ color: "var(--fg-dim)" }}>Not the right fit for</div>
              <p style={{ fontSize: "0.95rem", color: "var(--fg-body)", lineHeight: 1.6, marginTop: "8px", marginBottom: 0 }}>
                {overview.notFor}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: "var(--bg)", padding: "48px 0" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>
            {CATEGORY_LABELS[cat]} FAQ
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "820px" }}>
            {overview.faqs.map((f, i) => (
              <details key={i} className="card" style={{ padding: "20px 24px" }}>
                <summary style={{ fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>{f.q}</summary>
                <p style={{ fontSize: "0.92rem", color: "var(--fg-body)", lineHeight: 1.6, marginTop: "10px", marginBottom: 0 }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
