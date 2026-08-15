type VinylArtProps = {
  containerId: string;
  isPlaying: boolean;
  size: number;
};

// The YouTube iframe renders inside this circular mask at full visible
// opacity and size — never shrunk to 1px or hidden, per YouTube's
// Developer Policies. The circle just crops a normal-sized, normally
// rendered player, which is what keeps the Skip button reachable during
// unskippable ads instead of trapping the listener behind a hidden frame.
export default function VinylArt({ containerId, isPlaying, size }: VinylArtProps) {
  return (
    <div
      className="relative shrink-0 self-start rounded-full ring-2 ring-amber/30 shadow-[0_6px_18px_-4px_rgba(0,0,0,0.6)]"
      style={{ width: size, height: size }}
    >
      <div
        className="vinyl-spin absolute inset-0 overflow-hidden rounded-full bg-ink-deep"
        style={{ animationPlayState: isPlaying ? "running" : "paused" }}
      >
        <div
          id={containerId}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: size * 1.6, height: size * 1.6 }}
        />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40"
        style={{
          width: Math.max(10, size * 0.15),
          height: Math.max(10, size * 0.15),
        }}
      />
    </div>
  );
}
