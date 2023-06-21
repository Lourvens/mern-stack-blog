import scienceCoverImg from "@/assets/science_cover_bg.jpg";
import technologyCoverImg from "@/assets/technology_cover_bg.jpg";
import businessCoverImg from "@/assets/business_cover_bg.jpg";
import articleReadingImg from "@/assets/reading.svg";

export const APP_ROUTE = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ARTICLE_VIEWER: "/articles/:id",
};

export const API_ROUTE = {
  ARTICLE: "/articles",
  REFRESH: "/auth/refresh-token",
  LOGIN: APP_ROUTE.LOGIN,
  REGISTER: APP_ROUTE.REGISTER,
};

export const IMAGES = {
  business: businessCoverImg,
  technology: technologyCoverImg,
  science: scienceCoverImg,
  articleRead: articleReadingImg,
};
