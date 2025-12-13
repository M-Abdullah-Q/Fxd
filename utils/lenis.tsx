"use client";

import { ReactLenis as Lenis } from "lenis/react";

interface LenisProps {
  root?: boolean;
  options?: {
    lerp?: number;
    duration?: number;
    smoothWheel?: boolean;
    syncTouch?: boolean;
  };
  children: React.ReactNode;
}

export function ReactLenis({ root, options, children }: LenisProps) {
  return (
    <Lenis
      root={root}
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        ...options,
      }}
    >
      {children}
    </Lenis>
  );
}
