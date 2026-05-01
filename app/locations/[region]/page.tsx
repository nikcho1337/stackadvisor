import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolsByLocation, getActiveLocations, LOCATION_LABELS, type Location } from "@/lib/tools";
import { LOCATION_OVERVIEW } from "@/lib/locations";
import FlagImg from "@/components/FlagImg";
import type { Metadata } from "next";

interface Props { params: Promise<{ region: string }> }

export async function generateStaticParams() {
  return getActiveLocations().map((region) => ({ region }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region } = await params;
  const activeLocations = getActiveLocations();
  if (!activeLocations.includes(region as Location)) return {};
  const overview = LOCATION_OVERVIEW[region as Location];
  return {
    title: overview.metaTitle,
    description: overview.metaDescription,
  };
}

export default async function LocationPage({ params }: Props) {
  const { region } = await params;
  const activeLocations = getActiveLocations();
  if (!activeLocations.includes(region as Location)) notFound();

  const loc = region as Location;
  const locTools = getToolsByLocation(loc);
  const overview = LOCATION_OVERVIEW[loc];

  return (
    <>
      {/* Hero */}
      <div style={{ background: "var(--bg-white)", borderBottom: "1px solid var(--border)", padding: "56px 0 48px" }}>
        <div className="container">
          <nav style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
            <Link href="/" style={{ fontSize: "0.82rem", color: "var(--fg-dim)" }}>Home</Link>
            <span style={{ color: "var(--fg-muted)" }}>/</span>
            <Link href="/locations" style={{ fontSize: "0.82rem", color: "var(--fg-dim)" }}>Locations</Link>
            <span style={{ color: "var(--fg-muted)" }}>/</span>
            <span style={{ fontSize: "0.82rem", color: "var(--fg)" }}>{LOCATION_LABELS[loc]}</span>
          </nav>
          <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FlagImg loc={loc} height={14} />
            <span>{LOCATION_LABELS[loc]}</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "16px" }}>
            {overview.hero}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--fg-body)", maxWidth: "740px", lineHeight: 1.6 }}>
            {overview.intro}
          </p>
        </div>
      </div>

      {/* Provider cards */}
      {locTools.length > 0 && (
        <div style={{ background: "var(--bg)", padding: "48px 0", borderBottom: "1px solid var(--border)" }}>
          <div className="container">
            <h2 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>
              Top {LOCATION_LABELS[loc]} hosting providers
            </h2>
            <div style={{ display: "grid", gap: "14px" }}>
              {locTools.map((tool) => (
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
                      <p style={{ fontSize: "0.875rem", color: "var(--fg-body)", marginBottom: "8px" }}>{tool.tagline}</p>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {tool.locations.map((l) => (
                          <span key={l} style={{
                            fontSize: "0.72rem", fontWeight: 600,
                            background: l === loc ? "var(--accent-light)" : "var(--bg-dark-soft, #f1f5f9)",
                            color: l === loc ? "var(--accent)" : "var(--fg-dim)",
                            padding: "2px 8px", borderRadius: "20px",
                            border: l === loc ? "1px solid var(--accent)" : "1px solid transparent",
                            display: "inline-flex", alignItems: "center", gap: "5px",
                          }}>
                            <FlagImg loc={l} height={16} /> {LOCATION_LABELS[l]}
                          </span>
                        ))}
                      </div>
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

      {/* Highlights */}
      <div style={{ background: "var(--bg-white)", padding: "48px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>
            Why host in {LOCATION_LABELS[loc]}
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

      {/* Best for / Not for */}
      <div style={{ background: "var(--bg)", padding: "48px 0", borderBottom: "1px solid var(--border)" }}>
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
      <div style={{ background: "var(--bg-white)", padding: "48px 0" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>
            {LOCATION_LABELS[loc]} hosting FAQ
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
