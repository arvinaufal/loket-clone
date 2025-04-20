"use client"

import { redirect } from "next/navigation";
import { Report } from "notiflix";
import { FaHeart } from "react-icons/fa6";

type Props = {
    status: boolean;
    currentPage: string;
};

export default function WishlistButton2({ status, currentPage }: Props) {
    const toWishlist = async () => {
        if (status !== false ) {
            window.location.href = '/wishlist';
            // await confirmWishlist();
        } else {
            Report.failure(
                'Gagal',
                'Mohon login terlebih dahulu!',
                'Ok',
            );
        }
    }

    return (
        <div onClick={() => toWishlist()} className={`h-10 flex justify-center content-center items-center hover:border-b-4 hover:border-b-solid hover:border-b-white ${currentPage === "wishlist" ? "border-b-4 border-b-solid border-b-white" : ""}`}>
            <span className='text-white font-medium text-xl'>Wishlist</span>
        </div>
    )
}
