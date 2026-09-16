import { useEffect, useRef, useState, useCallback } from 'react';
import {
  drawAstronautHelmet,
  drawAlienAntennae,
  drawAlienEars,
  drawSpaceVisor,
  drawGDGPupText,
  drawStars,
  drawBinaryRain,
  drawHackerVisor,
  drawHackerScan,
  drawHackerGlitch,
  Snowflake,
  Landmark
} from '../utils/faceFilters';

// ===== PERFORMANCE OPTIMIZATION CONSTANTS =====
// Dynamic FPS based on face count for smooth performance
const getFPSForFaceCount = (faceCount: number): number => {
  if (faceCount >= 6) return 10;  // 6 faces (max): lowest FPS
  if (faceCount >= 5) return 12;  // 5 faces: very low FPS
  if (faceCount >= 4) return 15;  // 4 faces: low FPS
  if (faceCount >= 3) return 18;  // 3 faces: reduced FPS
  if (faceCount >= 2) return 24;  // 2 faces: medium FPS
  return 30;                       // 1 face: full FPS
};

// Frame skip configuration for detection vs rendering
const DETECTION_SKIP_FRAMES = 2; // Only run ML detection every N frames
const RENDER_EVERY_FRAME = true; // Always render cached results

// Debounce configuration for state updates
const STATE_UPDATE_DEBOUNCE_MS = 100;

