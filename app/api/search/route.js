import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import 'dotenv/config'

export async function GET(request) {

    // Replace the uri string with your connection string.
    const uri = process.env.URI;
    const client = new MongoClient(uri);

    let query = request.nextUrl.searchParams.get('q')
    console.log(query)
    try {
        const database = client.db('Inventry');
        const items = database.collection('items');


        const products = await items.aggregate([
            {
                $match: {
                    $or: [
                        { name: { $regex: query, $options: 'i' } }, // Partial or full match on name
                    ]
                }
            }
        ]).toArray();
        console.log('respnse', products)
        // let products = request.nextUrl.searchParams.get('q')
        return NextResponse.json(products)
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}