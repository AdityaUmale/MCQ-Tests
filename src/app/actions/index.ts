'use server'

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";


// Custom credential login handler

export async function getServerSideSession() {
  const session = await getServerSession(authOptions);
  return session;
}


