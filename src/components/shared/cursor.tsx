"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP);

const Cursor = () => {
  useGSAP(() => {
    const xTo = gsap.quickTo(".cursor", "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(".cursor", "y", { duration: 0.2, ease: "power3" });

    window.addEventListener("mousemove", (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    });

    const targets = document.querySelectorAll(".cursor-target");

    targets.forEach((target) => {
      target.addEventListener("mouseenter", () => {
        gsap.to(".cursor", {
          backgroundColor: "#B2F6E3",
          scale: 4,
          duration: 0.3,
          ease: "power2.out",
          display: "flex",
        });
      });

      target.addEventListener("mouseleave", () => {
        gsap.to(".cursor", {
          backgroundColor: "transparent",
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          display: "none",
        });
      });
    });
  });

  return (
    <div className="cursor size-7 rounded-full fixed top-0 left-0 pointer-events-none z-500 -translate-x-1/2 -translate-y-1/2 hidden justify-center items-center">
      <ArrowUpRight className="text-black size-3" />
    </div>
  );
};

export default Cursor;
