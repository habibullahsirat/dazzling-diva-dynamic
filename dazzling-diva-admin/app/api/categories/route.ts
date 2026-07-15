import { connectToDB } from "@/lib/connectToDB";
import { Category } from "@/lib/models/category";
import { NextResponse } from "next/server";

// GET ALL CATEGORIES
export async function GET() {
  try {
    await connectToDB();

    const categories = await Category.find();

    const response = NextResponse.json(categories);

    // response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://dazzling-diva-client.vercel.app",
    );

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

// CREATE CATEGORY
export async function POST(req: Request) {
  try {
    const data = await req.json();

    await connectToDB();

    await Category.create(data);

    return NextResponse.json(
      { message: "Category created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create category" },
      { status: 500 },
    );
  }
}
