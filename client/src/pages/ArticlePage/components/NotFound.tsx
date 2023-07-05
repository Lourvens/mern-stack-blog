import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-72 flex flex-col justify-center items-center gap-5">
      <h1 className="text-xl">404, sorry article Not Found</h1>
      <Link to={"/"} className="text-primary">
        go home
      </Link>
    </div>
  );
};

export default NotFound;
