"use client";

import { useEffect, useState } from "react";
import { Shipment } from "@/types";
import { LiveMap } from "@/components/map/LiveMap";

export default function MapPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/shipments");
        const data = await res.json();
        setShipments(data);
      } catch (error) {
        console.error("Error fetching shipments:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Live Tracking Map</h1>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg h-[600px]">
        <LiveMap shipments={shipments} />
      </div>
    </div>
  );
}
