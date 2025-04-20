import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_CONNECTION_URI;
console.log(uri);
const client = new MongoClient(uri);

let db;
export async function connect() {
    try {
        const database = client.db('loketCloneDB');
        db = database;
        return database;
    } catch (err) {
        console.log(err);
    }
}

export function getDB() {
    return db;
}
