import { RequestHandler } from "express";
import path from "path";
import multer from "multer";
import createHttpError from "http-errors";
import { BAD_REQUEST } from "http-status";

// import uuid from "uuid";
const uuid = require("uuid");

type params = {
  dest: "avatar" | "blog";
  fieldname: string;
};

const uploadImage = ({ dest, fieldname }: params) => {
  const storage = multer.diskStorage({
    destination: path.join(process.cwd(), "src", "uploads", dest),
    filename(req, file, cb) {
      const extension = file.originalname.match(/(\.[^.]+)$/)?.[1] || "";
      let filename = `${uuid.v4()}-${Date.now()}${extension}`;
      cb(null, filename);
    },
  });

  const Multer = multer({
    storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10mb
    },
    fileFilter(req, file, callback) {
      let isValidMimetype = /image\/(png|jpg|jpeg)/.test(file.mimetype);

      if (isValidMimetype) {
        callback(null, true);
      } else {
        callback(new Error("invalid mimetype"));
      }
    },
  });

  const upload = Multer.single(fieldname);
  const multerMiddleware: RequestHandler = (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        next(createHttpError(BAD_REQUEST, err.message));
      } else {
        next();
      }
    });
  };
  return multerMiddleware;
};

export default uploadImage;
