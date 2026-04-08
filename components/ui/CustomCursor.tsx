'use client';

import { motion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const x = useSpring(0, { damping: 30, stiffness: 300, mass: 0.35 });
  const y = useSpring(0, { damping: 30, stiffness: 300, mass: 0.35 });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!hoverQuery.matches) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      setVisible(true);
      setMousePosition({ x: event.clientX, y: event.clientY });
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactiveElement = target?.closest('button, a, input, textarea, video');
      setIsHoveringInteractive(Boolean(interactiveElement));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onLeave);
    };
  }, [x, y]);

  if (!visible) {
    return null;
  }

  return (
    <>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-10 w-10 rounded-full border md:block"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: 'rgba(217, 137, 183, 0.55)',
          backgroundColor: isHoveringInteractive
            ? 'rgba(217, 137, 183, 0.20)'
            : 'rgba(217, 137, 183, 0.04)',
          scale: isHoveringInteractive ? 1.35 : 1,
        }}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[121] hidden h-2.5 w-2.5 rounded-full bg-[var(--color-coral)] md:block"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[119] hidden h-24 w-24 rounded-full bg-[rgba(217,137,183,0.12)] blur-3xl md:block"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
