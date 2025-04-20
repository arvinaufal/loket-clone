import "dotenv/config";
import { MongoClient } from "mongodb";
const connectionString = process.env.MONGODB_CONNECTION_URI as string;

if (!connectionString) throw new Error("Connection is not available yet");

let client: MongoClient;

export const getMongoClientInstance = async () => {
    if (!client) {
        client = await MongoClient.connect(connectionString);
        await client.connect();
    }
    return client;
};