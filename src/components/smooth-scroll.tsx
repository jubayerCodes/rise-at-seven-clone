"use client";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function SmoothScroll({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
    const mobileDevice = window.innerWidth <= 1024;

    ScrollSmoother.create({
      smooth: mobileDevice ? 0.1 : 0.8,
      effects: true,
      smoothTouch: mobileDevice ? 0.001 : 0.8,
      speed: mobileDevice ? 1 : 0.8,
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}

export default SmoothScroll;
