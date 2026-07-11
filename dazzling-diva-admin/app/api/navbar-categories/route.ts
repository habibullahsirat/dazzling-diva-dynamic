import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { NavbarCategory } from "@/lib/models/navbarCategory";

// GET
export async function GET() {
  try {
    await connectToDB();

    const categories = await NavbarCategory.find().sort({
      createdAt: -1,
    });

    const response = NextResponse.json(categories);

    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch navbar categories." },
      { status: 500 },
    );
  }
}

// POST
export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const body = await req.json();

    const category = await NavbarCategory.create(body);

    return NextResponse.json(category, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create navbar category." },
      { status: 500 },
    );
  }
}
