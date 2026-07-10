import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { FlashDealProduct } from "@/lib/models/flashDealProduct";

// Update flash deal product
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();

    const body = await request.json();

    const { id } = await params;

    const product = await FlashDealProduct.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update flash deal product" },
      { status: 500 },
    );
  }
}

// Delete flash deal product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();

    const { id } = await params;

    await FlashDealProduct.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Flash deal product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete flash deal product" },
      { status: 500 },
    );
  }
}
