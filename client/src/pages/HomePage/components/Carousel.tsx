import truncateStr from "@/utils/truncateStr";
import { article } from "@/types/request";

import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { API_ROUTE } from "@/utils/constants";

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
        to={`${API_ROUTE.ARTICLE}/${article._id}`}
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

export default Carousel;
