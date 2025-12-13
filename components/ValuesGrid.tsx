"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const values = [
  {
    id: 1,
    title: "Forge Bonds",
    date: "THE NETWORK",
    emoji: "🤝",
    img: "/Network.jpg",
    className:
      "md:absolute md:left-[5vw] md:top-[15vh] md:w-[22vw] md:h-[28vw] z-10",
    emojiPos: "-top-6 -right-6 md:-top-10 md:-right-10",
  },
  {
    id: 2,
    title: "Amplify Voices",
    date: "PODCAST SHOOTS",
    emoji: "🎙️",
    img: "/Podcast.jpg",
    className:
      "md:absolute md:left-[35vw] md:bottom-[15vh] md:w-[26vw] md:h-[18vw] z-0",
    emojiPos: "-bottom-6 -left-4 md:-bottom-8 md:-left-8",
  },
  {
    id: 3,
    title: "World Class Guidance",
    date: "HARVARD & UCL MENTORS",
    emoji: "🧠",
    img: "/Guidance.jpg",
    className:
      "md:absolute md:left-[120vw] md:top-[20vh] md:w-[35vw] md:h-[45vw] z-20 shadow-2xl",
    emojiPos: "top-4 right-4 md:-top-12 md:-right-12",
  },
  {
    id: 4,
    title: "Build Resilience",
    date: "GRIT & GRIND",
    emoji: "🔥",
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
    className:
      "md:absolute md:left-[170vw] md:top-[10vh] md:w-[20vw] md:h-[24vw] z-10",
    emojiPos: "-top-8 -right-4 md:-top-10 md:-left-8",
  },
  {
    id: 5,
    title: "Career Discovery",
    date: "WORKSHOPS",
    emoji: "🧭",
    img: "/Career.jpg",
    className:
      "md:absolute md:left-[200vw] md:bottom-[20vh] md:w-[24vw] md:h-[30vw] z-10",
    emojiPos: "bottom-4 right-4 md:-bottom-6 md:-right-6",
  },
  {
    id: 6,
    title: "Deep Empathy",
    date: "COMMUNITY",
    emoji: "🤗",
    img: "/Compassion.jpg",
    className:
      "md:absolute md:left-[240vw] md:top-[25vh] md:w-[28vw] md:h-[28vw] z-0",
    emojiPos: "-top-6 left-1/2 md:-top-10 md:left-10",
  },
];

function FloatingEmoji({
  emoji,
  className,
  delay = 0,
}: {
  emoji: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(
        "absolute text-4xl md:text-6xl select-none filter drop-shadow-lg z-30 cursor-default",
        className
      )}
      initial={{ y: 0, rotate: 0 }}
      animate={{
        y: [-5, 5, -5],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        delay: delay,
      }}
      whileHover={{ scale: 1.2, rotate: 15, transition: { duration: 0.2 } }}
    >
      {emoji}
    </motion.div>
  );
}

export default function ValuesGrid() {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);

      if (scrollRef.current && desktop) {
        setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
      } else {
        setScrollRange(0);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const x = useSpring(rawX, { stiffness: 400, damping: 90 });

  const finalX = isDesktop ? x : 0;

  return (
    <section
      ref={targetRef}
      className="relative h-auto md:h-[500vh] bg-[#1a1a1a] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#2a2a2a_0%,_#111111_100%)] pointer-events-none" />

      <div className="relative h-auto w-full md:sticky md:top-0 md:flex md:h-screen md:items-center md:overflow-hidden">
        <motion.div
          ref={scrollRef}
          style={{ x: finalX }}
          className="relative flex flex-col w-full px-6 py-20 md:p-0 md:flex-row md:flex-nowrap md:h-screen md:w-[300vw] md:items-center"
        >
          <div className="relative w-full mb-32 md:mb-0 md:absolute md:left-[70vw] md:top-[15vh] md:w-[40vw] text-center z-40 mix-blend-difference pointer-events-none">
            <FloatingEmoji
              emoji="✨"
              className="left-[10%] -top-10 md:left-[20%] text-3xl"
              delay={1}
            />
            <h3 className="text-3xl md:text-5xl font-serif text-white/90 leading-[1.1]">
              It doesn't matter{" "}
              <span className="text-yellow-500 italic">where</span> you start.
            </h3>
            <h3 className="text-3xl md:text-5xl font-serif text-white/90 leading-[1.1] mt-2">
              It's how you{" "}
              <span className="font-bold text-white border-b-4 border-yellow-500">
                Progress
              </span>{" "}
              .
            </h3>
            <p className="mt-6 text-sm md:text-lg text-gray-400 max-w-md mx-auto font-sans tracking-wide">
              At Alcovia, we don't just teach skills. We build character, grit,
              and the network that lasts a lifetime.
            </p>
          </div>

          <div className="flex flex-col gap-32 md:block">
            {values.map((v, index) => (
              <div
                key={v.id}
                className={cn(
                  "relative group w-full h-[350px] md:h-auto transition-all duration-500",
                  v.className
                )}
              >
                <div className="absolute -top-8 left-0 md:-top-10 md:left-0 z-20">
                  <span className="text-[10px] md:text-xs font-bold text-yellow-500/80 uppercase tracking-[0.2em] bg-black/50 backdrop-blur-md px-2 py-1 rounded">
                    {v.date}
                  </span>
                </div>
                <div className="relative w-full h-full overflow-hidden rounded-xl md:rounded-sm border border-white/10 shadow-2xl bg-[#222]">
                  <Image
                    src={v.img}
                    alt={v.title}
                    fill
                    className="object-cover transition-transform duration-[800ms] group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>
                <FloatingEmoji
                  emoji={v.emoji}
                  className={v.emojiPos}
                  delay={index * 0.5}
                />
                <div className="absolute bottom-4 left-4 md:-bottom-12 md:left-0 z-30 overflow-hidden">
                  <h4 className="text-2xl md:text-4xl text-white font-heading uppercase font-bold tracking-tighter drop-shadow-md md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    {v.title}
                  </h4>
                  <h4 className="md:hidden text-2xl text-white font-heading uppercase font-bold tracking-tighter">
                    {v.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:flex absolute left-[270vw] bottom-10 items-center gap-4 opacity-50">
            <div className="h-[1px] w-24 bg-white/40" />
            <span className="text-sm font-mono text-white/60">
              THE JOURNEY CONTINUES
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
