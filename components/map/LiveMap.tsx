"use client";

import { Shipment } from "@/types";
import { MapPin } from "lucide-react";

interface LiveMapProps {
  shipments: Shipment[];
}

export function LiveMap({ shipments }: LiveMapProps) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg relative">
      {/* Simple SVG Map representation */}
      <svg className="w-full h-full max-w-4xl max-h-96" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="1000" height="600" fill="#f1f5f9" />

        {/* Simplified route lines */}
        {shipments.map((shipment) => (
          <g key={`route-${shipment.id}`}>
            {/* Origin point */}
            <circle
              cx={(shipment.origin.longitude + 100) * 3}
              cy={(shipment.origin.latitude - 10) * 8}
              r="8"
              fill="#10b981"
            />
            <text
              x={(shipment.origin.longitude + 100) * 3}
              y={(shipment.origin.latitude - 10) * 8 + 20}
              fontSize="12"
              fill="#334155"
              textAnchor="middle"
            >
              {shipment.origin.city}
            </text>

            {/* Route line */}
            <line
              x1={(shipment.origin.longitude + 100) * 3}
              y1={(shipment.origin.latitude - 10) * 8}
              x2={(shipment.destination.longitude + 100) * 3}
              y2={(shipment.destination.latitude - 10) * 8}
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="5,5"
            />

            {/* Current location (pulsing dot) */}
            <circle
              cx={(shipment.current_location.longitude + 100) * 3}
              cy={(shipment.current_location.latitude - 10) * 8}
              r="6"
              fill="#f59e0b"
              className="animate-pulse"
            />

            {/* Destination point */}
            <circle
              cx={(shipment.destination.longitude + 100) * 3}
              cy={(shipment.destination.latitude - 10) * 8}
              r="8"
              fill="#3b82f6"
            />
            <text
              x={(shipment.destination.longitude + 100) * 3}
              y={(shipment.destination.latitude - 10) * 8 + 20}
              fontSize="12"
              fill="#334155"
              textAnchor="middle"
            >
              {shipment.destination.city}
            </text>
          </g>
        ))}
      </svg>

      {/* Info panel */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <MapPin size={16} />
          Active Shipments
        </h4>
        <div className="space-y-2 text-sm">
          {shipments.map((shipment) => (
            <div key={shipment.id} className="text-gray-600">
              <p className="font-semibold text-gray-900">{shipment.shipment_number}</p>
              <p>📍 {shipment.current_location.city}</p>
              <p>⏱️ ETA: {new Date(shipment.eta).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
