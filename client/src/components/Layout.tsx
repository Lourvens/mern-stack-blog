import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <div className="p-6 bg-primary dark:bg-base-300">
        <Header />
      </div>

      <main className="p-6 dark:bg-base-300">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
