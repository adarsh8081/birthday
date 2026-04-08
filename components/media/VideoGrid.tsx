"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useMemo, useState } from "react";

import SmartImage from "@/components/media/SmartImage";
import type { VideoItem } from "@/lib/content";
import { cn } from "@/lib/utils";

type VideoGridProps = {
  items: VideoItem[];
  className?: string;
  heading?: string;
  subheading?: string;
};

export default function VideoGrid({
  items,
  className,
  heading = "A screening room for the moving moments",
  subheading = "Tap into the clips one by one. The main stage changes focus while the surrounding reel shelf keeps the whole mood in motion.",
}: VideoGridProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const selected = items[selectedIndex];

  const goNext = () => {
    setSelectedIndex((i) => (i + 1) % items.length);
    setPlaying(false);
  };
  const goPrev = () => {
    setSelectedIndex((i) => (i - 1 + items.length) % items.length);
    setPlaying(false);
  };

  return (
    <div className={cn("space-y-10", className)}>
      <div className="max-w-3xl">
        <p className="eyebrow">Video moments</p>
        <h2 className="display-title mt-5 text-5xl md:text-6xl">{heading}</h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6d5661]">{subheading}</p>
      </div>

      <div className="mx-auto max-w-5xl">
        <motion.div
          className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-[#1f141a] p-3 shadow-[0_30px_80px_rgba(55,27,39,0.22)]"
          initial={{ opacity: 0, y: 38 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,213,226,0.22),transparent_55%)]" />
          <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_17rem]">
            <div className="relative min-h-[26rem] overflow-hidden rounded-[2rem] border border-white/12 bg-black/35 md:min-h-[34rem]">
              {!playing ? (
                <>
                  <SmartImage
                    src={selected.poster || selected.src}
                    alt={selected.title}
                    containerClassName="absolute inset-0"
                    className="opacity-85"
                    sizes="(min-width: 1280px) 56vw, 96vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,7,11,0.16),rgba(15,7,11,0.7))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <h3 className="mt-2 max-w-3xl font-serif text-4xl leading-none text-white md:text-5xl">
                      {selected.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/78">
                      {selected.caption}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Play ${selected.title}`}
                    className="absolute left-6 top-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/90 text-[#2f1f27] shadow-[0_10px_35px_rgba(255,255,255,0.16)] transition hover:scale-105"
                    onClick={() => setPlaying(true)}
                  >
                    <Play className="ml-1 h-6 w-6" />
                  </button>
                </>
              ) : (
                <video
                  key={selected.id}
                  src={selected.src}
                  poster={selected.poster}
                  className="h-full w-full object-cover"
                  controls
                  autoPlay
                  muted={muted}
                  playsInline
                />
              )}

              {/* ── prev / next navigation ── */}
              <button
                type="button"
                aria-label="Previous video"
                className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 hover:scale-110"
                onClick={goPrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next video"
                className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 hover:scale-110"
                onClick={goNext}
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* counter pill */}
              <div className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[0.65rem] font-semibold tabular-nums tracking-wider text-white/70 backdrop-blur-md">
                {selectedIndex + 1} / {items.length}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-[2rem] border border-white/10 bg-white/6 p-4 text-white">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-white/55">
                  Stage controls
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    aria-label={playing ? `Pause ${selected.title}` : `Play ${selected.title}`}
                    className="inline-flex h-12 min-w-[9rem] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 text-sm transition hover:bg-white/15"
                    onClick={() => setPlaying((current) => !current)}
                  >
                    {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {playing ? "Pause" : "Play"}
                  </button>
                  <button
                    type="button"
                    aria-label={muted ? "Unmute video" : "Mute video"}
                    className="inline-flex h-12 min-w-[9rem] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 text-sm transition hover:bg-white/15"
                    onClick={() => setMuted((current) => !current)}
                  >
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    {muted ? "Muted" : "Sound on"}
                  </button>
                </div>
              </div>

              <div className="rounded-[1.7rem] border border-white/10 bg-white/5 p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-white/55">
                  Current scene
                </p>
                <p className="mt-4 font-serif text-3xl leading-none">{selected.title}</p>
                <p className="mt-4 text-sm leading-7 text-white/70">{selected.caption}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
