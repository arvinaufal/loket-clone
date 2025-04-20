import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/mongo";
import { type } from "os";
import { bcryptHash } from "../utils/bcryptjs";
import { ProductType } from "../type";

export type WishlistModel = {
    _id: ObjectId,
    userId: ObjectId,
    productId: ObjectId,
    createdAt: Date,
    updatedAt: Date
}



export type MyWishlistsModel = {
    _id: ObjectId;
    name?: string;
    username: string;
    email: string;
    wishlists: ProductType[];
}

export type WishlistModelCreateInput = Omit<WishlistModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";

export const getDb = async () => {
    const client = await getMongoClientInstance();
    const db: Db = client.db(DATABASE_NAME);

    return db;
}

export const getMyWishlist = async ({ userId }: { userId: string }) => {
    const db = await getDb();

    const wishlists = await db
        .collection("users")
        .aggregate([
            {
                $match: {
                    _id: new ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "wishlists",
                    localField: "_id",
                    foreignField: "userId",
                    as: "wishlists"
                }
            },
            {
                $unwind: { path: "$wishlists", preserveNullAndEmptyArrays: true },
            },
            {
                $sort: {
                    "wishlists.createdAt": -1
                }
            },
            {
                $lookup: {
                    from: "products",
                    let: { productId: "$wishlists.productId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$productId"] }
                            }
                        },
                    ],
                    as: "wishlists"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    username: { $first: "$username" },
                    email: { $first: "$email" },
                    wishlists: { $addToSet: "$wishlists" },
                }
            },
            {
                $project: {
                    "_id": 1,
                    "username": 1,
                    "email": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "wishlists": {
                        $map: {
                            input: {
                                $ifNull: ["$wishlists", []]
                            },
                            as: "wishlist",
                            in: {
                                _id: { $arrayElemAt: ["$$wishlist._id", 0] },
                                name: { $arrayElemAt: ["$$wishlist.name", 0] },
                                price: { $arrayElemAt: ["$$wishlist.price", 0] },
                                slug: { $arrayElemAt: ["$$wishlist.slug", 0] },
                                description: { $arrayElemAt: ["$$wishlist.description", 0] },
                                excerpt: { $arrayElemAt: ["$$wishlist.excerpt", 0] },
                                thumbnail: { $arrayElemAt: ["$$wishlist.thumbnail", 0] },
                                tags: { $arrayElemAt: ["$$wishlist.tags", 0] },
                                images: { $arrayElemAt: ["$$wishlist.images", 0] },
                                createdAt: { $arrayElemAt: ["$$wishlist.createdAt", 0] },
                                updatedAt: { $arrayElemAt: ["$$wishlist.updatedAt", 0] },
                            }
                        }
                    }
                }
            },
        ])
        .toArray() as MyWishlistsModel[];

    return wishlists[0];
};


export const getUserWishlist = async ({ userId }: { userId: string }) => {
    const db = await getDb();

    const wishlists = await db
        .collection("wishlists")
        .aggregate([
            {
                $match: {
                    userId: new ObjectId(userId)
                }
            },
        ])
        .toArray() as WishlistModel[];

    return wishlists;
};

export const addWishlist = async ({ userId, productId }: { userId: string, productId: string }): Promise<WishlistModelCreateInput> => {
    const db = await getDb();
    const date = new Date();

    const newWishlist: WishlistModelCreateInput = { userId: new ObjectId(userId), productId: new ObjectId(productId), createdAt: date, updatedAt: date };
    await db.collection("wishlists").insertOne(newWishlist);

    return newWishlist;
};


export const deleteWishlist = async ({ userId, productId }: { userId: string, productId: string }): Promise<void> => {
    const db = await getDb();
    await db.collection("wishlists").deleteOne({ $and: [{ userId: new ObjectId(userId) }, { productId: new ObjectId(productId) }] });
}

// export const getProductBySlug = async (slugReq: string) => {
//     const db = await getDb();
//     const product = (await db.collection("products").findOne({
//         slug: slugReq
//     })) as ProductModel;

//     return product;
// }