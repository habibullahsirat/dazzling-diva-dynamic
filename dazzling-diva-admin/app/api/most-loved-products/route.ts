import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { Product } from "@/lib/models/product";

export async function GET() {
  try {
    await connectToDB();

    const products = await Product.find({
      isMostLoved: true,
    }).sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch most loved products." },
      { status: 500 },
    );
  }
}
