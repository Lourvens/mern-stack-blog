export type user = {
  fullname: string;
  email: string;
  password: string;
  profile_picture?: string;
};

export type authTokenPayload = Pick<
  user,
  "email" | "fullname" | "profile_picture"
> & { id: string };
