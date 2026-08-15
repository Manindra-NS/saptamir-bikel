import Image from "next/image";

export default function TitleMark() {
  return (
    <div className="title-flicker relative -mt-8 w-[min(90vw,520px)] sm:-mt-4">
      <Image
        src="/title/saptamir-bikel.png"
        alt="সপ্তমীর বিকেল — Saptami evening"
        width={1690}
        height={946}
        priority
        className="self-start w-full drop-shadow-[0_0_28px_rgba(242,169,59,0.35)]"
      />
    </div>
  );
}
