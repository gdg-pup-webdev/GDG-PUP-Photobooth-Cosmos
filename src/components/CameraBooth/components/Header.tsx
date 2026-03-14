import { colors, FILTERS } from "../../ui";
import type { CameraDevice } from "../hooks/useCamera";

interface HeaderProps {
  currentFilter: string;
  currentShotIndex: number;
  onFilterClick: () => void;
  cameras: CameraDevice[];
  currentCameraId: string;
  onCameraChange: (deviceId: string) => void;
  cameraError: string | null;
  cameraDisabled?: boolean;
}

/**
 * Header Component
 * Cosmos branding header with event title and filter preview
 */
export default function Header({
  currentFilter,
  currentShotIndex,
  onFilterClick,
  cameras,
  currentCameraId,
  onCameraChange,
  cameraError,
  cameraDisabled = false,
}: HeaderProps) {
  const currentFilterObj =
    FILTERS.find((f) => f.value === currentFilter) || FILTERS[0];

  return (
    <>
      {/* Header — Cosmos branding */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: "rgba(180,210,255,0.55)" }}
          >
            COSMOS 2026 · GDG on Campus PUP
          </span>
        </div>

        {/* Cosmos logo */}
        <img
          src="/photobooth/photobooth-cosmos-logo.png"
          alt="GDG PUP Photobooth — Cosmos"
          className="h-16 md:h-20 w-auto object-contain mb-3"
        />

        <p
          className="flex items-center gap-2"
          style={{ color: "rgba(180,210,255,0.55)", fontSize: "0.82rem" }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: colors.cyan }}
          />
          Shot {Math.min(currentShotIndex + 1, 3)} of 3
        </p>
      </div>

      {/* Quick Filter Preview */}
      <div
        className="p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01]"
        style={{
          background: "rgba(87,202,255,0.04)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(87,202,255,0.14)",
        }}
        onClick={onFilterClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full overflow-hidden"
              style={{
                border: `2px solid ${currentFilterObj.color}`,
                boxShadow: `0 0 12px ${currentFilterObj.color}50`,
              }}
            >
              <img
                src="/sparky.webp"
                alt="Filter preview"
                className="w-full h-full object-cover"
                style={{ filter: currentFilter || "none" }}
              />
            </div>
            <div>
              <div className="text-white font-bold">
                {currentFilterObj.name}
              </div>
              <div className="text-zinc-500 text-sm">Current filter</div>
            </div>
          </div>
          <div
            className="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${colors.cyan}25, ${colors.blue}25)`,
              color: colors.cyan,
            }}
          >
            Change
          </div>
        </div>
      </div>

      <div
        className="p-5 rounded-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <div className="text-white font-bold">Camera source</div>
            <div className="text-zinc-500 text-sm">
              Switch to another connected camera
            </div>
          </div>
          <div
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: "rgba(87,202,255,0.12)",
              color: colors.cyan,
            }}
          >
            {Math.max(cameras.length, 1)} available
          </div>
        </div>

        <div className="relative">
          <select
            value={currentCameraId}
            onChange={(event) => onCameraChange(event.target.value)}
            disabled={cameraDisabled || cameras.length <= 1}
            className="w-full appearance-none rounded-xl px-4 py-3 pr-14 text-sm font-medium outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              background: "rgba(15, 23, 42, 0.9)",
              color: "white",
              border: "1px solid rgba(87,202,255,0.18)",
            }}
          >
            {cameras.length === 0 && (
              <option value="">Detecting cameras...</option>
            )}
            {cameras.map((camera) => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label}
              </option>
            ))}
          </select>

          <svg
            className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 8l4 4 4-4"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {cameraDisabled && (
          <p
            className="text-xs mt-3"
            style={{ color: "rgba(180,210,255,0.55)" }}
          >
            Camera switching is locked while the countdown is running.
          </p>
        )}

        {cameraError && (
          <p className="text-sm mt-3" style={{ color: "#fda4af" }}>
            {cameraError}
          </p>
        )}
      </div>
    </>
  );
}
