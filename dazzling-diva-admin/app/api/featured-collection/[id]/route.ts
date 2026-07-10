import { connectToDB } from "@/lib/connectToDB";
import { FeaturedCollection } from "@/lib/models/featuredCollection";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    await connectToDB();

    const { id } = await params;

    const data = await request.json();

    const collection = await FeaturedCollection.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!collection) {
      return NextResponse.json(
        { message: "Collection not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(collection);
  } catch (error) {
    console.error("Error updating collection:", error);

    return NextResponse.json(
      { message: "Failed to update collection." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await connectToDB();

    const { id } = await params;

    const collection = await FeaturedCollection.findByIdAndDelete(id);

    if (!collection) {
      return NextResponse.json(
        { message: "Collection not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Collection deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting collection:", error);

    return NextResponse.json(
      { message: "Failed to delete collection." },
      { status: 500 },
    );
  }
}
