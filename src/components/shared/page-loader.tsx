"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * PageLoader — two-phase curtain loader
 *
 * Phase 1: Solid flat rectangle covers the full screen.
 * Phase 2: A concave (inward) arch "slides in" at the bottom via
 *          SVG clipPath path animation — the bottom-centre scoops upward.
 * Phase 3: The whole panel slides up off the viewport.
 *
 * The concave effect is achieved by animating the quadratic-bezier
 * control point of the SVG clipPath from y=1 (flat) → y=0.82 (scooped).
 * objectBoundingBox units keep coordinates at 0-1 regardless of screen size.
 */
export default function PageLoader() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const clipPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const panel = panelRef.current;
    const path = clipPathRef.current;
    if (!wrap || !panel || !path) return;

    document.documentElement.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        if (wrap) wrap.style.display = "none";
        document.documentElement.style.overflow = "";
      },
    });

    // Phase 1 — hold flat (no shape yet)
    // tl.to({}, { duration: 0.45 });

    // Phase 2 — animate the clip-path bottom from flat → concave arch
    // "M0,0 L1,0 L1,1 Q0.5,1 0,1 Z"   → control-y = 1  (flat bottom)
    // "M0,0 L1,0 L1,1 Q0.5,0.82 0,1 Z" → control-y = 0.82 (scooped inward)
    tl.to(path, {
      attr: { d: "M0,0 L1,0 L1,1 Q0.5,0.82 0,1 Z" },
      duration: 0.1,
      ease: "power3.inOut",
    });

    // Phase 3 — slide the whole panel upward off screen
    tl.to(panel, {
      yPercent: -115,
      duration: 0.8,
      ease: "power1.out",
    });

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-9999 pointer-events-none"
      aria-hidden="true"
    >
      {/* SVG clip-path definition — objectBoundingBox so it scales to any screen */}
      <svg
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="loader-clip" clipPathUnits="objectBoundingBox">
            {/*
             * Flat rectangle initially:  Q control at (0.5, 1) = straight line
             * After animation:           Q control at (0.5, 0.82) = concave arch
             */}
            <path
              ref={clipPathRef}
              d="M0,0 L1,0 L1,1 Q0.5,1 0,1 Z"
            />
          </clipPath>
        </defs>
      </svg>

      {/*
       * Panel — 115% tall so the rounded bottom clears the viewport
       * during the slide-up exit.
       */}
      <div
        ref={panelRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "115vh",
          backgroundColor: "#B2F6E3",
          clipPath: "url(#loader-clip)",
          willChange: "transform",
        }}
      />
    </div>
  );
}