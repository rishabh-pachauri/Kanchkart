import { type NextRequest } from "next/server";
import { handleApiError, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { createCloudinaryUploadSignature } from "@/lib/cloudinary";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);
    return ok(createCloudinaryUploadSignature());
  } catch (error) {
    return handleApiError(error);
  }
}
