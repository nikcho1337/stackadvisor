import Link from "next/link";
import { getActiveLocations, getToolsByLocation, LOCATION_LABELS, LOCATION_FLAGS, LOCATION_DESCRIPTIONS } from "@/lib/tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hosting by Location — Data Center Regions | StackAdvisor",
  description: "Browse web hosting and server providers by data center location. Find the fastest provider for your region — US, Europe, Latin America, and Asia Pacific.",
};

export default function LocationsPage() {
  const activeLocations = getActiveLocations();

  return (
    <>
      <div style={{ background: "var(--bg-white)", borderBottom: "1px solid var(--border)", padding: "56px 0 48px" }}>
        <div className="container">
          <nav style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
            <Link href="/" style={{ fontSize: "0.82rem", color: "var(--fg-dim)" }}>Home</Link>
            <span style={{ color: "var(--fg-muted)" }}>/</span>
            <span style={{ fontSize: "0.82rem", color: "var(--fg)" }}>Locations</span>
          </nav>
          <div className="eyebrow">By Region</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "12px" }}>
            Hosting by Data Center Location
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--fg-body)", maxWidth: "560px" }}>
            Server location directly impacts latency for your users. Browse providers by region to find the fastest option for your audience.
          </p>
        </div>
      </div>

      <div style={{ background: "var(--bg)", padding: "56px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {activeLocations.map((loc) => {
              const locTools = getToolsByLocation(loc);
              return (
                <Link key={loc} href={`/locations/${loc}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ padding: "28px", height: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "2rem" }}>{LOCATION_FLAGS[loc]}</span>
                      <div>
                        <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--fg)" }}>{LOCATION_LABELS[loc]}</div>
                        <div className="label">{locTools.length} provider{locTools.length !== 1 ? "s" : ""}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--fg-body)", lineHeight: "1.6", flexGrow: 1 }}>
                      {LOCATION_DESCRIPTIONS[loc]}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {locTools.map((t) => (
                        <span key={t.slug} style={{
                          fontSize: "0.75rem", fontWeight: 600,
                          background: "var(--bg-dark-soft, #f1f5f9)",
                          color: "var(--fg-body)",
                          padding: "3px 10px", borderRadius: "20px",
                        }}>
                          {t.shortName}
                        </span>
                      ))}
                    </div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--accent)" }}>
                      Browse {LOCATION_LABELS[loc]} providers →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
