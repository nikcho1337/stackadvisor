"use client";

import { useEffect, useRef } from "react";

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const GRID = 48;

    type Node = { x: number; y: number; pulse: number; phase: number };
    type Trace = { ax: number; ay: number; bx: number; by: number; flow: number; speed: number };

    const buildGrid = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cols = Math.ceil(W / GRID) + 1;
      const rows = Math.ceil(H / GRID) + 1;

      const nodes: Node[] = [];
      const traces: Trace[] = [];

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          if (Math.random() > 0.55) continue;
          nodes.push({
            x: c * GRID + (Math.random() - 0.5) * 10,
            y: r * GRID + (Math.random() - 0.5) * 10,
            pulse: Math.random(),
            phase: Math.random() * Math.PI * 2,
          });
        }
      }

      // Connect nearby nodes with horizontal/vertical traces
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = Math.abs(nodes[i].x - nodes[j].x);
          const dy = Math.abs(nodes[i].y - nodes[j].y);
          if (dx + dy < GRID * 1.6 && Math.random() > 0.45) {
            traces.push({
              ax: nodes[i].x, ay: nodes[i].y,
              bx: nodes[j].x, by: nodes[j].y,
              flow: Math.random(),
              speed: 0.003 + Math.random() * 0.006,
            });
          }
        }
      }

      return { nodes, traces };
    };

    let { nodes, traces } = buildGrid();
    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // ── Traces ──
      traces.forEach((tr) => {
        const prog = (tr.flow + t * tr.speed) % 1;

        // Static trace line
        ctx.strokeStyle = "rgba(37,99,235,0.06)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(tr.ax, tr.ay);
        ctx.lineTo(tr.bx, tr.by);
        ctx.stroke();

        // Moving dot along trace
        const px = tr.ax + (tr.bx - tr.ax) * prog;
        const py = tr.ay + (tr.by - tr.ay) * prog;
        const fade = prog < 0.15 ? prog / 0.15 : prog > 0.85 ? (1 - prog) / 0.15 : 1;

        ctx.globalAlpha = fade * 0.35;
        ctx.fillStyle = "#2563EB";
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // ── Nodes ──
      nodes.forEach((nd) => {
        const pulse = 0.4 + 0.6 * ((Math.sin(t * 1.2 + nd.phase) + 1) / 2);

        // Glow ring
        ctx.strokeStyle = `rgba(37,99,235,${(pulse * 0.12).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, 5, 0, Math.PI * 2);
        ctx.stroke();

        // Core dot
        ctx.fillStyle = `rgba(37,99,235,${(pulse * 0.25).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      t += 0.018;
      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
