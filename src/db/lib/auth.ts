import { cookies } from "next/headers";


export const isLoggedIn = (): boolean => {
    return cookies().get('Authorization')?.value ? true : false;
}