import Header from "@/components/Header";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import ArticleService from "@/service/api/articleService";
import { article } from "@/types/request";
import images from "@/constants/images";
import { useEffect, useMemo, useState } from "react";
import truncateStr from "@/utils/truncateStr";
import { ARTICLE_ROUTE } from "@/constants/routes";

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
          {isLoading && <Skeleton />}
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

type carouselProp = {
  items: article[];
  selected: number;
  onChange: (selected: string) => void;
};

const Carousel = ({ items, selected, onChange }: carouselProp) => {
  const article = items[selected];
  const next = () => {
    const nextIndex = items.length - 1 == selected ? 0 : selected + 1;
    onChange(items[nextIndex].category);
  };
  const prev = () => {
    const prevIndex = (selected == 0 ? items.length : selected) - 1;
    onChange(items[prevIndex].category);
  };
  return (
    <div className="h-[300px] flex flex-col justify-end">
      <div>
        <span className="text-primary font-medium text-lg capitalize">
          {article.category}
        </span>
        <h1 className="mt-3 mb-5 font-medium text-2xl capitalize lg:text-4xl text-ellipsis">
          {truncateStr(article.title, 130)}
        </h1>
      </div>
      <Link
        to={`${ARTICLE_ROUTE}/${article._id}`}
        className="place-self-start btn btn-ghost bg-primary bg-opacity-30 capitalize gap-3"
      >
        read article <AiOutlineArrowRight />
      </Link>
      <div className="flex gap-3 mt-8">
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

const Skeleton = () => (
  <div className="h-[300px] animate-pulse  flex flex-col justify-end">
    <div>
      <h1 className="w-24 h-6 bg-gray-500 rounded-md"></h1>
      <div className="mt-4 grid gap-1">
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-full h-6 bg-gray-500 rounded-md"></div>
        <div className="w-5/6 h-6 bg-gray-500 rounded-md"></div>
      </div>
      <div className="mt-4 w-32 h-10 bg-gray-500 rounded-md"></div>
    </div>
  </div>
);
