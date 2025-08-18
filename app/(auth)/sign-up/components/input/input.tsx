import clsx from "clsx";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { SignUpFormInputs } from "../../lib/definitions";

interface InputProps {
  name: "name" | "email" | "password" | "lastName";
  type: string;
  error: FieldError | undefined;
  register: UseFormRegister<SignUpFormInputs>;
}

const Input = ({ name, type, error, register}: InputProps) => {
  return (
    <input
      type={type}
      className="rounded-sm border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-10 m-0 p-[12px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
      {...register(name)}
    />
  );
};
export default Input;
