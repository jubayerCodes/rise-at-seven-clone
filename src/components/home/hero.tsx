"use client";

import hero1 from "@/assets/img/hero/hero-1.webp";
import hero2 from "@/assets/img/hero/hero-2.webp";
import hero3 from "@/assets/img/hero/hero-3.webp";
import { LeafEnd, LeafStart } from "@/assets/svg/home.svg";

import award1 from "@/assets/img/awards/global-search-awards.webp";
import award2 from "@/assets/img/awards/Mask-group.webp";
import award3 from "@/assets/img/awards/UKSocial-Media-Awards-White.webp";
import award4 from "@/assets/img/awards/UK-Content-Awards-White.webp";
import Image from "next/image";
import HeadingWithImage from "@/components/shared/heading-with-image";

import brand1 from "@/assets/img/brands/gogle.webp";
import brand2 from "@/assets/img/brands/chat-gpt.webp";
import brand3 from "@/assets/img/brands/gemini.webp";
import brand4 from "@/assets/img/brands/tiktok.webp";
import brand5 from "@/assets/img/brands/youtube.webp";
import brand6 from "@/assets/img/brands/pinterest.webp";
import brand7 from "@/assets/img/brands/giphy.webp";
import brand8 from "@/assets/img/brands/reddit.webp";
import brand9 from "@/assets/img/brands/amazon.webp";
import Link from "next/link";
import FlipButton from "../shared/flip-button";
import { useEffect, useState } from "react";

const Hero = () => {
  const [heroBg, setHeroBg] = useState("");

  const heroBgs = [hero1, hero2, hero3];

  useEffect(() => {
    const newBg = () => heroBgs[Math.floor(Math.random() * heroBgs.length)].src;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeroBg(newBg);
  }, [heroBgs]);

  const awards = [award1, award2, award3, award4];

  const brands = [brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8, brand9];

  return (
    <section className="px-2 pt-2">
      <div className="bg-[#B2F6E3] flex rounded-full hover:rounded-md justify-center py-1 mb-2 w-full">
        <Link href={"#"} className="w-full">
          <FlipButton
            className={"p-0 h-fit bg-transparent text-xs xl:text-sm tracking-tighter font-semibold text-center w-full"}
          >
            🚨 The Category Leaderboard - Live Now
          </FlipButton>
        </Link>
      </div>
      <div
        className="rounded-2xl bg-no-repeat bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url("${heroBg}")`,
          height: "calc(100dvh - 1rem)",
        }}
      >
        <div className="size-full backdrop-blur-md backdrop-brightness-75 flex flex-col justify-center items-center px-4 text-center relative">
          <span className="uppercase text-xs font-medium leading-tight tracking-tightish max-w-52 text-balance text-center mb-2 text-white">
            #1 Most recommended content marketing agency
          </span>
          <div className="flex gap-2 items-center mb-4">
            <LeafStart className="mr-1" />
            {awards.map((award, idx) => (
              <div key={idx} className="w-10 xl:w-12 flex items-center">
                <Image
                  src={award.src}
                  alt={`Award ${idx + 1}`}
                  width={68}
                  height={24}
                  className="w-full h-full max-h-6 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
            <LeafEnd className="ml-1" />
          </div>

          <HeadingWithImage
            line1="We Create"
            line2="Category Leaders"
            imageUrl={heroBg}
            imageAlt="hero image"
            className="text-center"
            textClassName="text-white text-6xl xl:text-[120px] font-semibold justify-center"
            imageClassName="rounded-xl xl:rounded-2xl"
            animDelay={0.3}
          />

          <h4 className="inline-flex flex-wrap text-balance relative text-left justify-start text-white text-lg/tight md:text-xl/tight xl:text-3xl/none 4xl:text-4xl/none font-sans-primary font-medium tracking-tight js-heading mt-2 lg:mt-4">
            on every searchable platform
          </h4>

          <div className="hidden xl:flex gap-14 items-center mt-12">
            {brands.map((brand, idx) => (
              <Image
                key={idx}
                src={brand.src}
                alt={`Brand ${idx + 1}`}
                width={68}
                height={32}
                className="max-h-8 object-contain"
                loading="lazy"
              />
            ))}
          </div>

          <div className="absolute bottom-0 left-0 w-full flex justify-center xl:justify-between p-5">
            <p className="hidden xl:block text-sm leading-normal text-pretty lg:text-base text-white">
              Organic media planners creating, distributing & optimising <br /> <b>search-first</b> content for SEO,
              Social, PR, Ai and LLM search
            </p>
            <p className="text-sm leading-normal font-medium text-pretty lg:text-base text-white">
              4 Global Offices serving <br /> UK, USA (New York) & EU
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
