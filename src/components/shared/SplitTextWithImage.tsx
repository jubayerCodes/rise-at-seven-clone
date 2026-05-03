import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(SplitText);

/**
 * SplitTextWithImage
 * Props:
 *   text1: string  — first part of the heading (default: "We Create")
 *   text2: string  — second part of the heading (default: "Category Leaders")
 *   imageUrl: string — URL for the inline thumbnail image
 *   imageAlt: string — alt text for the image
 */
export default function SplitTextWithImage({
  text1,
  text2,
  imageUrl,
  imageAlt = "Featured image",
}: {
  text1: string;
  text2: string;
  imageUrl: string;
  imageAlt?: string;
}) {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split1 = new SplitText(line1Ref.current, { type: "chars,words" });
      const split2 = new SplitText(line2Ref.current, { type: "chars,words" });

      // Set initial states
      gsap.set([split1.chars, split2.chars], {
        opacity: 0,
        y: 80,
        rotateX: -90,
        transformOrigin: "50% 0%",
      });

      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.4,
        rotation: -15,
      });

      const tl = gsap.timeline({ delay: 0.2 });

      // Animate line 1 chars
      tl.to(split1.chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
        stagger: {
          each: 0.04,
          from: "start",
        },
      });

      // Animate image slightly before line2 starts
      tl.to(
        imageRef.current,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.55,
          ease: "back.out(2)",
        },
        "-=0.3",
      );

      // Animate line 2 chars
      tl.to(
        split2.chars,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          ease: "back.out(1.7)",
          stagger: {
            each: 0.04,
            from: "start",
          },
        },
        "-=0.45",
      );

      // Cleanup split on unmount
      return () => {
        split1.revert();
        split2.revert();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [text1, text2]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        {/* Line 1 */}
        <div style={styles.lineWrapper}>
          <span ref={line1Ref}>{text1}</span>
        </div>

        {/* Line 2 with inline image */}
        <div style={{ ...styles.lineWrapper, ...styles.line2Wrapper }}>
          <span ref={line2Ref}>
            {text2.split(" ").map((word, i, arr) => {
              // Insert image before the last word
              if (i === Math.floor(arr.length / 2)) {
                return (
                  <span key={i} style={styles.wordWithImage}>
                    <Image
                      ref={imageRef}
                      src={imageUrl}
                      alt={imageAlt}
                      width={52}
                      height={52}
                      className="object-cover aspect-square"
                      style={{
                        height: `calc(100% - 1rem)`,
                      }}
                    />
                    {word}{" "}
                  </span>
                );
              }
              return <span key={i}>{word} </span>;
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  headingBlock: {
    position: "relative",
    textAlign: "center",
    zIndex: 1,
  },
  lineWrapper: {
    display: "block",
    overflow: "hidden",
    lineHeight: 1.05,
    padding: "4px 0",
  },
  line2Wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
  },
  headingText: {
    display: "inline-flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.18em",
    fontFamily: "'Helvetica Neue', 'Arial Black', 'Impact', system-ui, sans-serif",
    fontWeight: 900,
    fontSize: "clamp(40px, 7vw, 88px)",
    color: "#ffffff",
    letterSpacing: "-0.02em",
    lineHeight: 1.0,
    transformStyle: "preserve-3d",
    perspective: "600px",
  },
  wordWithImage: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.2em",
  },
};
