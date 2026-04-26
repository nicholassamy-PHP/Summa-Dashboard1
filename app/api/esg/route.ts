import { mockESGData } from "@/lib/mock-data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(mockESGData);
  } catch (error) {
    console.error("Error fetching ESG data:", error);
    return NextResponse.json(
      { error: "Failed to fetch ESG data" },
      { status: 500 }
    );
  }
}
