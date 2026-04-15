const FLAG_URLS: Record<string, string> = {
  us:    "https://cdn-icons-png.flaticon.com/512/555/555526.png",
  eu:    "https://flagcdn.com/w40/eu.png",
  latam: "https://cdn-icons-png.flaticon.com/512/7501/7501795.png",
  apac:  "https://flagcdn.com/w40/sg.png",
  ca:    "https://flagcdn.com/w40/ca.png",
};

export default function FlagImg({ loc, height = 13 }: { loc: string; height?: number }) {
  const src = FLAG_URLS[loc] ?? `https://flagcdn.com/w40/${loc}.png`;
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
