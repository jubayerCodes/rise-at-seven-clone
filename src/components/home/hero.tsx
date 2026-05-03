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

const Hero = () => {
  const heroBgs = [hero1, hero2, hero3];

  // eslint-disable-next-line react-hooks/purity
  const heroBg = heroBgs[Math.floor(Math.random() * heroBgs.length)];

  const awards = [award1, award2, award3, award4];

  return (
    <section className="px-2 pt-2">
      <div
        className="rounded-2xl bg-no-repeat bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url("${heroBg.src}")`,
          height: "calc(100dvh - 0.5rem)",
        }}
      >
        <div className="size-full backdrop-blur-md backdrop-brightness-75 flex flex-col justify-center items-center px-4 text-center">
          <span className="uppercase text-xs font-medium leading-tight tracking-tightish max-w-52 text-balance text-center mb-2 text-white">
            #1 Most recommended content marketing agency
          </span>
          <div className="flex gap-2 items-center mb-4">
            <LeafStart className="mr-1" />
            {awards.map((award, idx) => (
              <div key={idx} className="w-12 flex items-center">
                <Image
                  src={award.src}
                  alt={`Award ${idx + 1}`}
                  width={48}
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
            imageUrl={heroBg.src}
            imageAlt="hero image"
            className="text-center"
            textClassName="text-white text-[120px] font-semibold justify-center"
            imageClassName="rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
