import Hero from "@/components/home/hero";
import HeadingWithImage from "@/components/shared/heading-with-image";

// Demo images — replace with real ones
const DEMO_IMG = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&q=80";

export default function Home() {
  return (
    <>
      <Hero />

      {/* ── Demo: HeadingWithImage variants ─────────────────────────── */}
      <section className="bg-[#f5f0e8] py-20 space-y-16 px-6 md:px-12">

        {/* Variant 1 — white-on-dark, large (hero style, no line1) */}
        <div className="bg-black p-10 rounded-2xl">
          <HeadingWithImage
            line2="Category Leaders"
            imageUrl={DEMO_IMG}
            imageClassName="rounded-2xl"
            textClassName="text-white text-[clamp(3rem,8vw,7rem)]"
          />
        </div>

        {/* Variant 2 — black-on-light, with optional first line (section heading style) */}
        <div>
          <HeadingWithImage
            line1="We Create"
            line2="Category Leaders"
            imageUrl={DEMO_IMG}
            imageClassName="rounded-xl"
            textClassName="text-black text-[clamp(3rem,8vw,7rem)]"
          />
        </div>

        {/* Variant 3 — smaller heading ("Our Services" style) */}
        <div>
          <HeadingWithImage
            line2="Our Services"
            imageUrl={DEMO_IMG}
            imageClassName="rounded-xl"
            textClassName="text-black text-[clamp(2rem,5vw,4.5rem)]"
          />
        </div>

        {/* Variant 4 — italic mixed weight ("Driving Demand & Discovery") */}
        <div>
          <HeadingWithImage
            line2="Driving Demand & Discovery"
            imageUrl={DEMO_IMG}
            imageClassName="rounded-2xl"
            textClassName="text-black text-[clamp(2.5rem,6vw,5.5rem)]"
          />
        </div>

      </section>
    </>
  );
}
