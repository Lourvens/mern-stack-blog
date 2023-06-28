import { useEffect, useRef, useState } from "react";

function useImageUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hint, setHint] = useState<string>();
  const [imgFile, setImgFile] = useState<File>();

  const updateImg = () => {
    if (inputRef.current?.files) {
      const imageFile = inputRef.current.files[0];
      if (!imageFile) return;

      if (!/^image\//.test(imageFile.type)) {
        setHint("only image file is supported");
        return;
      }

      const MAX_SIZE = 5 * 1024 * 1024; // 5 mb
      if (Math.floor(imageFile.size) > MAX_SIZE) {
        setHint("image is too large, only less than 5mb file is accepted");
        return;
      }

      setHint(undefined);
      setImgFile(imageFile);
    }
  };

  const chooseFile = () => {
    inputRef.current?.click();
  };

  const clearImgFile = () => {
    setImgFile(undefined);
  };

  const removeInputValue = () => {
    // allow onChange trigered even if the same file was selected
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.addEventListener("change", updateImg);
      input.addEventListener("click", removeInputValue);
    }
    return () => {
      if (input) {
        input.removeEventListener("change", updateImg);
        input.removeEventListener("click", removeInputValue);
      }
    };
  }, []);

  const fileUrl = imgFile && URL.createObjectURL(imgFile);

  return { inputRef, hint, imgFile, clearImgFile, chooseFile, fileUrl };
}

export default useImageUploader;
