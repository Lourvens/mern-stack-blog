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
    fullname: z.string().min(3, "is too short"),
    email: z.string().email("is incorrect"),
    password: z.string().min(4, "is too short"),
  })
  .required();

type formSchema = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const { register, handleSubmit, formState } = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  return (
    <div className="form-container">
      <h1>create new account</h1>
      <h3>
        already a member? <Link to={APP_ROUTE.LOGIN}>log in</Link>
      </h3>
      <form>
        <InputField
          type="text"
          icon={<FaUserAlt />}
          errorMsg={formState.errors.fullname?.message}
          {...register("fullname")}
        />
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
        <button className="btn btn-primary text-white">Create Account</button>
      </form>
    </div>
  );
};

export default RegisterPage;
