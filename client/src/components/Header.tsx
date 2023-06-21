import useAuth from "@/features/Auth/useAuth";
import { APP_ROUTE } from "@/utils/constants";
import { Link } from "react-router-dom";
import HeaderDropdown from "./HeaderDropdown";

const Header = () => {
  const { isAuthenticated, credential } = useAuth();

  return (
    <header className="flex justify-between items-center text-white">
      <Link to="/">
        <h1 className="text-xl text-white lg:text-2xl">
          Blog<b>Lab</b>
        </h1>
      </Link>

      {isAuthenticated && credential ? (
        <HeaderDropdown
          fullname={credential.fullname}
          img_url={credential.profile_picture}
        />
      ) : (
        <BtnGroup />
      )}
    </header>
  );
};

export default Header;

const BtnGroup = () => (
  <div className="flex gap-3">
    <Link
      to={APP_ROUTE.LOGIN}
      className="btn btn-outline btn-sm lg:btn-md text-white"
    >
      login
    </Link>
    <Link to={APP_ROUTE.REGISTER} className="btn btn-primary btn-sm lg:btn-md">
      Register
    </Link>
  </div>
);
