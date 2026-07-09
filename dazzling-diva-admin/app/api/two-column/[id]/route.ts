import { connectToDB } from "@/lib/connectToDB";
import { TwoColumnSection } from "@/lib/models/twoColumn";
import { NextResponse } from "next/server";

// UPDATE SECTION
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const data = await req.json();

  await connectToDB();

  try {
    const updated = await TwoColumnSection.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        {
          message: "Section not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Section updated successfully",
        data: updated,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Failed to update section:", error);

    return NextResponse.json(
      {
        message: "Failed to update section",
      },
      {
        status: 500,
      },
    );
  }
}

// DELETE SECTION
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    await connectToDB();

    const deleted = await TwoColumnSection.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        {
          message: "Section not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Section deleted successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to delete section",
      },
      {
        status: 500,
      },
    );
  }
}
