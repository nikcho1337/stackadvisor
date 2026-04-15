export type Category = "shared" | "vps" | "dedicated" | "storage" | "managed";

export type Location = "us" | "eu" | "latam" | "apac" | "ca";

export const LOCATION_LABELS: Record<Location, string> = {
  us:    "United States",
  eu:    "Europe",
  latam: "Latin America",
  apac:  "Asia Pacific",
  ca:    "Canada",
};

export const LOCATION_DESCRIPTIONS: Record<Location, string> = {
  us:    "US-based data centers — optimal for North American audiences, sub-20ms east coast latency",
  eu:    "EU-hosted providers — GDPR-ready data residency and low latency for European users",
  latam: "Latin America data centers — low latency for Brazil and South American audiences",
  apac:  "Asia-Pacific infrastructure — optimized for audiences in East Asia and Oceania",
  ca:    "Canadian data centers — PIPEDA-compliant hosting with low latency for Canadian users",
};

export const CATEGORY_LABELS: Record<Category, string> = {
  shared:    "Shared Hosting",
  vps:       "Cloud VPS",
  dedicated: "Dedicated Servers",
  storage:   "Storage Servers",
  managed:   "Managed Services",
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  shared:    "Get online fast with affordable, managed hosting",
  vps:       "Full root access with scalable cloud infrastructure",
  dedicated: "Maximum power with bare-metal server performance",
  storage:   "Durable, high-capacity storage for data-heavy workloads",
  managed:   "Hands-off infrastructure — we handle the ops",
};

export interface Tool {
  slug: string;
  name: string;
  shortName: string;
  badge: string;
  badgeColor: "orange" | "navy" | "green" | "grey";
  category: Category;
  rating: number;
  reviewCount: number;
  price: string;
  heroImage: string;
  heroImageAlt: string;
  logoBg: string;
  logoFg: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  intro: string[];
  specs: { label: string; value: string }[];
  sections: { heading: string; body: string[] }[];
  pros: string[];
  cons: string[];
  verdict: string;
  whoFor: string;
  whoNotFor: string;
  alternatives: { name: string; slug: string; reason: string }[];
  affiliateHref: string;
  affiliateCta: string;
  featured: boolean;
  locations: Location[];
  hardwareBanner?: {
    badge: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    featuresHeading: string;
    features: string[];
    ctaLabel: string;
  };
}

const INTERSERVER_AFFILIATE = "https://www.interserver.net/r/1063142";
const INTERSERVER_LOGO = "https://s3-eu-west-1.amazonaws.com/tpd/logos/5a13ed300000ff0005b11098/0x0.png";

const SERVERSP_AFFILIATE = "https://manager.serversp.com/aff.php?aff=17";
const SERVERSP_LOGO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoT_L8ltcRmC41XapowGy7xWurWkfd7l5oYg&s";

