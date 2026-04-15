const FLAG_SRCS: Record<string, string> = {
  us:    "/flags/us.png",
  latam: "/flags/br.png",
  eu:    "/flags/eu.png",
  apac:  "/flags/apac.png",
  ca:    "/flags/ca.png",
};

export default function FlagImg({ loc, height = 13 }: { loc: string; height?: number }) {
  const src = FLAG_SRCS[loc] ?? "/flags/us.png";
  return (
    <img
      src={src}
      height={height}
      width={height}
      alt={loc.toUpperCase()}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    />
  );
}
