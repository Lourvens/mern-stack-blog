import Avatar from "@/components/Avatar";
import authService from "@/features/Auth/auth.service";
import useAuth from "@/hooks/useAuth";
import useImageUploader from "@/hooks/useImageUploader";
import clsx from "clsx";
import { AiFillCamera } from "react-icons/ai";
import { useMutation } from "react-query";

const UserProfileCard = () => {
  const { credential, updateProfileImg } = useAuth();
  const { clearImgFile, imgFile, inputRef, hint, chooseFile, fileUrl } =
    useImageUploader();

  const { isLoading, mutate: uploadFile } = useMutation({
    mutationKey: ["users", credential?.id],
    mutationFn: authService.uploadUserProfile,
    onSuccess(resp) {
      clearImgFile();
      updateProfileImg(resp.data.profile_picture);
    },
  });

  const avatar_img_src = imgFile ? fileUrl : credential?.profile_picture;

  const cancelUpload = clearImgFile;

  return (
    <div className="my-4 md:my-8">
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
            <h1 className="text-3xl">{credential?.fullname}</h1>

            <div className="mt-3">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={inputRef}
              />

              {!imgFile ? (
                <button
                  className="btn btn-success btn-sm no-underline gap-2 capitalize"
                  onClick={chooseFile}
                >
                  <AiFillCamera /> upload a profile pic
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
            </div>
          </div>
        </div>
        {hint && (
          <span className="text-error block text-sm mt-2 ml-2">{hint}</span>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
