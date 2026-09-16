import { loadImage } from "./photostrip";

// Reference width of the layout tool's preview column that the mascot
// positions and text sizes were finalized against (percent-based
// coordinates need no conversion; the tool's font-size handles are stored
// in raw CSS px against that preview width, so text sizes are scaled up
// to the real canvas from there).
const PREVIEW_WIDTH = 460;

interface MascotPlacement {
  src: string;
  /** Top-left corner, in % of canvas width/height. */
  leftPct: number;
  topPct: number;
  /** Width in % of canvas width; height follows the image's own aspect ratio. */
  widthPct: number;
  aspect: number; // naturalHeight / naturalWidth
  rotateDeg: number;
}

interface TextPlacement {
  /** Horizontal center and top edge, in % of canvas width/height. */
  centerPct: number;
  topPct: number;
  /** Font size in px, measured against the PREVIEW_WIDTH reference. */
  previewFontSize: number;
  rotateDeg: number;
}

// Finalized in the interactive layout tool — see MASCOT_LAYOUT_URL history.
export const MASCOT_LAYOUT: Record<"sparky" | "cirby", MascotPlacement> = {
  sparky: {
    src: "/mascots/sparky.webp",
    leftPct: 0,
    topPct: 0,
    widthPct: 28.494485877248124,
    aspect: 3200 / 2400,
    rotateDeg: -39.7,
  },
  cirby: {
    src: "/mascots/cirby.webp",
    leftPct: 59.02662165273681,
    topPct: 83.0878790453811,
    widthPct: 45,
    aspect: 1,
    rotateDeg: -13.2,
  },
};

export const TEXT_LAYOUT: Record<"ccis" | "wordmark", TextPlacement> = {
  ccis: {
    centerPct: 64.0677002420378,
    topPct: 10.002236423939284,
    previewFontSize: 31.599978637695312,
    rotateDeg: 0,
  },
  wordmark: {
    centerPct: 37.319693747966774,
    topPct: 89.07578942630848,
    previewFontSize: 54.499978637695314,
    rotateDeg: 0,
  },
};

interface TextSegment {
  text: string;
  color: string;
}

const CCIS_SEGMENTS: TextSegment[] = [
  { text: "C", color: "#6FA8FF" },
  { text: "C", color: "#F2665A" },
  { text: "I", color: "#FBC24B" },
  { text: "S", color: "#57D68D" },
  { text: " SALUBONG", color: "#E6ECF5" },
];

const WORDMARK_SEGMENTS: TextSegment[] = [
  { text: "GDG ", color: "#4285F4" },
  { text: "P", color: "#EA4335" },
  { text: "U", color: "#FBBC05" },
  { text: "P", color: "#34A853" },
];

/** Draws left-to-right, centered horizontally on (0, 0) after the caller translates/rotates. */
const drawCenteredSegments = (
  ctx: CanvasRenderingContext2D,
  segments: TextSegment[],
  fontSize: number,
  letterSpacingEm: number
): void => {
  ctx.font = `800 ${fontSize}px 'Outfit', sans-serif`;
  ctx.textBaseline = "top";
  const letterSpacing = letterSpacingEm * fontSize;

  const charWidth = (ch: string) => ctx.measureText(ch).width + letterSpacing;
  let totalWidth = 0;
  for (const seg of segments) {
    for (const ch of seg.text) totalWidth += charWidth(ch);
  }
  totalWidth -= letterSpacing;

  let cursorX = -totalWidth / 2;
  for (const seg of segments) {
    ctx.fillStyle = seg.color;
    for (const ch of seg.text) {
      ctx.fillText(ch, cursorX, 0);
      cursorX += charWidth(ch);
    }
  }
};

const drawTextPlacement = (
  ctx: CanvasRenderingContext2D,
  placement: TextPlacement,
  segments: TextSegment[],
  letterSpacingEm: number,
  width: number,
  height: number
): void => {
  const fontSize = placement.previewFontSize * (width / PREVIEW_WIDTH);
  const x = (placement.centerPct / 100) * width;
  const y = (placement.topPct / 100) * height;

  ctx.save();
  ctx.translate(x, y);
  if (placement.rotateDeg) ctx.rotate((placement.rotateDeg * Math.PI) / 180);
  drawCenteredSegments(ctx, segments, fontSize, letterSpacingEm);
  ctx.restore();
};

