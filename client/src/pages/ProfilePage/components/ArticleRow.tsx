import ArticleList from "@/components/ArticleList";
import useAuth from "@/hooks/useAuth";
import ArticleService from "@/service/api/articleService";
import { APP_ROUTE } from "@/utils/constants";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

function ArticleRow() {
  const { credential } = useAuth();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["articles", { author: credential?.id }],
    queryFn: async () => {
      const { data } = await ArticleService.getAll({ author: credential?.id });
      return data;
    },
  });

  return (
    <div>
      <div className="badge-lg badge badge-primary badge-outline">
        My recent articles
      </div>
      <ArticleList
        items={data}
        isFetched={isFetched}
        isLoading={isLoading}
        withBtnAction={true}
      />
      {isFetched && data && (
        <div className="text-2xl my-6">
          You've written no article{" "}
          <Link to={APP_ROUTE.ARTICLE_EDIT} className="link">
            write one now
          </Link>
        </div>
      )}
    </div>
  );
}

export default ArticleRow;
