import { createContext } from "react";

type data = {
  _id: string;
  fullname: string;
  email: string;
  profile_picture: string;
  access_token: string;
};

export type AuthProp = {
  credentials?: data;
  setCredentials: (state?: data) => void;
};

const authContext = createContext<AuthProp | undefined>(undefined);

export default authContext;
