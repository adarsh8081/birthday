"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

import GalleryGrid from "@/components/media/GalleryGrid";
import SmartImage from "@/components/media/SmartImage";
import VideoGrid from "@/components/media/VideoGrid";
import SectionReveal from "@/components/ui/SectionReveal";
import { galleryItems, videoItems } from "@/lib/content";

export default function CollectionPage() {
  const heroImages = galleryItems.slice(44, 48);

  return (
    <main className="relative overflow-x-hidden px-4 pb-20 pt-28 md:px-8 lg:px-10">
      <section className="section-shell relative overflow-hidden px-6 py-10 md:px-10 md:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,219,203,0.5),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(242,169,193,0.18),transparent_22%)]" />
        <div className="relative grid gap-8 xl:grid-cols-[1fr_30rem] xl:items-center">
          <SectionReveal className="max-w-3xl">
            <p className="eyebrow">Collection of love</p>
            <h1 className="display-title mt-5 text-[clamp(3.6rem,9vw,7rem)]">
              Every frame,
              <br />
              every reel,
              <br />
              one full archive.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6a5560]">
              This is the complete memory room: all the photos, all the moving clips, and a calmer
              way to stay with the day for as long as you want.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-3 rounded-full bg-[#2f1f27] px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-white shadow-[0_18px_45px_rgba(47,31,39,0.18)] transition duration-300 hover:-translate-y-0.5"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to the celebration
              </Link>
              <a
                href="#archive"
                className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/84 px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-[#3a2630] shadow-[0_18px_45px_rgba(91,60,72,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Jump to photos
              </a>
            </div>
          </SectionReveal>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroImages.map((item, index) => (
              <motion.div
                key={item.id}
                className="glass-panel relative h-[14rem] overflow-hidden"
                initial={{ opacity: 0, y: 24, rotate: index % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
              >
                <SmartImage
                  src={item.src}
                  alt={item.alt}
                  containerClassName="absolute inset-0"
                  sizes="(min-width: 1280px) 18vw, 44vw"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="archive" className="pt-8">
        <div className="section-shell overflow-hidden px-6 py-8 md:px-10 md:py-10">
          <SectionReveal className="max-w-3xl">
            <p className="eyebrow">Photo archive</p>
            <h2 className="display-title mt-5 text-5xl md:text-7xl">
              A wall of birthday stills.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#6c5561]">
              Tap any frame to open it larger, then move through the rest with the keyboard or the
              on-screen controls.
            </p>
          </SectionReveal>

          <div className="mt-10">
            <GalleryGrid items={galleryItems} variant="archive" />
          </div>
        </div>
      </section>

      <section id="reels" className="pt-8">
        <div className="section-shell overflow-hidden px-6 py-8 md:px-10 md:py-10">
          <VideoGrid
            items={videoItems}
            heading="Then the archive shifts into motion."
            subheading="The full reel shelf stays here, still staged like a screening room so the page keeps its cinematic rhythm even when you browse every clip."
          />
        </div>
      </section>

      <section className="pt-8">
        <motion.div
          className="section-shell relative overflow-hidden px-6 py-12 text-center md:px-10 md:py-14"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,236,203,0.5),transparent_35%),radial-gradient(circle_at_50%_0%,rgba(242,165,189,0.2),transparent_26%)]" />
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#efafc3] bg-white/70 text-[#ee8dad] shadow-[0_14px_35px_rgba(242,143,169,0.16)]">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="display-title text-[clamp(3rem,7vw,5.4rem)]">
              The whole archive stays warm,
              <br />
              bright, and easy to return to.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-[#6d5661]">
              Stay here as long as you want, then jump back into the main birthday experience
              whenever it feels right.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-3 rounded-full bg-[#2f1f27] px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-white shadow-[0_18px_45px_rgba(47,31,39,0.2)] transition duration-300 hover:-translate-y-0.5"
              >
                Return home
              </Link>
              <button
                type="button"
                className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/84 px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-[#3a2630] shadow-[0_18px_45px_rgba(91,60,72,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Back to top
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
