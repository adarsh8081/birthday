"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import SmartImage from "@/components/media/SmartImage";
import { galleryItems, videoItems, messageBlocks } from "@/lib/content";

// Combine and shuffle some items to create a mixed tape feeling
const mixedItems = [
  { type: "image", data: galleryItems[0] },
  { type: "message", text: "You feel intentional. Carefully created. Gently shaped." },
  { type: "video", data: videoItems[2] },
  { type: "image", data: galleryItems[3] },
  { type: "message", text: "Some feelings aren't meant to be safe—they're meant to be real." },
  { type: "image", data: galleryItems[6] },
  { type: "video", data: videoItems[0] },
  { type: "message", text: "You are, without a doubt, the most beautiful woman I have ever known." },
  { type: "image", data: galleryItems[8] },
  { type: "video", data: videoItems[4] },
  { type: "message", text: "Grace made visible." },
  { type: "image", data: galleryItems[11] },
];

export default function MixedCarousel() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate translation: moves the carousel heavily to the left as you scroll down
  const xLeft = useTransform(scrollYProgress, [0, 1], ["10%", "-50%"]);
  
  // A second track that moves opposite direction for contrast
  const xRight = useTransform(scrollYProgress, [0, 1], ["-50%", "10%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative overflow-hidden py-32 md:py-44" 
      style={{
        background: "var(--bg)", 
        borderTop: "1px solid rgba(244,143,177,0.15)",
        borderBottom: "1px solid rgba(244,143,177,0.15)"
      }}
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(244,143,177,0.06),transparent_60%)]" />

      <div className="mx-auto mb-20 max-w-5xl px-6 text-center">
        <p className="eyebrow">A mixed tape</p>
        <h2 className="display-title mt-4 text-4xl md:text-5xl text-[#fff8f0]">
          Snippets of laughter, light, and letters
        </h2>
      </div>

      <div className="relative z-10 flex flex-col gap-8 md:gap-12">
        {/* Track 1: Moving left */}
        <motion.div 
          className="flex w-max gap-6 px-10 md:gap-10"
          style={{ x: xLeft }}
        >
          {mixedItems.slice(0, 6).map((item, idx) => (
            <CarouselItem key={`row1-${idx}`} item={item} />
          ))}
        </motion.div>

        {/* Track 2: Moving right */}
        <motion.div 
          className="flex w-max gap-6 px-10 md:gap-10"
          style={{ x: xRight }}
        >
          {mixedItems.slice(6, 12).map((item, idx) => (
            <CarouselItem key={`row2-${idx}`} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CarouselItem({ item }: { item: any }) {
  if (item.type === "message") {
    return (
      <div className="flex h-64 w-80 items-center justify-center rounded-[2rem] border border-white/10 bg-[#1f141a] p-8 text-center shadow-2xl md:h-80 md:w-96">
        <p 
          className="font-serif text-2xl italic leading-snug text-[rgba(255,248,240,0.85)] md:text-3xl"
        >
          "{item.text}"
        </p>
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <div className="relative h-64 w-64 overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl md:h-80 md:w-80">
        <video 
          src={item.data.src} 
          poster={item.data.poster}
          className="h-full w-full object-cover opacity-80"
          muted 
          loop 
          autoPlay 
          playsInline 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative h-64 w-64 overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl md:h-80 md:w-80">
      <SmartImage 
        src={item.data.src} 
        alt={item.data.alt} 
        containerClassName="absolute inset-0"
        sizes="(min-width: 768px) 320px, 256px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}
