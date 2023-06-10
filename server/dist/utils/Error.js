"use strict";
/**
 * these Error classes are implemented to handle error in our express route controllers
 * in a more concise way. these Errors might be thrown when we retrieve or/and mutate
 * resources from the database.
 * @example
 * app.get("/article/:id", async (req, res) => {
 *  const article_id = req.params.id
 *  try {
 *    let article = await ArticleService.getOne(article_id)
 *    res.json(article)
 *  } catch (err) {
 *    if(err instanceof ResourceNotFound) {
 *      return res.status(404).json({message: err.message})
 *    }
 *    ...
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbbidenResourceMutation = exports.ResourceNotFound = exports.ResourceAlreadyExist = void 0;
/**
 * ResourceAlreadyExist will be thrown when we try to update/duplicate a resource
 * which is not allowed to do so.
 * @example
 * async function createNewUser(name, pwd) {
 *  const usr = User.findOne({ name })
 *  if(!usr) throw new ResourceAlreadyExist(<reason>)
 *  // create the new user 'cause it isn't already exist
 *  ...
 * }
 */
class ResourceAlreadyExist extends Error {
}
exports.ResourceAlreadyExist = ResourceAlreadyExist;
/**
 * it will be simply thrown when the ressource isn't exist
 * @example
 * const result = await User.findOne({ id })
 * if(!result) throw new ResourceNotFound(<reason>)
 *
 */
class ResourceNotFound extends Error {
}
exports.ResourceNotFound = ResourceNotFound;
/**
 * ForbbidenResourceMutation will be triggered when a resource require a specific
 * user manipulate it.
 * - only a user who create an article can overwrite/delete it otherwise
 * this Error will be thrown
 * @example
 * async function deleteArticle(articleId, userInfo) {
 *  const article = await Article.findById(articleId)
 *  if(article.author.id != userInfo.id) {
 *    throw new ForbbidenResourceMutation("only the owner can delete this resource")
 *  }
 *  // else delete the article ...
 * }
 */
class ForbbidenResourceMutation extends Error {
}
exports.ForbbidenResourceMutation = ForbbidenResourceMutation;
