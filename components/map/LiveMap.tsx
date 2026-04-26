"use client";

import { Shipment } from "@/types";
import { MapPin, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useState } from "react";

interface LiveMapProps {
  shipments: Shipment[];
}

export function LiveMap({ shipments }: LiveMapProps) {
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg relative overflow-hidden">
      {/* Zoom Controls */}
      <div className="absolute top-4 left-4 flex gap-2 z-50">
        <button
          onClick={handleZoomIn}
          className="bg-white text-gray-900 p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
          title="Zoom In"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white text-gray-900 p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>
        <button
          onClick={handleReset}
          className="bg-white text-gray-900 p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
          title="Reset View"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      {/* Map Container */}
      <div className="flex-1 flex items-center justify-center overflow-hidden relative">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 600"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
            transformOrigin: 'center',
            transition: 'transform 0.3s ease-out',
            cursor: zoom > 1 ? 'grab' : 'auto',
          }}
        >
          {/* Background */}
          <rect width="1000" height="600" fill="#f1f5f9" />

          {/* Grid lines for reference */}
          {[...Array(10)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 100}
              y1="0"
              x2={i * 100}
              y2="600"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 100}
              x2="1000"
              y2={i * 100}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}

          {/* Shipment routes */}
          {shipments.map((shipment) => (
            <g key={`route-${shipment.id}`}>
              {/* Origin point */}
              <circle
                cx={(shipment.origin.longitude + 100) * 3}
                cy={(shipment.origin.latitude - 10) * 8}
                r="12"
                fill="#10b981"
                stroke="#059669"
                strokeWidth="2"
              />
              <text
                x={(shipment.origin.longitude + 100) * 3}
                y={(shipment.origin.latitude - 10) * 8 + 28}
                fontSize="14"
                fontWeight="bold"
                fill="#1f2937"
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
                stroke="#64748b"
                strokeWidth="3"
                strokeDasharray="8,4"
                opacity="0.6"
              />

              {/* Current location (pulsing dot) */}
              <circle
                cx={(shipment.current_location.longitude + 100) * 3}
                cy={(shipment.current_location.latitude - 10) * 8}
                r="10"
                fill="#f59e0b"
                className="animate-pulse"
                stroke="#d97706"
                strokeWidth="2"
              />
              <text
                x={(shipment.current_location.longitude + 100) * 3}
                y={(shipment.current_location.latitude - 10) * 8 - 18}
                fontSize="12"
                fontWeight="bold"
                fill="#d97706"
                textAnchor="middle"
                className="pointer-events-none"
              >
                In Transit
              </text>

              {/* Destination point */}
              <circle
                cx={(shipment.destination.longitude + 100) * 3}
                cy={(shipment.destination.latitude - 10) * 8}
                r="12"
                fill="#3b82f6"
                stroke="#1e40af"
                strokeWidth="2"
              />
              <text
                x={(shipment.destination.longitude + 100) * 3}
                y={(shipment.destination.latitude - 10) * 8 + 28}
                fontSize="14"
                fontWeight="bold"
                fill="#1f2937"
                textAnchor="middle"
              >
                {shipment.destination.city}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Info panel */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-5 max-w-sm z-50 pointer-events-auto">
        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
          <MapPin size={18} />
          Active Shipments
        </h4>
        <div className="space-y-3 text-sm max-h-48 overflow-y-auto">
          {shipments.map((shipment) => (
            <div key={shipment.id} className="border-l-4 border-blue-500 pl-3 py-2">
              <p className="font-bold text-gray-900">{shipment.shipment_number}</p>
              <p className="text-gray-600">📍 {shipment.current_location.city}</p>
              <p className="text-gray-600">⏱️ ETA: {new Date(shipment.eta).toLocaleDateString()}</p>
              <p className="text-xs text-blue-600 mt-1">Speed: {shipment.speed} km/h</p>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 text-sm z-50 pointer-events-auto">
        <p className="font-bold text-gray-900 mb-2">Legend</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span className="text-gray-700">Origin</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
            <span className="text-gray-700">Current Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-gray-700">Destination</span>
          </div>
        </div>
      </div>
    </div>
  );
}
