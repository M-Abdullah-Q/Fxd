"use client";

import { useEffect, useRef } from "react";

interface FluidBGProps {
  className?: string;
}

export default function FluidBG({ className = "" }: FluidBGProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const COLOR_RED = "#D93025";
    const COLOR_GOLD = "#D4AF37";
    const COLOR_GRAY = "#E5E5E5";
    const BG_COLOR = "#F9F9F7";

    const lines = [
      {
        color: COLOR_GRAY,
        speed: 0.002,
        amplitude: 40,
        yPct: 0.15,
        thickness: 1,
      },
      {
        color: COLOR_GOLD,
        speed: 0.003,
        amplitude: 60,
        yPct: 0.3,
        thickness: 1.5,
      },
      {
        color: COLOR_GRAY,
        speed: 0.002,
        amplitude: 30,
        yPct: 0.45,
        thickness: 1,
      },
      {
        color: COLOR_RED,
        speed: 0.004,
        amplitude: 80,
        yPct: 0.6,
        thickness: 1.5,
      },
      {
        color: COLOR_GRAY,
        speed: 0.001,
        amplitude: 50,
        yPct: 0.75,
        thickness: 1,
      },
      {
        color: COLOR_GOLD,
        speed: 0.002,
        amplitude: 25,
        yPct: 0.9,
        thickness: 1,
      },
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawWave = (
      yBase: number,
      color: string,
      amplitude: number,
      frequency: number,
      phase: number,
      thickness: number
    ) => {
      if (!ctx) return;
      ctx.beginPath();
      ctx.lineWidth = thickness;
      ctx.strokeStyle = color;

      for (let x = 0; x <= canvas.width; x += 5) {
        const y =
          yBase +
          Math.sin(x * frequency + phase) * amplitude +
          Math.sin(x * frequency * 2 + phase * 0.5) * (amplitude / 2);

        ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const render = () => {
      if (!ctx) return;

      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line, i) => {
        const frequency = 0.001 + i * 0.0002;
        const yPixel = canvas.height * line.yPct;

        drawWave(
          yPixel,
          line.color,
          line.amplitude,
          frequency,
          time * line.speed + i * 10,
          line.thickness
        );
      });

      time += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-screen h-screen pointer-events-none -z-50 ${className}`}
    />
  );
}
