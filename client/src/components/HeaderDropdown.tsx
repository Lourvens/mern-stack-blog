import { Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineFileAdd,
  AiOutlineLogout,
} from "react-icons/ai";
import { ReactNode } from "react";
import useAuth from "@/hooks/useAuth";
import truncateStr from "@/utils/truncateStr";
import { APP_ROUTE } from "@/utils/constants";
import Avatar from "./Avatar";

type Prop = { img_url?: string; fullname: string };

const HeaderDropdown = ({ img_url, fullname }: Prop) => {
  const { logout } = useAuth();

  // TODO: create one single component for LinkItem and Button and avoid code duplication.
  type linkProp = { to: string; icon: ReactNode; title: string };
  const LinkItem = (props: linkProp) => (
    <li className="text-lg text-gray-600">
      <Link
        to={props.to}
        className="p-2 gap-3 capitalize dark:text-primary-focus"
      >
        {props.icon}
        <span>{props.title}</span>
      </Link>
    </li>
  );

  type buttonProp = { icon: ReactNode; title: string; onClick: () => void };
  const Button = (props: buttonProp) => (
    <li className="text-lg text-gray-600">
      <button
        onClick={props.onClick}
        className="p-2 gap-3 capitalize dark:text-primary-focus"
      >
        {props.icon}
        <span>{props.title}</span>
      </button>
    </li>
  );

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="border flex items-center rounded-full mb-4 gap-2 py-1 px-2 cursor-pointer"
      >
        <Avatar fullname={fullname} img_url={img_url} />
        <span>{truncateStr(fullname, 18)}</span>
      </label>

      {/* dropdown content */}
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded w-56"
      >
        <LinkItem
          icon={<AiOutlineUser />}
          to={APP_ROUTE.PROFILE}
          title="your profile"
        />
        <LinkItem
          icon={<AiOutlineFileAdd />}
          to={APP_ROUTE.ARTICLE_EDIT}
          title="new article"
        />
        <div className="divider m-0"></div>
        <Button icon={<AiOutlineLogout />} onClick={logout} title="logout" />
      </ul>
    </div>
  );
};

export default HeaderDropdown;
