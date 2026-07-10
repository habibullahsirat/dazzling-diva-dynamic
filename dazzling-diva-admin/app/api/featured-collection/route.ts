import { connectToDB } from "@/lib/connectToDB";
import { FeaturedCollection } from "@/lib/models/featuredCollection";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const collections = await FeaturedCollection.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(collections);
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
