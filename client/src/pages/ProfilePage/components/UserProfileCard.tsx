import Avatar from "@/components/Avatar";
import authService from "@/features/Auth/auth.service";
import useAuth from "@/hooks/useAuth";
import clsx from "clsx";
import { useRef, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { useMutation } from "react-query";

const UserProfileCard = () => {
  const { credential, updateProfileImg } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hint, setHint] = useState<string>();
  const [imgFile, setImgFile] = useState<File>();

  const { isLoading, mutate: uploadFile } = useMutation({
    mutationKey: ["users", credential?._id],
    mutationFn: authService.uploadUserProfile,
    onSuccess(resp) {
      setImgFile(undefined);
      updateProfileImg(resp.data.profile_picture);
    },
  });

  const onFileSelected = () => {
    if (fileInputRef.current?.files) {
      const imageFile = fileInputRef.current.files[0];
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

  const avatar_img_src = imgFile
    ? URL.createObjectURL(imgFile)
    : credential?.profile_picture;

  const cancelUpload = () => {
    setImgFile(undefined);
  };

  return (
    <div>
      <div className="flex items-center gap-8">
        <div className="ring ring-primary rounded-full p-1 w-26 h-26 grid place-items-center">
          <Avatar
            fullname={credential?.fullname as string}
            img_url={avatar_img_src}
            large
          />
        </div>
        <div>
          <h1 className="text-2xl">{credential?.fullname}</h1>
          <h3 className="text-gray-400 dark:text-slate-600">
            No article published
          </h3>
        </div>
      </div>
      <div className="mt-3">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={fileInputRef}
          onChange={onFileSelected}
          onClick={(e) => {
            // allow onChange trigered even if the same file was selected
            e.currentTarget.value = "";
          }}
        />

        {!imgFile ? (
          <button
            className="btn btn-success btn-sm no-underline gap-2 capitalize"
            onClick={() => {
              // open select file modal
              fileInputRef.current?.click();
            }}
          >
            <AiFillCamera /> upload
          </button>
        ) : (
          <>
            <button
              className="btn btn-circle btn-sm mr-2 text-error dark:text-white"
              onClick={cancelUpload}
            >
              x
            </button>
            <button
              className={clsx("mt-3 btn btn-success btn-sm rounded", {
                loading: isLoading,
              })}
              disabled={isLoading}
              onClick={() => imgFile && uploadFile(imgFile)}
            >
              save change
            </button>
          </>
        )}
        {hint && (
          <span className="text-error block text-sm mt-1 ml-2">{hint}</span>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
