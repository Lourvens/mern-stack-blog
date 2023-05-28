import createHttpError from "http-errors";
import { FORBIDDEN } from "http-status";
import { RequestHandler } from "express";
import type { authTokenPayload } from "../../../../types";
import { CREATED, BAD_REQUEST } from "http-status";
import jwt from "jsonwebtoken";
import User from "../../services/UserService";

const uploadProfileImg: UploadReqHandler = (req, res) => {
  let token = req.headers["authorization"]?.split(" ")[1] as string;
  let { user_id } = req.params;
  let { id } = jwt.decode(token) as authTokenPayload;

  if (id != user_id) {
    throw createHttpError(FORBIDDEN);
  }

  if (req.file?.filename) {
    User.updateProfilePicture(id, req.file.filename);
    return res.status(CREATED).end();
  }

  throw createHttpError(BAD_REQUEST, "image not found");
};

type UploadReqHandler = RequestHandler<
  { user_id: string },
  unknown,
  unknown,
  unknown
>;

export default uploadProfileImg;
