"use client";

import { useEffect, useState } from "react";
import { Shipment, ESGData } from "@/types";
import { KPICard } from "@/components/dashboard/KPICard";
import { ShipmentCard } from "@/components/dashboard/ShipmentCard";
import { Truck, FileCheck, Leaf, AlertCircle } from "lucide-react";

export default function DashboardHome() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [esgData, setEsgData] = useState<ESGData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [shipmentsRes, esgRes] = await Promise.all([
          fetch("/api/shipments"),
          fetch("/api/esg"),
        ]);
        const shipmentsData = await shipmentsRes.json();
        const esgDataResponse = await esgRes.json();
        setShipments(shipmentsData);
        setEsgData(esgDataResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const completedShipments = shipments.filter((s) => s.status === "delivered").length;
  const docsVerified = shipments.filter((s) =>
    s.documents.every((d) => d.status === "verified")
  ).length;
  const totalEmissions = esgData[esgData.length - 1]?.co2_emissions || 0;
  const emissionsSaved = esgData[esgData.length - 1]?.emissions_saved || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400 text-lg">Real-time supply chain metrics & insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <KPICard
          title="Active Shipments"
          value={shipments.length}
          subtitle="Currently in transit"
          icon={<Truck />}
          color="blue"
        />
        <KPICard
          title="Documents Verified"
          value={`${docsVerified}/${shipments.length}`}
          subtitle="Customs cleared"
          icon={<FileCheck />}
          color="green"
        />
        <KPICard
          title="Monthly Emissions Saved"
          value={`${(emissionsSaved / 1000).toFixed(1)}K kg`}
          subtitle="CO2 reduction"
          icon={<Leaf />}
          color="green"
        />
        <KPICard
          title="System Status"
          value="Healthy"
          subtitle="All systems operational"
          icon={<AlertCircle />}
          color="green"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Shipments Section */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Active Shipments</h2>
            <p className="text-gray-400 text-sm">Monitor your shipments in real-time</p>
          </div>
          <div className="grid grid-cols-1 gap-5">
            {shipments.map((shipment) => (
              <ShipmentCard key={shipment.id} shipment={shipment} />
            ))}
          </div>
        </div>

        {/* Quick Links & Info - Expanded */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-premium p-8">
            <h3 className="font-bold text-white mb-6 text-2xl">Quick Access</h3>
            <div className="space-y-4">
              <a href="/dashboard/map" className="group block p-5 bg-gradient-to-r from-blue-600/20 to-blue-600/5 hover:from-blue-600/30 hover:to-blue-600/15 rounded-xl transition-all duration-300 border border-blue-500/30 hover:border-blue-500/60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-lg">Live Map</p>
                    <p className="text-sm text-gray-300 mt-2">Real-time tracking of shipment routes and locations</p>
                  </div>
                  <span className="text-3xl group-hover:translate-x-1 transition-transform">📍</span>
                </div>
              </a>
              <a href="/dashboard/documents" className="group block p-5 bg-gradient-to-r from-green-600/20 to-green-600/5 hover:from-green-600/30 hover:to-green-600/15 rounded-xl transition-all duration-300 border border-green-500/30 hover:border-green-500/60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-lg">Document Vault</p>
                    <p className="text-sm text-gray-300 mt-2">Access customs documents and compliance paperwork</p>
                  </div>
                  <span className="text-3xl group-hover:translate-x-1 transition-transform">📄</span>
                </div>
              </a>
              <a href="/dashboard/esg" className="group block p-5 bg-gradient-to-r from-emerald-600/20 to-emerald-600/5 hover:from-emerald-600/30 hover:to-emerald-600/15 rounded-xl transition-all duration-300 border border-emerald-500/30 hover:border-emerald-500/60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-lg">ESG Analytics</p>
                    <p className="text-sm text-gray-300 mt-2">Monitor carbon emissions and sustainability metrics</p>
                  </div>
                  <span className="text-3xl group-hover:translate-x-1 transition-transform">🌱</span>
                </div>
              </a>
              <a href="/dashboard/reports" className="group block p-5 bg-gradient-to-r from-amber-600/20 to-amber-600/5 hover:from-amber-600/30 hover:to-amber-600/15 rounded-xl transition-all duration-300 border border-amber-500/30 hover:border-amber-500/60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-lg">Analytics & Reports</p>
                    <p className="text-sm text-gray-300 mt-2">Comprehensive logistics and compliance reports</p>
                  </div>
                  <span className="text-3xl group-hover:translate-x-1 transition-transform">📊</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
