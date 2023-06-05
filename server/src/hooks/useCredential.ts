import jwt from "jsonwebtoken";
import { Request } from "express";
import { authTokenPayload } from "../../../types";

function useCredentials(req: Request<any, any, any, any>) {
  let token = req.headers["authorization"]?.split(" ")[1] as string;
  const credentials = jwt.decode(token) as authTokenPayload;
  return credentials;
}

export default useCredentials;
