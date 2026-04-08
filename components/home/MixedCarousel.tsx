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
  { type: "image", data: galleryItems[15] },
  { type: "video", data: videoItems[5] },
  { type: "message", text: "Every quiet moment shared is a memory I never want to lose." },
  { type: "image", data: galleryItems[20] },
  { type: "image", data: galleryItems[25] },
  { type: "video", data: videoItems[6] },
  { type: "message", text: "A single smile from you changes the entire day." },
  { type: "image", data: galleryItems[30] },
  { type: "image", data: galleryItems[35] },
  { type: "video", data: videoItems[7] },
  { type: "message", text: "Even in the simplest moments, you are extraordinary." },
  { type: "image", data: galleryItems[40] },
  { type: "video", data: videoItems[10] },
  { type: "image", data: galleryItems[45] },
];

export default function MixedCarousel() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // When the top of the container hits the top of the viewport
    // until the bottom of the container hits the bottom of the viewport
    offset: ["start start", "end end"],
  });

  // Moves the content container the full distance required to see the end of the cards
  // By using percentages with CSS calc, we can perfectly offset the scroll.
  // We translate left by 100% of the flex row, then back right by 100vw so the last card aligns with the viewport right edge.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]);

  return (
    // The wrapper height determines how long the sticky effect lasts. 600vh = 6 screen heights to slow it down for more items.
    <section 
      ref={targetRef} 
      className="relative h-[600vh]" 
      style={{
        background: "var(--bg)", 
        borderTop: "1px solid rgba(244,143,177,0.15)",
        borderBottom: "1px solid rgba(244,143,177,0.15)"
      }}
    >
      {/* Sticky box pins to viewport */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(244,143,177,0.06),transparent_60%)]" />

        <motion.div 
          style={{ x }} 
          className="relative z-10 flex w-max items-center gap-6 px-10 md:gap-10 md:px-20"
        >
          {/* Introductory block inside the horizontal scroll */}
          <div className="flex h-64 w-[80vw] shrink-0 flex-col items-center justify-center rounded-[2rem] p-8 text-center md:h-80 md:w-[40vw]">
            <p className="eyebrow">A mixed tape</p>
            <h2 className="display-title mt-4 text-4xl text-[#1f141a] md:text-5xl dark:text-[#fff8f0]">
              Snippets of laughter, light, and letters
            </h2>
            <p className="mt-4 text-[#8b6b77]">Keep scrolling to explore</p>
          </div>

          {mixedItems.map((item, idx) => (
            <div key={`mix-${idx}`} className="shrink-0">
              <CarouselItem item={item} />
            </div>
          ))}

          {/* Symmetrical padding at the end */}
          <div className="w-[10vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}

function CarouselItem({ item }: { item: any }) {
  if (item.type === "message") {
    return (
      <div className="flex h-[26rem] w-[22rem] items-center justify-center rounded-[2.5rem] border border-white/10 bg-[#1f141a] p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:h-[36rem] md:w-[30rem]">
        <p 
          className="font-serif text-3xl italic leading-snug text-[rgba(255,248,240,0.85)] md:text-5xl"
        >
          "{item.text}"
        </p>
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <div className="relative h-[26rem] w-[22rem] overflow-hidden rounded-[2.5rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:h-[36rem] md:w-[28rem]">
        <video 
          src={item.data.src} 
          poster={item.data.poster}
          className="h-full w-full object-cover opacity-85"
          muted 
          loop 
          autoPlay 
          playsInline 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative h-[26rem] w-[22rem] overflow-hidden rounded-[2.5rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:h-[36rem] md:w-[28rem]">
      <SmartImage 
        src={item.data.src} 
        alt={item.data.alt} 
        containerClassName="absolute inset-0"
        sizes="(min-width: 768px) 450px, 350px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}
