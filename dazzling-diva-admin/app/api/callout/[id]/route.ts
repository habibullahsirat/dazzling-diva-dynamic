import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { Callout } from "@/lib/models/callout";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const data = await request.json();

    await connectToDB();

    const updatedCallout = await Callout.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedCallout) {
      return NextResponse.json(
        { message: "Callout not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedCallout);
  } catch (error) {
    console.error("Error updating callout:", error);

    return NextResponse.json(
      { message: "Failed to update callout." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await connectToDB();

    const deletedCallout = await Callout.findByIdAndDelete(id);

    if (!deletedCallout) {
      return NextResponse.json(
        { message: "Callout not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Callout deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting callout:", error);

    return NextResponse.json(
      { message: "Failed to delete callout." },
      { status: 500 },
    );
  }
}
