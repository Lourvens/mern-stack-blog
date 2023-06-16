import { useState } from "react";
import { useQuery } from "react-query";
import TabNavigation from "./components/TabNavigation";
import ArticleService from "@/service/api/articleService";
import Card from "./components/CardArticle";
import NoArticleItem from "./components/NoArticleItem";

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

  const { data, isFetched } = useQuery({
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
      {/* List Item */}
      <div className="mt-6 px-3 grid gap-10 md:grid-cols-2 lg:gap-x-10 lg:px-16">
        {isFetched &&
          data?.map((article) => <Card key={article._id} {...article} />)}
      </div>

      {/* if data is empty  */}
      {isFetched && !data?.length && (
        <NoArticleItem category={selectedCategory} />
      )}
    </div>
  );
};

export default MainSection;
