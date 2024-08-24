import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      location: string
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    location: string
  }
}