import { LOGIN_ROUTE, REGISTER_ROUTE } from "@/contants/routes";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center text-white">
      <h1 className="text-xl text-white lg:text-2xl">
        Blog<b>Lab</b>
      </h1>

      <div className="flex gap-3">
        <Link to={LOGIN_ROUTE} className="btn btn-outline btn-sm lg:btn-md">
          login
        </Link>
        <Link to={REGISTER_ROUTE} className="btn btn-primary btn-sm lg:btn-md">
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;
