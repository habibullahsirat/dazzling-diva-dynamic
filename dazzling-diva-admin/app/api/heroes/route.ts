import { connectToDB } from "@/lib/connectToDB";
import { HeroSection } from "@/lib/models/hero";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const project = await HeroSection.find();
  const response = NextResponse.json(project);
  // response.headers.set("Access-Control-Allow-Origin", "*");
  // response.headers.set("Access-Control-Allow-Origin", "http://localhost:3001");
  // response.headers.set("Access-Control-Allow-Methods", "GET");
  // response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://dazzling-diva-client.vercel.app",
  );
  return response;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Connect to the database
    await connectToDB();
    const hero = await HeroSection.create(data);
    return NextResponse.json(
      { message: "Data created", data: hero },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating data:", error);
    return NextResponse.json(
      { message: "Failed to create data" },
      { status: 500 },
    );
  }
}
