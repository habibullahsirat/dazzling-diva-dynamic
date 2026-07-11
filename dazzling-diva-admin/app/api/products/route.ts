import { connectToDB } from "@/lib/connectToDB";
import { Product } from "@/lib/models/product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const products = await Product.find().sort({ createdAt: -1 });

    const response = NextResponse.json(products);

    response.headers.set("Access-Control-Allow-Origin", "*");

    return response;
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDB();

    const body = await request.json();

    const product = await Product.create(body);

    return NextResponse.json(product, {
      status: 201,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 },
    );
  }
}
