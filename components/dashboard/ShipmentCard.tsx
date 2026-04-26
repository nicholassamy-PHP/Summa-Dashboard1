"use client";

import { Shipment } from "@/types";
import { TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

interface ShipmentCardProps {
  shipment: Shipment;
}

export function ShipmentCard({ shipment }: ShipmentCardProps) {
  const statusColor = {
    in_transit: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    customs: "bg-amber-100 text-amber-800",
    delayed: "bg-red-100 text-red-800",
  };

  const statusLabel = {
    in_transit: "In Transit",
    delivered: "Delivered",
    customs: "Customs",
    delayed: "Delayed",
  };

  const docsVerified = shipment.documents.every((d) => d.status === "verified");

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{shipment.shipment_number}</h3>
          <p className="text-sm text-slate-600">{shipment.driver_name}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[shipment.status]}`}>
          {statusLabel[shipment.status]}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-600">From</p>
          <p className="text-sm font-semibold text-slate-900">
            {shipment.origin.city}, {shipment.origin.country}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-600">To</p>
          <p className="text-sm font-semibold text-slate-900">
            {shipment.destination.city}, {shipment.destination.country}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm mb-4">
        <div>
          <span className="text-slate-600">Current:</span>
          <span className="font-semibold text-slate-900 ml-1">
            {shipment.current_location.city}
          </span>
        </div>
        <div>
          <span className="text-slate-600">Speed:</span>
          <span className="font-semibold text-slate-900 ml-1">{shipment.speed} km/h</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          {docsVerified ? (
            <CheckCircle size={16} className="text-green-600" />
          ) : (
            <AlertCircle size={16} className="text-amber-600" />
          )}
          <span className="text-xs text-slate-600">
            {docsVerified ? "All Documents Verified" : "Documents Pending"}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <TrendingUp size={14} />
          <span>{shipment.route_distance_km} km</span>
        </div>
      </div>
    </div>
  );
}
