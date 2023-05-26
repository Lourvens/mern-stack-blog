const { rateLimit } = require("express-rate-limit");

export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: "too many attemps",
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
});
