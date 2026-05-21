import { useRef, useEffect, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
import { Link } from "@tanstack/react-router";

interface DraggableMarqueeProps {
  items: { name: string; url: string; id?: string }[];
  baseVelocity?: number;
}

export function DraggableMarquee({ items, baseVelocity = -1.8 }: DraggableMarqueeProps) {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // We multiply the items to ensure enough coverage for infinite scroll
  const duplicatedItems = [...items, ...items, ...items, ...items];

  useEffect(() => {
    if (containerRef.current) {
      const fullWidth = containerRef.current.scrollWidth;
      setContainerWidth(fullWidth / 4);
    }
  }, [items]);

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 20);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(0, -containerWidth, v)}px`);

  return (
    <div className="overflow-hidden cursor-grab active:cursor-grabbing select-none">
      <motion.div
        className="flex items-center gap-16 md:gap-32 whitespace-nowrap"
        ref={containerRef}
        style={{ x }}
        drag="x"
        onDrag={(event, info) => {
          baseX.set(baseX.get() + info.delta.x);
        }}
        dragMomentum={true}
        dragTransition={{ power: 0.2, timeConstant: 200 }}
      >
        {duplicatedItems.map((logo, i) => (
          <Link
            key={`${logo.name}-${i}`}
            to={(["natrave", "solid", "symplice", "maxi"].includes(logo.name.toLowerCase()) 
              ? `/${logo.name.toLowerCase()}` 
              : `/trabalho`) as string}
            className="flex items-center justify-center min-w-[250px] md:min-w-[500px] shrink-0 group transition-transform hover:scale-105 duration-500 active:scale-95"
          >
            <img
              src={logo.url}
              alt={logo.name}
              className="h-[140px] md:h-[220px] w-auto object-contain transition-all duration-500"
              draggable={false}
            />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
