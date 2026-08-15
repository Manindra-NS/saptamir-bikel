"use client";

import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

type PlaybackStatus = "idle" | "cued" | "playing" | "paused" | "ended";

type UseYouTubePlayerArgs = {
  containerId: string;
  videoId: string;
  onEnded: () => void;
  onError: (errorCode: number, videoId: string) => void;
};

// Loads the YouTube IFrame API once per page and hands back a small
// imperative surface (play/pause/seekTo) plus reactive playback state.
// The player instance itself lives for the life of the page — switching
// tracks calls cueVideoById rather than tearing down and recreating it,
// which is what keeps the visible iframe from flashing blank on skip.
export function useYouTubePlayer({
  containerId,
  videoId,
  onEnded,
  onError,
}: UseYouTubePlayerArgs) {
  const playerRef = useRef<any>(null);
  const lastLoadedId = useRef<string>("");
  const wasPlayingRef = useRef(false);
  const [isApiReady, setIsApiReady] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const onEndedRef = useRef(onEnded);
  const onErrorRef = useRef(onError);
  onEndedRef.current = onEnded;
  onErrorRef.current = onError;

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setIsApiReady(true);
      return;
    }
    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      setIsApiReady(true);
    };
  }, []);

  useEffect(() => {
    if (!isApiReady || playerRef.current) return;
    playerRef.current = new window.YT.Player(containerId, {
      playerVars: {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        disablekb: 1,
      },
      events: {
        onReady: () => setIsPlayerReady(true),
        onStateChange: (event: any) => {
          const State = window.YT.PlayerState;
          if (event.data === State.PLAYING) {
            setStatus("playing");
            wasPlayingRef.current = true;
            setDuration(playerRef.current.getDuration() || 0);
          } else if (event.data === State.PAUSED) {
            setStatus("paused");
            wasPlayingRef.current = false;
          } else if (event.data === State.ENDED) {
            setStatus("ended");
            onEndedRef.current();
          } else if (event.data === State.CUED) {
            setStatus("cued");
          }
        },
        onError: (event: any) => {
          onErrorRef.current(event.data, lastLoadedId.current);
        },
      },
    });
  }, [isApiReady, containerId]);

 useEffect(() => {
  if (!isPlayerReady || !videoId || videoId === lastLoadedId.current) return;
  lastLoadedId.current = videoId;
  setCurrentTime(0);
  if (wasPlayingRef.current) {
    playerRef.current?.loadVideoById?.(videoId);
    setStatus("playing");
  } else {
    playerRef.current?.cueVideoById?.(videoId);
    setStatus("cued");
  }
}, [videoId, isPlayerReady]);

  useEffect(() => {
    if (status !== "playing") return;
    const interval = setInterval(() => {
      const time = playerRef.current?.getCurrentTime?.();
      if (typeof time === "number") setCurrentTime(time);
    }, 250);
    return () => clearInterval(interval);
  }, [status]);

  const play = useCallback(() => {
    // Calling playVideo on user gesture works even before onReady has
    // fully settled — never gate this behind a readiness/canplay check,
    // iOS Safari will not fire one before the gesture and the button
    // would stay permanently dead.
    playerRef.current?.playVideo?.();
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo?.();
  }, []);

  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo?.(seconds, true);
    setCurrentTime(seconds);
  }, []);

  return {
    status,
    isPlaying: status === "playing",
    currentTime,
    duration,
    play,
    pause,
    seekTo,
  };
}
