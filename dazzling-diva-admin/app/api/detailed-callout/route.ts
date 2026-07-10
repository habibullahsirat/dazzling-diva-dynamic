import { connectToDB } from "@/lib/connectToDB";
import { DetailedCalloutSection } from "@/lib/models/detailedCallout";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();

  const data = await DetailedCalloutSection.find();

  const response = NextResponse.json(data);

  response.headers.set("Access-Control-Allow-Origin", "*");

  return response;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    await connectToDB();

    const section = await DetailedCalloutSection.create(data);

    return NextResponse.json(
      {
        message: "Section created",
        data: section,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating section:", error);

    return NextResponse.json(
      {
        message: "Failed to create section",
      },
      { status: 500 },
    );
  }
}
