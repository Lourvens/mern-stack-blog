import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Comment = model("Comment", CommentSchema);

export default Comment;
