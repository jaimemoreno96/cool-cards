"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/app/(auth)/components/label";
import { Input } from "@/app/(auth)/sign-up/components/input";
import { PasswordInput } from "../sign-up/components/password-input";
import { Button } from "@/app/(auth)/components/button";
import { ButtonType } from "../components/button/button";

import { SignUpFormInputs, signUpSchema } from "./lib/definitions";
import { signUp } from "./actions";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const session = useSession();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      const response = await signUp(data);
      await signIn("credentials", {
        email: response.email,
        password: data.password,
        redirectTo: "/",
      });
      session.update();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
            error={errors.name}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="block relative">
          <Label label="Last name" name="lastName" />
          <Input
            name="lastName"
            type="text"
            register={register}
            error={errors.lastName}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500">{errors.lastName.message}</p>
          )}
        </div>
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
        <div className="block relative">
          <Label label="Confirm password" name="confirmPassword" />
          <PasswordInput
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
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
