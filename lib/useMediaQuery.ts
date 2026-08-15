"use client";

import { useEffect, useState } from "react";

// Starts as null (render nothing layout-specific yet) and resolves after
// mount. Used so only ONE of the desktop/mobile player blocks is ever
// actually mounted in the DOM — see the comment in Player.tsx for why
// that matters for the YouTube container id.
export function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
