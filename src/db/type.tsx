import { ObjectId } from "mongodb";
export interface registerFormType {
    name?: string, 
    username: string, 
    email: string, 
    password: string
}

export interface loginFormType {
    email: string, 
    password: string
}

export interface authForm {
    name?: string, 
    username?: string, 
    email: string, 
    password: string
}

export interface typingAuthForm {
    nameTyping?: boolean,
    usernameTyping?: boolean,
    emailTyping: boolean,
    passwordShowing: boolean
}

export type HandleRegisterType = () => void;
export type HandleLoginType = () => void;


export interface ProductType {
    _id: ObjectId,
    name: string,
    slug: string,
    description: string,
    excerpt: string,
    price: string,
    tags: string[],
    thumbnail: string,
    images: string[],
    createdAt: string,
    updatedAt: string,
    isWishlist?: boolean
}


export type MyResponse<T = {}> = {
    message?: string;
    data?: T;
}
