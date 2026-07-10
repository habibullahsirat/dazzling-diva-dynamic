import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { FlashDeal } from "@/lib/models/flashDeal";

export async function GET() {
  try {
    await connectToDB();

    const flashDeals = await FlashDeal.find().sort({ createdAt: -1 });

    return NextResponse.json(flashDeals);
  } catch (error) {
    console.error("Error fetching flash deals:", error);

    return NextResponse.json(
      { message: "Failed to fetch flash deals." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await connectToDB();

    const flashDeal = await FlashDeal.create(data);

    return NextResponse.json(flashDeal, { status: 201 });
  } catch (error) {
    console.error("Error creating flash deal:", error);

    return NextResponse.json(
      { message: "Failed to create flash deal." },
      { status: 500 },
    );
  }
}
