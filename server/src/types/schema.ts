export type user = {
  fullname: string;
  email: string;
  password: string;
  avatar: string;
};

export type article = {
  content: string;
  author: Omit<user, "password">;
  comments: comment[];
  updated_at: Date;
};

export type comment = {
  content: string;
  creator: Omit<user, "password">;
  updated_at: Date;
};
