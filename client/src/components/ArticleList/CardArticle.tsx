import truncateStr from "@/utils/truncateStr";
import momment from "moment";
import calculateReadingTime from "@/utils/calculateReadingTime";
import { Link } from "react-router-dom";

import { AiOutlineClockCircle } from "react-icons/ai";
import { article } from "@/types/request";
import { API_ROUTE } from "@/utils/constants";
import { BsFillTrash3Fill } from "react-icons/bs";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

type props = article & { withBtnAction?: boolean };
function Card({ withBtnAction, ...article }: props) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const closeModal = () => {
    setIsOpenDeleteModal(false);
  };

  return (
    <>
      <Link
        to={`${API_ROUTE.ARTICLE}/${article._id}`}
        key={article._id}
        className="btn-ghost h-auto w-auto p-2 rounded-xl hover:bg-opacity-5 dark:hover:bg-opacity-5"
      >
        <div className="flex gap-3 w-full">
          <div className="w-full">
            <h3 className="flex items-center gap-2 capitalize font-medium text-primary">
              <span>{article.category}</span>
              <span className="text-4xl">&middot;</span>
              <span className="lowercase opacity-50 text-sm">
                {calculateReadingTime(article.content)} reading
              </span>
            </h3>
            <h1>{truncateStr(article.title, 80)}</h1>
            <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
              <AiOutlineClockCircle size={16} />
              <span>{momment(article.updatedAt).fromNow()}</span>
            </div>
          </div>

          <div className="shrink-0 w-24 h-24 rounded-xl bg-slate-500"></div>
        </div>
        {withBtnAction && (
          <div className="mt-4">
            <button
              className="btn btn-error text-white gap-3 capitalize"
              onClick={(e) => {
                e.preventDefault();
                setIsOpenDeleteModal(true);
              }}
            >
              <BsFillTrash3Fill />
              Delete this article
            </button>
          </div>
        )}
      </Link>
      <DeleteModal
        isOpen={isOpenDeleteModal}
        close={closeModal}
        article_id={article._id}
      />
    </>
  );
}

export default Card;
