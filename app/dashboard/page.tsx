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
    <div className="p-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Active Shipments</h2>
            <p className="text-slate-600">Monitor your shipments in real-time</p>
          </div>
          <div className="grid grid-cols-1 gap-5">
            {shipments.map((shipment) => (
              <ShipmentCard key={shipment.id} shipment={shipment} />
            ))}
          </div>
        </div>

        {/* Quick Links & Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-md">
            <h3 className="font-bold text-slate-900 mb-5 text-lg">Quick Access</h3>
            <div className="space-y-3">
              <a href="/dashboard/map" className="group block p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-300 border border-blue-200 hover:border-blue-400 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-blue-900">Live Map</p>
                    <p className="text-xs text-blue-700 mt-1">Track shipment routes</p>
                  </div>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">📍</span>
                </div>
              </a>
              <a href="/dashboard/documents" className="group block p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 rounded-xl transition-all duration-300 border border-emerald-200 hover:border-emerald-400 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-emerald-900">Document Vault</p>
                    <p className="text-xs text-emerald-700 mt-1">Customs documents</p>
                  </div>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">📄</span>
                </div>
              </a>
              <a href="/dashboard/esg" className="group block p-4 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl transition-all duration-300 border border-orange-200 hover:border-orange-400 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-orange-900">ESG Analytics</p>
                    <p className="text-xs text-orange-700 mt-1">Carbon tracking</p>
                  </div>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">🌱</span>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg border border-purple-500">
            <h3 className="font-bold mb-2 text-lg">✨ AI Copilot</h3>
            <p className="text-sm text-purple-100 leading-relaxed">
              Ask about shipment status, compliance risks, or carbon emissions. Available 24/7.
            </p>
            <button className="mt-4 w-full bg-white text-purple-700 font-bold py-2 px-4 rounded-lg hover:bg-purple-50 transition-all duration-200">
              Open Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
