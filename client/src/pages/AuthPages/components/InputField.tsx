import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface Prop extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: JSX.Element;
  errorMsg?: string;
}

const InputField = forwardRef<HTMLInputElement, Prop>(
  ({ name, icon, errorMsg, ...rest }, ref) => (
    <div className="group rounded-xl py-3 px-4 bg-slate-300 dark:bg-slate-800 bg-opacity-50 border border-transparent focus-within:bg-opacity-70 focus-within:border-blue-600">
      <label
        htmlFor={name}
        className={clsx("text-xs capitalize block -mb-0.5", {
          "text-red-400 focus:text-red-400": errorMsg,
          "text-blue-600": !errorMsg,
        })}
      >
        {name}
        {errorMsg && <span className="pl-1 normal-case">{errorMsg}</span>}
      </label>
      <div className="flex">
        <input
          type="text"
          className="bg-inherit outline-none border-none dark:text-white w-full"
          name={name}
          ref={ref}
          {...rest}
        />
        {icon}
      </div>
    </div>
  )
);

export default InputField;
