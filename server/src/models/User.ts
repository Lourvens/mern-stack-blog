import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_picture: {
    // save the picture filename of the current user
    type: String,
    require: true,
  },
});

const User = model("User", UserSchema);

export default User;
