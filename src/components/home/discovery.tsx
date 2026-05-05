import Marquee from "react-fast-marquee";
import { agency1, agency2, agency3, agency4, agency5, agency6, agency7, agency8 } from "@/assets/svg/home.svg";
import HeadingWithImage from "../shared/heading-with-image";
import bg from "@/assets/img/b2087e0cd3f699d3efc76f809ec72a85a6ab378e-1080x1350.webp";
import { ArrowUpRight } from "lucide-react";
import FlipButton from "../shared/flip-button";

const Discovery = () => {
  const agencies = [agency1, agency2, agency3, agency4, agency5, agency6, agency7, agency8];

  const blurs = 5;
  const blurWidth = 1;

  return (
    <section className="px-7 pt-6">
      <div className="w-full flex gap-10 items-center">
        <div className="w-1/10">
          <h4 className="inline-flex flex-wrap text-balance relative text-left justify-start text-grey-900 text-sm/tight font-sans-primary font-medium tracking-tight js-heading sm:max-w-32">
            The agency behind ...
          </h4>
        </div>
        <div className="w-9/10 relative py-5">
          <div className="absolute w-60 top-0 -left-5 h-full z-10 flex">
            {Array.from({ length: 5 }, (_, i) => i).map((range, idx) => (
              <div
                style={{
                  inset: 0,
                  zIndex: idx,
                  mask: `linear-gradient(
                            270deg,
                            transparent calc(${idx} * (100% / ${blurs})),
                            black calc((${idx} + 1) * (100% / ${blurs})),
                            black calc((${idx} + 2) * (100% / ${blurs})),
                            transparent calc((${idx} + 3) * (100% / ${blurs}))
                        )`,
                  backdropFilter: `blur(${idx * blurWidth * 2}px)`,
                  position: "absolute",
                }}
                key={idx}
              ></div>
            ))}
          </div>
          <div className="absolute w-60 top-0 -right-5 h-full z-10 flex">
            {Array.from({ length: 5 }, (_, i) => i).map((range, idx) => (
              <div
                style={{
                  inset: 0,
                  zIndex: idx,
                  mask: `linear-gradient(
                            90deg,
                            transparent calc(${idx} * (100% / ${blurs})),
                            black calc((${idx} + 1) * (100% / ${blurs})),
                            black calc((${idx} + 2) * (100% / ${blurs})),
                            transparent calc((${idx} + 3) * (100% / ${blurs}))
                        )`,
                  backdropFilter: `blur(${idx * blurWidth * 2}px)`,
                  position: "absolute",
                }}
                key={idx}
              ></div>
            ))}
          </div>
          <Marquee loop={0}>
            <div className="initial-child-container flex justify-center items-center gap-54 pr-54">
              {agencies.map((Agency, idx) => (
                <div key={idx} className="child">
                  <Agency className="max-h-8!" />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
      <div className="my-24 flex justify-between">
        <div className="max-w-2xl">
          <p className="text-balance text-left text-grey-900 xl:text-2xl font-medium tracking-tight leading-[1em] mt-2">
            A global team of search-first content marketers engineering semantic relevancy & category signals for both
            the internet and people
          </p>
        </div>
        <div className="w-3xl">
          <HeadingWithImage
            line1="Driving Demand &"
            line2="Discovery"
            imageUrl={bg.src}
            imageAlt="hero image"
            textClassName="text-[90px] font-medium text-start"
            imageClassName="rounded-2xl"
            animDelay={0.3}
            imageAtEnd
          />

          <div className="flex mt-4 gap-2">
            <FlipButton>
              Our Story <ArrowUpRight />
            </FlipButton>
            <FlipButton variant="secondary">
              Our Services <ArrowUpRight />
            </FlipButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discovery;
