"use client";

import type { Vibe } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { VIBE_CONFIG } from "../vibe-badge";
import type { LucideIcon } from "lucide-react";

export function VibeToggle({
  vibe,
  onPressedChange,
  pressed,
}: {
  vibe: Vibe;
  onPressedChange: (pressed: boolean) => void;
  pressed: boolean;
}) {
  const [particles, setParticles] = useState<
    { id: number }[]
  >([]);
  const config = VIBE_CONFIG[vibe];
  const Icon = config.icon;

  const handleClick = () => {
    onPressedChange(!pressed);

    const newParticles = Array.from({ length: 6 }).map(
      () => ({
        id: Math.random(),
      }),
    );
    setParticles((prev) => [...prev, ...newParticles]);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative flex cursor-pointer items-center gap-2 overflow-visible rounded-full border px-3 py-1 text-sm font-medium transition-colors duration-400",
        pressed ? config.activeClass : config.idleClass,
      )}
      type="button"
    >
      <Icon
        data-icon="inline-start"
        size={16}
        className="relative z-10"
      />
      <span className="relative z-10">{config.label}</span>

      {particles.map((p) => (
        <Particle
          key={p.id}
          icon={Icon}
          colorClass={config.particleClass}
          onComplete={() => {
            setParticles((prev) =>
              prev.filter((x) => x.id !== p.id),
            );
          }}
        />
      ))}
    </button>
  );
}

function Particle({
  icon: Icon,
  colorClass,
  onComplete,
}: {
  icon: LucideIcon;
  colorClass: string;
  onComplete: () => void;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    let x = 0;
    let y = 0;
    let r = 0;
    const vx = (Math.random() - 0.5) * 6;
    let vy = -3 - Math.random() * 5;
    const vr = (Math.random() - 0.5) * 15;
    let frame: number;

    const update = () => {
      x += vx;
      y += vy;
      r += vr;
      vy += 0.3; // gravity

      let opacity = 1;
      if (y > 20) {
        opacity = Math.max(0, 1 - (y - 20) / 40);
      }

      node.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${r}deg)`;
      node.style.opacity = opacity.toString();

      if (y > 60 || opacity <= 0) {
        onComplete();
      } else {
        frame = requestAnimationFrame(update);
      }
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={nodeRef}
      className={cn(
        "pointer-events-none absolute top-1/2 left-1/2 z-50 -mt-2",
        colorClass,
      )}
    >
      <Icon size={14} />
    </div>
  );
}
