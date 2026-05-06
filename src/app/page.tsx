import Blogs from "@/components/home/blogs";
import Brief from "@/components/home/brief";
import Discovery from "@/components/home/discovery";
import FeaturedWorks from "@/components/home/featured-works";
import Hero from "@/components/home/hero";
import Legacy from "@/components/home/legacy";
import Services from "@/components/home/services";

export default function Home() {
  return (
    <>
      <Hero />
      <Discovery />
      <FeaturedWorks />
      <Services />
      <Brief />
      <Legacy />
      <Blogs />
    </>
  );
}
