'use client'

import { signIn, getSession, signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export async function doCredentialLogin(formData: any) {
    try {
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
      if (response?.error) {
        return { error: response.error };
      }
      const session = await getSession();
      const role = session?.user?.role;
      if (response?.ok && role) {
        let redirectUrl = "/dashboard"; // default
        if (role === 'admin') {
          redirectUrl = "/admin/dashboard";
        } else if (role === 'student') {
          redirectUrl = "/student/dashboard";
        }
        return { redirectUrl, role };
      }
      return { error: "Login failed, please try again." };
    } catch (err) {
      console.error(err);
      return { error: "An unexpected error occurred." };
    }
  }

export async function doSocialLogin(formData: any) {
  const action = formData.get("action");
  // Implement social login logic here
}

export async function doLogout() {
    try {
      const response = await signOut();
      if (response === true) {
        return { redirectUrl: "/" };
      }
      return { error: "Logout failed, please try again." };
      
    } catch (err) {
      console.error(err);
    }
}