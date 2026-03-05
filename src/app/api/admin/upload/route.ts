import { validateUploadFiles } from "@/lib/cloudinary/upload-validation";
import { CloudinaryService } from "@/services/cloudinary.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  // Lấy tất cả file từ field "files"
  const files = formData.getAll("files") as File[];

  // Validate
  const validation = validateUploadFiles(files);
  if (!validation.valid) {
    return NextResponse.json(
      { error: "Validation failed", details: validation.errors },
      { status: 422 },
    );
  }

  // Upload song song lên Cloudinary
  const results = await Promise.all(
    files.map(async (file) =>
      CloudinaryService.uploadBuffer(Buffer.from(await file.arrayBuffer()), {
        folder: "products",
      }),
    ),
  );

  return NextResponse.json({ uploaded: results });
}
