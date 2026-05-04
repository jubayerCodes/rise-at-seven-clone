"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/utils";

gsap.registerPlugin(SplitText);

/**
 * HeadingWithImage
 *
 * A reusable animated heading that embeds a rounded thumbnail image inline
 * within the text. The image height always matches the current line height.
 * Both lines animate in as a single synced GSAP SplitText sequence.
 *
 * @prop line1         — Optional first line of the heading
 * @prop line2         — Second line (required); image is injected before the last word
 * @prop imageUrl      — src for the inline thumbnail
 * @prop imageAlt      — alt text for the image (default: "")
 * @prop className     — classes on the outer wrapper <div>
 * @prop textClassName — classes applied to BOTH <span> text elements
 *                       (control font-size, font-weight, color, tracking, etc.)
 * @prop imageClassName — additional classes on the <Image> element
 *                        (rounded-*, object-*, aspect-*, etc.)
 * @prop animDelay     — delay before the animation starts (seconds, default 0.1)
 */
export interface HeadingWithImageProps {
  line1?: string;
  line2: string;
  imageUrl: string;
  imageAlt?: string;
  className?: string;
  textClassName?: string;
  imageClassName?: string;
  animDelay?: number;
  imageAtEnd?: boolean;
}

export default function HeadingWithImage({
  line1,
  line2,
  imageUrl,
  imageAlt = "",
  className,
  textClassName,
  imageClassName,
  animDelay = 0.1,
  imageAtEnd = false,
}: HeadingWithImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const imageWrapRef = useRef<HTMLSpanElement>(null);

  // Split the second line so the image is injected before the last word
  const line2Words = line2.trim().split(/\s+/);
  const insertImageAt = line2Words.length > 1 ? line2Words.length - 1 : 0;
  const line2Before = imageAtEnd
    ? line2Words.join(" ")
    : line2Words.slice(0, insertImageAt).join(" ");
  const line2After = imageAtEnd ? "" : line2Words.slice(insertImageAt).join(" ");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrap = imageWrapRef.current;
      if (!wrap) return;

      // ── Measure natural width BEFORE collapsing ──────────────────────
      // The image is already rendered at h-[0.85em] w-auto, so offsetWidth
      // gives us the true pixel width at the current font-size.
      wrap.style.overflow = "hidden";
      const naturalWidth = wrap.offsetWidth;

      // Collapse to 0 — text will flow in to fill the gap
      gsap.set(wrap, {
        width: 0,
        overflow: "hidden",
        // Keep the inner image pinned left so it reveals left → right
        flexShrink: 0,
      });

      // ── Split both lines ──────────────────────────────────────────────
      const targets: (HTMLSpanElement | null)[] = [line1 ? line1Ref.current : null, line2Ref.current].filter(
        Boolean,
      ) as HTMLSpanElement[];

      const splits = targets.map((el) => new SplitText(el, { type: "chars,words" }));

      const allChars = splits.flatMap((s) => s.chars);

      gsap.set(allChars, {
        opacity: 0,
        y: "100%",
      });

      // Chars are now hidden at their start positions — safe to reveal the container
      if (containerRef.current) {
        containerRef.current.style.visibility = "visible";
      }

      const tl = gsap.timeline({ delay: animDelay });

      // 1️⃣  All chars stagger in together across both lines
      tl.to(allChars, {
        opacity: 1,
        y: "0%",
        duration: 0.4,
        ease: "power3.out",
        stagger: { each: 0.015, from: "start" },
      });

      // 2️⃣  After text finishes: expand width from 0 → natural size.
      //     overflow:hidden on the wrapper clips the image during expansion
      //     so it appears to unroll left → right while the adjacent text
      //     is simultaneously pushed aside by the growing wrapper width.
      tl.to(
        wrap,
        {
          width: naturalWidth,
          duration: 0.5,
          ease: "power3.inOut",
        },
        "-=0.3",
      );

      return () => splits.forEach((s) => s.revert());
    }, containerRef);

    return () => ctx.revert();
  }, [line1, line2, animDelay]);

  // Shared text style: overflow-hidden keeps chars from showing before animation
  const lineWrapperCls = "block overflow-hidden leading-[1.05] py-[0.04em]";

  const textCls = cn(
    // Sensible defaults — all overridable via textClassName
    "inline-flex flex-wrap items-center gap-[0.15em]",
    "font-black tracking-[-0.03em]",
    "text-[clamp(2.5rem,7vw,6rem)]",
    textClassName,
  );

  return (
    <div ref={containerRef} className={cn("select-none", className)} style={{ visibility: "hidden" }}>
      {/* ── Line 1 (optional) ───────────────────────── */}
      {line1 && (
        <div className={lineWrapperCls}>
          <span
            ref={line1Ref}
            className={cn(textCls, "inline-block")}
            style={{ transformStyle: "preserve-3d", perspective: "600px" }}
          >
            {line1}
          </span>
        </div>
      )}

      {/* ── Line 2 with inline image ─────────────────── */}
      <div className={cn(lineWrapperCls, "flex flex-wrap items-center gap-[0.15em]")}>
        <span
          ref={line2Ref}
          className={cn(textCls, "inline-flex flex-wrap items-center gap-[0.15em]")}
          style={{ transformStyle: "preserve-3d", perspective: "600px" }}
        >
          {/* Words before the image */}
          {line2Before && <span>{line2Before}</span>}

          {/* Inline image — height is always 0.85em of the current font size */}
          <span ref={imageWrapRef} className="inline-flex items-center" aria-hidden="true">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={400}
              height={400}
              className={cn("inline-block object-cover aspect-square", "h-[1em] w-auto", imageClassName)}
            />
          </span>
          {/* Words after the image */}
          {line2After && <span>{line2After}</span>}
        </span>
      </div>
    </div>
  );
}
