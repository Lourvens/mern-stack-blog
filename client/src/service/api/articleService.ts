import type { article } from "@/types/request";
import { axiosInstance } from "../axiosInstance";
import { API_ROUTE } from "@/utils/constants";

const ARTICLE_ROUTE = API_ROUTE.ARTICLE;

type params = { page?: number; category?: string; author?: string };
class ArticleService {
  static getAll(params?: params) {
    return axiosInstance.get<article[]>(ARTICLE_ROUTE, {
      params,
    });
  }

  static getById(id: string) {
    return axiosInstance.get<article>(`${ARTICLE_ROUTE}/${id}`);
  }

  // get a random article from the api
  static random(category: string) {
    return axiosInstance.get<article>(`${ARTICLE_ROUTE}/random`, {
      params: { category },
    });
  }

  static deleteOne(id: string) {
    return axiosInstance.delete<null>(`${ARTICLE_ROUTE}/${id}`);
  }
}

export default ArticleService;
