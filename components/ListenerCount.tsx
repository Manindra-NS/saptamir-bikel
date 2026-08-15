"use client";

import { useEffect, useState } from "react";

// Ambient/decorative only — a gently drifting number, not a real backend
// count. Wire this up to actual analytics later if you want a true count.
export default function ListenerCount() {
  const [count, setCount] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => Math.max(60, c + Math.round((Math.random() - 0.5) * 6)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="flex items-center gap-1.5 font-bengali text-[13px] text-cream/80">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_2px_rgba(225,92,92,0.7)]" />
      <span className="tabular-nums">{count}</span> Online
    </span>
  );
}
