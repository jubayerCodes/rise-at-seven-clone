"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import FlipButton from "../shared/flip-button";
import HeadingWithImage from "../shared/heading-with-image";
import headingImg from "@/assets/img/blogs/FOS25-3380.webp";

import blogImg1 from "@/assets/img/blogs/0B5A7827.webp";
import blogImg2 from "@/assets/img/blogs/3-copy.webp";
import blogImg3 from "@/assets/img/blogs/Noomz1-4.webp";

import authorImg1 from "@/assets/img/blogs/84b3917f166d7feb4c2376f78ce33ae432656999.webp";
import authorImg2 from "@/assets/img/blogs/WhatsApp-Image-2025-06-23-at-22.50.52.webp";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";

interface IBlog {
  title: string;
  img: string;
  author: string;
  authorImg: string;
  category: string;
  time: string;
  url: string;
}

function Blogs() {
  const blogs: IBlog[] = [
    {
      title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
      img: blogImg1.src,
      author: "Carrie Rose",
      authorImg: authorImg1.src,
      category: "News",
      time: "2 mins",
      url: "#",
    },
    {
      title:
        "Rise at Seven Appointed by Coneys to Drive Demand and Retail Growth for them in the Chocolate Confectionery Category",
      img: blogImg2.src,
      author: "Ray Saddiq",
      authorImg: authorImg2.src,
      category: "News",
      time: "2 mins",
      url: "#",
    },
    {
      title: "Rise at Seven Appointed by Langtins to drive demand and retail growth for Noomz",
      img: blogImg3.src,
      author: "Carrie Rose",
      authorImg: authorImg1.src,
      category: "News",
      time: "2 mins",
      url: "#",
    },
  ];

  return (
    <section className="p-4 pb-18 xl:p-7 xl:pb-40">
      <div>
        <div className="flex justify-between items-center xl:border-b border-gray-400/70 xl:pb-5">
          <HeadingWithImage
            line2="What's New"
            imageUrl={headingImg.src}
            imageAlt="blog heading image"
            textClassName="text-[60px] xl:text-[100px] font-semibold xl:justify-center"
            imageClassName="rounded-2xl"
            animDelay={0.3}
          />

          <FlipButton className={"hidden xl:inline-flex"}>
            Explore More Thoughts <ArrowUpRight />
          </FlipButton>
        </div>
        <div className="hidden xl:grid grid-cols-3 gap-5 mt-10">
          {blogs.map((blog, idx) => (
            <BlogCard key={idx} blog={blog} />
          ))}
        </div>

        <div className="mt-4 xl:hidden block">
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
            {blogs.map((blog, idx) => (
              <SwiperSlide key={idx}>
                <BlogCard key={idx} blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <FlipButton className={"xl:hidden mt-4 w-full"}>
          Explore More Thoughts <ArrowUpRight />
        </FlipButton>
      </div>
    </section>
  );
}

export default Blogs;

const BlogCard = ({ blog }: { blog: IBlog }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !imgRef.current) return;
  }, []);

  const handleMouseEnter = () => {
    gsap.to(overlayRef.current, {
      clipPath: "circle(150% at 50% 100%)",
      duration: 0.3,
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(overlayRef.current, {
      clipPath: "circle(0% at 50% 100%)",
      duration: 0.3,
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
    });
  };

  return (
    <Link
      href={blog.url}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-target hover:-translate-y-2 transition duration-300"
    >
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          ref={imgRef}
          src={blog.img}
          width={600}
          height={600}
          alt={blog.title}
          className="w-full h-[300px] xl:h-[600px] object-cover"
        />

        <div
          className={cn(
            "absolute top-5 left-5 rounded-full px-4 py-1.5 flex justify-center items-center gap-2 text-white font-semibold backdrop-blur-sm bg-white/20 text-base transition duration-300 z-20",
          )}
        >
          {blog?.category}
        </div>

        {/* Blur Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none z-10 hidden xl:block"
          style={{
            clipPath: "circle(0% at 50% 100%)",
            filter: "blur(13px)",
          }}
        >
          <div className="w-full h-full">
            <Image
              src={blog.img}
              width={600}
              height={600}
              alt={blog.title}
              className="w-full h-full object-cover scale-120"
            />
          </div>
        </div>
      </div>
      <div className="pt-6">
        <div className="flex justify-start gap-2">
          <div
            className={cn(
              "rounded-full px-3 py-1.5 flex justify-start items-center gap-1 bg-white text-base font-medium text-[#6a6a6a] tracking-tight",
            )}
          >
            <Image src={blog.authorImg} width={18} height={18} alt={blog.author} className="rounded-full" />
            {blog?.author}
          </div>
          <div
            className={cn(
              "rounded-full px-3 py-1.5 flex justify-start items-center gap-2 bg-white text-base font-medium text-[#6a6a6a] tracking-tight",
            )}
          >
            <Clock className="size-4.5" />
            {blog?.time}
          </div>
        </div>
        <h3 className="text-balance relative xl:text-3xl font-medium tracking-tight leading-none mt-3">{blog.title}</h3>
      </div>
    </Link>
  );
};
