import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import 'dotenv/config'

export async function GET(request) {

    // Replace the uri string with your connection string.
    const uri = process.env.URI;
    const client = new MongoClient(uri);
    try {
        const database = client.db('Inventry');
        const items = database.collection('items');
        const products = await items.find({}).toArray()
        return NextResponse.json(products)
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}




export async function POST(request) {
    let body = await request.json()
    const uri = process.env.URI;
    const client = new MongoClient(uri);
    try {
        const database = client.db('Inventry');
        const items = database.collection('items');
        const product = await items.insertOne(body)
        return NextResponse.json({ product, ok: true })
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}