"use client";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function SmoothScroll({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      smooth: 0.8,
      effects: true,
      smoothTouch: 0.8,
      speed: 1.2,
      onUpdate: () => {},
    });

    requestAnimationFrame(() => {
      smoother.refresh();
      ScrollTrigger.refresh(true);
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}

export default SmoothScroll;
