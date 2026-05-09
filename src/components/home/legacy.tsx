"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import cardImg1 from "@/assets/img/legacy/b2087e0cd3f699d3efc76f809ec72a85a6ab378e-1080x1350.webp";
import cardImg2 from "@/assets/img/legacy/d4df0d30-d590-4e94-9056-9491f4beacba.webp";
import cardImg3 from "@/assets/img/legacy/Screenshot-2025-06-23-at-23.15.19.webp";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Legacy() {
  const cardsContainer = useRef<HTMLDivElement>(null);
  const sectionContainer = useRef<HTMLDivElement>(null);

  const cards: {
    title: string;
    description1: string;
    description2?: string;
    image: string;
    bg: string;
    textColor?: string;
  }[] = [
    {
      title: "Pioneers",
      description1:
        "We’re dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it",
      description2:
        "We’re on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
      image: cardImg1.src,
      bg: "#000000",
      textColor: "#FFFFFF",
    },
    {
      title: "Award Winning",
      description1:
        "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
      image: cardImg2.src,
      bg: "#B2F6E3",
    },
    {
      title: "Speed",
      description1:
        "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms. We’ve created a service which takes ideas to result within 60 minutes.",
      image: cardImg3.src,
      bg: "#FFFFFF",
    },
  ];

  useGSAP(() => {
    if (!cardsContainer.current || !sectionContainer.current) return;
    const cardEls = Array.from(cardsContainer.current.children);

    // Each card travels from center to top of viewport (~50vh)
    const viewportHeight = window.innerHeight;

    // Stagger duration per card so the pin ends when last card exits
    const perCardDuration = 1;

    // Scroll distance that maps to totalDuration (tune multiplier for speed)
    const scrollDistance = viewportHeight * 3;

    // Set initial stacked state
    cardEls.forEach((card, idx) => {
      gsap.set(card, {
        position: "absolute",
        rotate: 4 * (idx + 1),
        top: "50%",
        left: "50%",
        yPercent: -50,
        xPercent: -50,
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionContainer.current,
        start: "top top",
        end: `+=${scrollDistance}px`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    cardEls.forEach((card, idx, arr) => {
      tl.to(
        card,
        {
          rotation: idx === arr.length - 1 ? -30 / 5 : -30,
          y: idx === arr.length - 1 ? -viewportHeight / 2 : -viewportHeight,
          x: idx === arr.length - 1 ? -50 / 2 : -50,
          duration: perCardDuration,
          ease: "power2.inOut",
        },
        idx === arr.length - 1 ? "-=0.7" : "-=0.5",
      );
    });
  }, []);

  return (
    <>
      <section ref={sectionContainer} className="py-16 h-[50vh] relative hidden xl:block">
        <div>
          <h2 className="text-black text-xl font-semibold text-center">Legacy In The Making</h2>
        </div>

        <div ref={cardsContainer} className="absolute inset-0 mt-10 h-screen">
          {cards.map((card, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: card.bg,
                zIndex: 100 - idx,
              }}
              className="absolute rounded-2xl w-xl min-h-[600px] px-14 py-10"
            >
              <div
                className={`flex flex-col items-center justify-center h-full px-8 text-center gap-4`}
                style={{
                  color: card.textColor || "black",
                }}
              >
                <Image src={card.image} alt="card image" width={200} height={200} className="rounded-2xl" />

                <h1 className="text-7xl font-semibold tracking-tight mt-2">{card.title}</h1>

                <p className="text-base">{card.description1}</p>
                {card.description2 && <p className="text-base">{card.description2}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 block xl:hidden">
        <div>
          <h2 className="text-black text-base font-semibold text-center">Legacy In The Making</h2>
        </div>

        {/* <div className="mt-10">
          {cards.map((card, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: card.bg,
                zIndex: 100 - idx,
              }}
              className="rounded-2xl px-6 py-6"
            >
              <div
                className={`flex flex-col items-center justify-center h-full text-center gap-4`}
                style={{
                  color: card.textColor || "black",
                }}
              >
                <Image
                  src={card.image}
                  alt="card image"
                  width={500}
                  height={500}
                  className="rounded-2xl w-full h-auto"
                />

                <h1 className="text-3xl tracking-tight">{card.title}</h1>

                <p className="text-sm">{card.description1}</p>
                {card.description2 && <p className="text-sm">{card.description2}</p>}
              </div>
            </div>
          ))}
        </div> */}

        <div className="px-4 mt-2">
          <Swiper
            pagination={{
              type: "progressbar",
            }}
            loop
            spaceBetween={20}
            navigation={true}
            modules={[Pagination]}
            className="mySwiper progress-swiper"
          >
            {cards.map((card, idx) => (
              <SwiperSlide key={idx}>
                <div
                  style={{
                    backgroundColor: card.bg,
                  }}
                  className="rounded-2xl px-6 py-6 h-[580px]"
                >
                  <div
                    className={`flex flex-col items-center justify-center h-full text-center gap-4`}
                    style={{
                      color: card.textColor || "black",
                    }}
                  >
                    <Image
                      src={card.image}
                      alt="card image"
                      width={500}
                      height={500}
                      className="rounded-2xl w-full h-auto"
                    />

                    <h1 className="text-3xl tracking-tight">{card.title}</h1>

                    <p className="text-sm">{card.description1}</p>
                    {card.description2 && <p className="text-sm">{card.description2}</p>}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default Legacy;
