import { createUser, getUserByEmail } from "@/db/models/user";
import { loginFormType } from "@/db/type";
import { bcryptCompare } from "@/db/utils/bcryptjs";
import { signToken, verifyToken } from "@/db/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from 'next/headers'
import { getProductBySlug, getProducts } from "@/db/models/product";
import { url } from "inspector";
import { getUserWishlist } from "@/db/models/wishlist";

type decodedToken = {
    userId: string,
    email: string,
    iat: number
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {

        const product = await getProductBySlug(params.slug);
        let cookie = (request.headers.get('Cookie')) as string;
        cookie = cookie.split('Bearer%20')[1];
        if (!cookie) {
            product.isWishlist = false;
            const response = NextResponse.json(
                {
                    message: "Get Products Successfully",
                    data: product
                },
                {
                    status: 200
                }
            )
            return response;
        }

        const decoded = (await verifyToken(cookie)) as decodedToken; 
        const userWishlists = await getUserWishlist({ userId: decoded.userId });
   
        if (userWishlists.length < 1) {
            product.isWishlist = false;
            const response = NextResponse.json(
                {
                    message: "Get Products Successfully",
                    data: product
                },
                {
                    status: 200
                }
            )
            return response;
        }

        const isUserWishlist = userWishlists.find(el => el.productId.toString() === product._id.toString());

        if (!isUserWishlist) {
            product.isWishlist = false;
            const response = NextResponse.json(
                {
                    message: "Get Products Successfully",
                    data: product
                },
                {
                    status: 200
                }
            )
            return response;
        }

        product.isWishlist = true;
        const response = NextResponse.json(
            {
                message: "Get Products Successfully",
                data: product
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