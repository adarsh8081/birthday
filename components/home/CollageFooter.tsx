"use client";

import { motion } from "framer-motion";
import SmartImage from "@/components/media/SmartImage";
import { galleryItems } from "@/lib/content";
import { cn } from "@/lib/utils";

// Generate a random mosaic pattern class for each image to make the collage organic
function getRandomColSpan() {
  const spans = ["col-span-2", "col-span-3", "col-span-4"];
  return spans[Math.floor(Math.random() * spans.length)];
}

function getRandomRowSpan() {
  const spans = ["row-span-2", "row-span-3", "row-span-4"];
  return spans[Math.floor(Math.random() * spans.length)];
}

export default function CollageFooter() {
  // Use all 48 photos
  const items = galleryItems;

  return (
    <section className="relative w-full overflow-hidden bg-[#120a0e] pt-24 pb-48">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-[#120a0e] to-[#0a0507]" />
      
      {/* Huge subtle typography in the background layer behind the grid fading in */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <h1 className="font-serif text-[clamp(10rem,20vw,30rem)] font-bold italic text-white whitespace-nowrap">
          ISHIKA
        </h1>
      </div>

      <div className="relative z-10 p-2 md:p-4 lg:p-8">
        <motion.div 
          className="grid grid-cols-6 gap-2 md:grid-cols-10 md:gap-3 lg:grid-cols-12 lg:gap-4 auto-rows-[60px] md:auto-rows-[80px]"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {items.map((item, index) => {
            // Assign some deterministically random sizes based on index
            const cspan = index % 7 === 0 ? "col-span-4" : index % 3 === 0 ? "col-span-3" : "col-span-2";
            const rspan = index % 5 === 0 ? "row-span-4" : index % 4 === 0 ? "row-span-3" : "row-span-2";

            return (
              <div 
                key={`footer-col-${item.id}`} 
                className={cn(
                  "relative overflow-hidden rounded-xl md:rounded-2xl opacity-60 transition duration-500 hover:opacity-100 hover:scale-[1.02] hover:z-20 shadow-xl", 
                  cspan, 
                  rspan
                )}
              >
                <SmartImage 
                  src={item.src} 
                  alt={item.alt} 
                  containerClassName="absolute inset-0"
                  sizes="(min-width: 1024px) 15vw, (min-width: 768px) 25vw, 33vw"
                />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Foreground title layered over the dark collage */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex h-full flex-col items-center justify-end bg-gradient-to-t from-[#0a0507] via-[#0a0507]/80 to-transparent pb-32">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.5 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="text-center"
        >
          <p className="eyebrow mb-6 text-white/50">And so the story continues</p>
          <h2 className="display-title text-[clamp(3.5rem,8vw,7rem)] text-[#fff8f0]">
            Happiest Birthday
            <br />
            <span className="italic text-[#f48fb1]">Ishika ❤️</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
