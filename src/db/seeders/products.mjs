import products from "./db.json" assert { type: "json" };
import { connect } from "../connection.mjs";

async function productsSeed() {
    const db = await connect();
    try {
        const Products = db.collection("products");
        await Products.insertMany(products);

        console.log('Successfully seed products');
    } catch (error) {
        console.log(error);
    }
}

productsSeed();