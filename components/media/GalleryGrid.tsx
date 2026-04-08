"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import SmartImage from "@/components/media/SmartImage";
import type { GalleryItem } from "@/lib/content";
import { cn } from "@/lib/utils";

type GalleryGridProps = {
  items: GalleryItem[];
  variant?: "mosaic" | "archive";
  className?: string;
};

const mosaicPattern = [
  "md:col-span-2 md:row-span-2",
  "",
  "",
  "md:row-span-2",
  "",
  "md:col-span-2",
  "",
  "",
];

export default function GalleryGrid({
  items,
  variant = "mosaic",
  className,
}: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const visibleItems = useMemo(() => {
    if (variant === "mosaic") {
      return items.slice(0, 8);
    }

    return items;
  }, [items, variant]);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((current) =>
          current === null ? 0 : (current + 1) % visibleItems.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === null ? 0 : (current - 1 + visibleItems.length) % visibleItems.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, visibleItems.length]);

  const activeItem = selectedIndex === null ? null : visibleItems[selectedIndex];

  return (
    <>
      <div
        className={cn(
          "grid gap-4 md:grid-cols-3 lg:gap-5",
          variant === "mosaic" ? "auto-rows-[17rem] md:auto-rows-[15rem]" : "auto-rows-[17rem] lg:grid-cols-4",
          className,
        )}
      >
        {visibleItems.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            data-testid={`gallery-card-${item.id}`}
            className={cn(
              "group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 text-left shadow-[0_18px_50px_rgba(93,62,76,0.1)] backdrop-blur-xl",
              variant === "mosaic" ? mosaicPattern[index % mosaicPattern.length] : "",
            )}
            initial={{ opacity: 0, y: 36, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10, scale: 1.01 }}
            onClick={() => setSelectedIndex(index)}
            aria-label={`Open photo ${item.id}`}
          >
            <SmartImage
              src={item.src}
              alt={item.alt}
              priority={index < 2 && variant === "mosaic"}
              containerClassName="absolute inset-0"
              className="transition duration-700 group-hover:scale-[1.05]"
              sizes={
                variant === "mosaic"
                  ? "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 92vw"
                  : "(min-width: 1280px) 21vw, (min-width: 768px) 30vw, 94vw"
              }
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,22,30,0.06),rgba(37,22,30,0.65))]" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.38em] text-white/70">
                {item.date ?? "Birthday frame"}
              </p>
              <p className="mt-2 text-lg font-medium leading-snug md:text-xl">{item.caption}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(24,13,19,0.7)] px-4 py-8 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-6xl rounded-[2.2rem] border border-white/20 bg-[rgba(16,10,14,0.58)] p-3 text-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <button
                type="button"
                aria-label="Close lightbox"
                className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/15"
                onClick={() => setSelectedIndex(null)}
              >
                <X className="h-4 w-4" />
              </button>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_19rem]">
                <div className="relative min-h-[28rem] overflow-hidden rounded-[1.8rem] bg-black/20">
                  <SmartImage
                    src={activeItem.src}
                    alt={activeItem.alt}
                    containerClassName="absolute inset-0"
                    className="object-contain"
                    sizes="(min-width: 1280px) 68vw, 94vw"
                    priority
                  />
                </div>

                <div className="flex flex-col justify-between rounded-[1.8rem] border border-white/10 bg-white/8 p-6">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-white/55">
                      {activeItem.date ?? "Memory still"}
                    </p>
                    <h3 className="mt-4 font-serif text-4xl leading-none text-white">
                      {activeItem.caption}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-white/75">{activeItem.alt}</p>
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                    <button
                      type="button"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/15"
                      onClick={() =>
                        setSelectedIndex(
                          (selectedIndex - 1 + visibleItems.length) % visibleItems.length,
                        )
                      }
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/15"
                      onClick={() => setSelectedIndex((selectedIndex + 1) % visibleItems.length)}
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
