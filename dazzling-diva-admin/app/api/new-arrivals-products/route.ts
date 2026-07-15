import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { Product } from "@/lib/models/product";

export async function GET() {
  try {
    await connectToDB();

    const products = await Product.find({
      isNewArrival: true,
    }).sort({ createdAt: -1 });

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
      { message: "Failed to fetch new arrivals." },
      { status: 500 },
    );
  }
}
