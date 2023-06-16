import { useState } from "react";
import { useQuery } from "react-query";
import TabNavigation from "./components/TabNavigation";
import ArticleService from "@/service/api/articleService";
import Card from "./components/CardArticle";
import { Link } from "react-router-dom";
import images from "@/constants/images";

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
    <div className="py-4">
      <TabNavigation
        items={categories}
        selectedValue={selectedCategory}
        onChange={updateCategory}
      />
      <div className="mt-6 px-3 grid gap-10 md:grid-cols-2 lg:gap-x-10 lg:px-16">
        {isFetched &&
          data?.map((article) => <Card key={article._id} {...article} />)}
      </div>
      {/* for empty article **article = []**  */}

      {isFetched && !data?.length && (
        <div className="flex flex-col items-center my-10 max-w-md mx-auto">
          <img src={images.articleRead} className="h-32 md:h-44" />
          <div className="mt-3 text-center">
            <h1 className="text-primary text-3xl font-bold">Whoops!</h1>
            <h3 className="text-lg mb-3 text-gray-600 dark:text-gray-400">
              No content available now for this category. <br /> Be the first
              who talk about {selectedCategory}.
            </h3>
          </div>
          <Link
            to="/me/article/new"
            state={{ category: selectedCategory }}
            className="capitalize btn gap-2 text-black dark:text-white"
          >
            start writing ✍️
          </Link>
        </div>
      )}
    </div>
  );
};

export default MainSection;
