export const safeJsonParse = <T = unknown>(payload: string) => {
  try {
    return JSON.parse(payload) as T;
  } catch {
    return null;
  }
}