// "use client";

// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { useRef } from "react";

// function ReadyToRise() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const headingRef = useRef<HTMLHeadingElement>(null);

//   const headingText = "Ready to Rise at Seven?";

//   useGSAP(() => {
//     if (!sectionRef.current || !headingRef.current) return;

//     const headingElements = Array.from(headingRef.current.children);

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top bottom-=300",
//         end: "bottom top-=400",
//         scrub: 1,
//         markers: true,
//         anticipatePin: 1,
//         invalidateOnRefresh: true,
//       },
//     });

//     tl.to(headingRef.current, { x: "-1000px", y: "75%", ease: "power4.in" }, 0);

//     headingElements.forEach((el, idx) => {
//       tl.to(
//         el,
//         {
//           y: "300px",
//           rotate: 0,
//           duration: 0.3,
//         },
//         idx === 0 ? 0 : ">",
//       );

//       tl.to(
//         el,
//         {
//           y: -50,
//           duration: 0.4,
//           ease: "power1.in",
//         },
//         ">",
//       );
//     });
//   }, []);

//   return (
//     <>
//       <section ref={sectionRef} className="h-screen w-full relative">
//         <h2
//           ref={headingRef}
//           className="absolute left-full top-1/3 -translate-y-1/2 text-[306px] font-medium leading-none text-nowrap flex"
//         >
//           {headingText.split("").map((letter, key) => (
//             <div key={key} className="rotate-10">
//               {letter === " " ? "\u00A0" : letter}
//             </div>
//           ))}
//         </h2>
//       </section>
//       <div className="h-[400vh] bg-amber-800"></div>
//     </>
//   );
// }

// export default ReadyToRise;

// "use client";

// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import { useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

// function ReadyToRise() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const headingRef = useRef<HTMLHeadingElement>(null);
//   const headingText = "Ready to Rise at Seven?";

//   useGSAP(() => {
//     if (!sectionRef.current || !headingRef.current) return;

//     const headingElements = Array.from(headingRef.current.children);
//     const total = headingElements.length;

//     // Set initial state: each letter rotated, sitting at y=0
//     gsap.set(headingElements, { rotate: 10, y: 0 });

//     // ── Shared ScrollTrigger config ──────────────────────────────
//     const stConfig = {
//       trigger: sectionRef.current,
//       start: "top bottom-=300",
//       end: "bottom top-=800",
//       scrub: 1,
//       invalidateOnRefresh: true,
//     };

//     // ── 1. Heading slides LEFT in parallel (slow, full duration) ──
//     gsap.to(headingRef.current, {
//       x: "-150%",
//       ease: "none",
//       scrollTrigger: stConfig,
//     });

//     // ── 2. Per-letter timeline ────────────────────────────────────
//     // Total timeline duration = 1.0 (scrub maps this to scroll)
//     // Each letter gets a window based on its index:
//     //   - letters stagger so last letter finishes rotating at ~15% scroll
//     //   - then slide up at 15%–25%

//     const letterTl = gsap.timeline({ scrollTrigger: stConfig });

//     // Stagger window: all letters arrive within 0.0 → 0.15 of scroll
//     // Each letter's rotate+slideDown takes 0.05 duration
//     // Stagger offset = 0.15 / total letters
//     const staggerStep = 0.05 / total;

//     headingElements.forEach((el, i) => {
//       const firstStartAt = 0.03 / total;
//       const startAt = (i + 1) * staggerStep;

//       // Step 1: rotate to 0 + slide down 300px (15% of scroll each)
//       letterTl.to(
//         el,
//         {
//           rotate: 0,
//           y: 220,
//           x: -100,
//           duration: 0.001,
//           ease: "power2.out",
//         },
//         i === 0 ? firstStartAt : startAt,
//       );

//       // Step 2: slide up 100px (10% of scroll, starts after step 1)
//       letterTl.to(
//         el,
//         {
//           y: 100, // 300 - 100 = 200 net
//           duration: 0.005,
//           ease: "power1.in",
//         },
//         startAt + 0.01,
//       );
//     });
//   }, []);

//   return (
//     <>
//       <section ref={sectionRef} className="h-screen w-full relative overflow-visible">
//         <h2
//           ref={headingRef}
//           className="absolute left-full top-[15%] -translate-y-1/2 text-[306px] font-medium leading-none text-nowrap flex"
//         >
//           {headingText.split("").map((letter, key) => (
//             <div key={key}>{letter === " " ? "\u00A0" : letter}</div>
//           ))}
//         </h2>
//       </section>
//       <div className="h-[400vh] bg-amber-800"></div>
//     </>
//   );
// }

// export default ReadyToRise;

// "use client";

// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import { useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

// function ReadyToRise() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const headingRef = useRef<HTMLHeadingElement>(null);
//   const headingText = "Ready to Rise at Seven?";

//   useGSAP(() => {
//     if (!sectionRef.current || !headingRef.current) return;

//     const headingElements = Array.from(headingRef.current.children);

//     // Each letter starts clipped (hidden below the line)
//     gsap.set(headingElements, { y: "-30%", rotate: 10 });

//     const stConfig = {
//       trigger: sectionRef.current,
//       start: "top bottom-=400",
//       end: "bottom top-=800",
//       scrub: 1,
//       invalidateOnRefresh: true,
//       markers: true,
//     };

//     // Letters rise up through their clip line, staggered
//     const tl = gsap.timeline({ scrollTrigger: stConfig });

//     const textTravelDistance = window.innerWidth + 2;

