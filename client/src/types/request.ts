export type user = {
  _id: string;
  fullname: string;
  profile_picture: string;
  email: string;
  password: string;
};

export type comment = {
  _id: string;
  author: Omit<user, "password" | "email">;
  content: string;
};

export type article = {
  _id: string;
  title: string;
  content: string;
  img_path: string;
  category: string;
  author: Omit<user, "password">;
  comments: comment[];
  createdAt: string;
  updatedAt: string;
};
