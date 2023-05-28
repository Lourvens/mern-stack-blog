import { RequestHandler } from "express";

type UploadReqHandler = RequestHandler<
  { user_id: string },
  unknown,
  unknown,
  unknown
>;

const uploadProfileImg: UploadReqHandler = (req, res) => {
  req.params.user_id;
};

const userCtrl = {
  uploadProfileImg,
};

export default userCtrl;
