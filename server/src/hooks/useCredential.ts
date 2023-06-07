import jwt from "jsonwebtoken";
import { Request } from "express";
import { authTokenPayload } from "../types";

/**
 * this function is use to obtain the user credentials stored in the `req.header.authorization` as a bearer jwt token and return decoded value. make sure, `useCredentials` is called in a `protected route` by the `isAuthenticated` middleware.
 * otherwise an Error will be thrown
 */

function useCredentials(req: Request<any, any, any, any>) {
  const token = req.headers["authorization"]?.split(" ")[1] as string;
  const credentials = jwt.decode(token) as authTokenPayload;

  if (!credentials) {
    throw new Error("token incorrect or null");
  }

  return credentials;
}

export default useCredentials;
