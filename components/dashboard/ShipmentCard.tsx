"use client";

import { Shipment } from "@/types";
import { TrendingUp, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";

interface ShipmentCardProps {
  shipment: Shipment;
}

export function ShipmentCard({ shipment }: ShipmentCardProps) {
  const statusConfig = {
    in_transit: { badge: "bg-blue-500/30 text-blue-300 border-blue-500/50", label: "In Transit" },
    delivered: { badge: "bg-green-500/30 text-green-300 border-green-500/50", label: "Delivered" },
    customs: { badge: "bg-amber-500/30 text-amber-300 border-amber-500/50", label: "Customs" },
    delayed: { badge: "bg-red-500/30 text-red-300 border-red-500/50", label: "Delayed" },
  };

  const status = statusConfig[shipment.status];
  const docsVerified = shipment.documents.every((d) => d.status === "verified");

  return (
    <div className={`card-premium p-6 border-l-4 border-l-blue-500`}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white">{shipment.shipment_number}</h3>
          <p className="text-sm text-gray-400 font-medium mt-2">Driver: <span className="text-gray-300">{shipment.driver_name}</span></p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.badge} border`}>
          {status.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-700/30 rounded-xl border border-gray-600/50">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">From</p>
          <p className="text-base font-bold text-white mt-2">
            {shipment.origin.city}
          </p>
          <p className="text-xs text-gray-400">{shipment.origin.country}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">To</p>
          <p className="text-base font-bold text-white mt-2">
            {shipment.destination.city}
          </p>
          <p className="text-xs text-gray-400">{shipment.destination.country}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/50">
          <p className="text-xs text-gray-500 font-semibold">Location</p>
          <p className="text-sm font-bold text-white mt-1">{shipment.current_location.city}</p>
        </div>
        <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/50">
          <p className="text-xs text-gray-500 font-semibold">Speed</p>
          <p className="text-sm font-bold text-white mt-1">{shipment.speed} km/h</p>
        </div>
        <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/50">
          <p className="text-xs text-gray-500 font-semibold">Distance</p>
          <p className="text-sm font-bold text-white mt-1">{shipment.route_distance_km} km</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          {docsVerified ? (
            <>
              <CheckCircle size={18} className="text-green-400" />
              <span className="text-xs font-semibold text-green-400">Documents Verified</span>
            </>
          ) : (
            <>
              <AlertCircle size={18} className="text-amber-400" />
              <span className="text-xs font-semibold text-amber-400">Pending Verification</span>
            </>
          )}
        </div>
        <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}
