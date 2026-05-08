"use client";

import { FooterLogo } from "@/assets/svg/home.svg";
import FlipButton from "./flip-button";
import { ArrowUpRight, PlusIcon } from "lucide-react";

import menuImg1 from "@/assets/img/menu/0B5A6875.webp";
import menuImg2 from "@/assets/img/menu/Screenshot-2025-06-23-at-22.39.35.webp";
import menuImg3 from "@/assets/img/menu/Screenshot-2025-06-23-at-23.14.49.webp";
import menuImg4 from "@/assets/img/menu/Screenshot-2025-06-23-at-23.16.14.webp";
import menuImg5 from "@/assets/img/menu/WhatsApp-Image-2025-06-03-at-08.34.50.webp";
import menuImg6 from "@/assets/img/menu/data.webp";
import menuImg7 from "@/assets/img/menu/temp_image_43CEDE6C-4430-479F-9DBF-B348FA9AC991.webp";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface IHeaderMenu {
  title: string;
  slug: string;
  badge?: string;
  btnText?: string;
  children?: {
    title?: string;
    items: {
      label: string;
      slug: string;
      img: string;
    }[];
  };
}

function Header() {
  const headerMenu: IHeaderMenu[] = [
    {
      title: "Services",
      slug: "#",
      btnText: "View All Services",
      children: {
        title: "Core Services",
        items: [
          {
            label: "Search & Growth Strategy",
            slug: "#",
            img: menuImg1.src,
          },
          {
            label: "Digital PR",
            slug: "#",
            img: menuImg2.src,
          },
          {
            label: "Onsite SEO",
            slug: "#",
            img: menuImg3.src,
          },
          {
            label: "Social Media & Campaigns",
            slug: "#",
            img: menuImg4.src,
          },
          {
            label: "Content Experience",
            slug: "#",
            img: menuImg5.src,
          },
          {
            label: "Data & Insights",
            slug: "#",
            img: menuImg6.src,
          },
          {
            label: "B2B Marketing",
            slug: "#",
            img: menuImg7.src,
          },
          {
            label: "Social SEO/Search",
            slug: "#",
            img: menuImg1.src,
          },
        ],
      },
    },
    {
      title: "Industries",
      slug: "#",
      children: {
        items: [
          {
            label: "B2B Marketing",
            slug: "#",
            img: menuImg1.src,
          },
        ],
      },
    },
    {
      title: "International",
      slug: "#",
      children: {
        items: [
          {
            label: "US Digital PR",
            slug: "#",
            img: menuImg1.src,
          },
          {
            label: "Spain Digital PR",
            slug: "#",
            img: menuImg2.src,
          },
          {
            label: "Germany Digital PR",
            slug: "#",
            img: menuImg3.src,
          },
          {
            label: "Netherlands Digital PR",
            slug: "#",
            img: menuImg4.src,
          },
        ],
      },
    },
    {
      title: "About",
      slug: "#",
      children: {
        items: [
          {
            label: "About Us",
            slug: "#",
            img: menuImg1.src,
          },
          {
            label: "Meet The Risers",
            slug: "#",
            img: menuImg2.src,
          },
          {
            label: "Culture",
            slug: "#",
            img: menuImg3.src,
          },
          {
            label: "Testimonials",
            slug: "#",
            img: menuImg4.src,
          },
        ],
      },
    },
    {
      title: "Work",
      slug: "#",
      badge: "25",
    },
    {
      title: "Careers",
      slug: "#",
    },
    {
      title: "Blog & Resources",
      slug: "#",
      children: {
        items: [
          {
            label: "Blog",
            slug: "#",
            img: menuImg1.src,
          },
          {
            label: "Category Leaderboard",
            slug: "#",
            img: menuImg2.src,
          },
          {
            label: "Multi-Channel Search Report",
            slug: "#",
            img: menuImg3.src,
          },
        ],
      },
    },
    {
      title: "Webiner",
      slug: "#",
    },
  ];

  return (
    <header className="sticky top-12 h-fit z-10000 p-3">
      <div className="px-6 pr-2 py-2 overflow-hidden rounded-full w-full flex justify-between items-center">
        <div>
          <FooterLogo className="w-[160px]! text-white" />
        </div>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              {headerMenu.map((menu, idx) => (
                <MenuItem key={idx} item={menu} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div>
          <FlipButton>
            Get In Touch <ArrowUpRight />
          </FlipButton>
        </div>
      </div>
    </header>
  );
}

export default Header;

function MenuItem({ item }: { item: IHeaderMenu }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = (idx: number) => {
    if (activeIdx === idx) return;
    if (!imgRef.current) return;

    setActiveIdx(idx);

    gsap.fromTo(
      imgRef.current,
      {
        filter: "blur(5px)",
        duration: 0.2,
      },
      {
        filter: "blur(0px)",
        duration: 0.2,
      },
    );
  };

  return (
    <NavigationMenuItem>
      <div className="relative group">
        {item?.children ? (
          <NavigationMenuTrigger
            className={
              "rounded-full text-white hover:text-foreground px-4 py-0.5 h-fit text-base active:text-foreground focus:text-foreground cursor-pointer"
            }
          >
            {item.title} {item?.children && <PlusIcon className="relative top-0 size-3" aria-hidden="true" />}
          </NavigationMenuTrigger>
        ) : (
          <NavigationMenuLink
            href={item?.slug}
            className={
              "rounded-full text-white hover:text-foreground px-4 py-0.5 h-fit text-base active:text-foreground focus:text-foreground cursor-pointer"
            }
          >
            {item.title}
          </NavigationMenuLink>
        )}

        {item?.badge && (
          <span className="absolute -top-2 right-0 bg-green-200 text-[8px] px-[4px] pt-px font-semibold rounded-full group-hover:-top-4 transition-all z-100">
            {item?.badge}
          </span>
        )}
      </div>
      <NavigationMenuContent className={"z-1000 p-0! max-w-5xl!"}>
        <div className="p-4 w-full flex items-center justify-between gap-12">
          <div className="pl-6">
            {item.children?.title && (
              <h5 className="text-base font-medium text-muted-foreground">{item.children?.title}</h5>
            )}
            <div
              className={cn(
                `grid gap-x-10 mt-2`,
                item.children?.items && item.children?.items?.length > 4 ? "grid-cols-2" : "grid-cols-1 gap-y-1",
              )}
            >
              {item.children?.items?.map((it, i) => (
                <NavigationMenuLink key={i} className={"hover:bg-transparent p-0"}>
                  <FlipButton
                    onPointerEnter={() => handleMouseEnter(i)}
                    className={cn(
                      "bg-transparent px-0! py-0! h-fit rounded-none hover:bg-transparent! font-semibold",
                      item.children?.items && item.children?.items?.length > 4 ? "text-xl" : "text-3xl",
                    )}
                  >
                    {it.label}
                  </FlipButton>
                </NavigationMenuLink>
              ))}
            </div>
          </div>
          <div className="relative">
            {item.children?.items && item.children.items.length > 0 && (
              <Image
                ref={imgRef}
                src={item.children?.items[activeIdx].img}
                width={300}
                height={300}
                alt={item.children?.items[activeIdx].label}
                className="rounded-3xl object-cover"
              />
            )}

            {item?.btnText && (
              <FlipButton className={"text-white bg-foreground absolute bottom-2 left-2"}>
                {item?.btnText} <ArrowUpRight />{" "}
              </FlipButton>
            )}
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
