"use client";

import { motion, useAnimationControls } from "framer-motion";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    id: 1,
    text: "Alcovia completely changed how my son approaches his creative projects. The immersion is unlike anything traditional schooling offers.",
    name: "Sarah Jenkins",
    role: "Parent of Leo (Class of '24)",
  },
  {
    id: 2,
    text: "I was skeptical about an 'animation-first' platform, but the engagement levels are off the charts. It's education that feels like the future.",
    name: "David Chen",
    role: "Parent of Maya",
  },
  {
    id: 3,
    text: "Finally, a space that respects the digital fluency of this generation. My daughter feels understood here.",
    name: "Elena Rodriguez",
    role: "Parent of Sofia",
  },
  {
    id: 4,
    text: "The community values are what sold us. It's not just about the visuals; it's about the connection.",
    name: "Marcus Thorne",
    role: "Parent of Jaxon",
  },
  {
    id: 5,
    text: "Watching my quiet teen blossom into a confident creator through these interactive experiences has been a gift.",
    name: "Priya Patel",
    role: "Parent of Aarav",
  },
];

const TestimonialCard = ({
  data,
}: {
  data: { text: string; name: string; role: string };
}) => {
  return (
    <div
      className={cn(
        "relative flex w-[350px] shrink-0 flex-col justify-between gap-6 p-8",
        "rounded-2xl border border-alcovia-gold bg-white/90 backdrop-blur-md",
        "hover-target transition-colors duration-300 hover:border-[var(--color-alcovia-gold)]/50 hover:bg-white/10 group",
        "cursor-none"
      )}
    >
      <Quote className="h-8 w-8 text-[var(--color-alcovia-gold)] opacity-50 transition-opacity group-hover:opacity-100" />

      <p className="font-dark leading-relaxed text-alcovia-dark">
        &quot;{data.text}&quot;
      </p>

      <div className="flex flex-col">
        <span className="text-lg font-bold text-alcovia-red group-hover:text-[var(--color-alcovia-gold)] transition-colors">
          {data.name}
        </span>
        <span className="text-sm uppercase tracking-wider text-gray-400">
          {data.role}
        </span>
      </div>
    </div>
  );
};

export default function Testimonials() {
  const [isHovered, setIsHovered] = useState(false);

  const seamlessData = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative w-full py-32 overflow-hidden bg-transparent z-10">
      <div className="container mx-auto mb-16 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold uppercase tracking-widest text-alcovia-dark md:text-5xl"
        >
          Trusted by{" "}
          <span className="text-[var(--color-alcovia-gold)]">Parents</span>
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mt-4 h-[1px] w-24 bg-[var(--color-alcovia-red)]"
        />
      </div>

      <div
        className="relative flex w-full select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-[var(--color-alcovia-dark)]/20 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-[var(--color-alcovia-dark)]/20 to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-8 px-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          style={{
            animationPlayState: isHovered ? "paused" : "running",
          }}
        >
          {seamlessData.map((item, idx) => (
            <TestimonialCard key={`${item.id}-${idx}`} data={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
