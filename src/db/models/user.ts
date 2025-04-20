import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/mongo";
import { type } from "os";
import { bcryptHash } from "../utils/bcryptjs";

export type UserModel = {
    _id: ObjectId;
    name?: string;
    username: string;
    email: string;
    password: string;
}

export type UserModelCreateInput = Omit<UserModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";

export const getDb = async () => {
    const client = await getMongoClientInstance();
    const db: Db = client.db(DATABASE_NAME);

    return db;
}

export const getUsers = async () => {
    const db = await getDb();

    const users = (await db.collection("users").find().project({ password: 0 }).toArray()) as UserModel[];

    return users;
}


export const createUser = async (user: UserModelCreateInput) => {
    const newUser: UserModelCreateInput = {
        ...user,
        password: bcryptHash(user.password)
    }

    const db = await getDb();
    const result = await db.collection("users").insertOne(newUser);

    return result;
}


export const getUserById = async (id: string) => {
    const db = await getDb();
    const userId = new ObjectId(id);

    const user = (await db.collection("users").findOne(
        { _id: userId },
        {
            projection: { password: 0 }
        }
    )) as UserModel;

    return user;
}


export const getUserByEmail = async (email: string) => {
    const db = await getDb();

    const user = (await db.collection("users").findOne(
        { email }
    )) as UserModel;

    return user;
}

export const getUserByUsername = async (username: string) => {
    const db = await getDb();

    const user = (await db.collection("users").findOne(
        { username },
        {
            projection: { password: 0 }
        }
    )) as UserModel;

    return user;
}