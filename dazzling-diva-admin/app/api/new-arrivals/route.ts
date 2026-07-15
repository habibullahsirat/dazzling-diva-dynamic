import { connectToDB } from "@/lib/connectToDB";
import { NewArrival } from "@/lib/models/newArrivals";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();

  const products = await NewArrival.find();

  const response = NextResponse.json(products);

  // response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://dazzling-diva-client.vercel.app",
  );

  return response;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    await connectToDB();

    const product = await NewArrival.create(data);

    return NextResponse.json(
      {
        message: "Product created",
        data: product,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Error creating product:", error);

    return NextResponse.json(
      {
        message: "Failed to create product",
      },
      {
        status: 500,
      },
    );
  }
}
