// components/shared/text-cursor.tsx
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { useCursorStore } from "@/store/cursor-store";

gsap.registerPlugin(useGSAP);

const TextCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const text = useCursorStore((s) => s.text); // ✅ reactive

  useGSAP(() => {
    const el = cursorRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, scale: 0.5 });

    const xTo = gsap.quickTo(el, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.15, ease: "power3" });

    window.addEventListener("mousemove", (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    });

    window.addEventListener(
      "mouseover",
      (e) => {
        if (!(e.target as HTMLElement).closest(".text-cursor")) return;
        gsap.to(el, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out"});
      },
      true,
    );

    window.addEventListener(
      "mouseout",
      (e) => {
        if (!(e.target as HTMLElement).closest(".text-cursor")) return;
        gsap.to(el, { opacity: 0, scale: 0.5, duration: 0.3, ease: "power2.out" });
      },
      true,
    );
  });

  return (
    <div
      ref={cursorRef}
      style={{ transform: "translate(-50%, -50%)" }}
      className="fixed top-0 left-0 pointer-events-none z-500
                 flex items-center gap-1 cursor-none!
                 bg-[#B2F6E3] text-black text-base font-medium
                 px-4.5 py-2.5 rounded-full whitespace-nowrap"
    >
      {text}
      <ArrowUpRight className="size-4" />
    </div>
  );
};

export default TextCursor;
