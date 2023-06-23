import authService from "@/features/Auth/auth.service";
import useAuth from "@/hooks/useAuth";
import { TOO_MANY_REQUESTS_ERR, UNAUTHORIZED_ERR } from "@/utils/httpError";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type user = { email: string; password: string };

function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>();
  const location = useLocation();

  const from = location.state?.from || "/";
  const navigate = useNavigate();

  const submit = async (values: user) => {
    try {
      setLoading(true);
      const resp = await authService.login(values);
      setAuth(resp.data.access_token);
      navigate(from);
    } catch (err) {
      if (err instanceof UNAUTHORIZED_ERR) {
        setErrorMessage("user or password is incorrect");
      }
      if (err instanceof TOO_MANY_REQUESTS_ERR) {
        setErrorMessage("too many attemps, try 10 min later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { submit, isLoading, errorMessage };
}

export default useLogin;
