import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { FlashDeal } from "@/lib/models/flashDeal";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const data = await request.json();

    await connectToDB();

    const updatedFlashDeal = await FlashDeal.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedFlashDeal) {
      return NextResponse.json(
        { message: "Flash deal not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedFlashDeal);
  } catch (error) {
    console.error("Error updating flash deal:", error);

    return NextResponse.json(
      { message: "Failed to update flash deal." },
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

    const deletedFlashDeal = await FlashDeal.findByIdAndDelete(id);

    if (!deletedFlashDeal) {
      return NextResponse.json(
        { message: "Flash deal not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Flash deal deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting flash deal:", error);

    return NextResponse.json(
      { message: "Failed to delete flash deal." },
      { status: 500 },
    );
  }
}
