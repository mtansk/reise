"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

interface ParticleEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  colorClass?: string;
  count?: number;
}

export function ParticleEffect({
  children,
  icon,
  colorClass,
  count = 6,
  className,
  onClick,
  ...props
}: ParticleEffectProps) {
  const [particles, setParticles] = useState<
    { id: number }[]
  >([]);
  const idCounter = useRef(0);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);

      const newParticles = Array.from({
        length: count,
      }).map(() => ({
        id: idCounter.current++,
      }));
      setParticles((prev) => [...prev, ...newParticles]);
    },
    [count, onClick],
  );

  const removeParticle = (id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div
      className={cn("relative inline-block", className)}
      onClick={handleClick}
      {...props}
    >
      {children}

      {particles.map((p) => (
        <Particle
          key={p.id}
          icon={icon}
          colorClass={colorClass}
          onComplete={() => removeParticle(p.id)}
        />
      ))}
    </div>
  );
}

function Particle({
  icon: Icon,
  colorClass,
  onComplete,
}: {
  icon: LucideIcon;
  colorClass?: string;
  onComplete: () => void;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
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
      if (!isMounted.current) return;

      x += vx;
      y += vy;
      r += vr;
      vy += 0.3; // gravity

      let opacity = 1;
      if (y > 20) {
        opacity = Math.max(0, 1 - (y - 20) / 40);
      }

      if (node) {
        node.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${r}deg)`;
        node.style.opacity = opacity.toString();
      }

      if (y > 60 || opacity <= 0) {
        onComplete();
      } else {
        frame = requestAnimationFrame(update);
      }
    };

    frame = requestAnimationFrame(update);
    return () => {
      isMounted.current = false;
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={nodeRef}
      className={cn(
        "pointer-events-none absolute top-1/2 left-1/2 z-5000 -mt-2",
        colorClass,
      )}
    >
      <Icon size={14} />
    </div>
  );
}
