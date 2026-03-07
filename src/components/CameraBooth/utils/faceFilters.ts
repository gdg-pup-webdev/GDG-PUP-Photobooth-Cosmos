// Types for Face Mesh
export interface Landmark {
  x: number;
  y: number;
  z: number;
}

export interface FaceMeshResults {
  multiFaceLandmarks?: Landmark[][];
}

export interface Filter {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  angle: number;
}

// ── Cosmos-themed sticker filters ──
export const STICKER_FILTERS: Filter[] = [
  { id: "none",           name: "None",         emoji: "❌", description: "No sticker" },
  { id: "astronaut",      name: "Astronaut",    emoji: "🧑‍🚀", description: "Space helmet" },
  { id: "alien_antennae", name: "Alien",        emoji: "👽", description: "Alien antennae" },
  { id: "alien_ears",     name: "Alien Ears",   emoji: "🖖", description: "Pointy alien ears" },
  { id: "space_visor",    name: "Space Visor",  emoji: "🕶️", description: "Cosmos visor" },
  { id: "cosmos_text",    name: "Cosmos Text",  emoji: "✨", description: "Curved event title" },
  { id: "stars",          name: "Stars",        emoji: "⭐", description: "Falling stars" },
  { id: "sparky",         name: "Sparky",       emoji: "🐶", description: "Join Sparky!" },
  { id: "debug",          name: "Debug",        emoji: "🔍", description: "View face coords" },
];

