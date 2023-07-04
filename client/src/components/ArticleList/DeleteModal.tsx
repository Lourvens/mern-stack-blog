import useAuth from "@/hooks/useAuth";
import ArticleService from "@/service/api/articleService";
import clsx from "clsx";
import { useMutation, useQueryClient } from "react-query";

type prop = { isOpen: boolean; close: () => void; article_id: string };

const DeleteModal = ({ isOpen, close, article_id }: prop) => {
  const queryClient = useQueryClient();
  const { credential } = useAuth();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["articles", article_id],
    mutationFn: async () => {
      await ArticleService.deleteOne(article_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["articles", { author: credential?.id }]);
      close();
    },
  });

  const closeModal = () => !isLoading && close();
  const deleteArticle = () => {
    mutate();
  };

  return (
    <>
      <input
        type="checkbox"
        id="app_delete_modal"
        className="modal-toggle"
        checked={isOpen}
        onChange={() => null}
      />
      <div className="modal">
        <div className="modal-box">
          <label
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2"
          >
            ✕
          </label>
          <h3 className="mt-3 text-lg font-medium">
            You are about to delete an article
          </h3>
          <p className="text-sm text-gray-500">
            This action is irreversible, are you sure?
          </p>
          <div className="modal-action">
            <button onClick={closeModal} className="btn" disabled={isLoading}>
              Cancel
            </button>
            <button
              className={clsx("btn btn-error", { loading: isLoading })}
              onClick={deleteArticle}
            >
              delete it
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
