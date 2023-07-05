import useImageUploader from "@/hooks/useImageUploader";
import { useEffect } from "react";
import { TbPhotoPlus } from "react-icons/tb";

type Prop = {
  onChange: (value: File) => void;
};
const FileInput = ({ onChange }: Prop) => {
  const { inputRef, chooseFile, fileUrl, imgFile, hint } = useImageUploader();

  useEffect(() => {
    imgFile && onChange(imgFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgFile]);

  return (
    <div className="my-10">
      <input type="file" className="hidden" ref={inputRef} />
      <span className="text-warning">{hint}</span>
      <div className="relative w-full  h-64 rounded-lg flex justify-center items-center hover:bg-opacity-50 overflow-hidden">
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
};

export default FileInput;
