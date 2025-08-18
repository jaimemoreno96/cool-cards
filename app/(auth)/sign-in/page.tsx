"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/app/(auth)/components/label";
import { Input } from "@/app/(auth)/sign-in/components/input";
import { PasswordInput } from "@/app/(auth)/sign-in/components/password-input";
import { Button } from "@/app/(auth)/components/button";
import { ButtonType } from "@/app/(auth)/components/button/button";

import { SignInFormInputs, signInSchema } from "./lib/definitions";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(signInSchema),
  });

  const session = useSession();

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    console.log(data);
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirectTo: "/",
      },
    );
      session.update();
    } catch (error) {
      console.log(error);
    }
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
            error={errors.email}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="block relative">
          <Label label="Password" name="password" />
          <PasswordInput
            name="password"
            register={register}
            error={errors.password}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Link className="text-sm text-center text-primary-main w-auto" href="/">
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
