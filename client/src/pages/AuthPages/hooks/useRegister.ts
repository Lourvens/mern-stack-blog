import { CONFLICT_ERR, TOO_MANY_REQUESTS_ERR } from "@/utils/httpError";
import { useState } from "react";
import authService from "@/features/Auth/auth.service";
import useLogin from "./useLogin";

type user = { email: string; password: string; fullname: string };
function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const { submit: autoLogin } = useLogin();

  const submit = async (values: user) => {
    try {
      setLoading(true);
      const { status } = await authService.signup(values);
      if (status == 201) {
        await autoLogin({ email: values.email, password: values.password });
      }
    } catch (err) {
      if (err instanceof TOO_MANY_REQUESTS_ERR) {
        setErrorMessage("too many attemps, try 10 min later.");
      }
      if (err instanceof CONFLICT_ERR) {
        setErrorMessage("email already exist.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { submit, isLoading, errorMessage };
}

export default useRegister;
