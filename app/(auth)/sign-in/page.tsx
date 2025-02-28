"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import { Label } from "@/app/(auth)/components/label";
import { Input } from "@/app/(auth)/sign-in/components/input";
import { PasswordInput } from "@/app/(auth)/sign-in/components/password-input";
import { Button } from "@/app/(auth)/components/button";
import { ButtonType } from "@/app/(auth)/components/button/button";

export interface SignInFormInputs {
  email: string;
  password: string;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>();

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <h3 className="text-sm font-normal mb-4 text-center text-black">
        Sign in to your account
      </h3>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
        <Link className="text-sm text-center text-primary-main" href="/">
          Forgot your password?
        </Link>
        <Button buttonType={ButtonType.PRIMARY} label="Sign In" />
      </form>
      <p className="text-sm text-center mt-6">
        Don’t have an account yet?&nbsp;
        <Link className="text-sm text-primary-main" href="/sign-up">
          Sign up for free!
        </Link>
      </p>
    </>
  );
};
export default SignIn;
