import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import { APP_ROUTE } from "./utils/constants";
import AppLayout from "./components/Layout";
import LoginPage from "./pages/AuthPages/LoginPage";
import RegisterPage from "./pages/AuthPages/RegisterPage";
import ProtectedRoutes from "./features/Auth/ProtectedRoutes";
import ProfilePage from "./pages/ProfilePage";
import ArticleEditor from "./pages/ArticleEditor";
import axios from "axios";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";

function App() {
  const { setAuth } = useAuth();

  useEffect(() => {
    async function autoLogin() {
      const config = { method: "post", url: "/api/auth/refresh-token" };
      const { data } = await axios(config);
      setAuth(data.access_token);
    }

    autoLogin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route element={<AppLayout />}>
            <Route path={APP_ROUTE.ARTICLE_VIEWER} element={<ArticlePage />} />
            <Route path={APP_ROUTE.LOGIN} element={<LoginPage />} />
            <Route path={APP_ROUTE.REGISTER} element={<RegisterPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route path={APP_ROUTE.PROFILE} element={<ProfilePage />} />
              <Route
                path={APP_ROUTE.ARTICLE_EDIT}
                element={<ArticleEditor />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
