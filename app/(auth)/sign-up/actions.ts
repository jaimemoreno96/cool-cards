"use server";

import bcrypt from 'bcryptjs';

import { prisma } from "@/lib/prisma";
import { SignUpFormInputs } from "./lib/definitions";
import { hashPassword } from '../lib/passwords';

export const signUp = async (data: SignUpFormInputs) => {
    const {
        name,
        lastName,
        email,
        password
    } = data;

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            name: name + " " + lastName,
            email,
            password: hashedPassword
        }
    });

    return user;
}