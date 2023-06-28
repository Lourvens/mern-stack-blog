import { article } from "@/types/request";
import CardSkeleton from "./CardSkeleton";
import Card from "./CardArticle";

type props = {
  items?: article[];
  withBtnAction?: boolean;
  isLoading: boolean;
  isFetched: boolean;
};

const ArticleList = ({ isLoading, items, isFetched, withBtnAction }: props) => {
  return (
    <div className="mt-6 grid gap-10 md:grid-cols-2 lg:gap-x-20 lg:px-4">
      {isLoading && <CardSkeleton />}
      {isFetched &&
        items?.map((article) => (
          <Card key={article._id} {...article} withBtnAction={withBtnAction} />
        ))}
    </div>
  );
};

export default ArticleList;
