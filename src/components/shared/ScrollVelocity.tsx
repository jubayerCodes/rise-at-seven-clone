// "use client";

// import React, { useRef, useLayoutEffect, useState } from "react";
// import {
//   motion,
//   useScroll,
//   useSpring,
//   useTransform,
//   useMotionValue,
//   useVelocity,
//   useAnimationFrame,
// } from "motion/react";

// interface VelocityMapping {
//   input: [number, number];
//   output: [number, number];
// }

// interface VelocityTextProps {
//   children: React.ReactNode;
//   baseVelocity: number;
//   scrollContainerRef?: React.RefObject<HTMLElement>;
//   className?: string;
//   damping?: number;
//   stiffness?: number;
//   numCopies?: number;
//   velocityMapping?: VelocityMapping;
//   parallaxClassName?: string;
//   scrollerClassName?: string;
//   parallaxStyle?: React.CSSProperties;
//   scrollerStyle?: React.CSSProperties;
// }

// interface ScrollVelocityProps {
//   scrollContainerRef?: React.RefObject<HTMLElement>;
//   texts: string[];
//   velocity?: number;
//   className?: string;
//   damping?: number;
//   stiffness?: number;
//   numCopies?: number;
//   velocityMapping?: VelocityMapping;
//   parallaxClassName?: string;
//   scrollerClassName?: string;
//   parallaxStyle?: React.CSSProperties;
//   scrollerStyle?: React.CSSProperties;
// }

// function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
//   const [width, setWidth] = useState(0);

//   useLayoutEffect(() => {
//     function updateWidth() {
//       if (ref.current) {
//         setWidth(ref.current.offsetWidth);
//       }
//     }
//     updateWidth();
//     window.addEventListener("resize", updateWidth);
//     return () => window.removeEventListener("resize", updateWidth);
//   }, [ref]);

//   return width;
// }

// export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
//   scrollContainerRef,
//   texts = [],
//   velocity = 100,
//   className = "",
//   damping = 50,
//   stiffness = 400,
//   numCopies = 6,
//   velocityMapping = { input: [0, 1000], output: [0, 5] },
//   parallaxClassName,
//   scrollerClassName,
//   parallaxStyle,
//   scrollerStyle,
// }) => {
//   function VelocityText({
//     children,
//     baseVelocity = velocity,
//     scrollContainerRef,
//     className = "",
//     damping,
//     stiffness,
//     numCopies,
//     velocityMapping,
//     parallaxClassName,
//     scrollerClassName,
//     parallaxStyle,
//     scrollerStyle,
//   }: VelocityTextProps) {
//     const baseX = useMotionValue(0);
//     const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
//     const { scrollY } = useScroll(scrollOptions);
//     const scrollVelocity = useVelocity(scrollY);
//     const smoothVelocity = useSpring(scrollVelocity, {
//       damping: damping ?? 50,
//       stiffness: stiffness ?? 400,
//     });
//     const velocityFactor = useTransform(
//       smoothVelocity,
//       velocityMapping?.input || [0, 1000],
//       velocityMapping?.output || [0, 5],
//       { clamp: false },
//     );

//     const copyRef = useRef<HTMLSpanElement>(null);
//     const copyWidth = useElementWidth(copyRef);

//     function wrap(min: number, max: number, v: number): number {
//       const range = max - min;
//       const mod = (((v - min) % range) + range) % range;
//       return mod + min;
//     }

//     const x = useTransform(baseX, (v: number) => {
//       if (copyWidth === 0) return "0px";
//       return `${wrap(-copyWidth, 0, v)}px`;
//     });

//     const directionFactor = useRef<number>(1);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     useAnimationFrame((t: any, delta: number) => {
//       let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

//       if (velocityFactor.get() < 0) {
//         directionFactor.current = -1;
//       } else if (velocityFactor.get() > 0) {
//         directionFactor.current = 1;
//       }

//       moveBy += directionFactor.current * moveBy * velocityFactor.get();
//       baseX.set(baseX.get() + moveBy);
//     });

