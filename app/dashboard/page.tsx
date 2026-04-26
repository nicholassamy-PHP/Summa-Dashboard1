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
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Active Shipments</h2>
          <div className="grid grid-cols-1 gap-4">
            {shipments.map((shipment) => (
              <ShipmentCard key={shipment.id} shipment={shipment} />
            ))}
          </div>
        </div>

        {/* Quick Links & Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <a href="/dashboard/map" className="block p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <p className="font-semibold text-blue-600">Live Map</p>
                <p className="text-xs text-slate-600">View shipment locations</p>
              </a>
              <a href="/dashboard/documents" className="block p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <p className="font-semibold text-blue-600">Document Vault</p>
                <p className="text-xs text-slate-600">Access customs documents</p>
              </a>
              <a href="/dashboard/esg" className="block p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <p className="font-semibold text-blue-600">ESG Analytics</p>
                <p className="text-xs text-slate-600">Track carbon emissions</p>
              </a>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6">
            <h3 className="font-bold text-slate-900 mb-2">💡 Tip</h3>
            <p className="text-sm text-slate-700">
              Ask the copilot on the bottom right about specific shipments or compliance questions!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
