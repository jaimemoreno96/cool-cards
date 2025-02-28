import clsx from "clsx";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { SignInFormInputs } from "../../page";

interface InputProps {
  name: "email" | "password";
  type: string;
  error: FieldError | undefined;
  register: UseFormRegister<SignInFormInputs>;
  options: RegisterOptions<SignInFormInputs>;
}

const Input = ({ name, type, error, register, options }: InputProps) => {
  return (
    <input
      type={type}
      className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-10 m-0 p-[12px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
      {...register(name, options)}
    />
  );
};
export default Input;
