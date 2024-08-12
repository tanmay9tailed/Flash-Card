"use client";
import React from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function BorderCard({
  children,
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}) {
  return (
    <div
      className={cn("bg-transparent relative text-xl  h-full w-full p-[1px] overflow-hidden ", containerClassName)}
      style={{
        borderRadius: "1.5rem",
      }}
      {...otherProps}
    >
      <div className="absolute inset-0" style={{ borderRadius: `calc(${`1.5rem`} * 0.96)` }}>
        <MovingBorder duration={duration} rx="0%" ry="0%">
          <div
            className={cn(
              "h-20 w-40 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <Card
        className={cn(
          "relative dark:bg-slate-900/[0.8] border dark:border-slate-800 bg-white backdrop-blur-xl text-slate-800 dark:text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{
          borderRadius: `calc(${"1.5rem"} * 0.96)`,
        }}
      >
        {children}
      </Card>
    </div>
  );
}

export const MovingBorder = ({ children, duration = 2000, rx, ry, ...otherProps }) => {
  const pathRef = useRef();
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
