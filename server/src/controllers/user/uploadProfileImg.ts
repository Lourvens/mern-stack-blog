import createHttpError from "http-errors";
import { RequestHandler } from "express";
import { CREATED, BAD_REQUEST } from "http-status";
import User from "../../services/UserService";
import useCredentials from "../../hooks/useCredential";

const uploadProfileImg: RequestHandler = (req, res) => {
  let { id } = useCredentials(req);

  if (req.file?.filename) {
    User.updateProfilePicture(id, req.file.filename);
    return res.status(CREATED).end();
  }

  throw createHttpError(BAD_REQUEST, "image not found");
};


export default uploadProfileImg;
