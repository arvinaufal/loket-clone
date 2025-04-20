"use server"
import { redirect } from "next/navigation";
export async function toWishlist() {
  "use server"
  redirect('/wishlist');
}