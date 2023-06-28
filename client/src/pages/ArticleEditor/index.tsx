import useImageUploader from "@/hooks/useImageUploader";
import { TbPhotoPlus } from "react-icons/tb";

function ArticleEditor() {
  const { inputRef, chooseFile, fileUrl } = useImageUploader();

  return (
    <div className="my-8">
      <h1
        className="textarea textarea-bordered text-2xl md:text-4xl w-full min-h-6"
        data-placeholder="# type your title here..."
        contentEditable
      ></h1>
      <input type="file" className="hidden" ref={inputRef} />
      <div className="relative w-full md:w-4/5 mx-auto h-64 rounded-lg my-10 flex justify-center items-center hover:bg-opacity-50 overflow-hidden">
        <button
          className="relative z-10 w-full h-full flex items-center justify-center flex-col bg-gray-500 bg-opacity-50 text-white"
          onClick={chooseFile}
        >
          <TbPhotoPlus className="" size={70} />
          Upload new cover image
        </button>
        {fileUrl && (
          <img
            src={fileUrl}
            alt=""
            className="absolute w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

export default ArticleEditor;
