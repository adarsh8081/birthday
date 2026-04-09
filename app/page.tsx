"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Gift,
  Heart,
  Sparkles,
  Stars,
  Play,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import CandleIntro from "@/components/home/CandleIntro";
import GalleryGrid from "@/components/media/GalleryGrid";
import SmartImage from "@/components/media/SmartImage";
import VideoGrid from "@/components/media/VideoGrid";
import MixedCarousel from "@/components/home/MixedCarousel";
import CollageFooter from "@/components/home/CollageFooter";
import SectionReveal from "@/components/ui/SectionReveal";
import { galleryItems, videoItems, messageBlocks } from "@/lib/content";

const INTRO_STORAGE_KEY = "ishika-birthday-intro";

/* ─── static data ─── */
const sparkles = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 4,
  left: Math.random() * 100,
  delay: Math.random() * 18,
  dur: 14 + Math.random() * 14,
  opa: 0.12 + Math.random() * 0.3,
}));

const confettiColors = ["#f48fb1","#ff8a80","#ffd54f","#e8a598","#ce93d8","#80deea","#a5d6a7"];
const confetti = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 2.5,
  dur: 3 + Math.random() * 4,
  color: confettiColors[i % confettiColors.length],
  size: 5 + Math.random() * 9,
  rot: Math.random() * 360,
}));

const floatingHearts = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: 10 + Math.random() * 80,
  delay: i * 0.9,
  dur: 4 + Math.random() * 3,
}));

/* ─── the personal letter stanzas ─── */
const letterStanzas = [
  {
    text: "I know… we were never meant to be together.\nAnd maybe that's a truth I've slowly learned to accept.\nBut still, allow me this one thing—just this once—\nlet me love you honestly, without holding anything back.",
    highlight: "let me love you honestly",
  },
  {
    text: "In a sky full of endless stars, you have always been my moon.\nThe one my eyes search for without even realizing it.\nThe one my heart recognizes, no matter how far you are.",
    highlight: "you have always been my moon",
  },
  {
    text: "Let me tell you how you became the fire I would walk toward without fear,\nthe warmth I would choose… even knowing it might burn.\nBecause some feelings aren't meant to be safe—\nthey're meant to be real.",
    highlight: "they're meant to be real",
  },
  {
    text: "I know we may never share a name, a future, or a story the world understands.\nBut what existed between us…\nthat quiet spark, that unspoken connection—\nit was never nothing.\nIt grew within me, slowly, deeply… turning into something I couldn't ignore,\nsomething I never wanted to.",
    highlight: "it was never nothing",
  },
  {
    text: "So today, on your special day…\nI don't just want to wish you happiness—\nI want you to feel how special you truly are.",
    highlight: "how special you truly are",
  },
  {
    text: "You are, without a doubt, the most beautiful woman I have ever known.\nNot just in the way you look, but in the way your heart carries warmth,\nin the way you hold love so gently within you.",
    highlight: "the most beautiful woman I have ever known",
  },
  {
    text: "Your dreams… they're big, and they're meant to be.\nAnd I know—truly—that you will achieve every single one of them.\nBecause you are made of strength, of grace, of something rare.",
    highlight: "strength, of grace, of something rare",
  },
  {
    text: "If only you could see yourself through my eyes…\nmaybe then you would understand why I fall silent around you,\nwhy my words disappear but my heart overflows with everything it wants to say.",
    highlight: "my heart overflows",
  },
  {
    text: "If only you could see yourself the way I do…\nyou would understand why I believe in something greater.\nBecause you don't feel like coincidence—\nyou feel intentional.\nCarefully created. Gently shaped.",
    highlight: "you feel intentional",
  },
  {
    text: "You are not an accident.\nYou are grace made visible.",
    highlight: "grace made visible",
    large: true,
  },
  {
    text: "And maybe I won't get to love you the way I once dreamed of…\nbut still, let me love you in this quiet, honest way—\nwithout expectations, without conditions.\n\nEven if it's just for a moment.\nEven if it's just in words like these.",
    highlight: "this quiet, honest way",
  },
  {
    text: "Happy Birthday.\nI hope life gives you everything your heart has ever wished for…\nand more.",
    highlight: "Happy Birthday",
    large: true,
    final: true,
  },
];

