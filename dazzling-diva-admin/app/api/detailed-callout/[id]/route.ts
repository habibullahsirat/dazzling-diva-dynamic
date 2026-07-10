import { connectToDB } from "@/lib/connectToDB";
import { DetailedCalloutSection } from "@/lib/models/detailedCallout";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const data = await req.json();

  await connectToDB();

  try {
    const updated = await DetailedCalloutSection.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        {
          message: "Section not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Section updated",
        data: updated,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating section:", error);

    return NextResponse.json(
      {
        message: "Failed to update section",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    await connectToDB();

    const deleted = await DetailedCalloutSection.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        {
          message: "Section not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Section deleted",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to delete section",
      },
      { status: 500 },
    );
  }
}
