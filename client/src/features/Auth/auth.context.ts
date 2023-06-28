import { createContext } from "react";

type data = {
  id: string;
  fullname: string;
  email: string;
  profile_picture: string;
};

export type AuthProp = {
  credentials?: data;
  setCredentials: (state?: data) => void;
};

const authContext = createContext<AuthProp | undefined>(undefined);

export default authContext;
