import { APP_ROUTE } from "@/utils/constants";
import { Link } from "react-router-dom";

import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./components/InputField";

import "./styles.css";

const formSchema = z
  .object({
    email: z.string().email("is incorrect"),
    password: z.string().min(4, "is too short"),
  })
  .required();

type formSchema = z.infer<typeof formSchema>;

const LoginPage = () => {
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
      <form>
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
        <button className="btn btn-primary text-white">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
