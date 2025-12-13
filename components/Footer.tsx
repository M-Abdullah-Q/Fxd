"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
  ArrowUpRight,
} from "lucide-react";

const socials = [
  {
    id: 1,
    name: "LinkedIn",
    handle: "/company/alcovia",
    icon: Linkedin,
    color: "#0077B5",
    link: "#",
  },
  {
    id: 2,
    name: "Twitter",
    handle: "@Alcovia_HQ",
    icon: Twitter,
    color: "#1DA1F2",
    link: "#",
  },
  {
    id: 3,
    name: "Instagram",
    handle: "@Alcovia.Life",
    icon: Instagram,
    color: "#E1306C",
    link: "#",
  },
  {
    id: 4,
    name: "YouTube",
    handle: "Alcovia TV",
    icon: Youtube,
    color: "#FF0000",
    link: "#",
  },
  {
    id: 5,
    name: "Facebook",
    handle: "Alcovia Official",
    icon: Facebook,
    color: "#4267B2",
    link: "#",
  },
];

export default function Footer() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <footer className="relative min-h-screen w-full bg-transparent overflow-hidden flex flex-col items-center justify-center pt-20 pb-14">
      <div className="text-center mb-8 md:mb-[-50px] z-20 relative px-4">
        <h3 className="text-3xl md:text-6xl font-heading font-bold uppercase tracking-tight text-black">
          What's Up
        </h3>
        <h2 className="text-[18vw] md:text-[12vw] font-serif italic text-black leading-[0.8] opacity-90">
          On Socials
        </h2>
      </div>

      <div className="relative z-10 h-[350px] md:h-[450px] w-full max-w-5xl flex items-center justify-center mt-10 md:mt-20">
        {socials.map((s, index) => {
          const centerIndex = (socials.length - 1) / 2;
          const distFromCenter = index - centerIndex;

          const baseRotation = distFromCenter * (isMobile ? 4 : 5);
          const baseXOffset = distFromCenter * (isMobile ? 35 : 50);

          const isHovered = hoveredIndex === index;
          const isLeftOfHover = hoveredIndex !== null && index < hoveredIndex;
          const isRightOfHover = hoveredIndex !== null && index > hoveredIndex;

          let x = baseXOffset;
          let y = 0;
          let rotate = baseRotation;
          let scale = 1;
          let zIndex = index;
          let opacity = 1;

          if (hoveredIndex !== null) {
            if (isHovered) {
              y = isMobile ? -60 : -100;
              rotate = 0;
              scale = 1.15;
              zIndex = 50;
            } else if (isLeftOfHover) {
              x = baseXOffset - (isMobile ? 50 : 100);
              rotate = baseRotation - 10;
              scale = 0.9;
              opacity = 0.7;
            } else if (isRightOfHover) {
              x = baseXOffset + (isMobile ? 50 : 100);
              rotate = baseRotation + 10;
              scale = 0.9;
              opacity = 0.7;
            }
          }

          return (
            <motion.a
              key={s.id}
              href={s.link}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
              className="absolute cursor-pointer"
              style={{
                left: "50%",
                marginLeft: isMobile ? -64 : -96,
                top: "30%",
                zIndex: zIndex,
              }}
              animate={{
                x,
                y,
                rotate,
                scale,
                opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <div
                className={`
                  relative 
                  w-32 h-48 
                  md:w-48 md:h-72 
                  rounded-[24px] 
                  bg-[#1a1a1a] 
                  border border-white/10 
                  shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]
                  flex flex-col items-center justify-between
                  py-8 overflow-hidden group
                `}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${s.color}, transparent 70%)`,
                  }}
                />
                <div
                  className="relative p-4 rounded-full bg-white/5 border border-white/5 text-white transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white"
                  style={{
                    color: isHovered ? s.color : "white",
                  }}
                >
                  <s.icon size={isMobile ? 24 : 32} strokeWidth={1.5} />
                </div>

                <div className="flex flex-col items-center z-10">
                  <span className="text-white font-heading font-bold uppercase tracking-wider text-xs md:text-sm">
                    {s.name}
                  </span>
                  <span className="text-gray-500 text-[10px] md:text-xs mt-1">
                    {s.handle}
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      <div className="absolute bottom-6 md:bottom-10 w-full px-6 md:px-10 flex flex-row justify-between items-end text-black opacity-50 uppercase font-bold tracking-widest text-[10px] md:text-sm text-center md:text-left">
        <div className="text-left">
          Based in Delhi <br className="md:hidden" /> for Global Impact
        </div>
        <div className="text-right">
          Alcovia © 2025 <br className="md:hidden" /> All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