export const useFaceMesh = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  currentSticker: string
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const faceMeshRef = useRef<any>(null);
  const snowflakesRef = useRef<Snowflake[]>([]);

  // ===== PERFORMANCE: Cached results for frame reuse =====
  const cachedResultsRef = useRef<any>(null);
  const frameCountRef = useRef<number>(0);
  const currentFPSRef = useRef<number>(30);
  const lastStateUpdateRef = useRef<number>(0);
  const faceCountRef = useRef<number>(0);

  const requestRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);

  // Track mount status with ref to be accessible in cleanup and across effects
  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Ref to hold current sticker for use within callbacks without re-binding
  const stickerRef = useRef(currentSticker);
  useEffect(() => {
    stickerRef.current = currentSticker;

    // Clear canvas if filter is turned off
    if (currentSticker === 'none' && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [currentSticker]);

  // Initialize snowflakes with reduced count for performance
  useEffect(() => {
    const flakes: Snowflake[] = [];
    // Reduced from 50 to 30 for better performance
    const flakeCount = 30;
    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 10 + 6,
        speed: Math.random() * 0.002 + 0.001,
        opacity: Math.random() * 0.5 + 0.3,
        angle: Math.random() * Math.PI * 2,
      });
    }
    snowflakesRef.current = flakes;
  }, []);

  // ===== OPTIMIZED: Render function using cached results =====
  const renderCachedResults = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const results = cachedResultsRef.current;
    const filter = stickerRef.current;
    const faceCount = faceCountRef.current;

    // Performance mode: simplify rendering when many faces
    const isPerformanceMode = faceCount >= 2;

    // Draw effects that don't need a face (fullscreen)
    if (filter === "stars") {
      drawStars(ctx, snowflakesRef.current, canvas.width, canvas.height);
    }
    if (filter === "binary_rain") {
      drawBinaryRain(ctx, snowflakesRef.current, canvas.width, canvas.height, results?.multiFaceLandmarks);
    }

    if (results?.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      // Loop through ALL detected faces
      results.multiFaceLandmarks.forEach((faceLandmarks: Landmark[]) => {
        const landmarks = faceLandmarks;

        // In performance mode, skip expensive effects
        if (isPerformanceMode) {
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }

        switch (filter) {
          case "astronaut":
            drawAstronautHelmet(ctx, landmarks, canvas.width, canvas.height);
            break;
          case "alien_antennae":
            drawAlienAntennae(ctx, landmarks, canvas.width, canvas.height);
            break;
          case "alien_ears":
            drawAlienEars(ctx, landmarks, canvas.width, canvas.height);
            break;
          case "gdg_text":
            drawGDGPupText(ctx, landmarks, canvas.width, canvas.height);
            break;
          case "space_visor":
            drawSpaceVisor(ctx, landmarks, canvas.width, canvas.height);
            break;
          case "hacker_visor":
            drawHackerVisor(ctx, landmarks, canvas.width, canvas.height);
            break;
          case "hacker_scan":
            drawHackerScan(ctx, landmarks, canvas.width, canvas.height);
            break;
          case "hacker_glitch":
            drawHackerGlitch(ctx, landmarks, canvas.width, canvas.height);
            break;
        }
      });
    }
  }, []);

  const onResults = useCallback((results: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ===== PERFORMANCE: Cache results for frame reuse =====
    cachedResultsRef.current = results;

    // Update face count and dynamic FPS
    const newFaceCount = results.multiFaceLandmarks?.length || 0;
    if (newFaceCount !== faceCountRef.current) {
      faceCountRef.current = newFaceCount;
      currentFPSRef.current = getFPSForFaceCount(newFaceCount);
      console.log(`🎯 Faces: ${newFaceCount}, FPS: ${currentFPSRef.current}`);
    }

    // Ensure canvas dimensions match the video
    const image = results.image;
    if (image) {
      if ('videoWidth' in image && 'videoHeight' in image) {
        const videoEl = image as unknown as HTMLVideoElement;
        if (canvas.width !== videoEl.videoWidth || canvas.height !== videoEl.videoHeight) {
          canvas.width = videoEl.videoWidth;
          canvas.height = videoEl.videoHeight;
        }
      } else if ('width' in image && 'height' in image) {
        const imgEl = image as { width: number; height: number };
        if (canvas.width !== imgEl.width || canvas.height !== imgEl.height) {
          canvas.width = imgEl.width;
          canvas.height = imgEl.height;
        }
      }
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render using cached results
    renderCachedResults(ctx, canvas);

    // ===== PERFORMANCE: Debounced state update =====
    const now = performance.now();
    const hasFaces = results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0;
    if (now - lastStateUpdateRef.current > STATE_UPDATE_DEBOUNCE_MS) {
      setIsFaceDetected(hasFaces);
      lastStateUpdateRef.current = now;
    }

    ctx.restore();
  }, [renderCachedResults]);

  // Initialize FaceMesh based on sticker
  useEffect(() => {
    const init = async () => {
      try {
        if (!isMountedRef.current) return;

        // Cancel any stale animation loop from a previous sticker change
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
          requestRef.current = null;
        }

        // Initialize FaceMesh
        {
          if (!faceMeshRef.current) {
            let attempts = 0;
            while (!(window as any).FaceMesh && attempts < 100) {
              await new Promise(r => setTimeout(r, 100));
              attempts++;
            }

            if ((window as any).FaceMesh) {
              const FaceMeshClass = (window as any).FaceMesh;
              const faceMesh = new FaceMeshClass({
                locateFile: (file: string) => {
                  // Pinned to match the installed npm version (and the Script
                  // tag in CameraBooth.tsx) so face_mesh.js never fetches
                  // wasm/binarypb assets from a different, incompatible release.
                  return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/${file}`;
                },
              });

              // 🔥 PERFORMANCE: Optimized settings
              faceMesh.setOptions({
                maxNumFaces: 6,
                refineLandmarks: false,  // 🔥 DISABLED: Reduces landmarks from 478 to 468
                minDetectionConfidence: 0.4,  // Slightly lower for speed
                minTrackingConfidence: 0.4,   // Slightly lower for speed
              });

              faceMesh.onResults((results: any) => {
                if (isMountedRef.current) onResults(results);
              });

              faceMeshRef.current = faceMesh;
              console.log("✅ FaceMesh initialized (optimized mode - refineLandmarks: false)");
            } else {
              console.error(
                `❌ FaceMesh failed to load after ${attempts * 100}ms — window.FaceMesh was never defined. ` +
                "Stickers will not render. Check that the MediaPipe <Script> tag in CameraBooth.tsx " +
                "actually loaded (Network tab / ad blockers / offline CDN access)."
              );
            }
          }
        }

        // ===== PERFORMANCE: Optimized detection loop with frame skipping =====
        const loop = async () => {
          if (!isMountedRef.current) return;

          const now = performance.now();
          const dynamicFrameInterval = 1000 / currentFPSRef.current;
          const elapsed = now - lastFrameTimeRef.current;
          const video = videoRef.current;
          const canvas = canvasRef.current;

          if (video && video.readyState >= 2 && canvas) {
            // Ensure canvas matches video dimensions
            if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
            }

            if (stickerRef.current !== 'none') {
              frameCountRef.current++;

              // 🔥 PERFORMANCE: Only run ML detection every N frames
              const shouldRunDetection = frameCountRef.current % DETECTION_SKIP_FRAMES === 0;

              if (elapsed >= dynamicFrameInterval) {
                lastFrameTimeRef.current = now;

                if (shouldRunDetection) {
                  try {
                    // Route to correct detector
                    if (faceMeshRef.current) {
                      await faceMeshRef.current.send({ image: video });
                    } else {
                      console.warn("⚠️ Sticker selected but FaceMesh never finished loading (window.FaceMesh was unavailable).");
                    }
                  } catch (err) {
                    console.error("FaceMesh detection frame failed:", err);
                  }
                } else if (RENDER_EVERY_FRAME && cachedResultsRef.current) {
                  // 🔥 PERFORMANCE: Render cached results on skipped frames
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    ctx.save();
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    renderCachedResults(ctx, canvas);
                    ctx.restore();
                  }
                }
              }
            }
          }

          requestRef.current = requestAnimationFrame(loop);
        };

        loop();

      } catch (e) {
        console.error("Initialization failed", e);
      }
    };

    init();

    return () => {
    };
  }, [videoRef, onResults, currentSticker, renderCachedResults]);

  // Cleanup on unmount only
  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (faceMeshRef.current) {
        faceMeshRef.current.close();
        faceMeshRef.current = null;
      }
    };
  }, []);

  return {
    canvasRef,
    isFaceDetected
  };
};
