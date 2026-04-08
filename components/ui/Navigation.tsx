"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Images, Film, Sparkles, ArrowUpRight, ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type SectionLink = {
  id: string;
  label: string;
  icon: typeof Home;
};

const homeSections: SectionLink[] = [
  { id: "hero", label: "Start", icon: Home },
  { id: "wishes", label: "Wishes", icon: Sparkles },
  { id: "gallery", label: "Gallery", icon: Images },
  { id: "videos", label: "Reels", icon: Film },
  { id: "collection", label: "Archive", icon: ArrowUpRight },
  { id: "finale", label: "Finale", icon: ChevronUp },
];

export default function Navigation() {
  const pathname = usePathname();
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  const links = useMemo(() => {
    if (pathname === "/") {
      return homeSections;
    }

    return [];
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      {
        threshold: [0.2, 0.35, 0.55],
        rootMargin: "-28% 0px -28% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [links, pathname]);

  if (pathname === "/") {
    return (
      <>
        <div className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
          <motion.nav
            aria-label="Section shortcuts"
            className="pointer-events-auto flex flex-col gap-3 rounded-full border border-white/60 bg-white/70 px-3 py-4 shadow-[0_18px_50px_rgba(85,54,68,0.12)] backdrop-blur-xl"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((link, index) => {
              const Icon = link.icon;

              return (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  className="group relative flex h-12 w-12 items-center justify-center"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.55 }}
                  whileHover={{ x: -4 }}
                  aria-label={`Jump to ${link.label}`}
                >
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full border transition duration-300",
                      active === link.id
                        ? "border-[#f287a8] bg-[#2f1f27] text-white shadow-[0_12px_30px_rgba(242,135,168,0.24)]"
                        : "border-white/70 bg-white/85 text-[#6d5360] hover:border-[#f3a6be] hover:bg-white",
                    )}
                  />
                  <Icon className="relative z-10 h-4 w-4" />
                  <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-white/70 bg-[#2f1f27] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white opacity-0 shadow-[0_10px_30px_rgba(47,31,39,0.24)] transition duration-300 group-hover:opacity-100">
                    {link.label}
                  </span>
                </motion.a>
              );
            })}
          </motion.nav>
        </div>

        <div className="fixed bottom-5 right-5 z-40 lg:hidden">
          <motion.button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-section-map"
            aria-label="Open section map"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/65 bg-[#2f1f27] text-white shadow-[0_16px_40px_rgba(47,31,39,0.28)] backdrop-blur-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen((current) => !current)}
          >
            <Sparkles className="h-5 w-5" />
          </motion.button>

          <AnimatePresence>
            {open ? (
              <motion.div
                id="mobile-section-map"
                className="absolute bottom-16 right-0 w-[15rem] rounded-[1.75rem] border border-white/65 bg-white/78 p-3 shadow-[0_18px_50px_rgba(47,31,39,0.18)] backdrop-blur-xl"
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                transition={{ duration: 0.28 }}
              >
                <p className="px-2 pb-2 text-[0.66rem] font-semibold uppercase tracking-[0.38em] text-[#7e6470]">
                  Section map
                </p>
                <div className="space-y-1">
                  {links.map((link) => {
                    const Icon = link.icon;

                    return (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        className={cn(
                          "flex items-center gap-3 rounded-[1.2rem] px-3 py-3 text-sm transition duration-300",
                          active === link.id
                            ? "bg-[#2f1f27] text-white"
                            : "text-[#5d4752] hover:bg-white/90",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{link.label}</span>
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </>
    );
  }

  return (
    <div className="pointer-events-none fixed right-5 top-5 z-40 flex gap-3">
      <Link
        href="/"
        aria-label="Return home"
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/65 bg-white/78 px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#3a2530] shadow-[0_16px_40px_rgba(47,31,39,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white"
      >
        <Home className="h-4 w-4" />
        Home
      </Link>
      <button
        type="button"
        aria-label="Scroll to top"
        className="pointer-events-auto inline-flex h-[3.1rem] w-[3.1rem] items-center justify-center rounded-full border border-white/65 bg-[#2f1f27] text-white shadow-[0_16px_40px_rgba(47,31,39,0.2)] transition duration-300 hover:-translate-y-0.5"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronUp className="h-4 w-4" />
      </button>
    </div>
  );
}