const drawMascot = async (
  ctx: CanvasRenderingContext2D,
  placement: MascotPlacement,
  width: number,
  height: number
): Promise<void> => {
  const img = await loadImage(placement.src);
  const w = (placement.widthPct / 100) * width;
  const h = w * placement.aspect;
  const x = (placement.leftPct / 100) * width;
  const y = (placement.topPct / 100) * height;
  const cx = x + w / 2;
  const cy = y + h / 2;

  ctx.save();
  ctx.filter = "drop-shadow(0 8px 18px rgba(0,0,0,0.55))";
  ctx.translate(cx, cy);
  if (placement.rotateDeg) ctx.rotate((placement.rotateDeg * Math.PI) / 180);
  ctx.drawImage(img, -w / 2, -h / 2, w, h);
  ctx.restore();
};

const drawStarfield = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
  const scale = width / 1666;
  const starCount = 130;
  const glowCount = 12;

  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = (0.5 + Math.random() * 1.3) * scale;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${(0.35 + Math.random() * 0.55).toFixed(2)})`;
    ctx.fill();
  }

  for (let i = 0; i < glowCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height * 0.9 + height * 0.02;
    const r = (1.4 + Math.random() * 1.3) * scale;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 8);
    grad.addColorStop(0, "rgba(210,230,255,0.95)");
    grad.addColorStop(0.35, "rgba(140,190,255,0.32)");
    grad.addColorStop(1, "rgba(140,190,255,0)");
    ctx.beginPath();
    ctx.arc(x, y, r * 8, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }
};

const drawNebulaGlow = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  xPct: number,
  yPct: number,
  radiusPct: number,
  color: string
): void => {
  const x = (xPct / 100) * width;
  const y = (yPct / 100) * height;
  const r = (radiusPct / 100) * Math.max(width, height);
  const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
  grad.addColorStop(0, color);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
};

const drawSlotCornerBrackets = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
): void => {
  const armLen = w * 0.12;
  ctx.save();
  ctx.strokeStyle = "rgba(87,202,255,0.85)";
  ctx.lineWidth = 2;
  ctx.lineCap = "square";

  const corners: [number, number, number, number][] = [
    [x, y, 1, 1],
    [x + w, y, -1, 1],
    [x, y + h, 1, -1],
    [x + w, y + h, -1, -1],
  ];
  for (const [cx, cy, dx, dy] of corners) {
    ctx.beginPath();
    ctx.moveTo(cx + armLen * dx, cy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx, cy + armLen * dy);
    ctx.stroke();
  }
  ctx.restore();
};

/**
 * Draws the cosmic Mission Patch frame: gradient sky, nebula glows,
 * starfield, Sparky and Cirby, and the colorful text lockups. Slot corner
 * brackets are exported separately since they're drawn per-slot, after each
 * photo is composited in `generatePhotostrip`.
 */
export const drawCosmicFrame = async (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): Promise<void> => {
  if (typeof document !== "undefined" && document.fonts?.ready) {
    await document.fonts.ready;
  }

  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, "#0A0D1C");
  bgGrad.addColorStop(0.55, "#070914");
  bgGrad.addColorStop(1, "#05060C");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  drawNebulaGlow(ctx, width, height, 42, 5, 45, "rgba(87,202,255,0.30)");
  drawNebulaGlow(ctx, width, height, 8, 92, 40, "rgba(168,85,247,0.22)");
  drawNebulaGlow(ctx, width, height, 95, 12, 38, "rgba(87,202,255,0.18)");
  drawNebulaGlow(ctx, width, height, 88, 90, 32, "rgba(168,85,247,0.16)");

  drawStarfield(ctx, width, height);

  await drawMascot(ctx, MASCOT_LAYOUT.sparky, width, height);
  await drawMascot(ctx, MASCOT_LAYOUT.cirby, width, height);

  drawTextPlacement(ctx, TEXT_LAYOUT.ccis, CCIS_SEGMENTS, 0.06, width, height);
  drawTextPlacement(ctx, TEXT_LAYOUT.wordmark, WORDMARK_SEGMENTS, 0.01, width, height);
};

export { drawSlotCornerBrackets };
