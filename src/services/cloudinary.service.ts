import { cloudinary } from "@/lib/cloudinary/client";

export interface UploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export class CloudinaryService {
  // Upload from buffer (use for route handler accept FormData)
  static async uploadBuffer(
    buffer: Buffer,
    options: {
      folder: string;
      public_id?: string;
    },
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: options.folder,
            public_id: options.public_id,
            resource_type: "image",
          },
          (error, result) => {
            if (error || !result)
              return reject(
                error
                  ? new Error(error.message)
                  : new Error("Upload failed: no result returned"),
              );
            resolve({
              public_id: result.public_id,
              secure_url: result.secure_url,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes,
            });
          },
        )
        .end(buffer);
    });
  }

  // Delete by public_id
  static async delete(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}
