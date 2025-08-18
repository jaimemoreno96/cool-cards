"use server";

import { signIn } from "@/auth";

import { SignInFormInputs } from "./lib/definitions";

export const signInAction = async (type: string, data: SignInFormInputs) => {
    console.log(data);
    try {
        const response = await signIn(type, data);
        console.log(response);
        
    } catch (error) {
        
    }
}