import createHttpError from "http-errors";
import { RequestHandler } from "express";
import { BAD_REQUEST, OK } from "http-status";
import User from "../../services/UserService";
import useCredentials from "../../hooks/useCredential";
import asyncHandler from "express-async-handler";

const uploadProfileImg: RequestHandler = async (req, res) => {
  let { id } = useCredentials(req);

  if (req.file?.filename) {
    const profile_picture = req.file.filename;
    await User.updateProfilePicture(id, profile_picture);
    return res.status(OK).json({ profile_picture });
  }

  throw createHttpError(BAD_REQUEST, "image not found");
};

export default asyncHandler(uploadProfileImg);