/* ═══════════════════════════════════════════
   SPARKLE FIELD
   ═══════════════════════════════════════════ */
function SparkleField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-[var(--accent-rose)]"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.left}%`,
            opacity: s.opa,
            animation: `sparkle-drift ${s.dur}s ${s.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, #f48fb1, #ffd54f, #e8a598, #ce93d8)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════
   WORD-BY-WORD REVEAL
   ═══════════════════════════════════════════ */
function RevealText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-[0.28em] inline-block"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -80]);

  return (
    <section id="hero" ref={ref} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #fff0e5, #fce4ec, #fff8f0, #ffecd2)", backgroundSize: "400% 400%", animation: "gradient-move 15s ease infinite" }} />
      {/* wallpaper banner background */}
      <div className="absolute inset-0" style={{ backgroundImage: "url('/images/Background_Wallpaper.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }} />
      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,213,79,0.14), transparent 60%)" }} />

      <motion.div className="absolute -left-24 top-[12%] h-[380px] w-[380px] rounded-full" style={{ background: "radial-gradient(circle, rgba(244,143,177,0.1), transparent 70%)" }} animate={{ y: [0, -35, 0], x: [0, 18, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute -right-16 top-[22%] h-[280px] w-[280px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,213,79,0.08), transparent 70%)" }} animate={{ y: [0, 28, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-[15%] left-[25%] h-[220px] w-[220px] rounded-full" style={{ background: "radial-gradient(circle, rgba(206,147,216,0.08), transparent 70%)" }} animate={{ y: [0, -20, 0], x: [0, -12, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />

      <motion.div className="relative z-10 flex flex-col items-center px-6 text-center" style={{ opacity, scale, y }}>
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
          A celebration crafted with love
        </motion.p>
        <motion.h1 className="display-title mt-8" style={{ fontSize: "clamp(3.2rem, 11vw, 9rem)" }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          Happy Birthday
        </motion.h1>
        <motion.p className="display-title mt-1" style={{ fontSize: "clamp(4rem, 15vw, 12rem)", fontStyle: "italic", background: "linear-gradient(135deg, #2a1520 30%, #e8a598 60%, #2a1520 90%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "text-shimmer 5s linear infinite" }} initial={{ opacity: 0, scale: 0.82, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          Ishika
        </motion.p>
        <motion.div className="mt-10 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #f48fb1, #ffd54f, #f48fb1, transparent)" }} initial={{ width: 0, opacity: 0 }} animate={{ width: 220, opacity: 1 }} transition={{ duration: 1.4, delay: 1.3 }} />
        <motion.p className="mt-8 max-w-lg text-lg leading-relaxed" style={{ color: "var(--muted)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.6 }}>
          Scroll to unwrap memories, wishes, and a celebration made just for you.
        </motion.p>
      </motion.div>

      <motion.div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
        <span className="text-[0.62rem] uppercase tracking-[0.35em] text-[var(--muted)]">scroll</span>
        <div className="flex h-11 w-[26px] items-start justify-center rounded-full border-2 border-[#c9a3b1] pt-2">
          <motion.div className="h-2 w-2 rounded-full bg-[var(--accent-rose)]" animate={{ y: [0, 16, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   LETTER SECTION — birthday messages
   ═══════════════════════════════════════════ */
function LetterSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="wishes" ref={sectionRef} className="relative overflow-hidden py-32 md:py-44" style={{ background: "linear-gradient(180deg, var(--bg), #fce4ec 40%, #fff0e5 100%)" }}>
      <motion.div className="pointer-events-none absolute right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full" style={{ y: bgY, background: "radial-gradient(circle, rgba(244,143,177,0.12), transparent 65%)" }} />

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div className="mb-24 max-w-3xl" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <p className="eyebrow">Birthday letter</p>
          <h2 className="display-title mt-6" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}>
            <RevealText text="Some words are better felt than rushed." />
          </h2>
          <motion.div className="mt-8 h-[2px] w-24 bg-[var(--accent-rose)]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} style={{ transformOrigin: "left" }} />
        </motion.div>

        <div className="space-y-32">
          {messageBlocks.map((msg, idx) => {
            const imageIdx = (idx * 7 + 3) % galleryItems.length;
            const isEven = idx % 2 === 0;
            return (
              <div key={msg.id} className={`flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                <motion.div className="flex-1" initial={{ opacity: 0, x: isEven ? -60 : 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                  <p className="eyebrow">{msg.eyebrow}</p>
                  <h3 className="display-title mt-5" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>{msg.title}</h3>
                  <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">{msg.body}</p>
                  <div className="mt-8 flex gap-2">
                    {[0, 1, 2].map((d) => (<motion.span key={d} className="h-2 w-2 rounded-full bg-[var(--accent-rose)]" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + d * 0.12 }} />))}
                  </div>
                </motion.div>
                <motion.div className="relative flex-1" initial={{ opacity: 0, x: isEven ? 60 : -60, rotate: isEven ? 3 : -3 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(42,21,32,0.15)]">
                    <SmartImage src={galleryItems[imageIdx]?.src} alt={galleryItems[imageIdx]?.alt ?? "Birthday memory"} containerClassName="absolute inset-0" sizes="(min-width:1024px) 40vw, 88vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(42,21,32,0.35)] to-transparent" />
                  </div>
                  <motion.div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(244,143,177,0.18), rgba(255,213,79,0.12))" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   GALLERY SECTION
   ═══════════════════════════════════════════ */
