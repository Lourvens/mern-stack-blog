/**
 * these Error classes are implemented to handle error that might be thrown in a
 * more effective way when we are retrieve and mutate resources from the database
 */

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
export class ResourceAlreadyExist extends Error {}

/**
 * it will be simply thrown when the ressource isn't exist
 * @example
 * const result = await User.findOne({ id })
 * if(!result) throw new ResourceNotFound(<reason>)
 *
 */
export class ResourceNotFound extends Error {}

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
export class ForbbidenResourceMutation extends Error {}