//     const spans = [];
//     for (let i = 0; i < numCopies!; i++) {
//       spans.push(
//         <span className={`shrink-0 ${className}`} key={i} ref={i === 0 ? copyRef : null}>
//           {children}
//         </span>,
//       );
//     }

//     return (
//       <div className={`${parallaxClassName} relative overflow-hidden`} style={parallaxStyle}>
//         <motion.div
//           className={`${scrollerClassName} flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-20`}
//           style={{ x, ...scrollerStyle }}
//         >
//           {spans}
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <section>
//       {texts.map((text: string, index: number) => (
//         <VelocityText
//           key={index}
//           className={className}
//           baseVelocity={index % 2 !== 0 ? -velocity : velocity}
//           scrollContainerRef={scrollContainerRef}
//           damping={damping}
//           stiffness={stiffness}
//           numCopies={numCopies}
//           velocityMapping={velocityMapping}
//           parallaxClassName={parallaxClassName}
//           scrollerClassName={scrollerClassName}
//           parallaxStyle={parallaxStyle}
//           scrollerStyle={scrollerStyle}
//         >
//           {text}&nbsp;
//         </VelocityText>
//       ))}
//     </section>
//   );
// };

// export default ScrollVelocity;

"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "motion/react";

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

// Each segment in a row is either text or an image
type MarqueeSegment = { type: "text"; value: string } | { type: "image"; src: string; alt?: string };

interface MarqueeItem {
  segments: MarqueeSegment[];
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  items: MarqueeItem[];
  velocity?: number;
  direction?: "left" | "right" | "alternate";
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  imageSize?: number;
  imageBorderRadius?: number | string;
  imageClassName?: string;
  imageGap?: number;
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  items = [],
  velocity = 100,
  direction = "alternate",
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
  imageSize = 80,
  imageBorderRadius = 12,
  imageClassName = "",
  imageGap = 0.15,
}) => {
  function VelocityText({
    children,
    baseVelocity,
    scrollContainerRef,
    className = "",
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
  }: VelocityTextProps) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400,
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false },
    );

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min: number, max: number, v: number): number {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, (v: number) => {
      if (copyWidth === 0) return "0px";
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef<number>(1);
    useAnimationFrame((_t: unknown, delta: number) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < numCopies!; i++) {
      spans.push(
        <span className={`shrink-0 inline-flex items-center ${className}`} key={i} ref={i === 0 ? copyRef : null}>
          {children}
        </span>,
      );
    }

    return (
      <div className={`${parallaxClassName ?? ""} relative overflow-hidden`} style={parallaxStyle}>
        <motion.div
          className={`${scrollerClassName ?? ""} flex items-center whitespace-nowrap font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-20`}
          style={{ x, ...scrollerStyle }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  function resolveVelocity(index: number): number {
    if (direction === "left") return -Math.abs(velocity);
    if (direction === "right") return Math.abs(velocity);
    return index % 2 === 0 ? Math.abs(velocity) : -Math.abs(velocity);
  }

  // Render all segments in a single row inline
  function renderSegments(segments: MarqueeSegment[]) {
    return segments.map((segment, i) => {
      if (segment.type === "text") {
        return (
          <span key={i} className="inline-block align-middle mx-2">
            {segment.value}
          </span>
        );
      }

      return (
        <span
          key={i}
          className="inline-block align-middle"
          style={{
            position: "relative",
            width: imageSize,
            height: imageSize,
            borderRadius: imageBorderRadius,
            overflow: "hidden",
            flexShrink: 0,
            margin: `0 ${imageGap}em`,
          }}
        >
          <Image
            src={segment.src}
            alt={segment.alt ?? ""}
            fill
            sizes={`${imageSize}px`}
            className={`object-cover ${imageClassName}`}
          />
        </span>
      );
    });
  }

  return (
    <section>
      {items.map((item, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={resolveVelocity(index)}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {renderSegments(item.segments)}
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
