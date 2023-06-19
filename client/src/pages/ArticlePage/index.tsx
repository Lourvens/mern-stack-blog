import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ArticleService from "@/service/api/articleService";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AiOutlineClockCircle, AiOutlineMessage } from "react-icons/ai";

import moment from "moment";
import abbreviateNumber from "@/utils/abbreviateNumber";

const ArticlePage = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["articles", id],
    queryFn: async () => {
      const { data } = await ArticleService.getById(id as string);
      return data;
    },
  });

  return (
    <div className="">
      <div className="p-6 bg-primary dark:bg-base-300">
        <Header />
      </div>
      <main className="p-6 dark:bg-base-300">
        <div className=" max-w-6xl mx-auto">
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
                {abbreviateNumber(230000)}
              </div>
            </div>
          </div>
          <h1 className="text-title">{data?.title}</h1>
          <div className="my-6 bg-gray-600 bg-opacity-30 h-48 rounded-xl"></div>
          <div className="flex items-center gap-6">
            <div className="avatar placeholder">
              {data?.author.profile_picture ? (
                <div className="w-8 rounded-full bg-neutral-focus ring-1 ring-primary ring-offset-base-100 ring-offset-4">
                  <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              ) : (
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                  <span className="text-xs">
                    {data?.author.fullname.substring(0, 2)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-primary">{data?.author.fullname}</h1>
              <h3 className="capitalize text-subtitle">
                author, educator and content creator
              </h3>
            </div>
          </div>
          <p className="mt-8">{data?.content}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
