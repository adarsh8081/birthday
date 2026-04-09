"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles, Wind } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type IntroStage = "idle" | "blowing" | "extinguished" | "celebrating";

type CandleIntroProps = {
  onComplete: () => void;
};

const confettiPieces = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${6 + (index % 8) * 12}%`,
  delay: index * 0.035,
  rotate: index % 2 === 0 ? -42 : 42,
}));

export default function CandleIntro({ onComplete }: CandleIntroProps) {
  const [stage, setStage] = useState<IntroStage>("idle");
  const reduceMotion = useReducedMotion();

  const copy = useMemo(() => {
    switch (stage) {
      case "blowing":
        return "Wish received. Let the whole scene open.";
      case "extinguished":
        return "The flame is gone. The room is about to bloom.";
      case "celebrating":
        return "Opening the celebration...";
      default:
        return "Tap or click the candle to blow it out. If you want, you can also press and hold for a second like a real birthday wish.";
    }
  }, [stage]);

  useEffect(() => {
    if (stage !== "blowing") {
      return;
    }

    const timer = window.setTimeout(() => {
      setStage("extinguished");
    }, reduceMotion ? 150 : 650);

    return () => {
      window.clearTimeout(timer);
    };
  }, [reduceMotion, stage]);

  useEffect(() => {
    if (stage !== "extinguished") {
      return;
    }

    const timer = window.setTimeout(() => {
      setStage("celebrating");
    }, reduceMotion ? 140 : 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [reduceMotion, stage]);

  useEffect(() => {
    if (stage !== "celebrating") {
      return;
    }

    const timer = window.setTimeout(() => {
      onComplete();
    }, reduceMotion ? 160 : 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [onComplete, reduceMotion, stage]);

  const beginBlow = () => {
    if (stage !== "idle") {
      return;
    }

    setStage("blowing");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,216,224,0.8),transparent_32%),radial-gradient(circle_at_20%_20%,rgba(249,187,210,0.22),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(255,232,194,0.34),transparent_25%),linear-gradient(135deg,#fffaf5_0%,#fff4ef_46%,#fff8f3_100%)]" />
      <motion.div
        className="absolute left-[12%] top-[18%] h-40 w-40 rounded-full border border-[#f1bfd1] bg-[radial-gradient(circle,rgba(255,255,255,0.92),rgba(246,206,219,0.18))]"
        animate={{ y: [0, -22, 0], opacity: [0.55, 0.95, 0.55] }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] top-[16%] h-28 w-28 rounded-full border border-[#f0cad6] bg-[radial-gradient(circle,rgba(255,255,255,0.92),rgba(250,220,227,0.16))]"
        animate={{ y: [0, 18, 0], x: [0, -8, 0], opacity: [0.45, 0.82, 0.45] }}
        transition={{ duration: 7.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-10">
        <motion.div
          className="section-shell flex min-h-[42rem] w-full flex-col items-center justify-center overflow-hidden px-6 py-10 text-center md:px-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,227,210,0.5),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.72))]" />
          <motion.div
            className="absolute left-1/2 top-10 h-24 w-24 rounded-full border border-[#f0b7c8] bg-white/55"
            style={{ x: "-50%" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.1, 0.45] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <div className="relative z-10 max-w-3xl">
            <p className="eyebrow justify-center">Interactive opening</p>
            <h1 className="display-title mt-6 text-[clamp(3.6rem,9vw,7.8rem)]">
              Start the birthday like a scene.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6c5460] md:text-xl">
              {copy}
            </p>
          </div>

          <div className="relative z-10 mt-12 flex flex-col items-center">
            <motion.button
              type="button"
              aria-label="Blow out the candle"
              className="group relative flex flex-col items-center"
              onClick={beginBlow}
              onPointerDown={() => {
                if (stage !== "idle") {
                  return;
                }

                const holdTimer = window.setTimeout(() => {
                  beginBlow();
                }, 900);

                const clear = () => {
                  window.clearTimeout(holdTimer);
                  window.removeEventListener("pointerup", clear);
                  window.removeEventListener("pointercancel", clear);
                };

                window.addEventListener("pointerup", clear);
                window.addEventListener("pointercancel", clear);
              }}
            >
              <motion.span
                className="absolute -top-10 flex h-20 w-20 items-center justify-center rounded-full border border-[#f2adc1] bg-white/55 text-[#e67b9b] shadow-[0_0_40px_rgba(242,173,193,0.24)]"
                animate={{
                  scale: stage === "idle" ? [1, 1.12, 1] : 1,
                  opacity: stage === "idle" ? [0.55, 0.95, 0.55] : 0.2,
                }}
                transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Wind className="h-6 w-6" />
              </motion.span>

              <div className="relative mt-4 h-[20rem] w-[11rem]">
                <motion.div
                  className="absolute left-1/2 top-12 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,212,135,0.8),rgba(255,159,67,0.26),transparent_72%)] blur-xl"
                  style={{ x: "-50%" }}
                  animate={{ opacity: stage === "idle" ? 1 : 0.25, scale: stage === "idle" ? [1, 1.08, 1] : 0.75 }}
                  transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />

                <AnimatePresence mode="popLayout">
                  {stage === "idle" ? (
                    <motion.div
                      key="flame"
                      className="absolute left-1/2 top-1 h-20 w-12 rounded-[100%_100%_70%_70%/100%_100%_40%_40%] bg-[radial-gradient(circle_at_50%_20%,#fff6c8_0%,#ffd567_38%,#ff8e47_72%,rgba(255,142,71,0.12)_100%)] shadow-[0_0_45px_rgba(255,181,85,0.5)]"
                      style={{ originX: 0.5, originY: 1 }}
                      initial={{ opacity: 0, scale: 0.7, y: 10, x: "-50%" }}
                      animate={{ opacity: 1, scale: [1, 0.92, 1.06, 1], y: [0, -4, 2, 0], x: "-50%", rotate: [0, -3, 3, 0] }}
                      exit={{ opacity: 0, scale: 0.45, y: -22, x: "-50%" }}
                      transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                  ) : null}
                </AnimatePresence>

                <AnimatePresence>
                  {stage !== "idle" ? (
                    <motion.div
                      key="smoke"
                      className="absolute left-1/2 top-3 h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(171,152,160,0.28),rgba(171,152,160,0.06),transparent_70%)] blur-md"
                      initial={{ opacity: 0, scale: 0.6, y: 18, x: "-50%" }}
                      animate={{ opacity: [0.24, 0.45, 0], scale: [0.7, 1.2, 1.5], y: [12, -10, -48], x: "-50%" }}
                      exit={{ opacity: 0, x: "-50%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  ) : null}
                </AnimatePresence>

                <motion.div
                  className="absolute inset-x-0 bottom-0 mx-auto h-[15rem] w-[7rem] rounded-[3rem] bg-[linear-gradient(180deg,#ffdde6_0%,#f29ab4_45%,#cb617f_100%)] shadow-[0_16px_35px_rgba(203,97,127,0.24)]"
                  animate={stage === "blowing" ? { rotate: [0, -2.5, 2.5, 0], x: [0, -3, 3, 0] } : { rotate: 0, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-x-3 top-5 h-3 rounded-full bg-white/60" />
                  <div className="absolute inset-x-3 top-11 h-3 rounded-full bg-white/40" />
                  <div className="absolute inset-x-3 top-[4.25rem] h-3 rounded-full bg-white/30" />
                  <div className="absolute left-1/2 top-[-2.1rem] h-12 w-1.5 -translate-x-1/2 rounded-full bg-[#5e454f]" />
                </motion.div>
              </div>

              <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/86 px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.34em] text-[#3a2630] shadow-[0_14px_40px_rgba(91,60,72,0.08)]">
                <Sparkles className="h-4 w-4 text-[#ef8dad]" />
                Click or tap to blow
              </span>
              <span className="mt-3 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-[#8b6b77]">
                Hold for a slower reveal
              </span>
            </motion.button>
          </div>

          <AnimatePresence>
            {stage === "celebrating" ? (
              <motion.div
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {confettiPieces.map((piece) => (
                  <motion.span
                    key={piece.id}
                    className="absolute top-0 h-16 w-3 rounded-full bg-[linear-gradient(180deg,#f188aa,#f8c5d7)]"
                    style={{ left: piece.left }}
                    initial={{ opacity: 0, y: -40, rotate: piece.rotate }}
                    animate={{ opacity: [0, 1, 1, 0], y: [0, 180, 340], rotate: [piece.rotate, piece.rotate + 90] }}
                    transition={{ duration: 1.5, delay: piece.delay, ease: "easeOut" }}
                  />
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
