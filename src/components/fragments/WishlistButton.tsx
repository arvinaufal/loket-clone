"use client"

import { redirect } from "next/navigation";
import { Report } from "notiflix";
import { FaHeart } from "react-icons/fa6";

type Props = {
    status: boolean;
    confirmWishlist: any;
};

export default function WishlistButton({ status, confirmWishlist }: Props) {
    const toWishlist = async () => {
        if (status !== false) {
        //    await confirmWishlist()
           window.location.href = '/wishlist';
        } else {
            Report.failure(
                'Gagal',
                'Mohon login terlebih dahulu!',
                'Ok',
            );
        }
    }

    return (
        <div onClick={() => toWishlist()} className='w-1/4 flex flex-row gap-2 justify-center content-center h-full items-center cursor-pointer'>
            <div className='h-8'>
                <FaHeart size={28} color={"white"} />
            </div>
            <div className='h-7 flex justify-center content-center items-center'>
                <span className='font-bold text-xs text-white'>
                    Wishlist
                </span>
            </div>
        </div>
    )
}
