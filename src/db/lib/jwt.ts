import jwt, { JwtPayload,  } from "jsonwebtoken";
import * as jose from "jose";

const secretKey= process.env.JWT_SECRET_KEY as string;

export const signToken = (payload: JwtPayload) => jwt.sign(payload, secretKey);
export const verifyToken = async (token: string) => {
    const code = new TextEncoder().encode(secretKey);
    const { payload } = await jose.jwtVerify(token, code);

    return payload;
}