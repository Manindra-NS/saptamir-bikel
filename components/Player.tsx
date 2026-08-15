"use client";

import { useMemo, useState, useCallback } from "react";
import { track as trackAnalyticsEvent } from "@vercel/analytics";
import { playlists as allPlaylists } from "@/lib/tracks";
import { formatTime } from "@/lib/format";
import { useYouTubePlayer } from "@/lib/useYouTubePlayer";
import { useMediaQuery } from "@/lib/useMediaQuery";
import VinylArt from "./VinylArt";
import SeekBar from "./SeekBar";
import TransportControls from "./TransportControls";
import PlaylistSwitcher from "./PlaylistSwitcher";

const YT_CONTAINER_ID = "saptamir-bikel-yt-player";

export default function Player() {
  const [playlistId, setPlaylistId] = useState(allPlaylists[0].id);
  const [trackIndex, setTrackIndex] = useState(0);

  const playlist = useMemo(
    () => allPlaylists.find((p) => p.id === playlistId) ?? allPlaylists[0],
    [playlistId]
  );
  const currentTrack = playlist.tracks[trackIndex];

  const goToNext = useCallback(() => {
    setTrackIndex((i) => (i + 1) % playlist.tracks.length);
  }, [playlist.tracks.length]);

  const goToPrev = useCallback(() => {
    setTrackIndex((i) => (i - 1 + playlist.tracks.length) % playlist.tracks.length);
  }, [playlist.tracks.length]);

  const handleEnded = useCallback(() => {
    goToNext();
  }, [goToNext]);

  // Videos get taken down or have embedding switched off after this ships.
  // Rather than stall on a dead track, log it and move the listener along.
  const handleError = useCallback(
    (errorCode: number, videoId: string) => {
      trackAnalyticsEvent("youtube_player_error", { code: errorCode, videoId });
      goToNext();
    },
    [goToNext]
  );

  const player = useYouTubePlayer({
    containerId: YT_CONTAINER_ID,
    videoId: currentTrack.videoId,
    onEnded: handleEnded,
    onError: handleError,
  });

  // Tailwind's `sm` breakpoint, kept in one place so it can't drift from
  // the className below.
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const handleSelectPlaylist = useCallback((id: string) => {
    setPlaylistId(id);
    setTrackIndex(0);
  }, []);

  const handlePlayPause = useCallback(() => {
    if (!currentTrack.videoId) return;
    if (player.isPlaying) player.pause();
    else player.play();
  }, [player, currentTrack.videoId]);

  const hasVideo = Boolean(currentTrack.videoId);
  const duration = player.duration || currentTrack.duration;

  // Only one layout is ever mounted at a time — see lib/useMediaQuery.ts.
  // Two full DOM copies of the vinyl slot would mean two elements sharing
  // YT_CONTAINER_ID, and the YouTube player would only ever attach to
  // whichever one React happened to mount into first, leaving the other
  // breakpoint's "player" as an empty, dead div.
  //
  // isDesktop is null for one tick before mount (matchMedia needs the
  // window). We render the desktop shell in that tick purely so the page
  // doesn't flash empty — it settles to the right layout immediately
  // after, before the YouTube API has even finished loading.
  const showDesktop = isDesktop ?? true;

  return (
    <div className="w-full max-w-xl px-4">
      {showDesktop ? (
        // Desktop — single horizontal pill
        <div className="flex items-center gap-4 rounded-full border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] p-3 pr-5 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-3xl backdrop-saturate-[1.7]">
          <VinylArt containerId={YT_CONTAINER_ID} isPlaying={player.isPlaying} size={80} />

          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold text-cream">
              {hasVideo ? currentTrack.title : "No video added to this slot yet"}
            </p>
            <p className="truncate text-[12.5px] text-cream/70">
              {currentTrack.artist}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <SeekBar
                currentTime={player.currentTime}
                duration={duration}
                onSeek={player.seekTo}
                className="flex-1"
              />
            </div>
            <div className="mt-0.5 flex items-center justify-between">
              <span className="font-sans text-[10.5px] tabular-nums text-cream/50">
                {formatTime(player.currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          <TransportControls
            isPlaying={player.isPlaying}
            onPrev={goToPrev}
            onPlayPause={handlePlayPause}
            onNext={goToNext}
          />
        </div>
      ) : (
        // Mobile — stacked card
        <div className="flex flex-col gap-3 rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] p-4 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-3xl backdrop-saturate-[1.7]">
          <div className="flex items-center gap-3">
            <VinylArt containerId={YT_CONTAINER_ID} isPlaying={player.isPlaying} size={64} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold text-cream">
                {hasVideo ? currentTrack.title : "No video added to this slot yet"}
              </p>
              <p className="truncate text-[12.5px] text-cream/70">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          <SeekBar currentTime={player.currentTime} duration={duration} onSeek={player.seekTo} />

          <div className="flex items-center justify-between">
            <span className="font-sans text-[10.5px] tabular-nums text-cream/50">
              {formatTime(player.currentTime)} / {formatTime(duration)}
            </span>
            <TransportControls
              isPlaying={player.isPlaying}
              onPrev={goToPrev}
              onPlayPause={handlePlayPause}
              onNext={goToNext}
              playButtonSize={52}
            />
            <span className="w-[10.5px]" aria-hidden />
          </div>

          <PlaylistSwitcher
            playlists={allPlaylists}
            activeId={playlistId}
            onSelect={handleSelectPlaylist}
            className="justify-center"
          />
        </div>
      )}
    </div>
  );
}
