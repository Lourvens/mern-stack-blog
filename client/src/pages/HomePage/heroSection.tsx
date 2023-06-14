import Header from "@/components/Header";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import ArticleService from "@/service/api/articleService";
import { article } from "@/types/request";
import images from "@/constants/images";
import { useState } from "react";

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
      return resp.map((item) => item.data);
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
          {isLoading && <Skeleton />}
          {!isLoading && data && (
            <Carousel
              items={data}
              selected={articleCategories.indexOf(selectedCategory)}
              onChange={(index: number) => {
                setCategory(articleCategories[index]);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

type carouselProp = {
  items: article[];
  selected: number;
  onChange: (selected: number) => void;
};

const Carousel = (props: carouselProp) => {
  const article = props.items[props.selected];
  console.log(article);
  const next = () => {};
  const prev = () => {};
  return (
    <div className="grid gap-3">
      <span className="text-primary">{article.category}</span>
      <h1 className="font-medium text-2xl capitalize lg:text-4xl">
        {article.title}
      </h1>
      <Link to="" className="place-self-start btn btn-ghost capitalize gap-3">
        read article <AiOutlineArrowRight />
      </Link>
      <div className="flex gap-3">
        <button className="btn btn-circle btn-sm" onClick={prev}>
          <AiOutlineArrowLeft />
        </button>
        <button className="btn btn-circle btn-sm" onClick={next}>
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

const Skeleton = () => <div></div>;
