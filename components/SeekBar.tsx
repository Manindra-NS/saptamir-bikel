"use client";

import { useCallback, useRef, useState } from "react";

type SeekBarProps = {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  className?: string;
};

export default function SeekBar({ currentTime, duration, onSeek, className }: SeekBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragRatio, setDragRatio] = useState(0);

  const ratioFromEvent = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      const ratio = ratioFromEvent(e.clientX);
      setIsDragging(true);
      setDragRatio(ratio);
      if (duration > 0) onSeek(ratio * duration);
    },
    [ratioFromEvent, duration, onSeek]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const ratio = ratioFromEvent(e.clientX);
      setDragRatio(ratio);
      if (duration > 0) onSeek(ratio * duration);
    },
    [isDragging, ratioFromEvent, duration, onSeek]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  }, []);

  const progressRatio = duration > 0 ? currentTime / duration : 0;
  const displayRatio = isDragging ? dragRatio : progressRatio;

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={duration || 0}
      aria-valuenow={currentTime}
      className={`group relative flex h-6 w-full touch-none items-center ${className ?? ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="relative h-[3px] w-full rounded-full bg-white/15">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-amber shadow-[0_0_10px_2px_rgba(242,169,59,0.55)]"
          style={{ width: `${displayRatio * 100}%` }}
        />
        <div
          className="absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-cream opacity-0 shadow-[0_0_0_3px_rgba(245,235,216,0.25)] transition-opacity duration-150 group-hover:opacity-100"
          style={{ left: `${displayRatio * 100}%` }}
        />
      </div>
    </div>
  );
}
