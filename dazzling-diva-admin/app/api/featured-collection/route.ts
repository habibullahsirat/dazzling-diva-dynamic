import { connectToDB } from "@/lib/connectToDB";
import { FeaturedCollection } from "@/lib/models/featuredCollection";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const collections = await FeaturedCollection.find().sort({
      createdAt: -1,
    });
    const response = NextResponse.json(collections);
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://dazzling-diva-client.vercel.app",
    );

    // return NextResponse.json(collections);
    return response;
  } catch (error) {
    console.error("Error fetching collections:", error);

    return NextResponse.json(
      { message: "Failed to fetch collections." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDB();

    const data = await request.json();

    const collection = await FeaturedCollection.create(data);

    return NextResponse.json(collection, { status: 201 });
  } catch (error) {
    console.error("Error creating collection:", error);

    return NextResponse.json(
      { message: "Failed to create collection." },
      { status: 500 },
    );
  }
}
