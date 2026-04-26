"use client";

import { useEffect, useRef, useState } from "react";
import { Shipment } from "@/types";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ZoomIn, ZoomOut, RotateCcw, MapPin } from "lucide-react";

interface LiveMapProps {
  shipments: Shipment[];
}

// Get Mapbox token from environment variable
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export function LiveMap({ shipments }: LiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mapContainer.current || !mapboxgl.accessToken) {
      setLoading(false);
      return;
    }

    try {
      // Initialize map centered on North America
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-95, 45], // Center on North America
        zoom: 4,
      });

      map.current.on("load", () => {
        // Add shipment markers and routes
        shipments.forEach((shipment) => {
          // Draw route line
          const coordinates = [
            [shipment.origin.longitude, shipment.origin.latitude],
            [shipment.current_location.longitude, shipment.current_location.latitude],
            [shipment.destination.longitude, shipment.destination.latitude],
          ];

          // Add source if it doesn't exist
          if (!map.current!.getSource(`route-${shipment.id}`)) {
            map.current!.addSource(`route-${shipment.id}`, {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: coordinates,
                },
                properties: {},
              },
            });

            map.current!.addLayer({
              id: `route-${shipment.id}`,
              type: "line",
              source: `route-${shipment.id}`,
              paint: {
                "line-color": "#3b82f6",
                "line-width": 3,
                "line-dasharray": [5, 5],
              },
            });
          }

          // Origin marker
          const originMarker = document.createElement("div");
          originMarker.className = "w-6 h-6 bg-green-600 rounded-full border-2 border-green-800 shadow-lg";
          new mapboxgl.Marker(originMarker)
            .setLngLat([shipment.origin.longitude, shipment.origin.latitude])
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <div class="p-2">
                  <h3 class="font-bold text-gray-900">${shipment.origin.city}</h3>
                  <p class="text-sm text-gray-600">${shipment.origin.country}</p>
                  <p class="text-xs text-gray-500">Origin</p>
                </div>
              `)
            )
            .addTo(map.current!);
          markersRef.current.push(new mapboxgl.Marker(originMarker));

          // Current location marker (pulsing)
          const currentMarker = document.createElement("div");
          currentMarker.className =
            "w-5 h-5 bg-amber-500 rounded-full border-2 border-amber-700 shadow-lg animate-pulse";
          const popup = new mapboxgl.Marker(currentMarker)
            .setLngLat([shipment.current_location.longitude, shipment.current_location.latitude])
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <div class="p-2">
                  <h3 class="font-bold text-gray-900">${shipment.shipment_number}</h3>
                  <p class="text-sm text-gray-600">📍 ${shipment.current_location.city}</p>
                  <p class="text-sm text-gray-600">🚛 Speed: ${shipment.speed} km/h</p>
                  <p class="text-xs text-gray-500">Driver: ${shipment.driver_name}</p>
                  <p class="text-xs text-blue-600">Status: In Transit</p>
                </div>
              `)
            )
            .addTo(map.current!);
          markersRef.current.push(popup);

          // Destination marker
          const destMarker = document.createElement("div");
          destMarker.className = "w-6 h-6 bg-blue-600 rounded-full border-2 border-blue-800 shadow-lg";
          new mapboxgl.Marker(destMarker)
            .setLngLat([shipment.destination.longitude, shipment.destination.latitude])
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <div class="p-2">
                  <h3 class="font-bold text-gray-900">${shipment.destination.city}</h3>
                  <p class="text-sm text-gray-600">${shipment.destination.country}</p>
                  <p class="text-xs text-gray-500">Destination</p>
                </div>
              `)
            )
            .addTo(map.current!);
          markersRef.current.push(new mapboxgl.Marker(destMarker));
        });

        setLoading(false);
      });
    } catch (error) {
      console.error("Map initialization error:", error);
      setLoading(false);
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [shipments]);

  const handleZoomIn = () => map.current?.zoomTo((map.current?.getZoom() || 4) + 1);
  const handleZoomOut = () => map.current?.zoomTo((map.current?.getZoom() || 4) - 1);
  const handleReset = () => {
    map.current?.flyTo({ center: [-95, 45], zoom: 4 });
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-100 rounded-lg relative overflow-hidden">
      {/* Map Container */}
      <div
        ref={mapContainer}
        className="flex-1 w-full h-full"
        style={{ background: "#e5e3df" }}
      />

      {/* Zoom Controls */}
      <div className="absolute top-4 left-4 flex gap-2 z-50">
        <button
          onClick={handleZoomIn}
          className="bg-white text-gray-900 p-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
          title="Zoom In"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white text-gray-900 p-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>
        <button
          onClick={handleReset}
          className="bg-white text-gray-900 p-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
          title="Reset View"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-50">
        <p className="font-bold text-gray-900 mb-3">Legend</p>
        <div className="space-y-2 text-sm">
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

      {/* Info Panel */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-5 max-w-sm z-50 max-h-48 overflow-y-auto">
        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
          <MapPin size={18} />
          Active Shipments
        </h4>
        <div className="space-y-3 text-sm">
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

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-40 rounded-lg">
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-gray-900 font-semibold">Loading map...</p>
            <p className="text-sm text-gray-600 mt-2">Make sure NEXT_PUBLIC_MAPBOX_TOKEN is set</p>
          </div>
        </div>
      )}

      {/* No Token Warning */}
      {!mapboxgl.accessToken && (
        <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center z-40 rounded-lg">
          <div className="bg-red-50 rounded-lg p-6 text-center border-2 border-red-500">
            <p className="text-red-900 font-bold">Mapbox Token Required</p>
            <p className="text-sm text-red-800 mt-2">
              Add <code className="bg-red-100 px-2 py-1 rounded">NEXT_PUBLIC_MAPBOX_TOKEN</code> to your .env.local
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
