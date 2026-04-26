import { mockShipments } from "@/lib/mock-data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(mockShipments);
  } catch (error) {
    console.error("Error fetching shipments:", error);
    return NextResponse.json(
      { error: "Failed to fetch shipments" },
      { status: 500 }
    );
  }
}
