import ArticleService from "@/service/api/articleService";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AiOutlineClockCircle, AiOutlineMessage } from "react-icons/ai";
import moment from "moment";

import abbreviateNumber from "@/utils/abbreviateNumber";
import getAssetFileUrl from "@/utils/getAssetFileUrl";
import DOMPurify from "isomorphic-dompurify";

import "./article_content.css";

const ArticlePage = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["articles", id],
    queryFn: async () => {
      const { data } = await ArticleService.getById(id as string);
      return data;
    },
  });

  const img_src =
    data?.author.profile_picture &&
    getAssetFileUrl("avatar", data?.author.profile_picture);

  const sanitizedContent = data?.content && DOMPurify.sanitize(data.content);

  return (
    <div>
      <div className=" max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-sm breadcrumbs overflow-hidden">
            <ul>
              <li>
                <a>article</a>
              </li>
              <li>
                <a>{data?.category}</a>
              </li>
            </ul>
          </div>
          <div className="flex gap-2 text-xs opacity-50">
            <div className="flex gap-1">
              <AiOutlineClockCircle className="text-sm" />
              {moment(data?.updatedAt).fromNow()}
            </div>
            <div className="flex gap-1">
              <AiOutlineMessage className="text-sm" />
              {data?.comments && abbreviateNumber(data.comments.length)}
            </div>
          </div>
        </div>
        <h1 className="text-title">{data?.title}</h1>

        <div className="my-6 bg-opacity-30 h-48 lg:h-60 rounded-xl overflow-hidden">
          {data && (
            <img
              src={getAssetFileUrl("blog", data?.img_path)}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex items-center gap-6">
          <div className="avatar placeholder">
            {data?.author.profile_picture ? (
              <div className="w-8 rounded-full bg-neutral-focus ring-1 ring-primary ring-offset-base-100 ring-offset-4">
                <img src={img_src} />
              </div>
            ) : (
              <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                <span className="text-xs">
                  {data?.author.fullname.substring(0, 2)}
                </span>
              </div>
            )}
          </div>
          <h1 className="dark:text-white flex gap-x-2 items-center text-sm">
            <span>By</span>
            <span className="text-primary">{data?.author.fullname}</span>
            <span className="text-4xl">&middot;</span>
            <span>{moment(data?.createdAt).format("ll")}</span>
          </h1>
        </div>
        <p
          className="mt-8 text-clip w-full overflow-hidden article-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent || "" }}
        ></p>
      </div>
    </div>
  );
};

export default ArticlePage;
