import { createUser, getUserByEmail, getUserByUsername } from "@/db/models/user";
import { authForm, registerFormType } from "@/db/type";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const User = z.object({
    username: z.string(),
    password: z.string().min(5),
    email: z.string().email()
});

export async function POST(request: Request) {
    try {
        const body: registerFormType = await request.json();
        const validation = User.safeParse(body);

        if (!validation.success) throw validation.error;

        const existEmail = await getUserByEmail(body.email);
        if (existEmail) {
            return NextResponse.json(
                {
                    message: "Email already registered"
                },
                {
                    status: 401
                }
            );
        }

        const existUsername = await getUserByUsername(body.username);
        if (existUsername) {
            return NextResponse.json(
                {
                    message: "Username already registered"
                },
                {
                    status: 401
                }
            );
        }

        await createUser(body);

        return NextResponse.json(
            {
                message: "Successfully register user"
            },
            {
                status: 201
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