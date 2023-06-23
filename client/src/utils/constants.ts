import scienceCoverImg from "@/assets/science_cover_bg.jpg";
import technologyCoverImg from "@/assets/technology_cover_bg.jpg";
import businessCoverImg from "@/assets/business_cover_bg.jpg";
import articleReadingImg from "@/assets/reading.svg";

export const APP_ROUTE = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ARTICLE_VIEWER: "/articles/:id",
  PROFILE: "/me"
};

export const API_ROUTE = {
  ARTICLE: "/articles",
  REFRESH: "/auth/refresh-token",
  LOGIN: APP_ROUTE.LOGIN,
  SIGNUP: "/auth/signup",
  LOGOUT: "/auth/logout",
};

export const IMAGES = {
  business: businessCoverImg,
  technology: technologyCoverImg,
  science: scienceCoverImg,
  articleRead: articleReadingImg,
};
