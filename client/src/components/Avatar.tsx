import clsx from "clsx";
type prop = { large?: boolean; img_url?: string; fullname: string };

const Avatar = ({ img_url, fullname, large }: prop) => {
  if (img_url) {
    return (
      <div className="avatar">
        <div className={clsx("rounded-full", large ? "w-20" : "w-8")}>
          <img src={img_url} alt="Tailwind-CSS-Avatar-component" />
        </div>
      </div>
    );
  }

  return (
    <div className="avatar placeholder">
      <div
        className={clsx(
          "bg-neutral-focus text-neutral-content rounded-full",
          large ? "w-20" : "w-8"
        )}
      >
        <span
          className={clsx(
            "font-semibold capitalize",
            large ? "text-3xl" : "text-xs"
          )}
        >
          {fullname.substring(0, 2)}
        </span>
      </div>
    </div>
  );
};

export default Avatar;
