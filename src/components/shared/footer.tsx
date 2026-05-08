"use client";

import React, { Fragment, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa";
import { ArrowUpRight, Dot } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import FlipButton from "./flip-button";
import { FooterLogo } from "@/assets/svg/home.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const overlay = overlayRef.current;

    if (!footer || !overlay) return;

    const ctx = gsap.context(() => {
      // ── 1. Black overlay fades out when footer is 30% in view ──
      gsap.to(overlay, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%", // overlay starts fading as footer enters viewport
          end: "top 50%", // fully gone when footer top hits 50% of screen
          scrub: true, // ties opacity directly to scroll position
          onLeave: () => gsap.set(overlay, { pointerEvents: "none" }),
          onEnterBack: () => gsap.set(overlay, { opacity: 1, pointerEvents: "auto" }),
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  type FooterMenuItem = { label: string; href: string };
  type FooterMenuColumn = { items: FooterMenuItem[] };

  const footerMenus: FooterMenuColumn[] = [
    {
      items: [
        { label: "Services", href: "/services" },
        { label: "Work", href: "/work" },
        { label: "About", href: "/about" },
        { label: "Culture", href: "/culture" },
        { label: "Meet The Risers", href: "/meet-the-risers" },
      ],
    },
    {
      items: [
        { label: "Testimonials", href: "/testimonials" },
        { label: "Blog & Resources", href: "/blog" },
        { label: "Webinars", href: "/webinars" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      items: [
        { label: "Sheffield", href: "/sheffield" },
        { label: "Manchester", href: "/manchester" },
        { label: "London", href: "/london" },
        { label: "New York", href: "/new-york" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FaFacebookF, url: "#" },
    { icon: FaXTwitter, url: "#" },
    { icon: FaLinkedinIn, url: "#" },
    { icon: FaYoutube, url: "#" },
    { icon: FaTiktok, url: "#" },
    { icon: FaInstagram, url: "#" },
  ];

  const footerBottomItems = [
    { value: "© 2025 Rise at Seven Ltd. All rights reserved" },
    { value: "Company Number 11955187" },
    { value: "VAT Registered GB 322402945" },
    { value: "Privacy Policy", url: "#" },
    { value: "Terms & conditions", url: "#" },
  ];

  return (
    <footer className="relative p-2 overflow-hidden">
      {/* ── Outer wrapper: relative so the overlay can be absolutely positioned ── */}
      <div ref={footerRef} className="relative bg-foreground rounded-3xl overflow-hidden">

        {/* ── Black overlay — starts fully opaque, fades to 0 on scroll ── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black rounded-3xl z-20 pointer-events-auto"
          aria-hidden="true"
        />

        {/* ── Footer content ── */}
        <div className="py-10 px-7 rounded-3xl relative z-10">
          <div className="grid grid-cols-12">
            {/* Left: headline + email + socials */}
            <div className="col-span-4 flex flex-col gap-5 justify-start w-full">
              <h2 className="text-white text-3xl font-medium">
                Stay updated with Rise news
              </h2>

              <div >
                <Input
                  className="bg-[#282828] border-none transition rounded-full w-full text-white font-medium tracking-tight leading-none text-lg px-5 py-4 lg:text-xl lg:px-6 lg:py-5 placeholder:text-white/50 focus:outline-none focus:ring-3 focus:ring-white/15 h-auto!"
                  placeholder="Your Email Address"
                />
              </div>

              <div className="flex gap-1">
                {socialLinks.map((item, idx) => (
                  <Link key={idx} href={item.url}>
                    <Button className="py-1 px-2 h-fit! gap-1 hover:rounded-md! text-xs!">
                      <item.icon /> <ArrowUpRight />
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: nav columns */}
            <div className="col-start-6 col-span-6 flex justify-between">
              {footerMenus.map((menu, idx) => (
                <div
                  key={idx}
                  className="border-l border-white/20 flex flex-col gap-1.5 pl-3 pt-1"
                >
                  {menu.items.map((item, itemIdx) => (
                    <Link key={itemIdx} href={item.href}>
                      <FlipButton className="bg-transparent! text-white py-0 px-0 h-fit text-[22px] rounded-none leading-none">
                        {item.label}
                      </FlipButton>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Logo */}
          <div className="mt-32">
            <FooterLogo className="text-white!" />
          </div>

          {/* Bottom bar */}
          <div className="flex justify-between items-center text-xs text-white mt-8">
            <div className="flex justify-start items-center gap-0.5 font-light">
              {footerBottomItems.map((item, idx, arr) => (
                <Fragment key={idx}>
                  {item.url?.length ? (
                    <Link href={item.url} className="underlined-link">
                      {item.value}
                    </Link>
                  ) : (
                    <div>{item.value}</div>
                  )}
                  {idx !== arr.length - 1 && (
                    <span>
                      <Dot className="size-7" />
                    </span>
                  )}
                </Fragment>
              ))}
            </div>
            <Link href="#" className="underlined-link">
              Website MadeByShape
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
