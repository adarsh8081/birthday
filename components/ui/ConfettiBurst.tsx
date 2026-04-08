'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

const confettiPalette = ['#f28ca8', '#f4b37d', '#f6d28f', '#91c9d8', '#d889b7'];

interface ConfettiBurstProps {
  active: boolean;
}

export default function ConfettiBurst({ active }: ConfettiBurstProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 32 }, (_, index) => ({
        id: index,
        left: 10 + ((index * 7) % 80),
        top: 40 + ((index * 11) % 18),
        rotate: (index * 37) % 360,
        x: (index % 2 === 0 ? -1 : 1) * (60 + (index % 5) * 18),
        y: 120 + (index % 6) * 28,
        color: confettiPalette[index % confettiPalette.length],
        delay: (index % 8) * 0.03,
      })),
    [],
  );

  if (!active) {
    return null;
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute h-4 w-2 rounded-full"
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            backgroundColor: piece.color,
          }}
          initial={{ opacity: 0, scale: 0.4, rotate: piece.rotate, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.4, 1, 0.8],
            rotate: [piece.rotate, piece.rotate + 180],
            x: [0, piece.x],
            y: [0, piece.y],
          }}
          transition={{
            duration: 1.4,
            delay: piece.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
