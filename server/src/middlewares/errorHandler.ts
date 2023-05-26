import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";
import httpStatus from "http-status";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  let status: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message: string = "an unknown error was occured";

  if (isHttpError(err)) {
    status = err.statusCode;
    message = err.message;
  }
  res.status(status).json({ error: { message } });
};

export default errorHandler;
