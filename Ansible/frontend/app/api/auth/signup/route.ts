// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
    try {
        // Parse the incoming JSON payload
        const body = await request.json();

      // Use an environment variable for your internal backend URL,
      // e.g., "http://10.0.0.5" where your backend is hosted.
      const internalBackendUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!internalBackendUrl) {
          throw new Error("NEXT_PUBLIC_API_URL is not set in environment variables");
      }

      // Forward the signup request to your internal backend
      const response = await axios.post(
          `${internalBackendUrl}/api/auth/signup`,
          body,
          {
              headers: {
                  "Content-Type": "application/json",
              },
          }
      );

      // Return the response from the backend
      return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
      console.error("Error in signup proxy API:", error);

      // Forward the backend error if it's an Axios error with a response
      if (axios.isAxiosError(error) && error.response) {
          return NextResponse.json(error.response.data, { status: error.response.status });
      }

      // Fallback error response
      return NextResponse.json(
          { error: error.message || "Internal server error" },
          { status: 500 }
      );
  }
}
