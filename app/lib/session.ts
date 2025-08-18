import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JWTPayload, SignJWT, jwtVerify } from "jose";

import { Cookie } from "../types/session";
import { cache } from "react";
import { auth } from "@/auth";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

const cookie: Cookie = {
  name: "session",
  options: {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  },
  duration: 60 * 60 * 24 * 1000, // 24 hours
};

export const encrypt = async (payload: JWTPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
};

export const decrypt = async (session: string) => {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
};

export const createSession = async (userId: string) => {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, expires });

  (await cookies()).set(
    {
      name: cookie.name,
      value: session,
      httpOnly: cookie.options.httpOnly,
      secure: cookie.options.secure,
      sameSite: cookie.options.sameSite,
      expires,
    }
  );
  redirect("/projects");
};

export const cachedAuth = cache(auth);
