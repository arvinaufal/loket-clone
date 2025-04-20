"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    "use server"
    cookies().delete('Authorization')
    redirect('/');
  }

  export async function confirmWishlist() {
    "use server"
    redirect('/wishlist');
  }