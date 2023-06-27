import { ASSETS_URL } from "./constants";

function getAssetFileUrl(dir: string, file: string) {
  return `${ASSETS_URL}/${dir}/${file}`;
}

export default getAssetFileUrl;
