"use client"
import { MyResponse } from "@/db/type";
import { Report } from "notiflix";

export default async function addWishlistHome (payload: string) {
    const productId: (string) = payload;
    const handleWishlist = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId
        }),
      }
    );

    const result = (await handleWishlist.json()) as MyResponse;

    if (!result.data) {
      Report.failure(
        'Gagal',
        'Mohon login terlebih dahulu!',
        'Ok',
      );
    }else{
      Report.success(
        'Sukses',
        'Berhasil menambahkan wishlist',
        'Ok',
        () => {
          // Redirect to '/wishlist' after the user clicks "Ok"
          window.location.href = '/wishlist';
        }
      );
    }
  }