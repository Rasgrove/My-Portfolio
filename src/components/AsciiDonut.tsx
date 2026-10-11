"use client";

import { useEffect, useRef, useState } from "react";

function renderDonut(A: number, B: number): string {
  const width = 32;
  const height = 18;
  const output: string[] = new Array(width * height).fill(" ");
  const zbuf: number[] = new Array(width * height).fill(0);

  for (let j = 0; j < 6.28; j += 0.09) {
    for (let i = 0; i < 6.28; i += 0.03) {
      const sinI = Math.sin(i), cosI = Math.cos(i);
      const sinJ = Math.sin(j), cosJ = Math.cos(j);
      const sinA = Math.sin(A), cosA = Math.cos(A);
      const sinB = Math.sin(B), cosB = Math.cos(B);
      const h = cosJ + 2;
      const D = 1 / (sinI * h * sinA + sinJ * cosA + 5);
      const t = sinI * h * cosA - sinJ * sinA;
      const x = Math.floor(width / 2 + (width * 0.75) * D * (cosI * h * cosB - t * sinB));
      const y = Math.floor(height / 2 + (height * 1.1) * D * (cosI * h * sinB + t * cosB));
      const o = x + width * y;
      const L = Math.floor(8 * ((sinJ * sinA - sinI * cosJ * cosA) * cosB - sinI * cosJ * sinA - sinJ * cosA - cosI * cosJ * sinB));
      if (y >= 0 && y < height && x >= 0 && x < width && D > zbuf[o]) {
        zbuf[o] = D;
        output[o] = ".,-~:;=!*#$@"[Math.max(0, L)] ?? ".";
      }
    }
  }

  let frame = "";
  for (let i = 0; i < height; i++) {
    frame += output.slice(i * width, (i + 1) * width).join("") + "\n";
  }
  return frame;
}

export default function AsciiDonut({ visible }: { visible: boolean }) {
  const [frame, setFrame] = useState("");
  const A = useRef(0);
  const B = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!visible) { cancelAnimationFrame(rafRef.current); return; }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () => {
      A.current += 0.04;  // slower
      B.current += 0.018; // slower
      setFrame(renderDonut(A.current, B.current));
      if (!reduced) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible]);

  if (!visible) return null;

  return (
    <pre
      className="ascii-donut"
      aria-label="Rotating ASCII donut easter egg"
      role="img"
    >
      {frame}
    </pre>
  );
}
