import * as z from "zod";

export const blogSchema = z
  .object({
    title: z.string().max(255),
    content: z.string(),
    tag: z.string(),
  })
  .required();

export const userLogin = z
  .object({
    email: z.string().email(),
    password: z.string().min(4),
  })
  .required();

export const userRegister = userLogin
  .extend({
    fullname: z.string().min(3),
  })
  .required();
