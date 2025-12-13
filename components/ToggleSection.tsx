"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ArrowRight, ArrowLeft, X } from "lucide-react";
import Image from "next/image";

type ViewState = "school" | "mid" | "outside";

export default function LandoStyleToggle() {
  const [activeState, setActiveState] = useState<ViewState>("mid");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      if (activeState === "outside") setActiveState("mid");
      else if (activeState === "mid") setActiveState("school");
    } else if (info.offset.x < -swipeThreshold) {
      if (activeState === "school") setActiveState("mid");
      else if (activeState === "mid") setActiveState("outside");
    }
  };

  const schoolImg = "/BoyL3.png";
  const outsideImg = "/BoyR3.png";

  return (
    <section className="relative h-[100dvh] w-full bg-[#F3F4F6] overflow-hidden flex flex-col justify-end">
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M50 0 C 60 40 40 60 50 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
        </svg>
      </div>

      <motion.div
        className="absolute inset-0 z-10 touch-pan-y"
        onPanEnd={handleDragEnd}
      />

      <motion.div
        className="absolute bottom-0 left-0 z-20 pointer-events-none origin-bottom-left"
        initial={false}
        animate={{
          x:
            activeState === "school"
              ? isMobile
                ? "45vw"
                : "55vw"
              : activeState === "mid"
              ? "0%"
              : "-100%",
          scale: activeState === "school" ? 1.1 : 1,
          opacity: activeState === "outside" ? 0 : 1,
          // filter:
          //   activeState === "school" ? "grayscale(0%)" : "grayscale(100%)",
        }}
        transition={{ type: "spring", stiffness: 45, damping: 14 }}
      >
        <div className="relative right-20 w-[65vw] h-[55vh] md:w-[35vw] md:h-[85vh]">
          <Image
            src={schoolImg}
            alt="School Mode"
            fill
            className="object-cover object-top md:object-center"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 85%, transparent 100%)",
            }}
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0 z-20 pointer-events-none origin-bottom-right"
        initial={false}
        animate={{
          x:
            activeState === "outside"
              ? isMobile
                ? "-45vw"
                : "-55vw"
              : activeState === "mid"
              ? "0%"
              : "100%",
          scale: activeState === "outside" ? 1.1 : 1,
          opacity: activeState === "school" ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 45, damping: 14 }}
      >
        <div className="relative left-20 w-[65vw] h-[55vh] md:w-[35vw] md:h-[85vh]">
          <Image
            src={outsideImg}
            alt="Outside Mode"
            fill
            className="object-cover object-top md:object-center"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 85%, transparent 100%)",
            }}
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center md:justify-center">
        <AnimatePresence>
          {activeState === "mid" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="flex w-full md:w-auto gap-8 md:gap-24 items-center justify-center h-full pb-32 md:pb-0 px-4"
            >
              <div className="text-right flex flex-col items-end">
                <motion.h2
                  className="text-3xl md:text-6xl font-black uppercase leading-[0.9] text-alcovia-dark tracking-tighter"
                  initial={{ x: -30 }}
                  animate={{ x: 0 }}
                >
                  At <br /> <span className="text-alcovia-red">School</span>
                </motion.h2>
                <button
                  onClick={() => setActiveState("school")}
                  className="pointer-events-auto mt-2 md:mt-4 flex items-center gap-2 text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                >
                  <ArrowLeft size={14} className="md:w-4 md:h-4" /> View
                  Academic
                </button>
              </div>
              <div className="text-left flex flex-col items-start">
                <motion.h2
                  className="text-3xl md:text-6xl font-black uppercase leading-[0.9] text-alcovia-dark tracking-tighter"
                  initial={{ x: 30 }}
                  animate={{ x: 0 }}
                >
                  Outside <br />{" "}
                  <span className="text-alcovia-gold">School</span>
                </motion.h2>
                <button
                  onClick={() => setActiveState("outside")}
                  className="pointer-events-auto mt-2 md:mt-4 flex items-center gap-2 text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                >
                  View Social <ArrowRight size={14} className="md:w-4 md:h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeState === "school" && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="absolute left-6 md:left-[15%] top-[20%] md:top-1/3 w-[85%] md:w-[30vw] text-left z-40"
            >
              <h2 className="text-4xl md:text-6xl font-black uppercase leading-none mb-4 md:mb-6 text-black">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                  01.
                </span>{" "}
                <br />
                Academic <br />
                Focus
              </h2>
              <p className="text-sm md:text-lg text-gray-600 font-medium leading-relaxed">
                Dominate your academic path with scientific precision. Grades
                aren't just met; they are crushed through rigorous discipline
                and structural excellence.
              </p>

              <div className="mt-8 flex justify-start pointer-events-auto">
                <button
                  onClick={() => setActiveState("mid")}
                  className="group flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                >
                  <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
                    <X size={14} />
                  </div>
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeState === "outside" && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="absolute right-6 md:right-[15%] top-[20%] md:top-1/3 w-[85%] md:w-[30vw] text-right z-40"
            >
              <h2 className="text-4xl md:text-6xl font-black uppercase leading-none mb-4 md:mb-6 text-black">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">
                  02.
                </span>{" "}
                <br />
                Life <br />
                Skills
              </h2>
              <p className="text-sm md:text-lg text-gray-600 font-medium leading-relaxed">
                Beyond the grades, we fulfill the mission of differentiation.
                Building the character, grit, and network required for a future
                leader in the real world.
              </p>
              <div className="mt-8 flex justify-end pointer-events-auto">
                <button
                  onClick={() => setActiveState("mid")}
                  className="group flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
                    <X size={14} />
                  </div>
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 md:gap-6 z-50 pointer-events-auto bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm">
        <button
          onClick={() => setActiveState("school")}
          className={`h-2 rounded-full transition-all duration-300 ${
            activeState === "school"
              ? "bg-red-500 w-8 md:w-12"
              : "bg-gray-400 w-2 hover:bg-gray-600"
          }`}
          aria-label="School State"
        />
        <button
          onClick={() => setActiveState("mid")}
          className={`h-2 rounded-full transition-all duration-300 ${
            activeState === "mid"
              ? "bg-black w-8 md:w-12"
              : "bg-gray-400 w-2 hover:bg-gray-600"
          }`}
          aria-label="Mid State"
        />
        <button
          onClick={() => setActiveState("outside")}
          className={`h-2 rounded-full transition-all duration-300 ${
            activeState === "outside"
              ? "bg-yellow-500 w-8 md:w-12"
              : "bg-gray-400 w-2 hover:bg-gray-600"
          }`}
          aria-label="Outside State"
        />
      </div>
    </section>
  );
}
