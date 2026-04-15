"use client";

import { useEffect, useRef } from "react";

export default function ServerBackground() {
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

    // ── Config ───────────────────────────────────────────────
    const RACK_WIDTH   = 210;
    const RACK_GAP     = 32;
    const UNIT_HEIGHT  = 32;
    const LEDS_PER_ROW = 4;

    const GREEN_SHADES = ["#00FF41", "#00E536", "#39FF14", "#00FF7F", "#00FA9A"];
    const AMBER        = "#FFB800";
    const RED_LED      = "#FF3A3A";

    // ── Types ────────────────────────────────────────────────
    type Led = {
      x: number; y: number;
      phase: number; speed: number;
      color: string; active: boolean;
      size: number;
    };

    type Packet = {
      x: number; rackX: number;
      y: number; vy: number;
      alpha: number; color: string;
      life: number; maxLife: number;
    };

    // ── Build racks ──────────────────────────────────────────
    const buildRacks = () => {
      const W = canvas.width;
      const H = canvas.height;
      const NUM_RACKS = Math.ceil(W / (RACK_WIDTH + RACK_GAP)) + 1;
      const numUnits = Math.floor(H / UNIT_HEIGHT);

      const racks: { x: number; units: { leds: Led[]; hasBar: boolean }[] }[] = [];

      for (let r = 0; r < NUM_RACKS; r++) {
        const rx = r * (RACK_WIDTH + RACK_GAP);
        const units = [];
        for (let u = 0; u < numUnits; u++) {
          const leds: Led[] = [];
          for (let l = 0; l < LEDS_PER_ROW; l++) {
            const rand = Math.random();
            const color = rand < 0.76
              ? GREEN_SHADES[Math.floor(Math.random() * GREEN_SHADES.length)]
              : rand < 0.91 ? AMBER : RED_LED;
            leds.push({
              x: rx + 14 + l * 22,
              y: u * UNIT_HEIGHT + 13,
              phase: Math.random() * Math.PI * 2,
              speed: 0.3 + Math.random() * 2.2,
              color,
              active: Math.random() > 0.42,
              size: 1.8 + Math.random() * 1.2,
            });
          }
          units.push({ leds, hasBar: Math.random() > 0.3 });
        }
        racks.push({ x: rx, units });
      }
      return { racks, H };
    };

    let { racks, H: RACK_HEIGHT } = buildRacks();

    // ── Data packets ─────────────────────────────────────────
    const packets: Packet[] = [];
    const spawnPacket = () => {
      if (racks.length === 0) return;
      const rack = racks[Math.floor(Math.random() * racks.length)];
      const col = Math.floor(Math.random() * LEDS_PER_ROW);
      const activeUnit = rack.units.find(u => u.leds[col]?.active);
      if (!activeUnit) return;
      const led = activeUnit.leds[col];
      const goDown = Math.random() > 0.5;
      const maxLife = 40 + Math.random() * 60;
      packets.push({
        x: led.x,
        rackX: rack.x,
        y: goDown ? 0 : RACK_HEIGHT,
        vy: goDown ? 2.5 + Math.random() * 2 : -(2.5 + Math.random() * 2),
        alpha: 0,
        color: led.color,
        life: 0,
        maxLife,
      });
    };

    let t = 0;
    let frameCount = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // ── Background ──
      ctx.fillStyle = "#030805";
      ctx.fillRect(0, 0, W, H);

      // ── Scanlines ──
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = "rgba(0,0,0,0.10)";
        ctx.fillRect(0, y, W, 1);
      }

      // ── Racks ──
      racks.forEach((rack) => {
        // Chassis gradient
        const grad = ctx.createLinearGradient(rack.x, 0, rack.x + RACK_WIDTH, 0);
        grad.addColorStop(0,   "rgba(6,16,8,0.92)");
        grad.addColorStop(0.45, "rgba(10,24,12,0.97)");
        grad.addColorStop(1,   "rgba(6,16,8,0.92)");
        ctx.fillStyle = grad;
        ctx.fillRect(rack.x, 0, RACK_WIDTH, H);

        // Edge rails
        ctx.strokeStyle = "rgba(0,220,60,0.14)";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(rack.x + 0.5, 0); ctx.lineTo(rack.x + 0.5, H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(rack.x + RACK_WIDTH - 0.5, 0); ctx.lineTo(rack.x + RACK_WIDTH - 0.5, H); ctx.stroke();

        // Inner shadow rails
        ctx.strokeStyle = "rgba(0,255,80,0.04)";
        ctx.beginPath(); ctx.moveTo(rack.x + 4, 0); ctx.lineTo(rack.x + 4, H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(rack.x + RACK_WIDTH - 4, 0); ctx.lineTo(rack.x + RACK_WIDTH - 4, H); ctx.stroke();

        // ── Unit rows ──
        rack.units.forEach((unit, ui) => {
          const uy = ui * UNIT_HEIGHT;

          // Row separator
          ctx.strokeStyle = "rgba(0,255,60,0.05)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(rack.x + 3, uy);
          ctx.lineTo(rack.x + RACK_WIDTH - 3, uy);
          ctx.stroke();

          // Unit body
          if (unit.hasBar) {
            ctx.fillStyle = "rgba(0,35,8,0.5)";
            ctx.fillRect(rack.x + 6, uy + 3, RACK_WIDTH - 12, UNIT_HEIGHT - 6);
          }

          // ── LEDs ──
          unit.leds.forEach((led) => {
            if (!led.active) return;
            const flicker = Math.sin(t * led.speed + led.phase);
            const brightness = Math.max(0, 0.5 + 0.5 * flicker);

            // Soft glow
            const glow = ctx.createRadialGradient(led.x, led.y, 0, led.x, led.y, 7);
            const glowHex = Math.floor(brightness * 32).toString(16).padStart(2, "0");
            glow.addColorStop(0, `${led.color}${glowHex}`);
            glow.addColorStop(1, "transparent");
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(led.x, led.y, 7, 0, Math.PI * 2);
            ctx.fill();

            // Core dot
            ctx.globalAlpha = 0.4 + 0.4 * brightness;
            ctx.fillStyle = led.color;
            ctx.beginPath();
            ctx.arc(led.x, led.y, led.size * 0.85, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          });
        });
      });

      // ── Data packets ──
      if (frameCount % 30 === 0 && Math.random() > 0.65) spawnPacket();

      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.y += p.vy;
        p.life++;
        const prog = p.life / p.maxLife;
        p.alpha = prog < 0.2 ? prog / 0.2 : prog > 0.8 ? (1 - prog) / 0.2 : 1;

        if (p.life >= p.maxLife || p.y < -10 || p.y > H + 10) {
          packets.splice(i, 1);
          continue;
        }

        // Packet trail
        const trailLen = 10;
        for (let j = 0; j < trailLen; j++) {
          const ty = p.y - p.vy * (j * 0.5);
          const ta = p.alpha * (1 - j / trailLen) * 0.5;
          ctx.globalAlpha = ta;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, ty, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Packet dot
        ctx.globalAlpha = p.alpha * 0.8;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // ── Vignette (wide enough to cover edge racks) ──
      const vW = RACK_WIDTH + RACK_GAP + 10;
      const vL = ctx.createLinearGradient(0, 0, vW, 0);
      vL.addColorStop(0, "rgba(3,8,5,1)");
      vL.addColorStop(1, "transparent");
      ctx.fillStyle = vL; ctx.fillRect(0, 0, vW, H);

      const vR = ctx.createLinearGradient(W - vW, 0, W, 0);
      vR.addColorStop(0, "transparent");
      vR.addColorStop(1, "rgba(3,8,5,1)");
      ctx.fillStyle = vR; ctx.fillRect(W - vW, 0, vW, H);

      const vT = ctx.createLinearGradient(0, 0, 0, 40);
      vT.addColorStop(0, "rgba(3,8,5,0.7)");
      vT.addColorStop(1, "transparent");
      ctx.fillStyle = vT; ctx.fillRect(0, 0, W, 40);

      const vB = ctx.createLinearGradient(0, H - 40, 0, H);
      vB.addColorStop(0, "transparent");
      vB.addColorStop(1, "rgba(3,8,5,0.7)");
      ctx.fillStyle = vB; ctx.fillRect(0, H - 40, W, 40);

      t += 0.022;
      frameCount++;
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
        top: "-25%",
        left: 0,
        width: "100%",
        height: "150%",
        opacity: 0.55,
        pointerEvents: "none",
      }}
    />
  );
}
