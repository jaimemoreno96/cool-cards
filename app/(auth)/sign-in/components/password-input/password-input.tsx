"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { FieldError, UseFormRegister } from "react-hook-form";
import { SignInFormInputs } from "../../lib/definitions";


interface PasswordInputProps {
  name: "email" | "password";
  error: FieldError | undefined;
  register: UseFormRegister<SignInFormInputs>;
}

const PasswordInput = ({ name, error, register }: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        className="rounded-sm border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
        {...register(name)}
      />
      <span
        className="flex items-center absolute top-0 right-0 h-full px-3 cursor-pointer hover:bg-neutral-light-gray"
        onClick={() => setVisible(!visible)}>
        {visible ? (
          <EyeSlashIcon className="w-4 h-4 text-neutral-cool-gray" />
        ) : (
          <EyeIcon className="w-4 h-4 text-neutral-cool-gray" />
        )}
      </span>
    </div>
  );
};
export default PasswordInput;
