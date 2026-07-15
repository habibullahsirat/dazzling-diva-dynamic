import { connectToDB } from "@/lib/connectToDB";
import { TwoColumnSection } from "@/lib/models/twoColumn";
import { NextResponse } from "next/server";

// GET ALL TWO COLUMN SECTIONS
export async function GET() {
  await connectToDB();

  const sections = await TwoColumnSection.find();

  const response = NextResponse.json(sections);

  // response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://dazzling-diva-client.vercel.app",
  );

  return response;
}

// CREATE TWO COLUMN SECTION
export async function POST(req: Request) {
  try {
    const data = await req.json();

    await connectToDB();

    const section = await TwoColumnSection.create(data);

    return NextResponse.json(
      {
        message: "Two Column Section created",
        data: section,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Error creating section:", error);

    return NextResponse.json(
      {
        message: "Failed to create section",
      },
      {
        status: 500,
      },
    );
  }
}
