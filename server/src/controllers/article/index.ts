import * as commentRoutes from "./comments";
import getArticles, { getArticleById, getRandomArtcile } from "./getArticles";
import postArticle from "./post";
import deleteOne from "./delete";

const articleCtrl = {
  create: postArticle,
  get: getArticles,
  getById: getArticleById,
  delete: deleteOne,
  getRandomArtcile,
  ...commentRoutes,
};

export default articleCtrl;
