"use client";

import { Shipment } from "@/types";
import { TrendingUp, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";

interface ShipmentCardProps {
  shipment: Shipment;
}

export function ShipmentCard({ shipment }: ShipmentCardProps) {
  const statusConfig = {
    in_transit: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-100 text-blue-800", label: "In Transit" },
    delivered: { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-100 text-green-800", label: "Delivered" },
    customs: { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100 text-amber-800", label: "Customs" },
    delayed: { bg: "bg-red-50", border: "border-red-200", badge: "bg-red-100 text-red-800", label: "Delayed" },
  };

  const status = statusConfig[shipment.status];
  const docsVerified = shipment.documents.every((d) => d.status === "verified");

  return (
    <div className={`${status.bg} rounded-2xl border-2 ${status.border} p-6 hover:shadow-lg transition-all duration-300 backdrop-blur-sm`}>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{shipment.shipment_number}</h3>
          <p className="text-sm text-slate-600 font-medium mt-1">Driver: {shipment.driver_name}</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-xs font-bold ${status.badge} shadow-md`}>
          {status.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5 p-4 bg-white bg-opacity-50 rounded-xl">
        <div>
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">From</p>
          <p className="text-sm font-bold text-slate-900 mt-1">
            {shipment.origin.city}
          </p>
          <p className="text-xs text-slate-600">{shipment.origin.country}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">To</p>
          <p className="text-sm font-bold text-slate-900 mt-1">
            {shipment.destination.city}
          </p>
          <p className="text-xs text-slate-600">{shipment.destination.country}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white bg-opacity-60 rounded-lg p-3 border border-slate-200">
          <p className="text-xs text-slate-600 font-semibold">Location</p>
          <p className="text-sm font-bold text-slate-900 mt-1">{shipment.current_location.city}</p>
        </div>
        <div className="bg-white bg-opacity-60 rounded-lg p-3 border border-slate-200">
          <p className="text-xs text-slate-600 font-semibold">Speed</p>
          <p className="text-sm font-bold text-slate-900 mt-1">{shipment.speed} km/h</p>
        </div>
        <div className="bg-white bg-opacity-60 rounded-lg p-3 border border-slate-200">
          <p className="text-xs text-slate-600 font-semibold">Distance</p>
          <p className="text-sm font-bold text-slate-900 mt-1">{shipment.route_distance_km} km</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2">
          {docsVerified ? (
            <>
              <CheckCircle size={18} className="text-green-600" />
              <span className="text-xs font-semibold text-green-700">Documents Verified</span>
            </>
          ) : (
            <>
              <AlertCircle size={18} className="text-amber-600" />
              <span className="text-xs font-semibold text-amber-700">Pending Verification</span>
            </>
          )}
        </div>
        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}
