import { ApiResponse } from "@/shared/http/api-response";
import { NextRequest } from "next/server"

/**
 * Local login
 */
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  return ApiResponse.ok(body);
}