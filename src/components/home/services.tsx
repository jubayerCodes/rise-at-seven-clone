"use client";

import { ArrowUpRight } from "lucide-react";
import FlipButton from "../shared/flip-button";
import HeadingWithImage from "../shared/heading-with-image";
import headingImg from "@/assets/img/services/IMG_5079.webp";

import serviceImg1 from "@/assets/img/services/Screenshot-2025-06-23-at-22.39.35.webp";
import serviceImg2 from "@/assets/img/services/Screenshot-2025-07-01-at-20.31.18.webp";
import serviceImg3 from "@/assets/img/services/Screenshot-2025-06-25-at-14.37.50.webp";
import serviceImg4 from "@/assets/img/services/0B5A7499.webp";
import serviceImg5 from "@/assets/img/services/e34acc13-be9a-4862-a3bd-95aa2738aeb3.webp";
import serviceImg6 from "@/assets/img/services/Screenshot-2025-06-24-at-00.20.47.webp";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface IService {
  title: string;
  img: string;
  url: string;
}

const Services = () => {
  const services: IService[] = [
    {
      title: "Digital PR",
      img: serviceImg1.src,
      url: "#",
    },
    {
      title: "Organic Social & Content",
      img: serviceImg2.src,
      url: "#",
    },
    {
      title: "Search & Growth Strategy",
      img: serviceImg3.src,
      url: "#",
    },
    {
      title: "Content Experience",
      img: serviceImg4.src,
      url: "#",
    },
    {
      title: "Data & Insights",
      img: serviceImg5.src,
      url: "#",
    },
    {
      title: "Onsite SEO",
      img: serviceImg6.src,
      url: "#",
    },
  ];

  return (
    <section className="p-7">
      <div>
        <div className="flex justify-between items-center border-b border-gray-400/70 pb-5">
          <HeadingWithImage
            line2="Our Services"
            imageUrl={headingImg.src}
            imageAlt="hero image"
            className="text-center"
            textClassName="text-[100px] font-semibold justify-center"
            imageClassName="rounded-2xl"
            animDelay={0.3}
          />

          <FlipButton>
            View All Services <ArrowUpRight />
          </FlipButton>
        </div>
        <div className="grid grid-cols-2 gap-x-2 mt-6">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

function ServiceCard({ service, idx }: { service: IService; idx: number }) {
  const iconRef = useRef(null);

  useEffect(() => {
    if (!iconRef.current) return;
  }, []);

  const handleMouseEnter = () => {
    gsap.to(iconRef.current, {
      rotate: 0,
      width: 72,
      height: 72,
      duration: 0.3,
      x: 0,
      y: 0,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(iconRef.current, {
      rotate: -90,
      width: 0,
      height: 0,
      x: -20,
      y: 20,
      duration: 0.3,
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={idx}
      className={"w-full rounded-full relative overflow-hidden group"}
    >
      <div className="border-b border-gray-400/70 px-12 py-4 flex items-center">
        <div className="after:absolute after:inset-0 after:bg-black/50 pointer-events-none transition-opacity duration-300 opacity-0 hover:opacity-100"></div>
        <Image
          src={service.img}
          width={600}
          height={108}
          alt={service.title}
          className="absolute w-full h-full top-0 left-0 object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <ArrowUpRight
          ref={iconRef}
          className="size-0 -translate-x-5 translate-y-5 -rotate-90 text-white relative z-20"
        />
        <h3 className="relative text-[60px] text-foreground group-hover:text-white z-20! transition-colors duration-300">
          {service.title}
        </h3>
      </div>
    </div>
  );
}

export default Services;