// ──────────────────────────────────────────────────────────
//  🧑‍🚀  ASTRONAUT HELMET
// ──────────────────────────────────────────────────────────
export const drawAstronautHelmet = (
  ctx: CanvasRenderingContext2D,
  landmarks: Landmark[],
  width: number,
  height: number
) => {
  const forehead   = landmarks[10];
  const chin       = landmarks[152];
  const leftCheek  = landmarks[234];
  const rightCheek = landmarks[454];
  const leftTemple  = landmarks[71];
  const rightTemple = landmarks[301];

  const faceW  = Math.abs((rightCheek.x - leftCheek.x) * width);
  const faceH  = Math.abs((chin.y - forehead.y) * height);
  const cx     = ((leftCheek.x + rightCheek.x) / 2) * width;
  const cy     = ((forehead.y + chin.y) / 2) * height;

  const angle = Math.atan2(
    (rightTemple.y - leftTemple.y) * height,
    (rightTemple.x - leftTemple.x) * width
  );

  const domeW = faceW * 1.75;
  const domeH = faceH * 1.65;
  const domeOffY = -faceH * 0.06;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  // Shadow
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 20;

  // ── Dome body (metallic) ──
  ctx.beginPath();
  ctx.ellipse(0, domeOffY, domeW / 2, domeH / 2, 0, 0, Math.PI * 2);
  const domeGrad = ctx.createRadialGradient(-domeW * 0.15, domeOffY - domeH * 0.15, 0, 0, domeOffY, domeW / 2);
  domeGrad.addColorStop(0,    "rgba(210, 225, 245, 0.97)");
  domeGrad.addColorStop(0.55, "rgba(155, 180, 210, 0.95)");
  domeGrad.addColorStop(0.85, "rgba(90, 120, 160, 0.97)");
  domeGrad.addColorStop(1,    "rgba(50, 75, 115, 0.97)");
  ctx.fillStyle = domeGrad;
  ctx.fill();

  // ── Visor cutout ──
  const visorW = faceW * 1.25;
  const visorH = faceH * 0.92;
  ctx.shadowColor = "transparent";

  ctx.beginPath();
  ctx.ellipse(0, domeOffY, visorW / 2, visorH / 2, 0, 0, Math.PI * 2);
  const visorGrad = ctx.createLinearGradient(-visorW / 2, -visorH / 2, visorW / 2, visorH / 2);
  visorGrad.addColorStop(0,   "rgba(0, 15, 50, 0.88)");
  visorGrad.addColorStop(0.5, "rgba(0, 8, 30, 0.82)");
  visorGrad.addColorStop(1,   "rgba(0, 15, 50, 0.88)");
  ctx.fillStyle = visorGrad;
  ctx.fill();

  // Visor cyan glow border
  ctx.strokeStyle = "rgba(87, 202, 255, 0.85)";
  ctx.lineWidth = 3;
  ctx.stroke();

  // ── Visor reflection (clipped) ──
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(0, domeOffY, visorW / 2, visorH / 2, 0, 0, Math.PI * 2);
  ctx.clip();

  const refGrad = ctx.createLinearGradient(-visorW * 0.35, -visorH * 0.35, 0, 0);
  refGrad.addColorStop(0, "rgba(87, 202, 255, 0.22)");
  refGrad.addColorStop(1, "rgba(87, 202, 255, 0)");
  ctx.beginPath();
  ctx.ellipse(-visorW * 0.12, domeOffY - visorH * 0.22, visorW * 0.28, visorH * 0.16, -0.5, 0, Math.PI * 2);
  ctx.fillStyle = refGrad;
  ctx.fill();
  ctx.restore();

  // ── Dome outer ring ──
  ctx.beginPath();
  ctx.ellipse(0, domeOffY, domeW / 2, domeH / 2, 0, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(220, 235, 255, 0.92)";
  ctx.lineWidth = faceW * 0.055;
  ctx.stroke();

  // Cyan inner ring accent
  ctx.beginPath();
  ctx.ellipse(0, domeOffY, domeW / 2 - faceW * 0.038, domeH / 2 - faceH * 0.022, 0, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(87, 202, 255, 0.55)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // ── Collar ──
  const collarY    = domeH / 2 + domeOffY - faceH * 0.06;
  const collarW    = domeW * 0.82;
  const collarH    = faceH * 0.22;

  ctx.beginPath();
  ctx.roundRect(-collarW / 2, collarY, collarW, collarH, 10);
  const collarGrad = ctx.createLinearGradient(0, collarY, 0, collarY + collarH);
  collarGrad.addColorStop(0,   "rgba(185, 205, 225, 0.97)");
  collarGrad.addColorStop(0.5, "rgba(145, 170, 200, 0.95)");
  collarGrad.addColorStop(1,   "rgba(100, 130, 165, 0.97)");
  ctx.fillStyle = collarGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(87, 202, 255, 0.7)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Collar tech lines
  ctx.strokeStyle = "rgba(87, 202, 255, 0.45)";
  ctx.lineWidth = 1.5;
  for (let i = 1; i < 3; i++) {
    const ly = collarY + collarH * (i / 3);
    ctx.beginPath();
    ctx.moveTo(-collarW * 0.38, ly);
    ctx.lineTo( collarW * 0.38, ly);
    ctx.stroke();
  }
  // Center indicator dot
  ctx.beginPath();
  ctx.arc(0, collarY + collarH / 2, 5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(87, 202, 255, 0.8)";
  ctx.fill();

  ctx.restore();
};

// ──────────────────────────────────────────────────────────
//  👽  ALIEN ANTENNAE
// ──────────────────────────────────────────────────────────
export const drawAlienAntennae = (
  ctx: CanvasRenderingContext2D,
  landmarks: Landmark[],
  width: number,
  height: number
) => {
  const forehead   = landmarks[10];
  const chin       = landmarks[152];
  const leftCheek  = landmarks[234];
  const rightCheek = landmarks[454];
  const leftTemple  = landmarks[71];
  const rightTemple = landmarks[301];

  const faceW  = Math.abs((rightCheek.x - leftCheek.x) * width);
  const faceH  = Math.abs((chin.y - forehead.y) * height);
  const headX  = forehead.x * width;
  const headY  = forehead.y * height;

  const angle = Math.atan2(
    (rightTemple.y - leftTemple.y) * height,
    (rightTemple.x - leftTemple.x) * width
  );

  const stemH = faceH * 0.7;
  const orbR  = faceW * 0.07;
  const pulse = 0.75 + Math.sin(Date.now() * 0.004) * 0.25;

  ctx.save();
  ctx.translate(headX, headY);
  ctx.rotate(angle);

  [{ dx: -faceW * 0.22, curve: -faceW * 0.12, delay: 0 },
   { dx:  faceW * 0.22, curve:  faceW * 0.12, delay: 1 }].forEach(({ dx, curve, delay }) => {
    const tipX = dx + curve;
    const tipY = -stemH;

    // Stalk
    ctx.save();
    ctx.shadowColor = "rgba(87, 202, 255, 0.6)";
    ctx.shadowBlur   = 8;
    ctx.beginPath();
    ctx.moveTo(dx, 0);
    ctx.quadraticCurveTo(dx + curve * 0.5, -stemH * 0.5, tipX, tipY);
    ctx.strokeStyle = "rgba(168, 85, 247, 0.85)";
    ctx.lineWidth   = 3;
    ctx.lineCap     = "round";
    ctx.stroke();
    ctx.restore();

    // Orb glow
    const orbPulse = 0.75 + Math.sin(Date.now() * 0.004 + delay * 1.5) * 0.25;
    const glowGrad = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, orbR * 2.5);
    glowGrad.addColorStop(0,   `rgba(87, 202, 255, ${0.5 * orbPulse})`);
    glowGrad.addColorStop(0.5, `rgba(87, 202, 255, ${0.2 * orbPulse})`);
    glowGrad.addColorStop(1,   "rgba(87, 202, 255, 0)");
    ctx.beginPath();
    ctx.arc(tipX, tipY, orbR * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = glowGrad;
    ctx.fill();

    // Orb core
    const orbGrad = ctx.createRadialGradient(tipX - orbR * 0.3, tipY - orbR * 0.3, 0, tipX, tipY, orbR);
    orbGrad.addColorStop(0,   "#AEEEFF");
    orbGrad.addColorStop(0.4, "#57CAFF");
    orbGrad.addColorStop(0.8, "#4285F4");
    orbGrad.addColorStop(1,   "#1a1a5e");
    ctx.beginPath();
    ctx.arc(tipX, tipY, orbR, 0, Math.PI * 2);
    ctx.fillStyle = orbGrad;
    ctx.fill();

    // Orb highlight
    ctx.beginPath();
    ctx.arc(tipX - orbR * 0.3, tipY - orbR * 0.3, orbR * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fill();
  });

  ctx.restore();
};

// ──────────────────────────────────────────────────────────
//  🖖  ALIEN EARS
// ──────────────────────────────────────────────────────────
export const drawAlienEars = (
  ctx: CanvasRenderingContext2D,
  landmarks: Landmark[],
  width: number,
  height: number
) => {
  const leftEar   = landmarks[234];
  const rightEar  = landmarks[454];
  const forehead  = landmarks[10];
  const chin      = landmarks[152];
  const leftTemple  = landmarks[71];
  const rightTemple = landmarks[301];

  const faceH   = Math.abs((chin.y - forehead.y) * height);
  const earH    = faceH * 0.52;

  const angle = Math.atan2(
    (rightTemple.y - leftTemple.y) * height,
    (rightTemple.x - leftTemple.x) * width
  );

  [{ landmark: leftEar, side: -1 }, { landmark: rightEar, side: 1 }].forEach(({ landmark, side }) => {
    const earX = landmark.x * width;
    const earY = landmark.y * height;

    ctx.save();
    ctx.translate(earX, earY);
    ctx.rotate(angle);
    ctx.scale(side, 1);

    // Main ear shape
    ctx.beginPath();
    ctx.moveTo(0, -earH * 0.18);
    ctx.quadraticCurveTo(-earH * 0.1, -earH * 0.42, -earH * 0.42, -earH * 0.72);
    ctx.quadraticCurveTo(-earH * 0.52, -earH * 0.88, -earH * 0.3, -earH * 0.78);
    ctx.quadraticCurveTo(0, -earH * 0.43, earH * 0.1, earH * 0.08);
    ctx.closePath();

    const earGrad = ctx.createLinearGradient(-earH * 0.3, -earH * 0.7, earH * 0.1, earH * 0.08);
    earGrad.addColorStop(0,   "#AEEEFF");
    earGrad.addColorStop(0.3, "#57CAFF");
    earGrad.addColorStop(0.7, "#4285F4");
    earGrad.addColorStop(1,   "#1a1a6e");
    ctx.fillStyle = earGrad;
    ctx.fill();

    // Inner vein
    ctx.beginPath();
    ctx.moveTo(-earH * 0.05, -earH * 0.22);
    ctx.quadraticCurveTo(-earH * 0.18, -earH * 0.48, -earH * 0.28, -earH * 0.58);
    ctx.strokeStyle = "rgba(168, 85, 247, 0.6)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Glow outline
    ctx.beginPath();
    ctx.moveTo(0, -earH * 0.18);
    ctx.quadraticCurveTo(-earH * 0.1, -earH * 0.42, -earH * 0.42, -earH * 0.72);
    ctx.quadraticCurveTo(-earH * 0.52, -earH * 0.88, -earH * 0.3, -earH * 0.78);
    ctx.strokeStyle = "rgba(87, 202, 255, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  });
};

// ──────────────────────────────────────────────────────────
//  ✨  COSMOS TEXT
// ──────────────────────────────────────────────────────────
export const drawCosmosText = (
  ctx: CanvasRenderingContext2D,
  landmarks: Landmark[],
  width: number,
  height: number
) => {
  const forehead   = landmarks[10];
  const chin       = landmarks[152];
  const leftCheek  = landmarks[234];
  const rightCheek = landmarks[454];
  const leftTemple  = landmarks[71];
  const rightTemple = landmarks[301];

  const leftCheekX  = leftCheek.x * width;
  const leftCheekY  = leftCheek.y * height;
  const rightCheekX = rightCheek.x * width;
  const rightCheekY = rightCheek.y * height;
  const faceW       = Math.abs(rightCheekX - leftCheekX);
  const faceH       = Math.abs((chin.y - forehead.y) * height);

  const centerX = (leftCheekX + rightCheekX) / 2;
  const centerY = (leftCheekY + rightCheekY) / 2 + faceH * 0.1;

  const headAngle = Math.atan2(
    (rightTemple.y - leftTemple.y) * height,
    (rightTemple.x - leftTemple.x) * width
  );

  const radius   = faceW * 0.6 + faceH * 0.18;
  const text     = "GDG PUP COSMOS 2026";
  const fontSize = faceW * 0.13;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(headAngle);
  ctx.font = `bold ${fontSize}px 'Arial Black', Arial, sans-serif`;
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";

  const totalAngle  = Math.PI;
  const chars       = text.split("");
  const spacing     = totalAngle / chars.length;

  chars.forEach((char, i) => {
    const charAngle = spacing * i + spacing / 2;
    const x = Math.cos(charAngle) * radius;
    const y = -Math.sin(charAngle) * radius - faceH * 0.22;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-charAngle + Math.PI / 2);
    ctx.scale(-1, 1);

    // Glow
    ctx.shadowColor = "rgba(87, 202, 255, 0.9)";
    ctx.shadowBlur  = 14;

    const tGrad = ctx.createLinearGradient(0, -fontSize / 2, 0, fontSize / 2);
    tGrad.addColorStop(0,   "#AEEEFF");
    tGrad.addColorStop(0.5, "#57CAFF");
    tGrad.addColorStop(1,   "#4285F4");
    ctx.fillStyle = tGrad;
    ctx.fillText(char, 0, 0);

    ctx.strokeStyle = "rgba(0,0,60,0.6)";
    ctx.lineWidth   = 1.5;
    ctx.strokeText(char, 0, 0);
    ctx.restore();
  });

  // Star sparkles along arc
  const nSparkles = 8;
  for (let i = 0; i < nSparkles; i++) {
    const sa = (totalAngle / (nSparkles - 1)) * i;
    const sr = radius + 14 + Math.sin(Date.now() * 0.004 + i * 0.7) * 6;
    const sx = Math.cos(sa) * sr;
    const sy = -Math.sin(sa) * sr - faceH * 0.12;
    const ss = 2.5 + Math.sin(Date.now() * 0.006 + i) * 1.5;

    ctx.save();
    ctx.translate(sx, sy);
    ctx.beginPath();
    for (let j = 0; j < 4; j++) {
      const a = (j * Math.PI / 2) + Date.now() * 0.002;
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * ss, Math.sin(a) * ss);
    }
    ctx.strokeStyle = `rgba(87, 202, 255, ${0.6 + Math.sin(Date.now() * 0.008 + i) * 0.3})`;
    ctx.lineWidth   = 1.8;
    ctx.lineCap     = "round";
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
};

// ──────────────────────────────────────────────────────────
//  ⭐  FALLING STARS
// ──────────────────────────────────────────────────────────
const STAR_COLORS = ["#FFFFFF", "#57CAFF", "#FFD700", "#A855F7", "#AEEEFF"];

export const drawStars = (
  ctx: CanvasRenderingContext2D,
  snowflakes: Snowflake[],
  width: number,
  height: number
) => {
  snowflakes.forEach((flake) => {
    // Update position
    flake.y += flake.speed;
    flake.x += Math.sin(flake.angle + Date.now() * 0.001) * 0.0008;
    flake.angle += 0.015;

    if (flake.y > 1.1) {
      flake.y = -0.1;
      flake.x = Math.random();
    }

    const x  = flake.x * width;
    const y  = flake.y * height;
    const s  = flake.size;
    const color = STAR_COLORS[Math.floor(flake.size * 5) % STAR_COLORS.length];

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(flake.angle);
    ctx.globalAlpha = flake.opacity;

    // 4-point star
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const a = i * (Math.PI / 2);
      const outer = s;
      const inner = s * 0.38;
      ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer);
      ctx.lineTo(Math.cos(a + Math.PI / 4) * inner, Math.sin(a + Math.PI / 4) * inner);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    // Glow
    ctx.shadowColor = color;
    ctx.shadowBlur  = s * 2;
    ctx.fill();

    // Center dot
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    ctx.restore();
  });
};

// Keep the old name as alias for backward compat
export const drawSnowflakes = drawStars;

// ──────────────────────────────────────────────────────────
//  🕶️  SPACE VISOR
// ──────────────────────────────────────────────────────────
export const drawSpaceVisor = (
  ctx: CanvasRenderingContext2D,
  landmarks: Landmark[],
  width: number,
  height: number
) => {
  const leftEyeOuter  = landmarks[33];
  const leftEyeInner  = landmarks[133];
  const rightEyeInner = landmarks[362];
  const rightEyeOuter = landmarks[263];
  const leftEyeTop    = landmarks[159];
  const leftEyeBottom = landmarks[145];
  const noseBridge    = landmarks[6];
  const leftTemple    = landmarks[71];
  const rightTemple   = landmarks[301];

  const lensGap = width * 0.018;
  const leftCX  = ((leftEyeOuter.x + leftEyeInner.x) / 2) * width - lensGap;
  const rightCX = ((rightEyeOuter.x + rightEyeInner.x) / 2) * width + lensGap;
  const lensY   = ((leftEyeTop.y + leftEyeBottom.y) / 2) * height;

  const eyeW    = Math.abs(leftEyeInner.x - leftEyeOuter.x) * width * 2.1;
  const eyeH    = eyeW * 0.62;
  const lensR   = eyeH * 0.35;

  const angle = Math.atan2(
    (rightTemple.y - leftTemple.y) * height,
    (rightTemple.x - leftTemple.x) * width
  );

  ctx.save();
  ctx.translate((leftCX + rightCX) / 2, lensY);
  ctx.rotate(angle);
  ctx.translate(-(leftCX + rightCX) / 2, -lensY);

  ctx.shadowColor = "rgba(0,0,0,0.55)";
  ctx.shadowBlur  = 10;
  ctx.shadowOffsetY = 4;

  const drawLens = (cx: number, color1: string, color2: string) => {
    const lGrad = ctx.createRadialGradient(cx, lensY, 0, cx, lensY, eyeW * 0.6);
    lGrad.addColorStop(0,   color1);
    lGrad.addColorStop(0.5, color2);
    lGrad.addColorStop(1,   "rgba(0,0,20,0.9)");
    ctx.beginPath();
    ctx.roundRect(cx - eyeW / 2, lensY - eyeH / 2, eyeW, eyeH, lensR);
    ctx.fillStyle = lGrad;
    ctx.fill();
    // Sheen
    ctx.beginPath();
    ctx.ellipse(cx - eyeW * 0.18, lensY - eyeH * 0.2, eyeW * 0.12, eyeH * 0.08, -0.4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fill();
  };

  // Left lens: cyan
  drawLens(leftCX, "rgba(0, 100, 160, 0.78)", "rgba(0, 60, 120, 0.85)");
  // Right lens: purple
  drawLens(rightCX, "rgba(80, 0, 160, 0.78)", "rgba(50, 0, 110, 0.85)");

  // Chrome frame
  ctx.shadowColor = "transparent";
  ctx.lineWidth   = eyeH * 0.13;

  const drawFrame = (cx: number, color: string) => {
    ctx.beginPath();
    ctx.roundRect(cx - eyeW / 2, lensY - eyeH / 2, eyeW, eyeH, lensR);
    ctx.strokeStyle = color;
    ctx.stroke();
  };
  drawFrame(leftCX, "rgba(87, 202, 255, 0.9)");
  drawFrame(rightCX, "rgba(168, 85, 247, 0.9)");

  // Bridge
  ctx.strokeStyle = "rgba(180, 200, 220, 0.9)";
  ctx.lineWidth   = eyeH * 0.15;
  ctx.lineCap     = "round";
  ctx.beginPath();
  ctx.moveTo(leftCX + eyeW / 2, lensY);
  ctx.lineTo(rightCX - eyeW / 2, lensY);
  ctx.stroke();

  // Temple arms (slim chrome)
  ctx.lineWidth = eyeH * 0.09;
  ctx.strokeStyle = "rgba(190, 210, 230, 0.85)";
  ctx.beginPath();
  ctx.moveTo(leftCX - eyeW / 2, lensY);
  ctx.lineTo(leftTemple.x * width - 20, leftTemple.y * height);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(rightCX + eyeW / 2, lensY);
  ctx.lineTo(rightTemple.x * width + 20, rightTemple.y * height);
  ctx.stroke();

  ctx.restore();
};

// Keep old name as alias
export const drawGlasses = drawSpaceVisor;

// ──────────────────────────────────────────────────────────
//  🔍  DEBUG MESH (unchanged)
// ──────────────────────────────────────────────────────────
export const drawDebugMesh = (
  ctx: CanvasRenderingContext2D,
  landmarks: Landmark[],
  width: number,
  height: number
) => {
  landmarks.forEach((landmark, index) => {
    const x = landmark.x * width;
    const y = landmark.y * height;

    let color  = "rgba(0, 255, 0, 0.5)";
    let radius = 2;

    if (index === 1)  { color = "#ff0000"; radius = 6; }
    else if (index === 10)  { color = "#00ff00"; radius = 6; }
    else if (index === 152) { color = "#0000ff"; radius = 6; }
    else if ([33, 133, 362, 263].includes(index))  { color = "#ffff00"; radius = 4; }
    else if ([234, 454].includes(index)) { color = "#ff00ff"; radius = 4; }

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  });

  ctx.font        = "12px monospace";
  ctx.fillStyle   = "#ffffff";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth   = 3;

  [{ idx: 1, label: "#1 Nose" }, { idx: 10, label: "#10 Forehead" }, { idx: 152, label: "#152 Chin" }]
    .forEach(({ idx, label }) => {
      const x = landmarks[idx].x * width + 10;
      const y = landmarks[idx].y * height;
      ctx.strokeText(label, x, y);
      ctx.fillText(label, x, y);
    });
};

// ──────────────────────────────────────────────────────────
//  🐶  DRAW SPARKY (unchanged logic)
// ──────────────────────────────────────────────────────────
export const drawSparky = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  xPct?: number,
  yPct?: number,
  scale?: number
) => {
  if (!image) return;

  const currentScale = scale ?? 0.8;
  const currentX     = xPct ?? 0.5;
  const currentY     = yPct ?? 1.0;

  const sparkyHeight = height * currentScale;
  const aspectRatio  = image.width / image.height;
  const sparkyWidth  = sparkyHeight * aspectRatio;

  let x: number, y: number;
  if (xPct !== undefined && yPct !== undefined) {
    x = currentX * width - sparkyWidth / 2;
    y = currentY * height - sparkyHeight / 2;
  } else {
    x = (width - sparkyWidth) / 2;
    y = height - sparkyHeight;
  }

  ctx.save();
  ctx.imageSmoothingEnabled    = true;
  ctx.imageSmoothingQuality    = "high";
  ctx.shadowColor    = "rgba(0,0,0,0.5)";
  ctx.shadowBlur     = 20;
  ctx.shadowOffsetY  = 10;
  ctx.drawImage(image, x, y, sparkyWidth, sparkyHeight);
  ctx.restore();
};
