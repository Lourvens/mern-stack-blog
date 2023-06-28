import { TbPhotoPlus } from "react-icons/tb";

function ArticleEditor() {
  return (
    <div className="my-8">
      <h1
        className="textarea textarea-bordered text-2xl md:text-4xl w-full min-h-6"
        data-placeholder="# type your title here..."
        contentEditable
      ></h1>
      <input type="file" className="hidden" />
      <div className="w-full bg-gray-500 bg-opacity-20 h-64 rounded-lg my-10 flex justify-center items-center hover:bg-opacity-50">
        <button className="w-full h-full flex items-center justify-center flex-col">
          <TbPhotoPlus className="" size={70} />
          Upload new cover image
        </button>
      </div>
    </div>
  );
}

export default ArticleEditor;
