import type { article } from "@/types/request";
import { axiosInstance } from "../axiosInstance";
import { ARTICLE_ROUTE } from "@/constants/routes";

class ArticleService {
  static getAll(page = 0) {
    return axiosInstance.get(ARTICLE_ROUTE, {
      params: { page },
    });
  }

  static getById(id: string) {
    return axiosInstance.get(`${ARTICLE_ROUTE}/${id}`);
  }

  // get a random article from the api
  static random(category: string) {
    return axiosInstance.get<article>(`${ARTICLE_ROUTE}/random`, {
      params: { category },
    });
  }
}

export default ArticleService;
