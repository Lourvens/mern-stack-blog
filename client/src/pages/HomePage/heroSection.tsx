import Header from "@/components/Header";
import { useQuery } from "react-query";
import ArticleService from "@/service/api/articleService";
import images from "@/constants/images";
import { useState } from "react";
import Carousel from "./components/Carousel";
import CarouselSkeleton from "./components/CarouselSkeleton";

const HeroSection = () => {
  const articleCategories = ["technology", "business", "science"] as const;
  type category = Extract<(typeof articleCategories)[number], string>;

  const [selectedCategory, setCategory] = useState<category>("technology");
  const { isLoading, data } = useQuery({
    queryKey: ["articles", "random"],
    queryFn: async () => {
      // retrieve a random article for each category
      const articles = articleCategories.map(ArticleService.random);
      const resp = await Promise.all(articles);
      // return only the response.data for each request
      return resp.map((item) => item.data).filter(Boolean);
    },
  });

  return (
    <section className="relative overflow-hidden">
      <img
        src={images[selectedCategory]}
        className="absolute brightness-[.3] h-full w-full object-cover"
      />
      <div className="relative px-4 py-6 lg:px-10 text-white">
        <Header />
        <div className="mt-20 lg:mt-32 py-4 max-w-xl mx-auto">
          {isLoading && <CarouselSkeleton />}
          {!isLoading && data && (
            <Carousel
              items={data}
              selected={articleCategories.indexOf(selectedCategory)}
              onChange={(selected: string) => {
                setCategory(selected as category);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