function GallerySection() {
  const galleryPreview = useMemo(() => galleryItems.slice(0, 12), []);
  return (
    <section id="gallery" className="relative overflow-hidden py-32 md:py-44" style={{ background: "linear-gradient(180deg, #fff0e5, #fef0f5 50%, #fff8f0 100%)" }}>
      <motion.div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(232,165,152,0.15), transparent 65%)" }} animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <motion.div className="mb-16 max-w-3xl" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <p className="eyebrow">Captured moments</p>
          <h2 className="display-title mt-6" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}>
            <RevealText text="Every photo holds a little piece of the day." />
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">Tap any frame to step inside the moment. Navigate with your keyboard or the on-screen controls.</p>
        </motion.div>
        <div className="mt-12"><GalleryGrid items={galleryPreview} variant="mosaic" /></div>
        <span id="collection" className="absolute -top-24" />
        <SectionReveal className="mt-14 flex flex-wrap gap-5" delay={0.15}>
          <Link href="/collection" className="inline-flex items-center gap-3 rounded-full bg-[#2a1520] px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.3em] text-white shadow-[0_20px_50px_rgba(42,21,32,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(42,21,32,0.3)]">
            Open every memory <ArrowUpRight className="h-4 w-4" />
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   VIDEO SECTION — full cinematic screening
   ═══════════════════════════════════════════ */
