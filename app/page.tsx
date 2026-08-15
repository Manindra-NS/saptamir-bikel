import HeroBackground from "@/components/HeroBackground";
import GrainOverlay from "@/components/GrainOverlay";
import TopBar from "@/components/TopBar";
import TitleMark from "@/components/TitleMark";
import Player from "@/components/Player";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      <HeroBackground />
      <GrainOverlay />
      <TopBar />

      <div className="flex flex-1 items-center justify-center">
        <TitleMark />
      </div>

      <div className="safe-b mb-15 flex w-full justify-center">
        <Player />
      </div>
    </main>
  );
}
