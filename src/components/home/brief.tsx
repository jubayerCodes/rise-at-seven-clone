"use client";

import ScrollVelocity from "../shared/ScrollVelocity";
import briefImg from "@/assets/img/brief/IMG_5023.webp";
import briefImg2 from "@/assets/img/brief/Screenshot-2025-06-25-at-14.49.00.webp";
import { useCursorStore } from "@/store/cursor-store";

function Brief() {
  const setText = useCursorStore((s) => s.setText);
  return (
    <section className="pt-8 xl:pt-24">
      <div
        className="text-cursor hidden xl:block"
        onMouseEnter={() => setText("Send Us Your Brief")}
        onMouseLeave={() => setText("")}
      >
        <ScrollVelocity
          velocity={60}
          direction="left"
          imageSize={200}
          imageBorderRadius={14}
          className="text-[220px] font-semibold leading-[1.1]"
          imageGap={0.15}
          items={[
            {
              segments: [
                { type: "text", value: "Not Algorithms" },
                { type: "image", src: briefImg.src, alt: "Team" },
                { type: "text", value: "Chasing Consumers" },
                { type: "image", src: briefImg2.src, alt: "Event" },
              ],
            },
          ]}
        />
      </div>
      <div
        className="text-cursor xl:hidden"
        onMouseEnter={() => setText("Send Us Your Brief")}
        onMouseLeave={() => setText("")}
      >
        <ScrollVelocity
          velocity={60}
          direction="left"
          imageSize={70}
          imageBorderRadius={14}
          className="text-7xl font-medium leading-[1.1]"
          imageGap={0.15}
          items={[
            {
              segments: [
                { type: "text", value: "Not Algorithms" },
                { type: "image", src: briefImg.src, alt: "Team" },
                { type: "text", value: "Chasing Consumers" },
                { type: "image", src: briefImg2.src, alt: "Event" },
              ],
            },
          ]}
        />
      </div>
    </section>
  );
}

export default Brief;
