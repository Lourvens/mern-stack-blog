import { useState } from "react";
import { useQuery } from "react-query";
import { AiOutlineClockCircle, AiFillMediumCircle } from "react-icons/ai";
import TabNavigation from "./components/TabNavigation";
import ArticleService from "@/service/api/articleService";
import truncateStr from "@/utils/truncateStr";
import momment from "moment";
import calculateReadingTime from "@/utils/calculateReadingTime";

const MainSection = () => {
  const categories = ["all", "technology", "business", "health", "trends"];
  const [selectedCategory, updateCategory] = useState(categories[0]);

  const { data, isFetched } = useQuery({
    queryKey: ["articles", { category: selectedCategory }],
    queryFn: async () => {
      return (await ArticleService.getAll({ category: selectedCategory })).data;
    },
  });

  return (
    <div className="py-4">
      <TabNavigation
        items={categories}
        selectedValue={selectedCategory}
        onChange={updateCategory}
      />
      <div className="mt-6 px-3 grid gap-10">
        {isFetched &&
          data?.map((article) => (
            <div key={article._id}>
              <div className="flex gap-3">
                <div>
                  <h3 className="flex items-center gap-2 capitalize font-medium text-primary">
                    <span>{article.category}</span>
                    <span className="text-4xl">&middot;</span>
                    <span className="lowercase opacity-50 text-sm">
                      {calculateReadingTime(article.content)} reading
                    </span>
                  </h3>
                  <h1>{truncateStr(article.title, 80)}</h1>
                  <div className="mt-3 flex items-center gap-1 text-xs">
                    <AiOutlineClockCircle size={16} />
                    <span>{momment(article.updatedAt).fromNow()}</span>
                  </div>
                </div>
                <div className="shrink-0 w-24 h-24 rounded-xl bg-slate-500"></div>
              </div>

              <div className="mt-1"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MainSection;
