"use client";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Book, Trophy, Target, Zap, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Experience() {
  const containerRef = useRef(null);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPct = clientX / window.innerWidth - 0.5;
      const yPct = clientY / window.innerHeight - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const boyRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const boyRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const globalX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.5, 0.6],
    ["0%", "0%", "30%", "30%", "-30%"]
  );
  const globalY = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6],
    ["-35vh", "-35vh", "0vh"]
  );
  const globalScale = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6],
    [0.9, 0.9, 2.2]
  );
  const ringRotateX = useTransform(scrollYProgress, [0, 0.5, 0.6], [75, 75, 0]);
  const ringRotateZ = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const orbitAngle = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [0, Math.PI, Math.PI + 2 * Math.PI]
  );
  const squashFactor = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6],
    [0.26, 0.26, 1]
  );
  const boyScale = useTransform(scrollYProgress, [0, 0.2, 0.6], [1, 1.1, 1]);
  const boyX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.5, 0.6],
    ["0%", "0%", "30%", "30%", "-30%"]
  );
  const boyOpacity = useTransform(scrollYProgress, [0.5, 0.55], [1, 0]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const manifestoOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.25, 0.45, 0.5],
    [0, 1, 1, 0]
  );
  const gifOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);

  const offeringCards = [
    {
      title: "Mentorship from Professionals",
      desc: "Learn directly from CEOs and industry veterans who have already walked the path. Gain the tactical edge that textbooks can't provide.",
      icon: <Trophy size={20} />,
    },
    {
      title: "Self Discovery",
      desc: "Through rigorous challenges and introspection, identify your unique strengths and align them with your long-term ambitions.",
      icon: <Target size={20} />,
    },
    {
      title: "Build Leadership",
      desc: "Leadership isn't taught, it's forged. Take ownership of high-stakes projects and learn how to move people and ideas.",
      icon: <Zap size={20} />,
    },
    {
      title: "Meet future Builders",
      desc: "Surround yourself with a high-agency tribe. Your network is your net worth, and here, you build it with the best.",
      icon: <Book size={20} />,
    },
  ];

  return (
    <div ref={containerRef} className="">
      {/*DST*/}
      <div className="hidden md:block relative h-[600vh] perspective-1000">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-end pr-100">
          <motion.div
            style={{ opacity: heroOpacity }}
            className="absolute inset-0 w-full h-full flex items-center justify-between px-4 md:px-8 z-30 pointer-events-none"
          >
            <h1 className="text-[9vw] font-heading font-bold uppercase leading-[0.8]">
              Future <br /> <span className="text-red-600">Builders</span>
            </h1>
            <h1 className="text-[9vw] font-heading font-bold uppercase leading-[0.8] text-right ">
              Start <br /> <span className="text-yellow-500">Here</span>
            </h1>
          </motion.div>

          <motion.div
            style={{ opacity: manifestoOpacity }}
            className="absolute inset-0 w-full h-full flex items-center px-10 md:px-20 z-30 pointer-events-none"
          >
            <div className="w-1/2">
              <p className="text-4xl md:text-5xl font-heading font-bold uppercase leading-tight ">
                Unprecedented{" "}
                <span className="text-alcovia-gold font-serif italic lowercase">
                  Learnings
                </span>
                , Failing regularly,{" "}
                <span className="text-alcovia-gold font-serif italic lowercase">
                  building
                </span>{" "}
                with friends, while being on a journey of self{" "}
                <span className="text-alcovia-gold font-serif italic lowercase">
                  discovery
                </span>
                . Get on a{" "}
                <span className="text-alcovia-gold font-serif italic lowercase">
                  legacy
                </span>{" "}
                building journey today, to build the future of tomorrow...
              </p>
            </div>
          </motion.div>

          <motion.div
            style={{ x: boyX, scale: boyScale, opacity: boyOpacity }}
            className="relative z-20 w-[60vh] h-[110vh] perspective-1000"
          >
            <motion.div
              style={{ rotateX: boyRotateX, rotateY: boyRotateY }}
              className="w-full h-full relative"
            >
              <Image
                src="/Hero.png"
                alt="Alcovian Boy"
                fill
                className="object-cover rounded-t-[100px]"
                priority
              />
            </motion.div>
          </motion.div>

          <motion.div
            style={{
              x: globalX,
              y: globalY,
              scale: globalScale,
              opacity: gifOpacity,
            }}
            className="absolute z-10 w-[60vh] h-[60vh] rounded-full overflow-hidden flex items-center justify-center bg-black/5"
          >
            <Image
              src="/Crz.gif"
              alt="Center Animation"
              fill
              className="object-cover opacity-80 mix-blend-multiply"
            />
          </motion.div>

          <motion.div
            style={{
              x: globalX,
              y: globalY,
              scale: globalScale,
              rotateX: ringRotateX,
              rotateZ: ringRotateZ,
            }}
            className="absolute z-10 w-[60vh] h-[60vh] border-[24px] border-yellow-500 rounded-full shadow-[0_0_40px_rgba(255,215,0,0.4)]"
          />

          <motion.div
            style={{ x: globalX, y: globalY, scale: globalScale }}
            className="absolute z-30 w-[60vh] h-[60vh] flex items-center justify-center pointer-events-none"
          >
            {[Book, Trophy, Target, Zap].map((Icon, i) => (
              <OrbitingIcon
                key={i}
                index={i}
                icon={Icon}
                angle={orbitAngle}
                squash={squashFactor}
              />
            ))}
          </motion.div>

          <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-end px-32">
            <div className="w-1/2 h-[50vh] relative">
              {offeringCards.map((card, i) => (
                <OfferingCard
                  key={i}
                  item={card}
                  index={i}
                  total={offeringCards.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*MOB*/}
      <div className="block md:hidden relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-70">
          <FloatingIcon
            icon={<Trophy />}
            top="30%"
            left="10%"
            color="text-yellow-500"
            delay={0}
          />
          <FloatingIcon
            icon={<Target />}
            top="15%"
            right="15%"
            color="text-red-500"
            delay={1}
          />
          <FloatingIcon
            icon={<Zap />}
            top="50%"
            left="5%"
            color="text-yellow-500"
            delay={2}
          />
          <FloatingIcon
            icon={<Book />}
            top="75%"
            right="10%"
            color="text-red-500"
            delay={1.5}
          />
          <FloatingIcon
            icon={<Trophy />}
            top="90%"
            left="20%"
            color="text-red-500"
            delay={0.5}
          />
        </div>

        <div className="min-h-[70vh] flex flex-col justify-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-[14vw] font-heading font-bold uppercase leading-[0.85] text-black">
              Future <br /> <span className="text-red-600">Builders</span>
            </h1>
            <div className="relative w-40 h-40 mx-auto my-8 border-4 border-yellow-500 rounded-full overflow-hidden shadow-2xl">
              <Image
                src="/Crz.gif"
                alt="Center Anim"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-[14vw] font-heading font-bold uppercase leading-[0.85] text-right text-black">
              Start <br /> <span className=" text-yellow-500">Here</span>
            </h1>
          </motion.div>
        </div>

        <div className="px-6 py-20 relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-heading font-bold uppercase leading-tight text-gray-800"
          >
            Unprecedented{" "}
            <span className="text-yellow-500 font-serif italic lowercase">
              Learnings
            </span>
            , Failing regularly, building with friends... build the future of
            tomorrow.
          </motion.p>
        </div>

        <div className="px-6 pb-24 relative z-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
            Our Offerings
          </h2>
          <div className="space-y-3">
            {offeringCards.map((item, i) => (
              <div key={i} className="border-b border-gray-200">
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === i ? null : i)
                  }
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`p-2 rounded-lg ${
                        i % 2 === 0
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`text-xl font-heading font-bold uppercase tracking-tight ${
                        activeAccordion === i ? "text-black" : "text-gray-500"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: activeAccordion === i ? 180 : 0 }}
                    className="text-gray-400"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeAccordion === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-gray-600 text-lg leading-relaxed pr-4">
                        {item.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingIcon({ icon, top, left, right, color, delay }: any) {
  return (
    <motion.div
      style={{ position: "absolute", top, left, right }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
      }}
      className={`${color}`}
    >
      {icon}
    </motion.div>
  );
}

function OfferingCard({ item, index, total, scrollYProgress }: any) {
  const carouselStart = 0.6;
  const carouselEnd = 1.0;
  const rangeLength = carouselEnd - carouselStart;
  const step = rangeLength / total;
  const showStart = carouselStart + index * step;
  const showEnd = showStart + step;

  const opacity = useTransform(
    scrollYProgress,
    [showStart, showStart + 0.02, showEnd - 0.02, showEnd],
    [0, 1, 1, 0]
  );
  const x = useTransform(
    scrollYProgress,
    [showStart, showStart + 0.05],
    [50, 0]
  );

  return (
    <motion.div
      style={{ opacity, x }}
      className="absolute inset-0 flex flex-col justify-center items-end text-right"
    >
      <div className="backdrop-blur-3xl bg-white/100 p-12 rounded-3xl border border-white/20 shadow-2xl max-w-xl">
        <h3
          className={`text-5xl font-heading font-bold uppercase mb-4 ${
            index % 2 === 0 ? "text-yellow-500" : "text-red-600"
          }`}
        >
          {item.title}
        </h3>
        <p className="text-xl text-gray-700 font-medium leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

function OrbitingIcon({ index, icon: Icon, angle, squash }: any) {
  const offset = index * (Math.PI / 2);
  const radius = 30;

  const x = useTransform(
    angle,
    (a: number) => `${Math.cos(a + offset) * radius}vh`
  );
  const y = useTransform(
    [angle, squash],
    ([a, s]: any) => `${Math.sin(a + offset) * radius * s}vh`
  );
  const zIndex = useTransform([angle], ([a]: any) =>
    Math.sin(a + offset) < 0 ? 15 : 50
  );

  return (
    <motion.div
      style={{ x, y, zIndex }}
      className="absolute p-4 rounded-full bg-white shadow-lg text-red-600 border border-gray-100 flex items-center justify-center"
    >
      <Icon size={32} strokeWidth={2} />
    </motion.div>
  );
}
