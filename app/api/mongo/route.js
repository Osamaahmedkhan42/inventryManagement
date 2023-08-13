import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(request) {
    // Replace the uri string with your connection string.
    const uri = "mongodb+srv://ahmed:ahmed123@cluster0.zxcs30k.mongodb.net/";

    const client = new MongoClient(uri);


    try {
        const database = client.db('Inventry');
        const movies = database.collection('ahmed');

        // Query for a movie that has the title 'Back to the Future'
        const query = {};
        const movie = await movies.findOne(query);

        console.log(movie);
        return NextResponse.json(movie)
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }



}




