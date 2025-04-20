import { createUser, getUserByEmail, getUserByUsername } from "@/db/models/user";
import { addWishlist, deleteWishlist, getMyWishlist, getUserWishlist } from "@/db/models/wishlist";
import { authForm, registerFormType } from "@/db/type";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const User = z.object({
    username: z.string(),
    password: z.string().min(5),
    email: z.string().email()
});

export async function POST(request: Request) {
    try {

        let userId = (request.headers.get('x-user-id')) as string;
        const body: { productId: string } = await request.json();


        const userWishlists = await getUserWishlist({ userId });
        let isExist;
        if (userWishlists.length > 0) {
            isExist = userWishlists.find(el => el.productId.toString() === body.productId);
        }

        if (!isExist) {
            const addWishlistResp = await addWishlist({ userId, productId: body.productId })
            return NextResponse.json(
                {
                    message: "Successfully add wishlist",
                    data: addWishlistResp
                },
                {
                    status: 201
                }
            )
        }
        await deleteWishlist({ userId, productId: body.productId });
        return NextResponse.json(
            {
                message: "Successfully delete wishlist",
                data: isExist
            },
            {
                status: 200
            }
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errPath = error.issues[0].path[0] as string;
            const errMessage = error.issues[0].message;
            const cleanedMessage = errMessage.replace('String', '');

            return NextResponse.json(
                {
                    message: `${errPath.toLocaleUpperCase()} ${cleanedMessage}`
                },
                {
                    status: 400
                }
            );
        }

        return NextResponse.json(
            {
                message: "Internal Server Error"
            },
            {
                status: 500
            }
        );
    }
}


export async function GET(request: Request) {
    try {
        let userId = (request.headers.get('x-user-id')) as string;
        
        const wishlists = await getMyWishlist({userId});
        const response = NextResponse.json(
            {
                message: "Get Wishlists Successfully",
                data: wishlists
            },
            {
                status: 200
            }
        )

        return response;
    } catch (error) {
        return NextResponse.json(
            {
                message: "Internal Server Error"
            },
            {
                status: 500
            }
        );
    }
}