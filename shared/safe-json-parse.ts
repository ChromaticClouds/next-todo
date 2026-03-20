import { NextRequest } from "next/server";

export const safeJsonParse = async <T = unknown>(request: NextRequest) => {
  try {
    return await request.json() as T;
  } catch {
    return null;
  }
}