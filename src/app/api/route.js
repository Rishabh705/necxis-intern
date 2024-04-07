import connect from "@/lib/db";
import Post from "@/Models/Posts";
import { NextResponse } from "next/server";


export async function GET(req){

    try {
        await connect();
       
        // Access postId from query parameters
        const postId = req.nextUrl.searchParams.get('postId')

        const post = await Post.findById(postId);
        return new NextResponse(JSON.stringify(post.comments), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};
