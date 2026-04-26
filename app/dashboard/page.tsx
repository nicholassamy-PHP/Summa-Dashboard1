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
        <div className="text-slate-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400 text-lg">Real-time supply chain metrics & insights</p>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipments Section */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Active Shipments</h2>
            <p className="text-slate-400 text-sm">Monitor your shipments in real-time</p>
          </div>
          <div className="grid grid-cols-1 gap-5">
            {shipments.map((shipment) => (
              <ShipmentCard key={shipment.id} shipment={shipment} />
            ))}
          </div>
        </div>

        {/* Quick Links & Info */}
        <div className="space-y-6">
          <div className="card-premium p-6">
            <h3 className="font-bold text-white mb-5 text-lg">Quick Access</h3>
            <div className="space-y-3">
              <a href="/dashboard/map" className="group block p-4 bg-slate-700/40 hover:bg-slate-700/60 rounded-xl transition-all duration-300 border border-slate-600 hover:border-blue-500/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Live Map</p>
                    <p className="text-xs text-slate-400 mt-1">Track shipment routes</p>
                  </div>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">📍</span>
                </div>
              </a>
              <a href="/dashboard/documents" className="group block p-4 bg-slate-700/40 hover:bg-slate-700/60 rounded-xl transition-all duration-300 border border-slate-600 hover:border-green-500/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Document Vault</p>
                    <p className="text-xs text-slate-400 mt-1">Customs documents</p>
                  </div>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">📄</span>
                </div>
              </a>
              <a href="/dashboard/esg" className="group block p-4 bg-slate-700/40 hover:bg-slate-700/60 rounded-xl transition-all duration-300 border border-slate-600 hover:border-amber-500/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">ESG Analytics</p>
                    <p className="text-xs text-slate-400 mt-1">Carbon tracking</p>
                  </div>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">🌱</span>
                </div>
              </a>
            </div>
          </div>

          <div className="card-premium border-l-4 border-l-cyan-500 p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-white text-lg">AI Copilot</h3>
              <span className="text-cyan-400">✨</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Ask about shipment status, compliance risks, or carbon emissions in natural language.
            </p>
            <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200">
              Open Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
