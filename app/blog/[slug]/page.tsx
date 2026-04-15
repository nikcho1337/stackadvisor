import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { articles, getArticleBySlug } from "@/lib/articles";
import { getToolBySlug } from "@/lib/tools";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.metaTitle, description: article.metaDescription };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedTools = article.relatedTools.map((s) => getToolBySlug(s)).filter(Boolean);

  return (
    <>
      {/* Header */}
      <div style={{ background: "var(--bg-white)", borderBottom: "1px solid var(--border)", padding: "48px 0" }}>
        <div className="container">
          <nav style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "24px" }}>
            <Link href="/" style={{ fontSize: "0.82rem", color: "var(--fg-dim)" }}>Home</Link>
            <span style={{ color: "var(--fg-muted)" }}>/</span>
            <Link href="/blog" style={{ fontSize: "0.82rem", color: "var(--fg-dim)" }}>Hosting Tips</Link>
            <span style={{ color: "var(--fg-muted)" }}>/</span>
            <span style={{ fontSize: "0.82rem", color: "var(--fg)" }}>{article.category}</span>
          </nav>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "20px" }}>
            <span className="badge badge-orange">{article.category}</span>
            <span className="label">{article.readTime}</span>
            <span className="label">
              {new Date(article.publishDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "760px", lineHeight: "1.15" }}>
            {article.title}
          </h1>
        </div>
      </div>

      {/* Cover image */}
      {article.image && (
        <div style={{ background: "var(--bg-white)", borderBottom: "1px solid var(--border)" }}>
          <div className="container" style={{ padding: "0 24px" }}>
            <div style={{ position: "relative", width: "100%", height: "420px", borderRadius: "0 0 var(--radius) var(--radius)", overflow: "hidden" }}>
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                style={{ objectFit: "cover", objectPosition: article.imagePosition ?? "center" }}
                priority
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.35) 100%)" }} />
            </div>
          </div>
        </div>
      )}

      {/* Body */}
      <div style={{ background: "var(--bg)", padding: "56px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "56px", alignItems: "start" }}>

            {/* Article */}
            <article>
              <div style={{ width: "40px", height: "3px", background: "var(--accent)", marginBottom: "28px", borderRadius: "2px" }} />
              <div className="prose">
                <p style={{ fontSize: "1.08rem", fontWeight: 500, color: "var(--fg)", lineHeight: "1.8" }}>
                  {article.intro}
                </p>
              </div>

              {article.sections.map((section) => (
                <section key={section.heading} className="prose" style={{ marginTop: "36px" }}>
                  <h2>{section.heading}</h2>
                  {section.body.map((p, i) => <p key={i}>{p}</p>)}
                </section>
              ))}
            </article>

            {/* Sidebar */}
            <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {relatedTools.length > 0 && (
                <div style={{ background: "var(--bg-white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px" }}>
                  <div className="label" style={{ marginBottom: "16px" }}>Featured Tools</div>
                  {relatedTools.map((tool) => tool && (
                    <div key={tool.slug} style={{ paddingBottom: "16px", marginBottom: "16px", borderBottom: "1px solid var(--border)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--fg)" }}>{tool.name}</span>
                        <span className="score-num" style={{ fontSize: "1rem" }}>{tool.rating.toFixed(1)}</span>
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "var(--fg-dim)", lineHeight: "1.5", marginBottom: "10px" }}>
                        {tool.tagline.substring(0, 80)}...
                      </p>
                      <Link href={`/reviews/${tool.slug}`} style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--accent)" }}>
                        Read review →
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ background: "var(--accent-light)", border: "1px solid rgba(242,101,34,0.2)", borderRadius: "var(--radius)", padding: "20px" }}>
                <div className="label-accent" style={{ marginBottom: "8px" }}>More Guides</div>
                <Link href="/blog" style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--fg)" }}>
                  View all growth guides →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
