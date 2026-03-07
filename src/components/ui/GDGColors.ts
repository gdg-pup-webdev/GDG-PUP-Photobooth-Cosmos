import { LucideIcon, Sparkles, CircleOff, Sun, Palette, Zap, Camera } from "lucide-react";

// Cosmos Theme Colors
export const colors = {
  cyan:   "#57CAFF",  // Cosmos Cyan
  blue:   "#4285F4",  // GDG Blue
  navy:   "#000614",  // Deep Space Navy
  white:  "#F0F8FF",  // Starlight White
};

export const colorArray = Object.values(colors);

export interface Filter {
  name: string;
  value: string;
  color: string;
  icon: LucideIcon;
}

export const FILTERS: Filter[] = [
  { name: "Normal",  value: "",                                           color: colors.cyan, icon: Sparkles },
  { name: "B&W",     value: "grayscale(100%)",                            color: colors.white, icon: CircleOff },
  { name: "Warm",    value: "sepia(100%)",                                color: "#D4AF37",   icon: Sun },
  { name: "Vivid",   value: "contrast(1.2) saturate(1.4)",               color: colors.blue, icon: Palette },
  { name: "Neon",    value: "hue-rotate(180deg) saturate(1.6) brightness(1.1)", color: "#A855F7", icon: Zap },
  { name: "Vintage", value: "sepia(50%) contrast(1.1) brightness(0.9)",  color: "#94A3B8",   icon: Camera },
];
