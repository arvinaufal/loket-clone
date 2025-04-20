import { createUser, getUserByEmail } from "@/db/models/user";
import { loginFormType } from "@/db/type";
import { bcryptCompare } from "@/db/utils/bcryptjs";
import { signToken, verifyToken } from "@/db/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from 'next/headers'
import { getProducts } from "@/db/models/product";
import { url } from "inspector";
import { getUserWishlist } from "@/db/models/wishlist";
type decodedToken = {
    userId: string,
    email: string,
    iat: number
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limitQuery = searchParams.get('limit') as string;
        const searchQuery = searchParams.get('q') as string;
        let pageQuery = searchParams.get('page') as string;
        const auth = cookies().get("Authorization");
        let cookie = auth?.value?.split(' ')[1];
        if (!auth) {
            cookie = (request.headers.get('Cookie')) as string;
            cookie = cookie?.split('Bearer%20')[1];
        }

        if (!pageQuery) {
            pageQuery = "1";
        }
        const products = await getProducts({ limit: limitQuery, q: searchQuery, page: pageQuery });

        if (!cookie) {
            const updatedProducts = products.map(el => {
                el.isWishlist = false;
                return el;
            })

            const response = NextResponse.json(
                {
                    message: "Get Products Successfully",
                    data: { updatedProducts }
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
            const updatedProducts = products.map(el => {
                el.isWishlist = false;
                return el;
            })

            const response = NextResponse.json(
                {
                    message: "Get Products Successfully",
                    data: { updatedProducts }
                },
                {
                    status: 200
                }
            )
            return response;
        }

        products.map(product => {
            const isWishlist = userWishlists.some(wishlist => wishlist.productId.equals(product._id));
            return { ...product, isWishlist };
        });

        const updatedProducts = products.map(product => {
            const isWishlist = userWishlists.some(wishlist => wishlist.productId.equals(product._id));
            return { ...product, isWishlist };
        });

        const response = NextResponse.json(
            {
                message: "Get Products Successfully",
                data: { updatedProducts }
            },
            {
                status: 200
            }
        );

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Internal Server Error",
                error: error
            },
            {
                status: 500
            }
        );
    }
}