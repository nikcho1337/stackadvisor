"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import FlagImg from "@/components/FlagImg";

// ─── Dropdown data ────────────────────────────────────────────
const REVIEWS_DROPDOWN = {
  columns: [
    {
      heading: "By Type",
      links: [
        { href: "/categories/shared",    icon: "🌐", label: "Shared Hosting",    sub: "Managed, affordable hosting" },
        { href: "/categories/vps",       icon: "⚡", label: "Cloud VPS",         sub: "Root access, scalable infra" },
        { href: "/categories/dedicated", icon: "🖥",  label: "Dedicated Servers", sub: "Bare-metal performance" },
        { href: "/categories/storage",   icon: "💾", label: "Storage Servers",   sub: "High-capacity data storage" },
        { href: "/categories/managed",   icon: "🛡",  label: "Managed Services",  sub: "Hands-off infrastructure" },
      ],
    },
    {
      heading: "By Region",
      links: [
        { href: "/locations/us",    icon: "📍", label: "United States",   sub: "NYC · Dallas · LA · Miami" },
        { href: "/locations/latam", icon: "📍", label: "Latin America",   sub: "Brazil · Miami corridor" },
        { href: "/locations",       icon: "🌐",  label: "All Regions",     sub: "Browse by data center location" },
      ],
    },
    {
      heading: "Top Picks",
      links: [
        { href: "/reviews/interserver-vps-review",          icon: "★", label: "InterServer VPS",      sub: "$3/mo · Cloud VPS · 4.8★" },
        { href: "/reviews/interserver-web-hosting-review",  icon: "★", label: "InterServer Hosting",  sub: "$8/mo · Shared · 4.6★" },
        { href: "/reviews/interserver-email-hosting-review",icon: "★", label: "InterServer Email",    sub: "$2.50/mo · Email · 4.5★" },
        { href: "/reviews/serversp-dedicated-review",        icon: "★", label: "ServerSP Dedicated",   sub: "$169/mo · Bare Metal · 4.6★" },
      ],
    },
  ],
};

const GUIDES_DROPDOWN = [
  { href: "/blog/shared-hosting-vs-vps",          label: "Shared Hosting vs VPS",              sub: "Which one do you actually need?" },
  { href: "/blog/best-vps-hosting-2026",          label: "Best VPS Hosting 2026",              sub: "Benchmarked & ranked" },
  { href: "/blog/dedicated-server-vs-vps",        label: "Dedicated Server vs VPS",            sub: "When to upgrade to bare metal" },
  { href: "/blog/how-to-choose-a-vps-provider",   label: "How to Choose a VPS Provider",       sub: "6 factors that actually matter" },
  { href: "/blog/storage-server-vs-object-storage", label: "Storage Server vs Object Storage", sub: "Cost & architecture guide" },
];

// ─── Dropdown panel components ────────────────────────────────
function ReviewsPanel() {
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", left: "50%",
      transform: "translateX(-50%)",
      background: "#fff",
      border: "1px solid var(--border)",
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
      padding: "8px",
      display: "grid",
      gridTemplateColumns: "200px 180px 220px",
      gap: "4px",
      zIndex: 200,
      minWidth: "620px",
    }}>
      {REVIEWS_DROPDOWN.columns.map((col) => (
        <div key={col.heading} style={{ padding: "12px 8px" }}>
          <div style={{
            fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: "var(--fg-muted)",
            padding: "0 8px", marginBottom: "6px",
          }}>
            {col.heading}
          </div>
          {col.links.map((link) => (
            <Link key={link.href} href={link.href} style={{ textDecoration: "none", display: "block" }}>
              <div style={{
                display: "flex", alignItems: "flex-start", gap: "10px",
                padding: "8px 10px", borderRadius: "8px",
                transition: "background 0.12s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: "1px" }}>{link.icon}</span>
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--fg)", lineHeight: 1.3 }}>
                    {link.label}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--fg-dim)", marginTop: "2px" }}>
                    {link.sub}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ))}
      {/* Footer bar */}
      <div style={{
        gridColumn: "1 / -1",
        borderTop: "1px solid var(--border)",
        padding: "10px 18px 6px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: "0.75rem", color: "var(--fg-dim)" }}>More providers coming soon</span>
        <Link href="/reviews" style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--green)" }}>
          All reviews →
        </Link>
      </div>
    </div>
  );
}

function GuidesPanel() {
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", left: "50%",
      transform: "translateX(-50%)",
      background: "#fff",
      border: "1px solid var(--border)",
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
      padding: "8px",
      zIndex: 200,
      minWidth: "300px",
    }}>
      <div style={{ padding: "6px 8px 2px" }}>
        <div style={{
          fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.1em", color: "var(--fg-muted)",
          padding: "0 8px", marginBottom: "6px",
        }}>
          Hosting Tips
        </div>
        {GUIDES_DROPDOWN.map((link) => (
          <Link key={link.href} href={link.href} style={{ textDecoration: "none", display: "block" }}>
            <div style={{
              padding: "9px 10px", borderRadius: "8px",
              transition: "background 0.12s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--bg)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--fg)", lineHeight: 1.3 }}>
                {link.label}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--fg-dim)", marginTop: "2px" }}>
                {link.sub}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div style={{
        borderTop: "1px solid var(--border)",
        padding: "10px 18px 6px",
        textAlign: "right",
      }}>
        <Link href="/blog" style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--green)" }}>
          All guides →
        </Link>
      </div>
    </div>
  );
}

