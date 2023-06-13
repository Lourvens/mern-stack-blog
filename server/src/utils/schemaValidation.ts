import * as z from "zod";

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

export const articleSchema = z
  .object({
    title: z.string().min(3).max(255),
    content: z.string().min(255).max(100_000),
    category: z.string().min(3).max(25),
  })
  .required();

export const commentSchema = z
  .object({
    content: z.string().max(10_000),
  })
  .required();
