"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fragment, useRef, useState } from "react";
import workImg1 from "@/assets/img/works/sixt-1.webp";
import workImg2 from "@/assets/img/works/dojo-go-product-shot-1.webp";
import workImg3 from "@/assets/img/works/Screenshot-2026-02-07-at-17.01.43.webp";
import workImg4 from "@/assets/img/works/eSIM-Europe-p1-what-is-eSIM-2-1.webp";
import workImg5 from "@/assets/img/works/maxresdefault_2025-10-22-141838_nmnu.webp";
import workImg6 from "@/assets/img/works/easter-breaks.webp";
import workImg7 from "@/assets/img/works/Pooky-Rechargable-Doorstop-Cordless-100-Straight-Empire-Pendant-Silk-Ikat-Shade-in-Black-and-Cream-Atlas-44-Single-chukka-Cordless-95-scaled-1-1.webp";
import workImg8 from "@/assets/img/works/1.webp";
import workImg9 from "@/assets/img/works/Screenshot-2025-06-10-at-12.13.46.webp";
import workImg10 from "@/assets/img/works/Screenshot-2025-07-04-at-12.50.54.webp";
import Image from "next/image";
import { ArrowUpRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import FlipButton from "../shared/flip-button";

gsap.registerPlugin(ScrollTrigger);

function FeaturedWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainer = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const headingsContainer = useRef<HTMLHeadingElement>(null);

  const works: {
    title: string;
    period: string;
    img: string;
    searchText?: string;
    desc: string;
    bgColor: string;
  }[] = [
    {
      title: "SIXT",
      period: "2023-2025",
      img: workImg1.src,
      searchText: "Car rental",
      desc: "An extra 3m clicks regionally through SEO",
      bgColor: "#cb7b3a",
    },
    {
      title: "Dojo - B2B",
      period: "2021-2025",
      img: workImg2.src,
      searchText: "Card machines",
      desc: "A B2B success story for Dojo card machines",
      bgColor: "#fdd8c4",
    },
    {
      title: "Magnet Trade - B2B",
      period: "2023-2024",
      img: workImg3.src,
      desc: "A full service SEO success story 170%+ increase",
      bgColor: "#d8c4fd",
    },
    {
      title: "Leading E Sim brand globally",
      period: "2023-2025",
      img: workImg4.src,
      desc: "Increasing brand and non brand visibility UK/ES",
      searchText: "Esims",
      bgColor: "#cb7b3a",
    },
    {
      title: "JD Sports",
      period: "2025",
      img: workImg5.src,
      desc: "65% up YoY clicks for JDSports FR, IT ES",
      searchText: "Trainers",
      bgColor: "#3a8ccb",
    },
    {
      title: "Parkdean Resorts",
      period: "2019-2025",
      img: workImg6.src,
      desc: "Dominating Google and AI search",
      searchText: "Easter Breaks",
      bgColor: "#d2b59d",
    },
    {
      title: "Pooky",
      period: "2025",
      img: workImg7.src,
      desc: "Drivig demand for Pooky Rechargeable Lights",
      searchText: "Rechargeable Lights",
      bgColor: "#39b0bd",
    },
    {
      title: "Parkdean Resorts",
      period: "2019-2025",
      img: workImg8.src,
      desc: "Social search and multi channel content to #1",
      searchText: "UK holidays",
      bgColor: "#d29dd0",
    },
    {
      title: "Revolution Beauty",
      period: "2022-2025",
      img: workImg9.src,
      desc: "Buildign UK's leading beauty dupe brand",
      searchText: "Beauty Dupes",
      bgColor: "#fecacc",
    },
    {
      title: "Lloyds Pharmacy",
      period: "2022-2023",
      img: workImg10.src,
      desc: "Driving category leadership for STI tests",
      searchText: "STI tests",
      bgColor: "#60dcfb",
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current || !cardsContainer.current || !headingsContainer.current) return;

    const cards = cardsContainer.current;
    const section = sectionRef.current;
    const headings = headingsContainer.current;

    const padding = parseFloat(getComputedStyle(sectionRef.current).paddingTop);

    const totalScrollDistance = cards.scrollHeight - section.clientHeight + padding * 4;
    const headingScrollDistance = headings.scrollHeight / 1.6;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScrollDistance}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      .to(cards, { y: () => -totalScrollDistance, ease: "none" })
      .to(headings, { y: () => -headingScrollDistance, ease: "none" }, "<");
  }, []);

  const handleMouseEnter = (idx: number) => {
    setActiveIndex(idx);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <section className="pb-5 xl:pb-24">
      <div ref={sectionRef} className="p-4 xl:p-7 h-screen overflow-hidden">
        <div className="bg-[#111212] w-full h-full rounded-3xl p-4 xl:p-7 flex justify-between overflow-hidden">
          <div className="w-1/2 py-24 pl-3.5  hidden xl:block">
            <h2 className="text-white text-md/tight xl:text-xl/tight font-medium tracking-tight">Featured Work</h2>
            <div className="pt-24 h-full">
              <div className="overflow-y-hidden h-full work-heading-overlay relative">
                <div ref={headingsContainer} className="flex flex-col gap-2 translate-y-24">
                  {works?.map((work, idx) => (
                    <h3
                      key={idx}
                      className="text-balance text-left text-white xl:text-7xl font-medium tracking-tight flex gap-2 hover:ml-5 transition-[margin] duration-300 cursor-pointer"
                      onMouseEnter={() => handleMouseEnter(idx)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {work?.title} <span className="text-sm tracking-normal">[{work?.period}]</span>
                    </h3>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            ref={cardsContainer}
            className="w-3xl flex flex-col gap-4 xl:gap-5 justify-start items-stretch h-fit will-change-transform"
          >
            <h2 className="text-white text-md/tight xl:text-xl/tight font-medium tracking-tight block xl:hidden mt-4">
              Featured Work
            </h2>
            {works.map((work, i) => (
              <Fragment key={i}>
                <Link
                  href={"#"}
                  className={cn("h-[550px] rounded-3xl cursor-target overflow-hidden relative hidden xl:block")}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    src={work?.img}
                    height={550}
                    width={600}
                    alt={work?.title}
                    className={cn(
                      "h-[550px] w-full object-cover transition duration-300",
                      activeIndex === i && "scale-110",
                    )}
                  />
                  {work?.searchText?.length && (
                    <div
                      className={cn(
                        "absolute bottom-5 right-5 rounded-full px-4 py-1.5 flex justify-center items-center gap-2 text-white backdrop-blur-sm bg-white/20 text-base transition duration-300",
                      )}
                    >
                      <Search className="size-5" /> {work?.searchText} <ArrowUpRight className="size-5" />
                    </div>
                  )}

                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      clipPath: activeIndex === i ? "circle(150% at 50% 100%)" : "circle(0% at 50% 100%)",
                      transition: "clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      backgroundColor: work.bgColor,
                    }}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 flex flex-col items-stretch justify-between text-center p-8 z-10 transition-all duration-300",
                        activeIndex === i ? "opacity-100 scale-100" : "opacity-0",
                      )}
                    >
                      <h3 className="text-6xl font-medium mb-3 leading-tight text-black text-start">{work.desc}</h3>
                      {work?.searchText?.length && (
                        <div
                          className={cn(
                            "absolute bottom-5 right-5 rounded-full px-4 py-1.5 flex justify-center items-center gap-2 text-black backdrop-blur-sm bg-white/20 text-base transition duration-300",
                          )}
                        >
                          <Search className="size-5" /> {work?.searchText} <ArrowUpRight className="size-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
                <Link
                  href={"#"}
                  className={cn("h-[300px] rounded-3xl cursor-target overflow-hidden relative xl:hidden block")}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-full h-3/4 absolute bottom-0 left-0 bg-linear-0 from-foreground/80"></div>
                  <Image
                    src={work?.img}
                    height={550}
                    width={300}
                    alt={work?.title}
                    className={cn("h-[300px] w-full object-cover transition duration-300")}
                  />
                  {work?.searchText?.length && (
                    <div
                      className={cn(
                        "absolute top-2 right-2 rounded-full px-4 py-1.5 flex justify-center items-center gap-2 text-white backdrop-blur-sm bg-white/20 text-sm transition duration-300",
                      )}
                    >
                      <Search className="size-4" /> {work?.searchText} <ArrowUpRight className="size-4" />
                    </div>
                  )}

                  <h3 className="text-left text-white text-3xl font-medium tracking-tight cursor-pointer absolute bottom-2 left-3 flex flex-col">
                    <span className="text-sm tracking-normal">[{work?.period}]</span>
                    {work?.title}
                  </h3>
                </Link>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-stretch xl:justify-center w-full px-4">
        <FlipButton className={"w-full xl:w-fit"}>
          Explore Our Work <ArrowUpRight />
        </FlipButton>
      </div>
    </section>
  );
}

export default FeaturedWorks;
