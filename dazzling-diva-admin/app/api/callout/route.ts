import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { Callout } from "@/lib/models/callout";

export async function GET() {
  try {
    await connectToDB();

    const callouts = await Callout.find().sort({ createdAt: -1 });

    return NextResponse.json(callouts);
  } catch (error) {
    console.error("Error fetching callouts:", error);

    return NextResponse.json(
      { message: "Failed to fetch callouts." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await connectToDB();

    const callout = await Callout.create(data);

    return NextResponse.json(callout, { status: 201 });
  } catch (error) {
    console.error("Error creating callout:", error);

    return NextResponse.json(
      { message: "Failed to create callout." },
      { status: 500 },
    );
  }
}
