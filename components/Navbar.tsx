"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const pillarVariants: Variants = {
    closed: { y: "-100%" },
    open: (i: number) => ({
      y: "0%",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: i * 0.05,
      },
    }),
    exit: (i: number) => ({
      y: "-100%",
      transition: {
        duration: 0.4,
        ease: [0.17, 0.67, 0.83, 0.67],
        delay: i * 0.05,
      },
    }),
  };

  const containerVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: { delay: 0.5, staggerChildren: 0.1 },
    },
    exit: { opacity: 0 },
  };

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Academics", href: "#" },
    { title: "Admissions", href: "#" },
    { title: "Student Life", href: "#" },
    { title: "Contact", href: "#" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-8 py-6 mix-blend-difference text-white"
      >
        <div className="relative h-10 w-auto z-50 invert">
          <Image
            src="https://framerusercontent.com/images/IzMoibv1vcY7ioP3xoTVsaJIA.png"
            alt="Alcovia Logo"
            height={40}
            width={160}
            className="object-contain select-none pointer-events-none"
          />
        </div>

        <motion.button
          onClick={toggleMenu}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-50 p-3 rounded-full bg-black/10 backdrop-blur-md hover:bg-black/90 transition-all group"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={28} className="text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={28} className="text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 flex h-screen w-screen pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={pillarVariants}
                initial="closed"
                animate="open"
                exit="exit"
                className="relative h-full w-1/5 bg-alcovia-red border-r border-white/5 last:border-r-0 pointer-events-auto"
              />
            ))}
            <motion.div
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50"
            >
              <ul className="flex flex-col gap-6 text-center pointer-events-auto">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={idx}
                    variants={{
                      closed: { y: 20, opacity: 0 },
                      open: { y: 0, opacity: 1 },
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl md:text-6xl font-black uppercase text-white hover:text-alcovia-gold transition-colors tracking-tighter"
                    >
                      {link.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
