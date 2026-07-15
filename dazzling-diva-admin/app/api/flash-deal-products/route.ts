import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { FlashDealProduct } from "@/lib/models/flashDealProduct";

// GET all flash deal products
export async function GET() {
  try {
    await connectToDB();

    const products = await FlashDealProduct.find().sort({
      createdAt: -1,
    });

    const response = NextResponse.json(products);
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://dazzling-diva-client.vercel.app",
    );

    // return NextResponse.json(products);
    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch flash deal products" },
      { status: 500 },
    );
  }
}

// Create flash deal product
export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const body = await request.json();

    const product = await FlashDealProduct.create(body);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating flash deal product:", error);

    return NextResponse.json(
      { message: "Failed to create flash deal product" },
      { status: 500 },
    );
  }
}
