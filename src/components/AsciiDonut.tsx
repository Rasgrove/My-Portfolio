"use client";

import { useEffect, useRef, useState } from "react";

function renderDonut(A: number, B: number): string {
  const width = 24;
  const height = 12;
  const output: string[] = new Array(width * height).fill(" ");
  const zbuf: number[] = new Array(width * height).fill(0);

  for (let j = 0; j < 6.28; j += 0.12) {
    for (let i = 0; i < 6.28; i += 0.04) {
      const sinI = Math.sin(i), cosI = Math.cos(i);
      const sinJ = Math.sin(j), cosJ = Math.cos(j);
      const sinA = Math.sin(A), cosA = Math.cos(A);
      const sinB = Math.sin(B), cosB = Math.cos(B);
      const h = cosJ + 2;
      const D = 1 / (sinI * h * sinA + sinJ * cosA + 7.2); // +7.2 = zoom alejado
      const t = sinI * h * cosA - sinJ * sinA;
      const x = Math.floor(width / 2 + (width * 0.48) * D * (cosI * h * cosB - t * sinB));
      const y = Math.floor(height / 2 + (height * 0.72) * D * (cosI * h * sinB + t * cosB));
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
      A.current += 0.035;
      B.current += 0.016;
      setFrame(renderDonut(A.current, B.current));
      if (!reduced) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible]);

  if (!visible) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
      <pre
        className="ascii-donut"
        aria-label="Rotating ASCII donut easter egg"
        role="img"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(0.38rem, 0.6vw, 0.46rem)",
          lineHeight: 0.88,
          color: "var(--lime)",
          margin: 0,
          padding: 0,
          userSelect: "none",
          textShadow: "0 0 6px rgba(214, 244, 73, 0.25)",
        }}
      >
        {frame}
      </pre>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.5rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(242, 237, 230, 0.25)",
        }}
      >
        ASCII DONUT // 3D ENGINE
      </span>
    </div>
  );
}

