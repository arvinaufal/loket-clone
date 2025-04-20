import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/mongo";
import { type } from "os";
import { bcryptHash } from "../utils/bcryptjs";

export type ProductModel = {
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
    isWishlist: boolean
}

export type ProductModelCreateInput = Omit<ProductModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";

export const getDb = async () => {
    const client = await getMongoClientInstance();
    const db: Db = client.db(DATABASE_NAME);

    return db;
}
export const getProducts = async ({ page, limit, q }: { page: string, limit: string, q: string }) => {

    const db = await getDb();
    const skip = (Number(page) - 1) * Number(limit);
    const products = await db
        .collection("products")
        .aggregate([
            {
                $match: {
                    name: { $regex: new RegExp(q, 'i') }
                }
            },
            {
                $skip: skip
            },
            {
                $limit: Number(limit)
            }
        ])
        .toArray() as ProductModel[];
    return products;
};

export const getProductBySlug = async (slugReq: string) => {
    const db = await getDb();
    const product = (await db.collection("products").findOne({
        slug: slugReq
    })) as ProductModel;

    return product;
}