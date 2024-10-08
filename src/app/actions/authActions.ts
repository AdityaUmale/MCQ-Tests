'use client'

import { signIn, getSession, signOut } from "next-auth/react";


export async function doCredentialLogin(formData: any) {
    try {
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
      if (response?.error) {
        // Return a more specific error message
        return { error: "Invalid email or password" };
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
      await signOut({
        redirect: true,
        callbackUrl: "/", // Redirect to home page after logout
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }
