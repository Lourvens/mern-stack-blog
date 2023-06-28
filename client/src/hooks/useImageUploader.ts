import { useRef, useState } from "react";

function useImageUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hint, setHint] = useState<string>();
  const [imgFile, setImgFile] = useState<File>();

  const onFileSelected = () => {
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

  const clearImgFile = () => {
    setImgFile(undefined);
  };
  return { inputRef, onFileSelected, hint, imgFile, clearImgFile };
}

export default useImageUploader;
