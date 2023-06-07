import Article from "../models/Article";
import { ForbbidenResourceMutation, ResourceNotFound } from "../utils/Error";

type commentData = {
  user_id: string;
  content: string;
  article_id: string;
  comment_id: string;
};

const newComment = async (values: Omit<commentData, "comment_id">) => {
  const article = await Article.findById(values.article_id);

  if (!article) throw new ResourceNotFound();

  article.comments.push({
    author: values.user_id,
    content: values.content,
  });

  await article.save();
};

const updateComment = async (values: commentData) => {
  const article = await Article.findById(values.article_id);
  if (!article) {
    throw new ResourceNotFound("article not found, it might be deleted");
  }

  const comment = article.comments.id(values.comment_id);

  if (!comment) {
    throw new ResourceNotFound("comment not found, it might be deleted");
  }

  if (<unknown>comment.author._id != values.user_id) {
    throw new ForbbidenResourceMutation();
  }

  comment.content = values.content;
  await article.save();
};

const deleteComment = async (values: Omit<commentData, "content">) => {
  const article = await Article.findById(values.article_id);
  if (!article) {
    throw new ResourceNotFound("article not found, it might be deleted");
  }

  const comment = article.comments.id(values.comment_id);

  if (!comment) {
    throw new ResourceNotFound("comment not found, it might be deleted");
  }

  if (<unknown>comment.author._id != values.user_id) {
    throw new ForbbidenResourceMutation();
  }

  const commentIndx = article.comments.findIndex((item) =>
    item._id?.equals(comment._id as NonNullable<(typeof comment)["_id"]>)
  );
  article.comments.splice(commentIndx, 1); // remove the selected comment

  await article.save();
};

const comment = {
  add: newComment,
  update: updateComment,
  remove: deleteComment,
};

export default comment;
