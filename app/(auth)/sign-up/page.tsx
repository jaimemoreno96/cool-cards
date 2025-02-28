"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import { Label } from "@/app/(auth)/components/label";
import { Input } from "@/app/(auth)/sign-up/components/input";
import { PasswordInput } from "../sign-up/components/password-input";
import { Button } from "@/app/(auth)/components/button";
import { ButtonType } from "../components/button/button";

export interface SignUpFormInputs {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <h3 className="text-sm font-normal mb-4 text-center text-black">
        Create an account
      </h3>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="block relative">
          <Label label="Name" name="name" />
          <Input
            name="name"
            type="text"
            register={register}
            options={{ required: true }}
            error={errors.name}
          />
        </div>
        <div className="block relative">
          <Label label="Last name" name="lastName" />
          <Input
            name="lastName"
            type="text"
            register={register}
            options={{ required: true }}
            error={errors.lastName}
          />
        </div>
        <div className="block relative">
          <Label label="Email" name="email" />
          <Input
            name="email"
            type="text"
            register={register}
            options={{ required: true, pattern: /^\S+@\S+$/i }}
            error={errors.email}
          />
        </div>
        <div className="block relative">
          <Label label="Password" name="password" />
          <PasswordInput
            name="password"
            register={register}
            options={{ required: true, minLength: 6 }}
            error={errors.password}
          />
        </div>
        <Button buttonType={ButtonType.PRIMARY} label="Sign Up" type="submit" />
      </form>
      <p className="text-sm text-center mt-6">
        Already have an account?&nbsp;
        <Link className="text-sm text-primary-main" href="/sign-in">
          Sign in!
        </Link>
      </p>
    </>
  );
};
export default SignUp;
