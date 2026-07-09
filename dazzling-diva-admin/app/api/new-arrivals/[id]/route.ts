import { connectToDB } from "@/lib/connectToDB";
import { NewArrival } from "@/lib/models/newArrivals";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const data = await req.json();

  await connectToDB();

  try {
    const updated = await NewArrival.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Product updated successfully",
        data: updated,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Failed to update product:", error);

    return NextResponse.json(
      {
        message: "Failed to update product",
      },
      {
        status: 500,
      },
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

    const deleted = await NewArrival.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Product deleted successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Failed to delete product:", error);

    return NextResponse.json(
      {
        message: "Failed to delete product",
      },
      {
        status: 500,
      },
    );
  }
}
