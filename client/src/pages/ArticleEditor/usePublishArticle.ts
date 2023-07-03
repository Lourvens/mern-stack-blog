import useAuth from "@/hooks/useAuth";
import ArticleService from "@/service/api/articleService";
import { APP_ROUTE } from "@/utils/constants";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

function usePublishArticle() {
  const navigate = useNavigate();
  const query = useQueryClient();
  const { credential } = useAuth();

  const { isSuccess, isLoading, mutate, error } = useMutation({
    mutationKey: ["articles"],
    mutationFn: ArticleService.createOne,
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["articles", { author: credential?.id }],
      });
      navigate(APP_ROUTE.PROFILE);
    },
  });

  console.log(error);

  return { publish: mutate, isLoading, isSuccess };
}

export default usePublishArticle;
