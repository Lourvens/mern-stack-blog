import { Router } from "express";
import { isAuthenticated } from "../middlewares/authGuard";
import { articleSchema, commentSchema } from "../utils/schemaValidation";
import articleCtrl from "../controllers/article";
import uploadImage from "../middlewares/uploader";
import validate from "../middlewares/validate";

const articleRouter = Router();
const COMMENT_ROUTE = "/:article_id/comments";

/**
 * @Route /article
 */
articleRouter
  /**@return the last 10 article */
  .get("/", articleCtrl.get)

  .get("/random", articleCtrl.getRandomArtcile)
  /**@return a single article with more details*/
  .get("/:id", articleCtrl.getById)

  .use(isAuthenticated)
  .post(
    "/",
    isAuthenticated,
    uploadImage({ dest: "blog", fieldname: "cover" }),
    validate(articleSchema),
    articleCtrl.create
  )
  .delete("/:id", isAuthenticated, articleCtrl.delete)

  /**
   * @Route /article/:article_id/comment
   */
  .post(`${COMMENT_ROUTE}`, validate(commentSchema), articleCtrl.addComment)
  .put(
    `${COMMENT_ROUTE}/:comment_id`,
    validate(commentSchema),
    articleCtrl.updateComment
  )
  .delete(`${COMMENT_ROUTE}/:comment_id`, articleCtrl.deleteComment);

export default articleRouter;
