import { useCallback, useState } from "react";
import Editor from "./components/Editor";
import FileInput from "./components/FileInput";
import SelectInput from "./components/SelectInput";
import usePublishArticle from "./usePublishArticle";
import { z } from "zod";
import clsx from "clsx";

function ArticleEditor() {
  const [category, setCategory] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [fileInput, setFile] = useState<File>();
  const [content, setContent] = useState<string>();

  /* eslint-disable react-hooks/exhaustive-deps */
  const updateCategory = useCallback(setCategory, []);
  const updateFileInput = useCallback(setFile, []);
  const updateContent = useCallback(setContent, []);

  const { publish, isLoading, isSuccess } = usePublishArticle();

  const schema = z
    .object({
      category: z.string().min(3).max(25),
      title: z.string().min(3).max(255),
      content: z.string().min(255).max(100_000),
    })
    .required();

  const submit = () => {
    try {
      if (!fileInput) {
        throw new Error("a cover image is required");
      }
      const result = schema.parse({ category, title, content });
      publish({ ...result, cover: fileInput });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="my-8 lg:w-4/5 mx-auto">
      <SelectInput onChange={updateCategory} />
      <h1
        className="textarea text-2xl text-primary md:text-4xl w-full min-h-6"
        data-placeholder="# type your title here..."
        contentEditable
        onKeyUp={(e) => {
          setTitle(e.currentTarget.innerText);
        }}
      ></h1>
      <FileInput onChange={updateFileInput} />
      <Editor onChange={updateContent} />

      <button
        className={clsx("btn btn-primary mt-8", { loading: isLoading })}
        onClick={submit}
        disabled={isLoading}
      >
        publish
      </button>
    </div>
  );
}

export default ArticleEditor;
