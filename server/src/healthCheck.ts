import { RequestHandler } from "express";

const healthCheck: RequestHandler = (req, res) => {
  res.status(200).json({ message: "Ok!" });
};

export default healthCheck;
