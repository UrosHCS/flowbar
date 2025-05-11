import { internalServerErrorResponse } from "./response.ts";

/**
 * This function should be used in every endpoint (serverless function)
 */
export function middleware(callback: (req: Request) => Promise<Response>) {
  return async (req: Request) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response("OK", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Authorization, X-API-Key, Content-Type",
        },
      });
    }

    try {
      return await callback(req);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return internalServerErrorResponse(message);
    }
  };
}
