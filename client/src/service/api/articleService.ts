import type { article } from "@/types/request";
import { axiosInstance } from "../axiosInstance";
import { API_ROUTE } from "@/utils/constants";

const ARTICLE_ROUTE = API_ROUTE.ARTICLE;

type params = { page?: number; category?: string; author?: string };
type article_create = {
  title: string;
  content: string;
  category: string;
  cover: File;
};
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

  static createOne(values: article_create) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("category", values.category);
    formData.append("content", values.content);
    formData.append("cover", values.cover);

    return axiosInstance.post(ARTICLE_ROUTE, formData);
  }

  static deleteOne(id: string) {
    return axiosInstance.delete<null>(`${ARTICLE_ROUTE}/${id}`);
  }
}

export default ArticleService;
