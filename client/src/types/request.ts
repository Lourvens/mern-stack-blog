export type article = {
  _id: string;
  title: string;
  content: string;
  img_path: string;
  category: string;
  author: {
    _id: string;
    fullname: string;
    profile_picture: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};
