import { APP_ROUTE, IMAGES } from "@/utils/constants";
import { Link } from "react-router-dom";

type Prop = { category: string };
function NoArticleItem({ category }: Prop) {
  return (
    <div className="flex flex-col items-center my-10 max-w-md mx-auto">
      <img src={IMAGES.articleRead} className="h-32 md:h-44" />
      <div className="mt-3 text-center">
        <h1 className="text-primary text-3xl font-bold">Whoops!</h1>
        <h3 className="text-lg mb-3 text-gray-600 dark:text-gray-400">
          No content available now for this category. <br /> Be the first who
          talk about {category}.
        </h3>
      </div>
      <Link
        to={APP_ROUTE.ARTICLE_EDIT}
        state={{ category }}
        className="capitalize btn gap-2 text-black dark:text-white"
      >
        start writing ✍️
      </Link>
    </div>
  );
}

export default NoArticleItem;
