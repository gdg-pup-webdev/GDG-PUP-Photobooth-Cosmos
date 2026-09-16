// Camera configuration settings
export const CAMERA_CONFIG = {
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: "user",
  },
  audio: false,
} as const;

// Photostrip canvas settings — Mission Patch cosmic frame.
// Slot geometry leaves a 15%-tall header band for Sparky/the CCIS Salubong
// lockup and a 12.3%-tall footer band for Cirby/the GDG PUP wordmark.
export const PHOTOSTRIP_CONFIG = {
  width: 1666,
  height: 3000,
  quality: 0.7,
  slots: [
    { x: 130, y: 450, w: 1406, h: 711 },
    { x: 130, y: 1182, w: 1406, h: 711 },
    { x: 130, y: 1914, w: 1406, h: 711 },
  ],
  padding: 40,
  borderRadius: 30,
} as const;

// Countdown settings
export const COUNTDOWN_CONFIG = {
  duration: 3,
  intervalMs: 1000,
  delayBetweenShots: 400,
} as const;

// Total shots in a session
export const TOTAL_SHOTS = 3;