//     headingElements.forEach((el, i) => {
//       tl.to(
//         el,
//         {
//           x: -textTravelDistance,
//           ease: "power3.out",
//           duration: 1,
//         },
//         0,
//       );

//       tl.to(
//         el,
//         {
//           y: "300px",
//           rotate: 0,
//           ease: "power3.out",
//           duration: 0.01,
//         },
//         (i + 1) * 0.01,
//       );
//     });
//   }, []);

//   return (
//     <>
//       <section ref={sectionRef} className="h-screen w-full relative overflow-visible">
//         <h2
//           ref={headingRef}
//           className="absolute left-full top-[15%] text-[306px] font-medium leading-none text-nowrap flex"
//         >
//           {headingText.split("").map((letter, key) => (
//             <div key={key}>
//               <div>{letter === " " ? "\u00A0" : letter}</div>
//             </div>
//           ))}
//         </h2>
//       </section>
//       <div className="h-[400vh] bg-amber-800"></div>
//     </>
//   );
// }

// export default ReadyToRise;

// "use client";

// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import { useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

// function ReadyToRise() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const headingRef = useRef<HTMLHeadingElement>(null);
//   const headingText = "Ready to Rise at Seven?";

//   useGSAP(() => {
//     if (!sectionRef.current || !headingRef.current) return;

//     const headingElements = Array.from(headingRef.current.children);

//     gsap.set(headingElements, { y: "-70%", rotate: 10 });

//     const stConfig = {
//       trigger: sectionRef.current,
//       start: "top bottom-=300",
//       end: "bottom top",
//       scrub: true,
//       invalidateOnRefresh: true,
//     };

//     // Slide heading left by 1.5x viewport width
//     gsap.to(headingRef.current, {
//       x: () => -window.innerWidth * 1.5,
//       ease: "none",
//       scrollTrigger: stConfig,
//     });

//     const tl = gsap.timeline({ scrollTrigger: stConfig });

//     headingElements.forEach((el, i) => {
//       const staggerStart = (i / headingElements.length) * 0.2;

//       // snap to exact viewport x before animation starts
//       const startX = window.innerWidth * 0.8; // start slide from 80% of viewport

//       tl.to(
//         el,
//         {
//           keyframes: [
//             // arrive — jump to fixed viewport x position
//             {
//               x: () => startX - (el as HTMLElement).getBoundingClientRect().left,
//               y: "-=0",
//               duration: 0.01,
//               ease: "none",
//             },
//             // slide down fast from that position
//             { y: "+=200", x: "-=300", rotate: 0, duration: 0.02, ease: "power1.inOut" },
//             { y: "-=100", rotate: 0, duration: 0.02, ease: "power1.inOut" },
//             // slide up + return to original x
//             { y: "-=100", x: 0, duration: 0.25, ease: "power2.out" },
//           ],
//         },
//         staggerStart,
//       );
//     });
//   }, []);

//   return (
//     <>
//       <section ref={sectionRef} className="h-screen w-full relative overflow-visible">
//         <h2
//           ref={headingRef}
//           className="absolute left-full top-[15%] text-[306px] font-medium leading-none text-nowrap flex"
//         >
//           {headingText.split("").map((letter, key) => (
//             <div key={key} className="overflow-hidden">
//               <div>{letter === " " ? "\u00A0" : letter}</div>
//             </div>
//           ))}
//         </h2>
//       </section>
//       <div className="h-[400vh] bg-amber-800" />
//     </>
//   );
// }

// export default ReadyToRise;

"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function ReadyToRise() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingText = "Ready to Rise at Seven?";

  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const headingElements = Array.from(headingRef.current.children);
    const total = headingElements.length;

    // Start above viewport, slide down as scroll progresses
    gsap.set(headingRef.current, { y: "-40vh" });
    gsap.set(headingElements, { y: 0, rotate: 10 });

    const stConfig = {
      trigger: sectionRef.current,
      start: "top bottom-=300",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    };

    // Slide heading left — last character ends at center
    // x offset = move until last char is at viewport center
    gsap.to(headingRef.current, {
      x: () => {
        const headingWidth = headingRef.current!.offsetWidth;
        // heading starts at left: 100vw, so we subtract that offset too
        return -(window.innerWidth + headingWidth - window.innerWidth * 0.3);
      },
      y: "0vh",
      ease: "none",
      scrollTrigger: stConfig,
    });

    const tl = gsap.timeline({ scrollTrigger: stConfig });

    headingElements.forEach((el, i) => {
      // stagger: each letter starts its wave exactly as it enters viewport
      // tightly packed — 0.4 spread so wave is always visible
      const staggerStart = (i / total) * 0.4;

      // absolute y values (not relative +=) to prevent drift
      tl.to(
        el,
        {
          keyframes: [
            { y: 0, duration: 0.01, ease: "none" }, // just arrived
            { y: 280, duration: 0.08, rotate: 0, ease: "power2.inOut" }, // fall immediately
            { y: 250, duration: 0.12, ease: "power2.out" }, // bounce up
            { y: 250, duration: 0.08, ease: "power1.inOut" }, // hold
          ],
        },
        staggerStart,
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full relative overflow-visible">
      <h2
        ref={headingRef}
        className="absolute left-full top-1/2 -translate-y-1/2 text-[306px] font-medium leading-none text-nowrap flex items-baseline tracking-tighter"
      >
        {headingText.split("").map((letter, key) => (
          // no overflow-hidden — let the wave motion show fully
          <div key={key}>{letter === " " ? "\u00A0" : letter}</div>
        ))}
      </h2>
    </section>
  );
}

export default ReadyToRise;
