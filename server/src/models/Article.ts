import { Schema, model, InferSchemaType } from "mongoose";

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    max: 1000,
    required: true,
  },
});

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    img_path: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      max: 12,
      min: 3,
    },
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

const Article = model<articleProp>("Article", ArticleSchema);

export type articleProp = InferSchemaType<typeof ArticleSchema>;

export default Article;
