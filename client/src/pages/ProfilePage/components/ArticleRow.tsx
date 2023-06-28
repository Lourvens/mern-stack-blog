import ArticleList from "@/components/ArticleList";
import useAuth from "@/hooks/useAuth";
import ArticleService from "@/service/api/articleService";
import { useQuery } from "react-query";

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
    </div>
  );
}

export default ArticleRow;
