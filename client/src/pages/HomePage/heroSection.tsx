import Header from "@/components/Header";
import coverImg1 from "@/assets/business_cover_bg.jpg";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import ArticleService from "@/service/api/articleService";

const HeroSection = () => {
  const articleCategories = ["technology", "business", "science"];

  useMutation({
    mutationFn: async () => {
      const articles = articleCategories.map(ArticleService.random);
      return await Promise.all(articles);
    },
  });

  return (
    <section className="relative overflow-hidden">
      <img
        src={coverImg1}
        alt=""
        className="absolute brightness-[.3] h-full w-full object-cover"
      />
      <div className="relative px-4 py-6 lg:px-10 text-white">
        <Header />
        <div className="grid gap-3 mt-20 lg:mt-32 py-4 max-w-xl mx-auto">
          <span className="text-primary">Technology</span>
          <h1 className="font-medium text-2xl capitalize lg:text-4xl">
            how to invest your money in newest technologies.
          </h1>
          <Link
            to=""
            className="place-self-start btn-ghost capitalize btn gap-3"
          >
            read article <AiOutlineArrowRight />
          </Link>
          <div className="flex gap-3">
            <button className="btn btn-circle btn-sm">
              <AiOutlineArrowLeft />
            </button>
            <button className="btn btn-circle btn-sm">
              <AiOutlineArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
