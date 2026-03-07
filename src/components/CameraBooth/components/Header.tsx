import { colors, FILTERS } from "../../ui";

interface HeaderProps {
  currentFilter: string;
  currentShotIndex: number;
  onFilterClick: () => void;
}

/**
 * Header Component
 * Cosmos branding header with event title and filter preview
 */
export default function Header({
  currentFilter,
  currentShotIndex,
  onFilterClick,
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

        <p className="flex items-center gap-2" style={{ color: "rgba(180,210,255,0.55)", fontSize: "0.82rem" }}>
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
              <div className="text-white font-bold">{currentFilterObj.name}</div>
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
    </>
  );
}
