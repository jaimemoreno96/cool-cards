'use server';

import { signIn } from '@/auth'; // This can now safely import database modules

export async function signInWithProvider(provider: string) {
    try {
        await signIn(provider);
    } catch (error) {
        console.log(error);
    }
}