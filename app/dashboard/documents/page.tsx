"use client";

import { useEffect, useState } from "react";
import { Shipment } from "@/types";
import { DocumentVault } from "@/components/documents/DocumentVault";

export default function DocumentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/shipments");
        const data = await res.json();
        setShipments(data);
        if (data.length > 0) {
          setSelectedShipment(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching shipments:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const selectedShipmentData = shipments.find((s) => s.id === selectedShipment);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-600">Loading documents...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">USMCA Document Vault</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Shipment Selector */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 h-fit">
          <h3 className="font-bold text-slate-900 mb-4">Shipments</h3>
          <div className="space-y-2">
            {shipments.map((shipment) => (
              <button
                key={shipment.id}
                onClick={() => setSelectedShipment(shipment.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedShipment === shipment.id
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-100"
                }`}
              >
                <p className="font-semibold">{shipment.shipment_number}</p>
                <p className="text-xs opacity-75">
                  {shipment.origin.city} → {shipment.destination.city}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Document Vault */}
        {selectedShipmentData && (
          <div className="lg:col-span-3 bg-white rounded-lg border border-slate-200 p-6">
            <DocumentVault documents={selectedShipmentData.documents} />
          </div>
        )}
      </div>
    </div>
  );
}
