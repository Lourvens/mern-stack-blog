import httpStatus from "http-status";
import { ZodError, ZodSchema } from "zod";
import { NextFunction, Request, Response } from "express";

const validate = (schema: ZodSchema) => {
  return (req: Request, resp: Response, next: NextFunction) => {
    const data = req.body;
    try {
      schema.parse(data);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return resp
          .status(httpStatus.UNPROCESSABLE_ENTITY)
          .json({ message: err.errors });
      }
    }
  };
};

export default validate;
