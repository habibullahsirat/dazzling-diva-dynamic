// import { NextRequest, NextResponse } from "next/server";
// import { connectToDB } from "@/lib/connectToDB";
// import { NavbarCategory } from "@/lib/models/navbarCategory";

// // PATCH
// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     await connectToDB();

//     const { id } = await params;

//     const body = await req.json();

//     const category = await NavbarCategory.findByIdAndUpdate(id, body, {
//       new: true,
//     });

//     return NextResponse.json(category);
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       { message: "Failed to update navbar category." },
//       { status: 500 },
//     );
//   }
// }

// // DELETE
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     await connectToDB();

//     const { id } = await params;

//     await NavbarCategory.findByIdAndDelete(id);

//     return NextResponse.json({
//       message: "Deleted successfully.",
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       { message: "Failed to delete navbar category." },
//       { status: 500 },
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import { NavbarCategory } from "@/lib/models/navbarCategory";

// PATCH
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();

    const { id } = await params;

    const { name, slug, href } = await req.json();

    const category = await NavbarCategory.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        href,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!category) {
      return NextResponse.json(
        { message: "Category not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update navbar category." },
      { status: 500 },
    );
  }
}

// DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();

    const { id } = await params;

    await NavbarCategory.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete navbar category." },
      { status: 500 },
    );
  }
}
