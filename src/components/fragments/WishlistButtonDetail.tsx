"use client"

import { MyResponse } from "@/db/type";
import { ObjectId } from "mongodb";
import { Report } from "notiflix";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

type Props = {
    _id: ObjectId;
    isWishlist?: boolean
};

export default function WishlistButtonDetail({ _id, isWishlist }: Props) {
    const addWishlist = async (payload: string) => {
        "use client"
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
        } else {
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
    const handleAddWishlist: any = async (productId: string) => {
        await addWishlist(productId);
    }
    return (
        <>

            {
                isWishlist === true
                    ?
                    <div onClick={() => handleAddWishlist(_id)} className="cursor-pointer">
                        <FaHeart size={30} color={"red"} />
                    </div>
                    :
                    <div onClick={() => handleAddWishlist(_id)} className="cursor-pointer">
                        <FaRegHeart size={30} color={"red"} />
                    </div>
            }

        </>
    )
}
