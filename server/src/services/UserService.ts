import { user } from "../types/schema";
import User from "../models/User";
import { ResourceAlreadyExist, ResourceNotFound } from "../utils/Error";

export async function createUser(user: Omit<user, "avatar">) {
  let isUserExist = await User.findOne({ email: user.email });

  if (isUserExist) {
    throw new ResourceAlreadyExist();
  }

  let newUser = new User(user);
  await newUser.save();
}

export async function getUserByEmail(email: string) {
  let user = await User.findOne({ email });

  if (!user) {
    throw new ResourceNotFound();
  }

  return user;
}

export async function updateProfilePicture(userId: string, value: string) {
  await User.findByIdAndUpdate(userId, { profile_picture: value });
}

export default {
  updateProfilePicture,
  getUserByEmail,
  createUser,
};
