'use server'

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { getSession, signIn } from "next-auth/react";

// Custom credential login handler

export async function getServerSideSession() {
  const session = await getServerSession(authOptions);
  return session;
}


