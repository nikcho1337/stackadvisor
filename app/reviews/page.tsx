import Link from "next/link";
import { tools, CATEGORY_LABELS, LOCATION_LABELS, type Category } from "@/lib/tools";
import FlagImg from "@/components/FlagImg";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Hosting Reviews 2026 — VPS, Dedicated & Shared Hosting Ranked",
  description: "Independent VPS hosting reviews, dedicated server reviews, shared hosting reviews, and email hosting reviews based on six months of real benchmarks. Performance, network, support, and renewal pricing — ranked.",
};

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

export default function ReviewsPage() {
  const sortedByRating = [...tools].sort((a, b) => b.rating - a.rating);

  return (
    <>
      {/* Hero */}
      <div style={{ background: "var(--bg-white)", borderBottom: "1px solid var(--border)", padding: "56px 0 48px" }}>
        <div className="container">
          <div className="eyebrow">Hosting Reviews</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "16px" }}>
            Web Hosting Reviews 2026 — Independent Rankings
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--fg-body)", maxWidth: "740px", lineHeight: 1.6 }}>
            Honest VPS hosting reviews, dedicated server reviews, shared hosting reviews, and email hosting reviews — ranked from real testing across performance, network quality, and support response. Every score on this page comes from six months of benchmarks. No sponsored rankings, no vendor influence.
          </p>
        </div>
      </div>

      {/* Methodology */}
      <div style={{ background: "var(--bg)", padding: "48px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>How we rate hosting providers</h2>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
            <div className="card" style={{ padding: "24px" }}>
              <div className="eyebrow">Performance</div>
              <h3 style={{ fontSize: "1rem", marginBottom: "8px" }}>Real benchmarks, not spec sheets</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--fg-body)", lineHeight: 1.55 }}>
                Every provider runs sysbench CPU tests, fio disk benchmarks, iperf3 network throughput, and load tests at 100–1,000 concurrent users on equivalent hardware. We measure what actually happens, not what marketing claims.
              </p>
            </div>
            <div className="card" style={{ padding: "24px" }}>
              <div className="eyebrow">Network</div>
              <h3 style={{ fontSize: "1rem", marginBottom: "8px" }}>Latency to real users</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--fg-body)", lineHeight: 1.55 }}>
                We measure latency from major US, EU, and APAC test points — not just from the data center to itself. Tier 1 transit relationships and DDoS protection at the base price are weighted heavily.
              </p>
            </div>
            <div className="card" style={{ padding: "24px" }}>
              <div className="eyebrow">Support</div>
              <h3 style={{ fontSize: "1rem", marginBottom: "8px" }}>Response time and competence</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--fg-body)", lineHeight: 1.55 }}>
                We submit standardized tickets across phone, chat, and ticket channels, then grade responses on speed and technical accuracy. Scripted first-line support scores lower than direct engineer access.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick-rank comparison table */}
      <div style={{ background: "var(--bg-white)", padding: "48px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "8px" }}>Hosting providers ranked at a glance</h2>
          <p style={{ fontSize: "0.95rem", color: "var(--fg-body)", marginBottom: "24px", maxWidth: "680px" }}>
            All {tools.length} reviewed providers, sorted by overall hosting rating. Click any row for the full review with benchmarks, pros and cons, and verdict.
          </p>
          <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--bg-white)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left", background: "var(--bg)" }}>
                  <th style={{ padding: "14px 16px", fontWeight: 700 }}>Provider</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700 }}>Category</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700 }}>From</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700 }}>Rating</th>
                  <th style={{ padding: "14px 16px", fontWeight: 700 }}>Strength</th>
                </tr>
              </thead>
              <tbody>
                {sortedByRating.map((tool, idx) => (
                  <tr key={tool.slug} style={{ borderBottom: idx === sortedByRating.length - 1 ? "none" : "1px solid var(--border)" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <Link href={`/reviews/${tool.slug}`} style={{ color: "var(--fg)", fontWeight: 600, textDecoration: "none" }}>
                        {tool.shortName}
                      </Link>
                    </td>
                    <td style={{ padding: "14px 16px", color: "var(--fg-body)" }}>{CATEGORY_LABELS[tool.category]}</td>
                    <td style={{ padding: "14px 16px", color: "var(--fg-body)", whiteSpace: "nowrap" }}>{tool.price}</td>
                    <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                      <strong style={{ color: "var(--fg)" }}>{tool.rating.toFixed(1)}</strong>
                      <span style={{ color: "var(--fg-dim)", fontSize: "0.82rem" }}> / 5.0</span>
                    </td>
                    <td style={{ padding: "14px 16px", color: "var(--fg-body)" }}>{tool.badge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reviews by category */}
      <div style={{ background: "var(--bg)", padding: "56px 0" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "32px" }}>Reviews by category</h2>
          {CATEGORIES.map((cat) => {
            const catTools = tools.filter((t) => t.category === cat).sort((a, b) => b.rating - a.rating);
            if (!catTools.length) return null;
            return (
              <section key={cat} style={{ marginBottom: "56px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "16px", borderBottom: "2px solid var(--border)" }}>
                  <h3 style={{ fontSize: "1.4rem" }}>{CATEGORY_LABELS[cat]}</h3>
                  <span className="label">{catTools.length} review{catTools.length !== 1 ? "s" : ""}</span>
                </div>

                <div style={{ display: "grid", gap: "12px" }}>
                  {catTools.map((tool) => (
                    <Link key={tool.slug} href={`/reviews/${tool.slug}`} style={{ textDecoration: "none" }}>
                      <div className="card review-card" style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "80px 1fr auto", gap: "24px", alignItems: "center" }}>
                        <div style={{ textAlign: "center" }}>
                          <div className="score-num" style={{ fontSize: "2rem" }}>{tool.rating.toFixed(1)}</div>
                          <div className="label">/5.0</div>
                        </div>

                        <div>
                          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px" }}>
                            <h4 style={{ fontSize: "1.1rem" }}>{tool.name}</h4>
                            <span className={`badge badge-${tool.badgeColor}`}>{tool.badge}</span>
                          </div>
                          <p style={{ fontSize: "0.875rem", color: "var(--fg-body)", marginBottom: "8px" }}>{tool.tagline}</p>
                          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                            {tool.locations.map((loc) => (
                              <span key={loc} style={{
                                fontSize: "0.72rem", fontWeight: 600,
                                color: "var(--fg-dim)",
                                background: "var(--bg-white)",
                                border: "1px solid var(--border)",
                                borderRadius: "20px",
                                padding: "2px 8px",
                              }}>
                                <FlagImg loc={loc} height={16} /> {LOCATION_LABELS[loc]}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="review-card-cta" style={{ textAlign: "right" }}>
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

      {/* Per-category guidance */}
      <div style={{ background: "var(--bg-white)", padding: "48px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "8px" }}>Picking the right hosting category</h2>
          <p style={{ fontSize: "0.95rem", color: "var(--fg-body)", marginBottom: "24px", maxWidth: "680px" }}>
            What each hosting type is for, and which providers we rate at the top of each list.
          </p>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "10px" }}>VPS hosting reviews</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--fg-body)", lineHeight: 1.6, marginBottom: "10px" }}>
                A VPS gives you root access, dedicated CPU and memory allocations, and the ability to run any software you need. Right for most production web apps, APIs, and databases that have outgrown shared hosting. We rate VPS providers on dedicated-vCPU options, network quality, DDoS protection, and support response time.
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--fg-dim)", marginBottom: 0 }}>
                Top picks: <Link href="/reviews/cherryservers-vps-review" style={{ color: "var(--accent)", fontWeight: 600 }}>Cherry Servers Cloud VPS</Link> (best overall) and <Link href="/reviews/interserver-vps-review" style={{ color: "var(--accent)", fontWeight: 600 }}>InterServer VPS Special</Link> (best US budget).
              </p>
            </div>
            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "10px" }}>Dedicated server reviews</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--fg-body)", lineHeight: 1.6, marginBottom: "10px" }}>
                Dedicated web hosting gives you the entire physical server — every CPU core, every byte of RAM, every drive. Right for video transcoding, machine learning, large-scale databases, and bandwidth-heavy workloads. We rate dedicated server providers on hardware quality (HW RAID + BBU), network egress allowances, deployment speed, and Infrastructure-as-Code support.
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--fg-dim)", marginBottom: 0 }}>
                Top picks: <Link href="/reviews/cherryservers-dedicated-review" style={{ color: "var(--accent)", fontWeight: 600 }}>Cherry Servers Instant Dedicated</Link> (15-min deploy) and <Link href="/reviews/serversp-dedicated-review" style={{ color: "var(--accent)", fontWeight: 600 }}>ServerSP</Link> (US/Latin America).
              </p>
            </div>
            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "10px" }}>Shared hosting reviews</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--fg-body)", lineHeight: 1.6, marginBottom: "10px" }}>
                Shared hosting is the most affordable way to get a website online. Your site lives on a server alongside many others, and the host handles all server administration. Right for blogs, small business sites, and most low-to-moderate traffic content. We weight renewal pricing heavily — promotional rates that triple on renewal are penalized.
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--fg-dim)", marginBottom: 0 }}>
                Top pick: <Link href="/reviews/interserver-web-hosting-review" style={{ color: "var(--accent)", fontWeight: 600 }}>InterServer Web Hosting</Link> ($8/mo, permanent price lock, ASP.NET supported).
              </p>
            </div>
            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "10px" }}>Email & managed hosting reviews</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--fg-body)", lineHeight: 1.6, marginBottom: "10px" }}>
                Business email hosting and managed services let you outsource the operational side of running infrastructure. Email hosting reviews focus on deliverability, mailbox size, and Outlook/IMAP compatibility. Managed dedicated server hosting reviews focus on which hands-off work the provider actually handles versus what you're still on the hook for.
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--fg-dim)", marginBottom: 0 }}>
                Top pick: <Link href="/reviews/interserver-email-hosting-review" style={{ color: "var(--accent)", fontWeight: 600 }}>InterServer Private Email</Link> ($2.50/mo, 25GB mailboxes, 100% uptime SLA).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: "var(--bg)", padding: "48px 0" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "820px" }}>
            <details className="card" style={{ padding: "20px 24px" }}>
              <summary style={{ fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>What's the best VPS hosting in 2026?</summary>
              <p style={{ fontSize: "0.92rem", color: "var(--fg-body)", lineHeight: 1.6, marginTop: "10px" }}>
                Cherry Servers Cloud VPS for global production workloads (US, EU, APAC coverage with premium DDoS protection at €0.015/hr). InterServer VPS Special for US-primary budget deployments ($3/mo with a permanent price lock). Both score 4.6+ on our hosting ratings.
              </p>
            </details>
            <details className="card" style={{ padding: "20px 24px" }}>
              <summary style={{ fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>What's the best dedicated server hosting?</summary>
              <p style={{ fontSize: "0.92rem", color: "var(--fg-body)", lineHeight: 1.6, marginTop: "10px" }}>
                Cherry Servers Instant Dedicated for fast deployment (15 minutes), 5th-Gen AMD hardware, and 100TB free monthly egress on 10G plans — our top dedicated web hosting review. ServerSP is the better pick for US-to-Latin America workloads where Miami's Digital Realty facility plus a Brazil node is hard to beat at $169/mo.
              </p>
            </details>
            <details className="card" style={{ padding: "20px 24px" }}>
              <summary style={{ fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>What hosting reviews can I trust?</summary>
              <p style={{ fontSize: "0.92rem", color: "var(--fg-body)", lineHeight: 1.6, marginTop: "10px" }}>
                Look for reviews that include: real benchmark numbers (not spec sheets), specific support response times from actual ticket submissions, and renewal pricing — not just the promotional rate. Reviews that lead with affiliate disclosures and methodology pages tend to be more honest than ones that don&apos;t.
              </p>
            </details>
            <details className="card" style={{ padding: "20px 24px" }}>
              <summary style={{ fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>How are these hosting ratings calculated?</summary>
              <p style={{ fontSize: "0.92rem", color: "var(--fg-body)", lineHeight: 1.6, marginTop: "10px" }}>
                Each provider runs through a six-month evaluation: sysbench CPU, fio disk I/O, iperf3 network, support ticket response time, and renewal pricing. Final ratings weight performance (40%), support (25%), price (20%), and network quality (15%). A 5.0 means top-tier across all four; 4.0+ means solidly above average.
              </p>
            </details>
            <details className="card" style={{ padding: "20px 24px" }}>
              <summary style={{ fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>What about cloud hosting reviews?</summary>
              <p style={{ fontSize: "0.92rem", color: "var(--fg-body)", lineHeight: 1.6, marginTop: "10px" }}>
                Cloud VPS reviews are the practical answer to &ldquo;cloud hosting&rdquo; for most teams — Cherry Servers Cloud VPS is our top-rated cloud option. For hyperscaler-style cloud (AWS, GCP, Azure), the economics rarely beat a well-chosen VPS or dedicated server unless you genuinely need managed Kubernetes, serverless, or auto-scaling primitives that smaller providers don&apos;t offer.
              </p>
            </details>
            <details className="card" style={{ padding: "20px 24px" }}>
              <summary style={{ fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>What does &ldquo;managed dedicated server hosting&rdquo; actually include?</summary>
              <p style={{ fontSize: "0.92rem", color: "var(--fg-body)", lineHeight: 1.6, marginTop: "10px" }}>
                The term varies by provider. At minimum, &ldquo;managed&rdquo; should include OS-level patching, monitoring, and 24/7 support. Some providers also handle web server config, SSL renewal, and backups. Read the SLA carefully — the gap between &ldquo;managed&rdquo; and &ldquo;fully managed&rdquo; can be the difference between a $50/mo and $500/mo bill.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
