import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About StackAdvisor — Independent Hosting Reviews",
  description: "StackAdvisor is an independent resource for developers and businesses choosing web hosting, cloud VPS, dedicated servers, and storage. Real benchmarks, no vendor influence.",
};

export default function AboutPage() {
  return (
    <>
      <div style={{ background: "var(--bg-white)", borderBottom: "1px solid var(--border)", padding: "56px 0 48px" }}>
        <div className="container">
          <div className="eyebrow">About</div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", maxWidth: "640px" }}>
            Built by Engineers, for Engineers
          </h1>
        </div>
      </div>

      <div style={{ background: "var(--bg)", padding: "56px 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>

          {/* Mission */}
          <section style={{ marginBottom: "56px" }}>
            <div style={{ width: "40px", height: "3px", background: "var(--accent)", marginBottom: "24px", borderRadius: "2px" }} />
            <div className="prose">
              <p style={{ fontSize: "1.1rem" }}>
                StackAdvisor exists because choosing the right hosting infrastructure is harder than it should be. Every week, developers and businesses pay for plans that don't fit their needs — because most hosting review sites are either funded by the providers they're reviewing, or written by people who've never run a production server.
              </p>
              <p>
                We built StackAdvisor to be different: a resource where every provider recommendation comes from real benchmark data, every guide is written by people who actually manage infrastructure, and the only question we ask when making a recommendation is whether it's genuinely the best option for the use case.
              </p>
              <p>
                We cover web hosting, cloud VPS, dedicated servers, and storage providers — with a focus on the details that matter in production: uptime consistency, support quality under pressure, renewal pricing honesty, and network performance across regions.
              </p>
            </div>
          </section>

          {/* Values */}
          <section style={{ marginBottom: "56px" }}>
            <h2 style={{ fontSize: "1.6rem", marginBottom: "24px" }}>What We Stand For</h2>
            <div style={{ display: "grid", gap: "16px" }}>
              {[
                { heading: "Independence", body: "We have no commercial relationships that influence our editorial decisions. No sponsored content, no paid placements, no vendor briefings that create obligation. Our recommendations reflect only what we've tested." },
                { heading: "Real benchmark data", body: "Every provider we review is tested with real workloads — sysbench CPU scores, fio disk benchmarks, network throughput measurements. We don't copy specs from marketing pages and call it a review." },
                { heading: "Honest pricing", body: "We document renewal pricing, bandwidth overages, and hidden add-on costs. The number you see in a review is what you'll actually pay — not a first-year promotional headline rate that doubles on renewal." },
              ].map((item) => (
                <div key={item.heading} style={{ background: "var(--bg-white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px 28px" }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>{item.heading}</h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--fg-body)", lineHeight: "1.75", margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Methodology */}
          <section id="methodology" style={{ marginBottom: "56px" }}>
            <h2 style={{ fontSize: "1.6rem", marginBottom: "24px" }}>Our Review Methodology</h2>
            <div className="prose">
              <p>Every review on StackAdvisor follows the same process:</p>
            </div>
            <ol style={{ listStyle: "none", padding: 0, marginTop: "20px", display: "grid", gap: "12px" }}>
              {[
                { num: "01", title: "We provision real servers", body: "We sign up and pay like any customer. No free accounts, no extended review access, no vendor-provided credentials." },
                { num: "02", title: "We run standardised benchmarks", body: "CPU (sysbench), disk I/O (fio), and network throughput tests run on every provider using the same methodology so results are directly comparable." },
                { num: "03", title: "We monitor uptime continuously", body: "External uptime monitoring runs for a minimum of 30 days before we publish a rating. Uptime claims are verified, not taken from SLA documents." },
                { num: "04", title: "We test support under real conditions", body: "We submit multiple support tickets across different issue types and measure response time, resolution quality, and escalation behaviour." },
                { num: "05", title: "We check renewal pricing", body: "We verify what a plan actually costs after the promotional period ends. Providers with renewal price hikes are flagged explicitly in every review." },
              ].map((step) => (
                <li key={step.num} style={{ background: "var(--bg-white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px 24px", display: "grid", gridTemplateColumns: "48px 1fr", gap: "16px", alignItems: "start" }}>
                  <span style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, fontSize: "1.4rem", color: "var(--accent)", letterSpacing: "-0.02em", lineHeight: 1 }}>{step.num}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "4px" }}>{step.title}</div>
                    <div style={{ fontSize: "0.875rem", color: "var(--fg-body)", lineHeight: "1.65" }}>{step.body}</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Disclosure */}
          <section id="disclosure">
            <h2 style={{ fontSize: "1.6rem", marginBottom: "20px" }}>Affiliate Disclosure</h2>
            <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "var(--radius)", padding: "28px" }}>
              <div className="prose">
                <p style={{ margin: 0 }}>
                  StackAdvisor participates in affiliate programs. When you click certain links on this site and sign up for a hosting service, we may earn a commission — at no additional cost to you.
                </p>
                <p>
                  These commissions are how we fund the site and the infrastructure we use for testing. They do not influence our ratings, rankings, or recommendations. We have given low scores to providers with affiliate programs and high scores to providers without them. Commission size is never a factor in our editorial decisions.
                </p>
                <p style={{ margin: 0 }}>
                  All affiliate links are identified. StackAdvisor does not accept sponsored posts, paid placements, or payments from hosting providers in exchange for positive coverage.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
