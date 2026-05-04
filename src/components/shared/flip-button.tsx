"use client";

import { useRef } from "react";
import { Button, buttonVariants } from "../ui/button";
import gsap from "gsap";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { type VariantProps } from "class-variance-authority";

interface FlipButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const FlipButton = ({ children, ...props }: FlipButtonProps) => {
  const topRef = useRef<HTMLSpanElement>(null);
  const bottomRef = useRef<HTMLSpanElement>(null);

  const handleEnter = () => {
    gsap.to(topRef.current, {
      y: "-100%",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(bottomRef.current, {
      y: "-100%",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(topRef.current, {
      y: "0%",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(bottomRef.current, {
      y: "0%",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <Button {...props} onMouseEnter={handleEnter} onMouseLeave={handleLeave} className="relative overflow-hidden">
      <span className="relative block overflow-hidden">
        <span ref={topRef} className="flex items-center gap-1.5">
          {children}
        </span>

        <span ref={bottomRef} className="absolute left-0 top-full flex items-center gap-1.5">
          {children}
        </span>
      </span>
    </Button>
  );
};

export default FlipButton;