function VideoSection() {
  return (
    <section id="videos" className="section-dark relative overflow-hidden py-32 md:py-44">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(244,143,177,0.08), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(232,165,152,0.06), transparent 50%)" }} />
      {/* floating glow orbs */}
      <motion.div className="pointer-events-none absolute left-[5%] top-[15%] h-[300px] w-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(244,143,177,0.06), transparent 70%)" }} animate={{ y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="pointer-events-none absolute bottom-[10%] right-[8%] h-[250px] w-[250px] rounded-full" style={{ background: "radial-gradient(circle, rgba(232,165,152,0.05), transparent 70%)" }} animate={{ y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <VideoGrid
          items={videoItems}
          heading="Every clip carries warmth that photographs can't hold."
          subheading="Tap into each moment. The main stage shifts focus while the reel shelf keeps the whole collection within reach. Turn the sound on — some of these are meant to be heard."
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PERSONAL MESSAGE — the heartfelt letter
   ═══════════════════════════════════════════ */
function PersonalMessageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a0e14 0%, #231520 15%, #2a1a22 50%, #231520 85%, #1a0e14 100%)" }}
    >
      {/* ambient orbs */}
      <motion.div className="pointer-events-none absolute left-[-5%] top-[20%] h-[500px] w-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(244,143,177,0.06), transparent 65%)" }} animate={{ y: [0, -40, 0], x: [0, 25, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="pointer-events-none absolute right-[-8%] top-[50%] h-[400px] w-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(232,165,152,0.05), transparent 65%)" }} animate={{ y: [0, 30, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="pointer-events-none absolute bottom-[10%] left-[30%] h-[300px] w-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(206,147,216,0.04), transparent 65%)" }} animate={{ y: [0, -20, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />

      {/* floating scattered hearts */}
      {isInView && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-[rgba(244,143,177,0.12)]"
              style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
            >
              <Heart className="h-8 w-8 fill-current" />
            </motion.div>
          ))}
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 py-32 md:px-10 md:py-44">
        {/* section opener */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "linear-gradient(135deg, rgba(244,143,177,0.2), rgba(232,165,152,0.15))" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="h-6 w-6 text-[rgba(244,143,177,0.7)] fill-current" />
          </motion.div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.4em] text-[rgba(244,143,177,0.45)]">
            From the heart
          </p>
          <h2
            className="mt-5"
            style={{
              fontFamily: "var(--font-display), 'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              lineHeight: 1,
              color: "#fff8f0",
            }}
          >
            Words I&rsquo;ve been carrying
          </h2>
          <motion.div
            className="mx-auto mt-8 h-[1px] w-16"
            style={{ background: "linear-gradient(90deg, transparent, rgba(244,143,177,0.4), transparent)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* stanzas */}
        <div className="space-y-16 md:space-y-20">
          {letterStanzas.map((stanza, idx) => (
            <motion.div
              key={idx}
              className={`${stanza.large ? "text-center" : ""}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {stanza.text.split("\n").map((line, lineIdx) => {
                const isHighlight = stanza.highlight && line.includes(stanza.highlight);
                return (
                  <p
                    key={lineIdx}
                    className={`leading-[1.9] ${
                      stanza.large
                        ? "text-2xl md:text-3xl lg:text-4xl"
                        : "text-lg md:text-xl"
                    } ${
                      isHighlight
                        ? "font-medium"
                        : ""
                    }`}
                    style={{
                      fontFamily: stanza.large
                        ? "var(--font-display), 'Playfair Display', Georgia, serif"
                        : "var(--font-body), 'Inter', sans-serif",
                      color: isHighlight
                        ? "#f0b8c8"
                        : "rgba(255, 248, 240, 0.6)",
                      fontStyle: isHighlight && !stanza.large ? "italic" : "normal",
                      marginBottom: line === "" ? "1rem" : "0.15rem",
                    }}
                  >
                    {line || "\u00A0"}
                  </p>
                );
              })}

              {/* decorative divider between stanzas */}
              {!stanza.final && (
                <motion.div
                  className={`mt-10 flex gap-1.5 ${stanza.large ? "justify-center" : ""}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="h-1 w-1 rounded-full bg-[rgba(244,143,177,0.3)]" />
                  <span className="h-1 w-1 rounded-full bg-[rgba(244,143,177,0.2)]" />
                  <span className="h-1 w-1 rounded-full bg-[rgba(244,143,177,0.1)]" />
                </motion.div>
              )}

              {/* final heart */}
              {stanza.final && (
                <motion.div
                  className="mt-10 flex justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  <Heart className="h-8 w-8 fill-current text-[rgba(244,143,177,0.4)]" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FINALE SECTION
   ═══════════════════════════════════════════ */
function FinaleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="finale" ref={ref} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden" style={{ background: "linear-gradient(180deg, var(--bg), #fce4ec 30%, #ffecd2 60%, var(--bg) 100%)" }}>
      {/* confetti */}
      <AnimatePresence>
        {isInView && (
          <div className="pointer-events-none absolute inset-0">
            {confetti.map((c) => (
              <motion.div key={c.id} className="absolute top-0 rounded-sm" style={{ left: `${c.left}%`, width: c.size, height: c.size * 1.6, backgroundColor: c.color, rotate: c.rot }} initial={{ y: -30, opacity: 0 }} animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: c.rot + 720 }} transition={{ duration: c.dur, delay: c.delay, ease: "easeIn" }} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* floating hearts */}
      {isInView && floatingHearts.map((h) => (
        <motion.div key={h.id} className="pointer-events-none absolute bottom-0 text-[var(--accent-rose)]" style={{ left: `${h.left}%` }} initial={{ y: 0, opacity: 0 }} animate={{ y: -500, opacity: [0, 0.6, 0.6, 0] }} transition={{ duration: h.dur, delay: h.delay, repeat: Infinity, ease: "easeOut" }}>
          <Heart className="h-6 w-6 fill-current" />
        </motion.div>
      ))}

      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 30%, rgba(244,143,177,0.18), transparent 45%), radial-gradient(circle at 30% 70%, rgba(255,213,79,0.12), transparent 40%)" }} />

      <motion.div className="relative z-10 mx-auto max-w-5xl px-6 text-center" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
        <motion.div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, rgba(244,143,177,0.25), rgba(255,213,79,0.2))" }} animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
          <Stars className="h-7 w-7 text-[var(--accent-rose)]" />
        </motion.div>
        <h2 className="display-title" style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}>
          <RevealText text="Keep the day soft, bright, and beautifully yours." />
        </h2>
        <motion.p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-[var(--muted)]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
          Eat the cake. Save the pictures. Replay the clips. Let the kind words stay longer than usual. Happy Birthday, Ishika.
        </motion.p>

        <motion.div className="mt-12 flex flex-wrap justify-center gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1 }}>
          <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[rgba(42,21,32,0.12)] bg-white/70 px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.3em] text-[var(--fg)] shadow-[0_20px_50px_rgba(42,21,32,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to the top
          </button>
          <Link href="/collection" className="inline-flex items-center gap-3 rounded-full bg-[#2a1520] px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.3em] text-white shadow-[0_20px_50px_rgba(42,21,32,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(42,21,32,0.35)]">
            Revisit every memory <Gift className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CELEBRATION HOME
   ═══════════════════════════════════════════ */
function CelebrationHome() {
  return (
    <main className="relative">
      <SparkleField />
      <ScrollProgress />
      <HeroSection />
      <LetterSection />
      <GallerySection />
      <VideoSection />
      <MixedCarousel />
      <PersonalMessageSection />
      <FinaleSection />
      <CollageFooter />
    </main>
  );
}

/* ═══════════════════════════════════════════
   BIRTHDAY LOADER — cinematic splash
   ═══════════════════════════════════════════ */
const LOADER_STORAGE_KEY = "ishika-birthday-loader";

const dateDigits = [
  { label: "09", sub: "day" },
  { label: "04", sub: "month" },
  { label: "2004", sub: "year" },
];

function BirthdayLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState("date");
  const [counter, setCounter] = useState(0);
  const [progress, setProgress] = useState(0);
  const showAge = phase === "age" || phase === "message" || phase === "exit";
  const showMsg = phase === "message" || phase === "exit";

  /* phase timeline */
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    /* progress bar ticks */
    const progInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 1.2, 100));
    }, 50);
    timers.push(progInterval as unknown as NodeJS.Timeout);

    /* phase: date → age */
    timers.push(setTimeout(() => setPhase("age"), 2200));
    /* phase: age → message */
    timers.push(setTimeout(() => setPhase("message"), 4400));
    /* phase: message → exit */
    timers.push(setTimeout(() => setPhase("exit"), 6200));
    /* complete */
    timers.push(setTimeout(() => onComplete(), 7000));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  /* age counter 0→22 */
  useEffect(() => {
    if (phase !== "age" && phase !== "message" && phase !== "exit") return;
    if (counter >= 22) return;
    const step = setTimeout(() => setCounter((c) => c + 1), 45);
    return () => clearTimeout(step);
  }, [phase, counter]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1a0e14, #2a1520, #1a0e14)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ambient glow */}
          <div
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(244,143,177,0.08), transparent 60%)" }}
          />
          <motion.div
            className="absolute right-[15%] top-[20%] h-[300px] w-[300px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(232,165,152,0.05), transparent 70%)" }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* sparkle dots */}
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[rgba(244,143,177,0.3)]"
              style={{
                width: 2 + Math.random() * 3,
                height: 2 + Math.random() * 3,
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
              }}
            />
          ))}

          {/* ── DATE REVEAL ── */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* eyebrow */}
            <motion.p
              className="mb-12 text-[0.62rem] font-semibold uppercase tracking-[0.5em] text-[rgba(244,143,177,0.4)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              A day that changed everything
            </motion.p>

            {/* date blocks */}
            <div className="flex items-center gap-4 md:gap-8">
              {dateDigits.map((d, i) => (
                <motion.div
                  key={d.sub}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.4 + i * 0.25,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span
                    className="block font-semibold tabular-nums"
                    style={{
                      fontFamily: "var(--font-display), 'Playfair Display', Georgia, serif",
                      fontSize: d.label.length > 2 ? "clamp(3rem, 8vw, 5.5rem)" : "clamp(3.5rem, 10vw, 7rem)",
                      lineHeight: 1,
                      color: "#fff8f0",
                      textShadow: "0 0 40px rgba(244,143,177,0.15)",
                    }}
                  >
                    {d.label}
                  </span>
                  <span className="mt-3 text-[0.58rem] font-medium uppercase tracking-[0.4em] text-[rgba(255,248,240,0.25)]">
                    {d.sub}
                  </span>
                </motion.div>
              ))}

              {/* separators between date blocks */}
              {[0, 1].map((i) => (
                <motion.span
                  key={`sep-${i}`}
                  className="mx-1 text-[rgba(244,143,177,0.3)]"
                  style={{
                    fontFamily: "var(--font-display), 'Playfair Display', Georgia, serif",
                    fontSize: "clamp(2rem, 6vw, 4rem)",
                    order: i === 0 ? 1 : 3,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.25 }}
                >
                  ·
                </motion.span>
              ))}
            </div>

            {/* age counter */}
            <motion.div
              className="mt-16 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: showAge ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="block tabular-nums"
                style={{
                  fontFamily: "var(--font-display), 'Playfair Display', Georgia, serif",
                  fontSize: "clamp(5rem, 14vw, 10rem)",
                  lineHeight: 0.9,
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #fff8f0 20%, #f48fb1 50%, #ffd54f 80%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "text-shimmer 4s linear infinite",
                }}
              >
                {counter}
              </span>
              <motion.p
                className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-[rgba(255,248,240,0.35)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: showAge ? 1 : 0 }}
                transition={{ delay: 0.3 }}
              >
                years of being extraordinary
              </motion.p>
            </motion.div>

            {/* birthday message */}
            <motion.div
              className="mt-14 flex flex-col items-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: showMsg ? 1 : 0,
                y: showMsg ? 0 : 15,
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: "linear-gradient(135deg, rgba(244,143,177,0.2), rgba(255,213,79,0.15))" }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-4 w-4 text-[rgba(244,143,177,0.6)]" />
              </motion.div>
              <p
                className="text-center text-lg leading-8 md:text-xl"
                style={{
                  fontFamily: "var(--font-display), 'Playfair Display', Georgia, serif",
                  color: "rgba(255, 248, 240, 0.7)",
                  fontStyle: "italic",
                }}
              >
                Happy 23<sup className="text-[0.6em]">rd</sup> Birthday, Ishika
              </p>
            </motion.div>
          </motion.div>

          {/* progress bar */}
          <div className="absolute bottom-12 left-1/2 w-48 -translate-x-1/2 md:w-64">
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-[rgba(255,248,240,0.06)]">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, rgba(244,143,177,0.5), rgba(255,213,79,0.4))",
                }}
              />
            </div>
            <p className="mt-3 text-center text-[0.55rem] uppercase tracking-[0.5em] text-[rgba(255,248,240,0.2)]">
              preparing your surprise
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   ENTRY POINT
   ═══════════════════════════════════════════ */
export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loaderSeen = window.sessionStorage.getItem(LOADER_STORAGE_KEY) === "done";
    const introSeen = window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "done";
    setLoaderDone(loaderSeen);
    setIntroComplete(introSeen);
  }, []);

  const handleLoaderComplete = () => {
    window.sessionStorage.setItem(LOADER_STORAGE_KEY, "done");
    setLoaderDone(true);
  };

  const handleIntroComplete = () => {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, "done");
    setIntroComplete(true);
  };

  if (!mounted) return <main className="min-h-screen" />;

  if (!loaderDone) return <BirthdayLoader onComplete={handleLoaderComplete} />;
  if (!introComplete) return <CandleIntro onComplete={handleIntroComplete} />;
  return <CelebrationHome />;
}
