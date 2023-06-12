import { axiosInstance } from "../axiosInstance";

const PATH = "/article";

class ArticleService {
  static getAll(page = 0) {
    return axiosInstance.get(PATH, {
      params: { page },
    });
  }

  static getById(id: string) {
    return axiosInstance.get(`${PATH}/${id}`);
  }

  static random(category: string) {
    return axiosInstance.get("/article/random", {
      params: { category },
    });
  }
}

export default ArticleService;
