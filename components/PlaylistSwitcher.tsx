import type { Playlist } from "@/lib/tracks";

type PlaylistSwitcherProps = {
  playlists: Playlist[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
};

export default function PlaylistSwitcher({
  playlists,
  activeId,
  onSelect,
  className,
}: PlaylistSwitcherProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className ?? ""}`}>
      {playlists.map((playlist) => {
        const isActive = playlist.id === activeId;
        return (
          <button
            key={playlist.id}
            type="button"
            onClick={() => onSelect(playlist.id)}
            className={`rounded-full px-3 py-1 font-bengali text-[12px] transition ${
              isActive
                ? "bg-amber/20 text-amber ring-1 ring-amber/40"
                : "text-cream/50 hover:text-cream/80"
            }`}
          >
          </button>
        );
      })}
    </div>
  );
}
