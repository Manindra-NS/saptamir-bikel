type TransportControlsProps = {
  isPlaying: boolean;
  onPrev: () => void;
  onPlayPause: () => void;
  onNext: () => void;
  playButtonSize?: number;
};

export default function TransportControls({
  isPlaying,
  onPrev,
  onPlayPause,
  onNext,
  playButtonSize = 40,
}: TransportControlsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Previous track"
        onClick={onPrev}
        className="flex h-11 w-11 items-center justify-center rounded-full text-cream/80 transition hover:text-cream active:scale-95"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M6 6h2v12H6zm3.5 6 9-6v12z" />
        </svg>
      </button>

      <button
        type="button"
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={onPlayPause}
        className="flex items-center justify-center rounded-full bg-gradient-to-b from-marigold to-rose text-ink-deep shadow-[0_6px_16px_-4px_rgba(232,130,60,0.65)] ring-1 ring-white/25 transition active:scale-95"
        style={{ width: playButtonSize, height: playButtonSize }}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <button
        type="button"
        aria-label="Next track"
        onClick={onNext}
        className="flex h-11 w-11 items-center justify-center rounded-full text-cream/80 transition hover:text-cream active:scale-95"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M16 6h2v12h-2zM4.5 6l9 6-9 6z" />
        </svg>
      </button>
    </div>
  );
}
