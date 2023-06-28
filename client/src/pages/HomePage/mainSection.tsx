import { useState } from "react";
import { useQuery } from "react-query";
import TabNavigation from "./components/TabNavigation";
import ArticleService from "@/service/api/articleService";
import NoArticleItem from "./components/NoArticleItem";
import ArticleList from "@/components/ArticleList";

const MainSection = () => {
  const categories = [
    "all",
    "technology",
    "business",
    "health",
    "trends",
    "science",
    "fiction",
    "Leadership",
  ];
  const [selectedCategory, updateCategory] = useState(categories[0]);

  const { data, isFetched, isLoading } = useQuery({
    queryKey: ["articles", { category: selectedCategory }],
    queryFn: async () => {
      let filterQuery = {};
      if (selectedCategory != "all") {
        filterQuery = { category: selectedCategory };
      }
      return (await ArticleService.getAll(filterQuery)).data;
    },
  });

  return (
    <div className="py-4 dark:bg-base-300">
      <TabNavigation
        items={categories}
        selectedValue={selectedCategory}
        onChange={updateCategory}
      />

      <ArticleList items={data} isLoading={isLoading} isFetched={isFetched} />

      {/* if data is empty  */}
      {!isLoading && isFetched && !data?.length && (
        <NoArticleItem category={selectedCategory} />
      )}
    </div>
  );
};

export default MainSection;
