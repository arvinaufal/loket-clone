import { createUser, getUserByEmail } from "@/db/models/user";
import { loginFormType } from "@/db/type";
import { bcryptCompare } from "@/db/utils/bcryptjs";
import { signToken } from "@/db/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from 'next/headers'

const User = z.object({
    password: z.string(),
    email: z.string().email()
});

export async function POST(request: Request) {
    try {
        const body: loginFormType = await request.json();
        const validation = User.safeParse(body);

        if (!validation.success) throw validation.error;
        const user = await getUserByEmail(body.email);
        if (!user) {
            return NextResponse.json(
                {
                    message: "Invalid Email/Password"
                },
                {
                    status: 401
                }
            );
        }
       
        const isMatch = bcryptCompare(body.password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                {
                    message: "Invalid Email/Password"
                },
                {
                    status: 401
                }
            );
        }

        const accessToken = signToken({ userId: user._id.toString(), email: user.email });


        const response = NextResponse.json(
            {
                message: "Login Successfully",
                data: { accessToken }
            },
            {
                status: 201
            }
        )
        response.cookies.set("Authorization", `Bearer ${accessToken}`);

        return response;
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