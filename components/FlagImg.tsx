// Maps our Location keys to ISO 3166-1 alpha-2 codes used by flagcdn.com
const FLAG_CODES: Record<string, string> = {
  us:    "us",
  eu:    "eu",
  latam: "br",
  apac:  "sg",
  ca:    "ca",
};

export default function FlagImg({ loc, height = 13 }: { loc: string; height?: number }) {
  const code = FLAG_CODES[loc] ?? loc;
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      height={height}
      alt={code.toUpperCase()}
      style={{ borderRadius: "2px", display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    />
  );
}
