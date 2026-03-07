export function sr(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export const STARS = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  left: `${(sr(i * 2) * 96 + 2).toFixed(2)}%`,
  top: `${(sr(i * 3) * 66 + 2).toFixed(2)}%`,
  size: sr(i * 5) > 0.72 ? 2 : 1,
  delay: `${(sr(i * 7) * 5).toFixed(2)}s`,
  duration: `${(2 + sr(i * 11) * 3).toFixed(2)}s`,
  opacity: parseFloat((0.3 + sr(i * 13) * 0.6).toFixed(2)),
}));

export const SHOOTING_STARS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  top: `${(5 + sr(i * 17) * 40).toFixed(1)}%`,
  delay: `${(sr(i * 19) * 14).toFixed(1)}s`,
  duration: `${(1.4 + sr(i * 23) * 1.4).toFixed(2)}s`,
}));

export const STEPS = [
  {
    number: "01",
    icon: "",
    title: "Choose Your Filter",
    desc: "Pick from 6 curated Cosmos-themed filters before the countdown begins.",
  },
  {
    number: "02",
    icon: "",
    title: "Strike a Pose",
    desc: "Three automatic shots with a countdown — smile, laugh, or go all out.",
  },
  {
    number: "03",
    icon: "",
    title: "Grab Your Strip",
    desc: "Your personalised photo strip is ready to download the moment the session ends.",
  },
];

export const STATS = [
  {
    value: "150+",
    label: "Photos Taken",
    sub: "During our last GDG event! Be part of the next batch of amazing memories.",
  },
  {
    value: "⬇",
    label: "Instant Download",
    sub: "No waiting, no sign-in. Your strip downloads the moment it's done.",
  },
  {
    value: "🔗",
    label: "Easy to Share",
    sub: "Copy or send your strip directly from the download screen.",
  },
  {
    value: "6",
    label: "Fun Filters",
    sub: "Vivid, B&W, Vintage, Warm, Cool, and Neon — all yours to try.",
  },
];
