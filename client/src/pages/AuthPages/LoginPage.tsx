import { APP_ROUTE } from "@/utils/constants";
import { Link } from "react-router-dom";

import { FaEnvelope, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./components/InputField";
import clsx from "clsx";

import "./styles.css";
import useLogin from "./hooks/useLogin";
import AlertCard from "./components/AlertCard";

const formSchema = z
  .object({
    email: z.string().email("is incorrect"),
    password: z.string().min(4, "is too short"),
  })
  .required();

type formSchema = z.infer<typeof formSchema>;

const LoginPage = () => {
  const { submit, isLoading, errorMessage } = useLogin();
  const { register, handleSubmit, formState } = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  return (
    <div className="form-container">
      <h1>Welcome! connect to your account</h1>
      <h3>
        no account yet? <Link to={APP_ROUTE.REGISTER}>create one</Link>
      </h3>

      <AlertCard message={errorMessage} />

      <form onSubmit={handleSubmit(submit)}>
        <InputField
          type="email"
          icon={<FaEnvelope />}
          errorMsg={formState.errors.email?.message}
          {...register("email")}
        />
        <InputField
          type="password"
          icon={<FaLock />}
          errorMsg={formState.errors.password?.message}
          {...register("password")}
        />
        <button className={clsx({ loading: isLoading })} disabled={isLoading}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
