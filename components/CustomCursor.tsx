"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      setHovered(!!target.closest("a, button, .hover-target"));
    };

    window.addEventListener("mousemove", moveMouse);
    return () => window.removeEventListener("mousemove", moveMouse);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x, y }}
      className="hidden md:flex fixed top-0 left-0 z-[9999] pointer-events-none items-center justify-center -ml-4 -mt-4"
    >
      {/* 
        1. LEFT WING
      */}
      <motion.div
        style={{ scaleX: -1 }}
        initial={{ opacity: 0, scale: 0.5, x: 10 }}
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.5,
          x: hovered ? -28 : 10,
          rotate: hovered ? 0 : 15,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="absolute left-0 top-[-10px] z-10 text-red-600"
      >
        <WingSVG />
      </motion.div>

      {/* 
        2. CENTER CURSOR IMAGE
      */}
      <div className="relative w-8 h-8 z-20">
        <Image
          src="/cur.png"
          alt="Cursor"
          width={32}
          height={32}
          className="object-contain"
          priority
        />
      </div>

      {/*
        3. RIGHT WING
      */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, x: -10 }}
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.5,
          x: hovered ? 28 : -10,
          rotate: hovered ? 0 : -15,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="absolute right-0 top-[-10px] z-10 text-red-600"
      >
        <WingSVG />
      </motion.div>
    </motion.div>
  );
}

function WingSVG() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.88 121.46"
      className="w-8 h-8 fill-current"
      xmlSpace="preserve"
    >
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.35,121.46c-8.01-9.72-11.92-19.29-12.31-28.71C-0.78,73.01,10.92,58.28,28.3,47.67 c18.28-11.16,37.08-13.93,55.36-22.25C92.79,21.27,103.68,14.47,121.8,0c5.92,15.69-12.92,40.9-43.52,54.23 c9.48,0.37,19.69-2.54,30.85-9.74c-0.76,19.94-16.46,32.21-51.3,36.95c7.33,2.45,16.09,2.58,27.27-0.58 C74.33,116.81,29.9,91.06,12.35,121.46L12.35,121.46z"
        />
      </g>
    </svg>
  );
}
