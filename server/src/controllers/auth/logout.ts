import { Request, Response } from "express";
import env from "../../config/env";
import httpStatus from "http-status";

const logout = (req: Request, res: Response) => {
  res.cookie(env.TOKEN_COOKIE_NAME, null);
  res.status(httpStatus.NO_CONTENT).end();
};

export default logout;