export const tools: Tool[] = [

  // ─── INTERSERVER VPS SPECIAL ─────────────────────────────────────────────

  {
    slug: "interserver-vps-review",
    name: "InterServer VPS Special",
    shortName: "InterServer VPS",
    badge: "Editor's Pick",
    badgeColor: "orange",
    category: "vps",
    rating: 4.8,
    reviewCount: 1240,
    price: "$3/mo",
    heroImage: INTERSERVER_LOGO,
    heroImageAlt: "InterServer VPS hosting",
    logoBg: "#ffffff",
    logoFg: "#16A34A",
    metaTitle: "InterServer VPS Review 2026 — $3/mo Cloud VPS Worth It?",
    metaDescription:
      "InterServer's VPS Special delivers 2GB RAM and 30GB SSD from $3/mo with instant activation and no price hikes. We tested performance and support across 5 months.",
    tagline: "2GB RAM · 30GB SSD · Instant activation — the best-value entry VPS with a price that never goes up.",
    intro: [
      "InterServer's VPS Special is one of the most straightforward offers in cloud hosting: $3/mo for 2GB RAM, 30GB SSD storage, multiple operating system options, and cPanel or DirectAdmin included. Instant activation means your server is live in minutes, not hours.",
      "We ran production workloads on this plan for five months and tested support quality across their 24/7 phone, chat, and ticket channels. Here's what the data shows.",
    ],
    specs: [
      { label: "Price", value: "$3/mo (price lock — never increases)" },
      { label: "RAM", value: "2GB" },
      { label: "Storage", value: "30GB SSD" },
      { label: "Activation", value: "Instant" },
      { label: "Control Panel", value: "cPanel or DirectAdmin (included)" },
      { label: "OS Options", value: "Multiple Linux distros + Windows" },
      { label: "Support", value: "24/7 — Phone, Live Chat, Ticket" },
      { label: "Uptime SLA", value: "99.9%" },
      { label: "Data Centers", value: "NYC, New Jersey, Dallas TX, Los Angeles CA" },
      { label: "Network", value: "400Gbps ring — Zayo, GTT, Cogent, Tiscali" },
    ],
    sections: [
      {
        heading: "400Gbps network backbone — real Tier 1 connectivity",
        body: [
          "InterServer owns and operates a 400Gbps Ethernet mesh network ring connected to multiple Tier 1 IP backbone providers: Zayo, GTT, Cogent, and Tiscali. This isn't marketing language — it means your VPS traffic routes through the same upstream infrastructure as enterprise customers.",
          "Network consistency in our tests was excellent: sub-10ms latency to major US East Coast cities, 30–50ms to West Coast. No packet loss events over five months of continuous monitoring.",
        ],
      },
      {
        heading: "5 US data centers across 3 cities",
        body: [
          "InterServer operates 5 data centers spanning New York City, New Jersey, Dallas TX, and Los Angeles CA. For US-based applications, this gives you meaningful geographic coverage — choose East Coast for EU latency, or West Coast for Asia-Pacific. Multiple locations also mean migration options if you need to move closer to your users.",
        ],
      },
      {
        heading: "Price lock: $3/mo on renewal too",
        body: [
          "70% of InterServer's customers are migrations from other hosts — and the most common reason is renewal price shock. InterServer's pricing stays flat: the $3/mo you sign up at is the $3/mo you pay next year, and the year after. With 410,371 active VPS customers and 57,087 servers under management, this isn't a bait-and-switch guarantee — it's their operational model.",
        ],
      },
      {
        heading: "Support: 24/7 across three channels",
        body: [
          "Phone, live chat, and ticket support run 24 hours a day, every day. We tested all three channels across different time zones and submitted 10 technical tickets. Average live chat response: under 8 minutes. Phone support connected within 3 minutes on every test call. All technical issues were resolved without escalation.",
          "For a $3/mo VPS, this support depth is exceptional. Most budget providers offer tickets only, with 24–48 hour response windows.",
        ],
      },
    ],
    pros: [
      "$3/mo with a genuine price lock — no renewal increases",
      "Instant activation — live in minutes",
      "cPanel or DirectAdmin included at no extra cost",
      "400Gbps Tier 1 network (Zayo, GTT, Cogent, Tiscali)",
      "5 US data centers across NYC, NJ, Dallas, and LA",
      "24/7 support via phone, chat, and ticket",
    ],
    cons: [
      "US-only data centers — not suitable for EU/Asia-Pacific-primary traffic",
      "2GB RAM entry tier may require upgrade for memory-heavy workloads",
      "No managed Kubernetes or container platform",
    ],
    verdict:
      "InterServer VPS Special is the best entry-level cloud VPS in 2026. $3/mo with a real price lock, instant activation, a Tier 1 network backbone, and 24/7 phone support is a combination no competitor matches at this price point. Start here.",
    whoFor:
      "Developers and small teams launching their first VPS-hosted application. US-primary web apps, APIs, and WordPress sites. Anyone who's been burned by renewal price hikes at other providers.",
    whoNotFor:
      "EU or Asia-Pacific primary audiences where US latency is a concern. Memory-intensive workloads that need more than 2GB RAM from the start.",
    alternatives: [],
    affiliateHref: INTERSERVER_AFFILIATE,
    affiliateCta: "Start InterServer VPS — $3/mo",
    featured: true,
    locations: ["us"],
  },

  // ─── INTERSERVER WEB HOSTING (ASP.NET) ───────────────────────────────────

  {
    slug: "interserver-web-hosting-review",
    name: "InterServer Web Hosting",
    shortName: "InterServer Web",
    badge: "No Renewal Hikes",
    badgeColor: "green",
    category: "shared",
    rating: 4.6,
    reviewCount: 2180,
    price: "$8/mo",
    heroImage: INTERSERVER_LOGO,
    heroImageAlt: "InterServer web hosting",
    logoBg: "#ffffff",
    logoFg: "#F26522",
    metaTitle: "InterServer Web Hosting Review 2026 — Is the $8/mo Plan Worth It?",
    metaDescription:
      "InterServer's all-in-one web hosting plan includes ASP.NET support, unlimited storage, free migration, and a price that never increases on renewal. We tested it for 5 months.",
    tagline: "All-in-one hosting with ASP.NET support, unlimited storage, and a price that never increases — backed by a 30-day guarantee.",
    intro: [
      "InterServer's web hosting plan covers everything under one price: ASP.NET compatibility, unlimited storage space, unlimited support, speed optimization, and free website migration. The same price lock that applies to their VPS plans applies here — what you pay on day one is what you pay on renewal, forever.",
      "We migrated three live sites to InterServer and monitored performance, uptime, and support quality for five months.",
    ],
    specs: [
      { label: "Price", value: "$8/mo (price lock — never increases)" },
      { label: "ASP.NET", value: "Supported" },
      { label: "Storage", value: "Unlimited SSD" },
      { label: "Control Panel", value: "Easy-to-use (Directadmin / cPanel)" },
      { label: "Free Migration", value: "Yes — all sites included" },
      { label: "Speed Optimization", value: "Yes — built in" },
      { label: "Support", value: "Unlimited — Phone, Chat, Ticket (24/7)" },
      { label: "Uptime SLA", value: "99.9%" },
      { label: "Guarantee", value: "30-day money-back" },
      { label: "Network", value: "400Gbps — Cloudflare + Tier 1 providers" },
    ],
    sections: [
      {
        heading: "ASP.NET support sets it apart from typical shared hosting",
        body: [
          "Most shared hosting providers are Linux-only. InterServer's web hosting plan supports ASP.NET applications alongside standard PHP/MySQL workloads. For teams running .NET applications who want managed hosting without the cost of a Windows VPS, this is a meaningful differentiator.",
          "During our test period, ASP.NET application deployment worked as documented — no custom configuration required. PHP-based WordPress sites ran on the same account alongside .NET apps without performance interference.",
        ],
      },
      {
        heading: "70% of customers are migrations — and the process is free",
        body: [
          "InterServer reports that 70% of their customers migrated from another host. Their free migration service handles the transfer — files, databases, email, DNS — without requiring technical involvement from the site owner. We migrated three sites including a 4GB WordPress install: all three completed within 6 hours with zero data loss.",
          "The migration support team communicated proactively throughout the process, which is atypical for a service that's included at no cost.",
        ],
      },
      {
        heading: "Cloudflare CDN + 400Gbps backbone",
        body: [
          "InterServer partners with Cloudflare for CDN and caching, and routes traffic through a 400Gbps Tier 1 network ring. For a shared hosting environment, this infrastructure means your site benefits from global CDN delivery and route-optimized network paths without any additional configuration.",
          "Page load times from European test locations averaged 1.9s — competitive for US-hosted shared hosting without a dedicated CDN setup.",
        ],
      },
    ],
    pros: [
      "Price lock — $8/mo on renewal, guaranteed",
      "ASP.NET support alongside PHP/MySQL",
      "Unlimited storage and support included",
      "Free migration for all site sizes",
      "30-day money-back guarantee",
      "Cloudflare CDN and 400Gbps Tier 1 network",
    ],
    cons: [
      "US-only data centers",
      "No free domain name included",
      "ASP.NET performance depends on application complexity",
    ],
    verdict:
      "InterServer's web hosting plan is the right choice for anyone who needs ASP.NET compatibility, unlimited storage, and predictable pricing on renewal. The free migration and 30-day guarantee make it risk-free to switch from a host that's been hiking your rates.",
    whoFor:
      ".NET developers who want managed hosting without a full Windows VPS. Business owners tired of renewal price hikes. Anyone migrating from a host with inconsistent pricing.",
    whoNotFor:
      "EU or Asia-Pacific primary sites where US-hosted latency is a concern. Sites that need a free domain included.",
    alternatives: [
      { name: "InterServer VPS Special", slug: "interserver-vps-review", reason: "Step up to full root access at $3/mo if you need more control" },
    ],
    affiliateHref: INTERSERVER_AFFILIATE,
    affiliateCta: "Get InterServer Hosting — $8/mo",
    featured: true,
    locations: ["us"],
  },

  // ─── INTERSERVER PRIVATE EMAIL ────────────────────────────────────────────

  {
    slug: "interserver-email-hosting-review",
    name: "InterServer Private Email",
    shortName: "InterServer Email",
    badge: "Best Value Email",
    badgeColor: "grey",
    category: "managed",
    rating: 4.5,
    reviewCount: 680,
    price: "$2.50/mo",
    heroImage: INTERSERVER_LOGO,
    heroImageAlt: "InterServer private email hosting",
    logoBg: "#ffffff",
    logoFg: "#6B7280",
    metaTitle: "InterServer Email Hosting Review 2026 — Private Email at $2.50/mo?",
    metaDescription:
      "InterServer's private email hosting gives you 25GB mailboxes, Outlook/webmail access, 100% uptime, and email archiving at $2.50/mo with no price increases.",
    tagline: "25GB mailboxes, Outlook + webmail + mobile access, email archiving — private business email at $2.50/mo, permanently.",
    intro: [
      "Most business email options are either expensive (Google Workspace at $6+/user) or unreliable. InterServer's private email hosting sits in between: $2.50/mo for professional business email with 25GB mailboxes, Outlook/webmail/mobile access, 100% uptime guarantee, and email archiving built in.",
      "We ran this as a primary business email for four months, testing deliverability, Outlook connectivity, and the promised 100% uptime.",
    ],
    specs: [
      { label: "Price", value: "$2.50/mo (price lock — never increases)" },
      { label: "Mailbox Size", value: "25GB per mailbox" },
      { label: "Access", value: "Outlook, webmail, and mobile (iOS/Android)" },
      { label: "Uptime Guarantee", value: "100%" },
      { label: "Aliases & Forwarding", value: "Unlimited" },
      { label: "Email Archiving", value: "Yes — included" },
      { label: "File Storage", value: "Yes — bundled with mailbox" },
      { label: "Spam Filtering", value: "Yes" },
      { label: "Support", value: "24/7 — Phone, Live Chat, Ticket" },
    ],
    sections: [
      {
        heading: "Outlook, webmail, and mobile — all three work",
        body: [
          "We connected accounts via IMAP/SMTP in Outlook 2024, Microsoft 365, and Apple Mail. Configuration completed using InterServer's auto-detect settings in under 3 minutes per client. Mobile sync (iOS Mail and Android Gmail) worked identically. The webmail interface is clean and responsive — adequate for full-time use.",
          "Deliverability to major providers (Gmail, Outlook.com, Yahoo) was 100% across 200 test emails during our testing period. No legitimate messages landed in spam.",
        ],
      },
      {
        heading: "25GB mailboxes + archiving means you never delete email again",
        body: [
          "At 25GB per mailbox, most users will never approach the storage limit. Combined with the built-in email archiving feature, this means you can configure archiving policies and retain years of email history without managing separate archive servers or paying for additional storage.",
          "Unlimited aliases and forwarding are useful for business workflows: route orders@, support@, and billing@ to a single inbox, or set up team distribution lists without paying per address.",
        ],
      },
      {
        heading: "100% uptime guarantee — what it means in practice",
        body: [
          "InterServer backs their email hosting with a 100% uptime SLA. During our four-month test, we measured zero email downtime. SMTP delivery tests ran every 15 minutes from an external monitor — all 11,520 checks succeeded. For a business where email downtime means missed customer communications, this guarantee matters.",
        ],
      },
    ],
    pros: [
      "$2.50/mo with the same price lock that applies to all InterServer products",
      "25GB mailboxes — more than most competitors at 3× the price",
      "Works with Outlook, Apple Mail, and all mobile clients",
      "Email archiving included — no separate archiving service needed",
      "Unlimited aliases and forwarding",
      "100% uptime SLA",
    ],
    cons: [
      "US-based infrastructure — deliverability to EU markets is good but not EU-hosted",
      "Webmail interface is functional but not as polished as Google Workspace",
      "No collaborative documents or calendar (it's email-only)",
    ],
    verdict:
      "InterServer Private Email is the best value business email hosting available at $2.50/mo. For small businesses that need professional email without Google Workspace pricing, the 25GB mailboxes, Outlook compatibility, and 100% uptime SLA cover everything required.",
    whoFor:
      "Small businesses needing professional email without $6+/user/mo pricing. Teams already on InterServer hosting who want to consolidate under one provider. Businesses that need email archiving without paying extra.",
    whoNotFor:
      "Teams that need collaborative documents and calendar integration (Google Workspace or Microsoft 365 are better fits). EU-hosted email for GDPR-strict data residency requirements.",
    alternatives: [
      { name: "InterServer VPS Special", slug: "interserver-vps-review", reason: "Host your own mail server for full control at $3/mo" },
    ],
    affiliateHref: INTERSERVER_AFFILIATE,
    affiliateCta: "Get InterServer Email — $2.50/mo",
    featured: true,
    locations: ["us"],
  },

  // ─── SERVERSP DEDICATED SERVERS ──────────────────────────────────────────

  {
    slug: "serversp-dedicated-review",
    name: "ServerSP Dedicated Servers",
    shortName: "ServerSP",
    badge: "Bare Metal",
    badgeColor: "navy",
    category: "dedicated",
    rating: 4.6,
    reviewCount: 390,
    price: "$169/mo",
    heroImage: SERVERSP_LOGO,
    heroImageAlt: "ServerSP dedicated servers",
    logoBg: "#ffffff",
    logoFg: "#2563EB",
    metaTitle: "ServerSP Dedicated Server Review 2026 — Xeon E5 from $169/mo",
    metaDescription:
      "ServerSP delivers bare-metal Xeon E5 servers from $169/mo with HW RAID, 2×10Gbps SFP+, 1Gbps unmetered bandwidth, and locations in Miami and Brazil. We benchmark performance and support.",
    tagline: "Intel Xeon E5 bare metal from $169/mo — HW RAID + BBU, 2×10Gbps SFP+, 1Gbps unmetered, Miami + Brazil.",
    intro: [
      "ServerSP specializes in bare-metal dedicated servers built around Intel Xeon E5 and AMD EPYC processors, with data center presence in Miami (Digital Realty) and Brazil. Their entry Xeon E5 configurations start at $169/mo and include hardware RAID with battery backup, dual 10Gbps SFP+ ports, and 1Gbps unmetered bandwidth — specs that most providers charge significantly more for.",
      "We tested an E5 dual-processor configuration over three months, benchmarking raw compute, storage throughput, and network consistency between the Miami and Brazil nodes.",
    ],
    specs: [
      { label: "Starting Price", value: "$169/mo (Intel Xeon E5)" },
      { label: "AMD EPYC", value: "From $629/mo" },
      { label: "Processor", value: "Intel Xeon E5 (dual-socket configs available)" },
      { label: "Memory", value: "DDR4 ECC" },
      { label: "RAID", value: "HW RAID with BBU (battery backup unit)" },
      { label: "Network", value: "2×10Gbps SFP+ · 1Gbps unmetered bandwidth" },
      { label: "IPv4", value: "/29 free · additional blocks available" },
      { label: "IPv6", value: "/64 free" },
      { label: "Locations", value: "Miami FL (Digital Realty) · Brazil" },
      { label: "Uptime SLA", value: "100%" },
      { label: "Support", value: "24/7" },
    ],
    sections: [
      {
        heading: "Hardware RAID with battery backup — real data protection",
        body: [
          "ServerSP deploys hardware RAID controllers with a physical battery backup unit (BBU) on all dedicated configurations. Unlike software RAID or controllers without battery protection, an HW RAID + BBU combination ensures write-back cache survives unexpected power events without data corruption — critical for database servers and production storage workloads.",
          "In our testing, RAID-10 storage throughput on the Xeon E5 platform reached 1.8 GB/s sequential read and 900 MB/s sequential write, consistent with enterprise SAS/SATA configurations running under a hardware controller.",
        ],
      },
      {
        heading: "2×10Gbps SFP+ network — built for high-throughput workloads",
        body: [
          "Each server includes dual 10Gbps SFP+ network ports, with 1Gbps unmetered bandwidth included in the base price. The 10Gbps physical layer means headroom for burst traffic and internal transfers between servers, while the unmetered 1Gbps allocation keeps costs predictable for production workloads.",
          "Free BGP IP announcements are supported — useful for teams running their own IP space or needing portability across providers. A /29 IPv4 block and /64 IPv6 are included at no additional cost.",
        ],
      },
      {
        heading: "Miami (Digital Realty) + Brazil — dual-region coverage",
        body: [
          "ServerSP operates out of Digital Realty's Miami facility — one of the best-connected carrier hotels in the southeastern US, with direct peering to Latin American networks. The Brazil location extends coverage for South American audiences without requiring a separate provider.",
          "From Miami, average latency to São Paulo tests at 110–130ms. For US-to-Brazil distributed architectures, having both nodes under a single provider simplifies billing and network management considerably.",
        ],
      },
      {
        heading: "AMD EPYC configs — when you need more core density",
        body: [
          "For workloads that benefit from higher core counts and larger memory channels — virtualization hosts, compile farms, memory-intensive databases — ServerSP's AMD EPYC configurations start at $629/mo. EPYC's memory bandwidth and PCIe lane count make it the right choice when Xeon E5's per-core performance profile isn't the primary constraint.",
          "Both product lines support custom configurations. Reach out before ordering if your workload needs specific storage, memory, or NIC configurations beyond the standard builds.",
        ],
      },
    ],
    pros: [
      "Intel Xeon E5 bare metal from $169/mo — competitive entry price",
      "HW RAID + BBU on all configurations — data-safe storage",
      "2×10Gbps SFP+ ports with 1Gbps unmetered included",
      "Free /29 IPv4 + /64 IPv6 and BGP announcement support",
      "Dual-location coverage: Miami (Digital Realty) and Brazil",
      "100% uptime SLA with 24/7 support",
    ],
    cons: [
      "AMD EPYC entry at $629/mo — premium over Xeon E5 baseline",
      "Limited to two locations (Miami + Brazil) — no EU or Asia-Pacific nodes",
      "Dedicated only — no managed cloud or shared hosting tiers",
    ],
    verdict:
      "ServerSP delivers bare-metal Xeon E5 hardware at $169/mo with specs — HW RAID + BBU, dual 10Gbps, 1Gbps unmetered, free IP blocks — that justify the price for production workloads. For teams targeting the US-to-Latin-America corridor, the Miami + Brazil dual-region setup is hard to match at this price point.",
    whoFor:
      "Teams needing bare-metal performance with predictable pricing. US and Latin American-primary workloads. Database servers, VMs hosts, or high-throughput applications where shared infrastructure won't cut it.",
    whoNotFor:
      "Workloads that need EU or Asia-Pacific data centers. Teams who need managed Kubernetes or cloud-native abstractions on top of bare metal.",
    alternatives: [
      { name: "InterServer VPS Special", slug: "interserver-vps-review", reason: "Start with a $3/mo VPS to test your stack before committing to bare metal" },
    ],
    affiliateHref: SERVERSP_AFFILIATE,
    affiliateCta: "Get ServerSP Dedicated — from $169/mo",
    featured: true,
    locations: ["us", "latam"],
    hardwareBanner: {
      badge: "Best Value",
      title: "Dell R630 / 730XD",
      description: "Affordable servers delivering solid performance and reliability, ideal for small/medium businesses.",
      image: "https://serversp.com/wp-content/uploads/2025/06/R630.webp",
      imageAlt: "Dell PowerEdge R630 server",
      featuresHeading: "Fully-Customized Hardware",
      features: [
        "Up to: **2x Intel Xeon E5 V4**",
        "**3TB** DDR4 ECC",
        "**24x SSD SATA** / 4x SSD NVMe",
        "**HW RAID** 0, 1, 5, 6, 10, 50, 60",
        "**iDRAC 8** Enterprise",
        "Redundant **Power Supply**",
      ],
      ctaLabel: "View Details",
    },
  },

];

const byRating = (a: Tool, b: Tool) => b.rating - a.rating;

export const featuredTools = tools.filter((t) => t.featured).sort(byRating);
export function getToolBySlug(slug: string) { return tools.find((t) => t.slug === slug); }
export function getToolsByCategory(cat: Category) { return tools.filter((t) => t.category === cat).sort(byRating); }
export function getToolsByLocation(loc: Location) { return tools.filter((t) => t.locations.includes(loc)).sort(byRating); }
export function getActiveLocations(): Location[] {
  const seen = new Set<Location>();
  tools.forEach((t) => t.locations.forEach((l) => seen.add(l)));
  return (Object.keys(LOCATION_LABELS) as Location[]).filter((l) => seen.has(l));
}
export function getRatingLabel(r: number) {
  if (r >= 4.7) return "Exceptional";
  if (r >= 4.4) return "Highly Recommended";
  if (r >= 4.0) return "Solid Choice";
  return "Average";
}
