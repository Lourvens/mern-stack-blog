import path from "path";
import multer from "multer";

// import uuid from "uuid";
const uuid = require("uuid");

const uploadImage = (endpoint: "avatar" | "blog", fieldname: string) => {
  const storage = multer.diskStorage({
    destination: path.join(process.cwd(), "src", "uploads", endpoint),
    filename(req, file, cb) {
      const extension = file.originalname.match(/(\.[^.]+)$/)?.[1] || "";
      let filename = `${uuid.v4()}-${Date.now()}${extension}`;
      cb(null, filename);
    },
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10mb
    },
    fileFilter(req, file, callback) {
      let isValidMimetype = /image\/(png|jpg|jpeg)/.test(file.mimetype);
      if (isValidMimetype) {
        callback(null, true);
      } else {
        callback(null, false);
        callback(new Error("only png,jpg,jpeg image file are accepted"));
      }
    },
  });

  return upload.single(fieldname);
};

export default uploadImage;
