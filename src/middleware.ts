import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./db/lib/jwt";


type decodedToken = {
    userId: string,
    email: string,
    iat: number
}

export async function middleware(request: Request) {
    try {
        if (request.url.includes('api/wishlists')) {
            const auth = cookies().get("Authorization");
            if (!auth) {
                return NextResponse.json(
                    {
                        message: "Unauthenticated"
                    },
                    {
                        status: 401
                    }
                )
            }
            const accessToken = auth.value.split(" ")[1];
            const decoded = (await verifyToken(accessToken)) as decodedToken;

            const requestHeaders = new Headers(request.headers)
            requestHeaders.set('x-user-id', decoded.userId)
            requestHeaders.set('x-user-email', decoded.email)

            const response = NextResponse.next({
                request: {
                    headers: requestHeaders
                }
            })
            return response
        }

        return NextResponse.next();
    } catch (error) {
        return error;
    }
}

export const config = {
    matcher: ["/api/:path*"]
}