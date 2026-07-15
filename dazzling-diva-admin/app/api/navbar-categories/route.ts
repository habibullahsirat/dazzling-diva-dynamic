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

    // response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://dazzling-diva-client.vercel.app",
    );

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

    const { name, slug, href } = await req.json();

    if (!name || !slug || !href) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    const category = await NavbarCategory.create({
      name,
      slug,
      href,
    });

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
