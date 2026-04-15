"use client";

import { useEffect, useRef } from "react";

export default function CircuitBackgroundDark() {
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

    // ── Circuit config ───────────────────────────────────────
    const GRID = 52;

    // ── Server rack config ───────────────────────────────────
    const RACK_WIDTH  = 160;
    const UNIT_HEIGHT = 28;
    const LEDS_PER_ROW = 5;
    const GREEN_SHADES = ["#00FF41", "#00E536", "#39FF14", "#00FF7F"];
    const AMBER = "#FFB800";
    const RED_LED = "#FF3A3A";

    type Node  = { x: number; y: number; phase: number };
    type Trace = { ax: number; ay: number; bx: number; by: number; flow: number; speed: number };
    type Led   = { x: number; y: number; phase: number; speed: number; color: string; active: boolean };
    type Rack  = { x: number; units: { leds: Led[] }[] };

    // ── Build circuit grid ───────────────────────────────────
    const buildCircuit = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cols = Math.ceil(W / GRID) + 1;
      const rows = Math.ceil(H / GRID) + 1;
      const nodes: Node[] = [];
      const traces: Trace[] = [];

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          if (Math.random() > 0.5) continue;
          nodes.push({
            x: c * GRID + (Math.random() - 0.5) * 12,
            y: r * GRID + (Math.random() - 0.5) * 12,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = Math.abs(nodes[i].x - nodes[j].x);
          const dy = Math.abs(nodes[i].y - nodes[j].y);
          if (dx + dy < GRID * 1.7 && Math.random() > 0.5) {
            traces.push({
              ax: nodes[i].x, ay: nodes[i].y,
              bx: nodes[j].x, by: nodes[j].y,
              flow: Math.random(),
              speed: 0.002 + Math.random() * 0.005,
            });
          }
        }
      }
      return { nodes, traces };
    };

    // ── Build 3 racks (taller than section — clipped by overflow:hidden) ──
    const buildRacks = (): Rack[] => {
      const W = canvas.width;
      const H = canvas.height;
      // Racks extend 40% above and below the canvas — the section clips them
      const OVERSCAN = Math.round(H * 0.4);
      const totalHeight = H + OVERSCAN * 2;
      const numUnits = Math.ceil(totalHeight / UNIT_HEIGHT);
      // Spread to roughly align with each of the 3 cards
      const positions = [0.22, 0.50, 0.78].map(p => Math.round(W * p - RACK_WIDTH / 2));

      return positions.map(rx => {
        const units = [];
        for (let u = 0; u < numUnits; u++) {
          const leds: Led[] = [];
          for (let l = 0; l < LEDS_PER_ROW; l++) {
            const rand = Math.random();
            const color = rand < 0.75
              ? GREEN_SHADES[Math.floor(Math.random() * GREEN_SHADES.length)]
              : rand < 0.91 ? AMBER : RED_LED;
            leds.push({
              // y offset starts above canvas top
              x: rx + 16 + l * 26,
              y: -OVERSCAN + u * UNIT_HEIGHT + 14,
              phase: Math.random() * Math.PI * 2,
              speed: 0.4 + Math.random() * 1.8,
              color,
              active: Math.random() > 0.35,
            });
          }
          units.push({ leds });
        }
        return { x: rx, units };
      });
    };

    let { nodes, traces } = buildCircuit();
    const racks = buildRacks();
    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // ── Circuit traces ──
      traces.forEach((tr) => {
        const prog = (tr.flow + t * tr.speed) % 1;

        ctx.strokeStyle = "rgba(134,239,172,0.07)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(tr.ax, tr.ay);
        ctx.lineTo(tr.bx, tr.by);
        ctx.stroke();

        const px = tr.ax + (tr.bx - tr.ax) * prog;
        const py = tr.ay + (tr.by - tr.ay) * prog;
        const fade = prog < 0.15 ? prog / 0.15 : prog > 0.85 ? (1 - prog) / 0.15 : 1;
        ctx.globalAlpha = fade * 0.5;
        ctx.fillStyle = "#4ADE80";
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // ── Circuit nodes ──
      nodes.forEach((nd) => {
        const pulse = 0.4 + 0.6 * ((Math.sin(t * 1.1 + nd.phase) + 1) / 2);
        ctx.strokeStyle = `rgba(134,239,172,${(pulse * 0.18).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `rgba(134,239,172,${(pulse * 0.35).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── Server racks (light / subtle, clipped by canvas bounds) ──
      const OVERSCAN = Math.round(H * 0.4);
      racks.forEach((rack) => {
        // Chassis — full height including overscan so it fills beyond the canvas
        ctx.fillStyle = "rgba(10,20,12,0.45)";
        ctx.fillRect(rack.x, -OVERSCAN, RACK_WIDTH, H + OVERSCAN * 2);

        // Edge lines
        ctx.strokeStyle = "rgba(0,220,60,0.10)";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(rack.x + 0.5, -OVERSCAN); ctx.lineTo(rack.x + 0.5, H + OVERSCAN); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(rack.x + RACK_WIDTH - 0.5, -OVERSCAN); ctx.lineTo(rack.x + RACK_WIDTH - 0.5, H + OVERSCAN); ctx.stroke();

        rack.units.forEach((unit, ui) => {
          const uy = -OVERSCAN + ui * UNIT_HEIGHT;

          // Unit separator (skip if outside visible area)
          if (uy > -UNIT_HEIGHT && uy < H + UNIT_HEIGHT) {
            ctx.strokeStyle = "rgba(0,255,60,0.04)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(rack.x + 3, uy);
            ctx.lineTo(rack.x + RACK_WIDTH - 3, uy);
            ctx.stroke();
          }

          // LEDs
          unit.leds.forEach((led) => {
            if (!led.active) return;
            const flicker = Math.sin(t * led.speed + led.phase);
            const brightness = Math.max(0, 0.45 + 0.55 * flicker);

            // Glow
            const glow = ctx.createRadialGradient(led.x, led.y, 0, led.x, led.y, 7);
            const glowHex = Math.floor(brightness * 30).toString(16).padStart(2, "0");
            glow.addColorStop(0, `${led.color}${glowHex}`);
            glow.addColorStop(1, "transparent");
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(led.x, led.y, 7, 0, Math.PI * 2);
            ctx.fill();

            // Core dot
            ctx.globalAlpha = 0.35 + 0.35 * brightness;
            ctx.fillStyle = led.color;
            ctx.beginPath();
            ctx.arc(led.x, led.y, 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          });
        });
      });

      t += 0.022;
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
