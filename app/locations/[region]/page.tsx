import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolsByLocation, getActiveLocations, LOCATION_LABELS, LOCATION_DESCRIPTIONS, type Location } from "@/lib/tools";
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
  const label = LOCATION_LABELS[region as Location];
  return {
    title: `Best ${label} Hosting Providers 2026 — Compared | StackAdvisor`,
    description: `Hosting and server providers with data centers in ${label}. Benchmarked performance, uptime data, and honest pricing breakdowns.`,
  };
}

export default async function LocationPage({ params }: Props) {
  const { region } = await params;
  const activeLocations = getActiveLocations();
  if (!activeLocations.includes(region as Location)) notFound();

  const loc = region as Location;
  const locTools = getToolsByLocation(loc);

  return (
    <>
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
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "12px" }}>
            Best {LOCATION_LABELS[loc]} Hosting Providers
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--fg-body)", maxWidth: "560px" }}>
            {LOCATION_DESCRIPTIONS[loc]}
          </p>
        </div>
      </div>

      <div style={{ background: "var(--bg)", padding: "56px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gap: "14px" }}>
            {locTools.map((tool) => (
              <Link key={tool.slug} href={`/reviews/${tool.slug}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: "24px 28px", display: "grid", gridTemplateColumns: "80px 1fr auto", gap: "24px", alignItems: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div className="score-num" style={{ fontSize: "2rem" }}>{tool.rating.toFixed(1)}</div>
                    <div className="label">/5.0</div>
                  </div>
                  <div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
                      <h2 style={{ fontSize: "1.15rem" }}>{tool.name}</h2>
                      <span className={`badge badge-${tool.badgeColor}`}>{tool.badge}</span>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--fg-body)", marginBottom: "8px" }}>{tool.tagline}</p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {tool.locations.map((l) => (
                        <Link key={l} href={`/locations/${l}`} style={{ textDecoration: "none" }} onClick={(e) => e.stopPropagation()}>
                          <span style={{
                            fontSize: "0.72rem", fontWeight: 600,
                            background: l === loc ? "var(--accent-light)" : "var(--bg-dark-soft, #f1f5f9)",
                            color: l === loc ? "var(--accent)" : "var(--fg-dim)",
                            padding: "2px 8px", borderRadius: "20px",
                            border: l === loc ? "1px solid var(--accent)" : "1px solid transparent",
                          }}>
                            <FlagImg loc={l} height={11} /> {LOCATION_LABELS[l]}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
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
