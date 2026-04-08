"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type SmartImageProps = {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export default function SmartImage({
  src,
  alt,
  className,
  containerClassName,
  sizes = "(min-width: 1280px) 28vw, (min-width: 768px) 42vw, 94vw",
  priority = false,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,rgba(245,207,218,0.36),rgba(255,255,255,0.92))]",
          containerClassName,
        )}
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-[1.75rem]", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 bg-[#ebdce0] transition duration-700",
          !loaded ? "animate-pulse" : "opacity-0",
        )}
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-cover transition duration-700",
          loaded ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
          className,
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
