import { CookieOptions } from "express";

export let secureCookieOption: CookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 14 * 24 * 60 * 60 * 1000, // 1 week
};