// ─── Nav item with dropdown ───────────────────────────────────
function NavItemDropdown({
  label, active, children,
}: { label: string; active: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 120); };

  return (
    <div style={{ position: "relative" }} onMouseEnter={show} onMouseLeave={hide}>
      <button style={{
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: "0.875rem",
        fontWeight: 500,
        padding: "6px 14px",
        borderRadius: "6px",
        color: active ? "var(--accent)" : "var(--fg-body)",
        background: active ? "var(--accent-light)" : "transparent",
        border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", gap: "4px",
        transition: "all 0.15s",
      }}>
        {label}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{
          transition: "transform 0.15s",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          opacity: 0.5,
        }}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && children}
    </div>
  );
}

const MOBILE_SECTIONS = [
  {
    heading: "Reviews",
    links: [
      { href: "/reviews",              label: "All Reviews" },
      { href: "/categories/vps",       label: "Cloud VPS" },
      { href: "/categories/dedicated", label: "Dedicated Servers" },
      { href: "/categories/shared",    label: "Shared Hosting" },
      { href: "/categories/managed",   label: "Managed Services" },
    ],
  },
  {
    heading: "By Region",
    links: [
      { href: "/locations/us",    label: "United States", flag: "us" },
      { href: "/locations/latam", label: "Latin America", flag: "latam" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/blog",   label: "Hosting Guides" },
      { href: "/about",  label: "About" },
    ],
  },
];

// ─── Main Nav ─────────────────────────────────────────────────
export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{
      background: "#fff",
      borderBottom: "1px solid var(--border)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", position: "relative" }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "2px", textDecoration: "none" }} onClick={() => setMobileOpen(false)}>
          <span style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, fontSize: "1.25rem", color: "var(--fg)", letterSpacing: "-0.03em" }}>Stack</span>
          <span style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, fontSize: "1.25rem", color: "var(--accent)", letterSpacing: "-0.03em" }}>Advisor</span>
          <span style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "0.6rem", color: "var(--fg-muted)", marginLeft: "1px", marginBottom: "8px", fontWeight: 500 }}>.io</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-desktop" style={{ alignItems: "center", gap: "4px" }}>
          <NavItemDropdown label="Hosting Reviews" active={!!pathname?.startsWith("/reviews") || !!pathname?.startsWith("/categories")}>
            <ReviewsPanel />
          </NavItemDropdown>
          <NavItemDropdown label="Tips" active={!!pathname?.startsWith("/blog")}>
            <GuidesPanel />
          </NavItemDropdown>
          <Link href="/about" style={{
            fontFamily: "var(--font-inter), sans-serif", fontSize: "0.875rem", fontWeight: 500,
            padding: "6px 14px", borderRadius: "6px",
            color: pathname?.startsWith("/about") ? "var(--accent)" : "var(--fg-body)",
            background: pathname?.startsWith("/about") ? "var(--accent-light)" : "transparent",
            transition: "all 0.15s",
          }}>About</Link>
        </nav>

        {/* Desktop CTA */}
        <Link href="/reviews" className="btn-primary nav-cta-btn" style={{ fontSize: "0.82rem", padding: "9px 20px" }}>
          Compare Hosts →
        </Link>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          }
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="nav-mobile-menu">
          {MOBILE_SECTIONS.map((section, si) => (
            <div key={section.heading}>
              <div style={{
                fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.1em", color: "var(--fg-muted)",
                padding: "10px 24px 4px",
                borderTop: si > 0 ? "1px solid var(--border)" : undefined,
              }}>
                {section.heading}
              </div>
              {section.links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                  fontSize: "0.95rem", fontWeight: 500, color: "var(--fg-body)",
                  padding: "10px 24px", display: "flex", alignItems: "center", gap: "8px",
                }}>
                  {"flag" in l && l.flag && <FlagImg loc={l.flag} height={14} />}
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
          <div style={{ padding: "14px 24px", borderTop: "1px solid var(--border)" }}>
            <Link href="/reviews" className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setMobileOpen(false)}>
              Compare Hosts →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
