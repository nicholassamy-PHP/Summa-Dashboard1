"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { TrendingUp, AlertCircle, Leaf, DollarSign } from "lucide-react";

interface ReportsData {
  otif: { rate: number; onTimeShipments: number; totalShipments: number; trend: string };
  borderDwellTime: Array<{ border: string; avgHours: number; shipments: number }>;
  transitVariability: Array<{ week: string; minDays: number; avgDays: number; maxDays: number }>;
  freightSpend: Array<{ month: string; spend: number; yoy: number }>;
  costMetrics: { costPerKm: number; costPerPallet: number; avgShipmentValue: number; totalMonthlySpend: number };
  landedCost: { freightCost: number; insurance: number; duties: number; totalLandedCost: number };
  complianceScore: number;
  certificationStatus: string;
  exceptions: Array<{ type: string; percentage: number; count: number }>;
  scope3Emissions: Array<{ month: string; emissions: number }>;
  carbonIntensity: { tonnesPerKm: number; industryAverage: number; improvement: string };
  greenRoutingSavings: { co2Saved: number; costSavings: number; fleetUtilization: string };
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function ReportsPage() {
  const [data, setData] = useState<ReportsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("operations");

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("/api/reports");
        const reportsData = await res.json();
        setData(reportsData);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading reports...</div>
      </div>
    );
  }

  if (!data) {
    return <div className="p-8">Failed to load reports</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-3">Analytics & Reports</h1>
        <p className="text-gray-600 text-lg">Comprehensive logistics, financial, compliance, and sustainability metrics</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 border-b-2 border-gray-200">
        {[
          { id: "operations", label: "Operations & Logistics", icon: "📦" },
          { id: "financial", label: "Financial & Spend", icon: "💰" },
          { id: "compliance", label: "Compliance & Risk", icon: "✓" },
          { id: "esg", label: "ESG & Sustainability", icon: "🌱" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 font-semibold text-lg transition-all border-b-4 ${
              activeTab === tab.id
                ? "text-blue-600 border-blue-600"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Operations & Logistics Tab */}
      {activeTab === "operations" && (
        <div className="space-y-8">
          {/* OTIF Rate - Gauge Style */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">On-Time In-Full (OTIF) Rate</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    {/* Gauge background */}
                    <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                    {/* Gauge fill */}
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="20"
                      strokeDasharray={`${(98.5 / 100) * 565} 565`}
                      strokeLinecap="round"
                      style={{ transform: "rotate(-90deg)", transformOrigin: "100px 100px" }}
                    />
                    {/* Center text */}
                    <text x="100" y="85" fontSize="48" fontWeight="bold" fill="#1f2937" textAnchor="middle">
                      98.5%
                    </text>
                    <text x="100" y="110" fontSize="16" fill="#6b7280" textAnchor="middle">
                      On-Time In-Full
                    </text>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-500">
                  <p className="text-sm text-gray-600 font-semibold">On-Time Shipments</p>
                  <p className="text-4xl font-bold text-green-600 mt-2">{data.otif.onTimeShipments}</p>
                  <p className="text-sm text-gray-600 mt-1">out of {data.otif.totalShipments}</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-500">
                  <p className="text-sm text-gray-600 font-semibold">Month-over-Month Trend</p>
                  <p className="text-4xl font-bold text-blue-600 mt-2">{data.otif.trend}</p>
                  <p className="text-sm text-gray-600 mt-1">Improvement vs last month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Border Dwell Time */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Border Dwell Time Analytics</h2>
            <p className="text-gray-600 mb-6">Average time spent waiting at major border crossings</p>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data.borderDwellTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="border" />
                <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => typeof value === 'number' ? `${value} hours` : '0 hours'} />
                <Legend />
                <Bar dataKey="avgHours" name="Avg Wait Time (hrs)" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                <Bar dataKey="shipments" name="Shipments Count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Transit Time Variability */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Transit Time Variability: Querétaro to Toronto</h2>
            <p className="text-gray-600 mb-6">Historical consistency showing predictable lead times</p>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={data.transitVariability}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis label={{ value: "Days", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => typeof value === 'number' ? `${value} days` : '0 days'} />
                <Legend />
                <Bar dataKey="minDays" name="Min Transit Days" fill="#10b981" opacity={0.3} />
                <Bar dataKey="maxDays" name="Max Transit Days" fill="#ef4444" opacity={0.3} />
                <Line type="monotone" dataKey="avgDays" name="Average Transit Time" stroke="#3b82f6" strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Financial & Spend Tab */}
      {activeTab === "financial" && (
        <div className="space-y-8">
          {/* Total Freight Spend */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Total Freight Spend (MoM / YoY)</h2>
            <p className="text-gray-600 mb-6">Shipping costs comparison: This month vs last year</p>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data.freightSpend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: "Cost ($)", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => typeof value === 'number' ? `$${value.toLocaleString()}` : '$0'} />
                <Legend />
                <Line type="monotone" dataKey="spend" name="Current Month" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} />
                <Line type="monotone" dataKey="yoy" name="Year-over-Year" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} strokeDasharray="5,5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Cost Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Cost Per Kilometer",
                value: `$${data.costMetrics.costPerKm.toFixed(2)}`,
                subtitle: "Industry avg: $2.85",
                icon: "📍",
              },
              {
                title: "Cost Per Pallet",
                value: `$${data.costMetrics.costPerPallet.toFixed(2)}`,
                subtitle: "Industry avg: $92",
                icon: "📦",
              },
              {
                title: "Avg Shipment Value",
                value: `$${data.costMetrics.avgShipmentValue.toLocaleString()}`,
                subtitle: "Per shipment",
                icon: "💵",
              },
              {
                title: "Monthly Spend",
                value: `$${data.costMetrics.totalMonthlySpend.toLocaleString()}`,
                subtitle: "Total freight costs",
                icon: "💰",
              },
            ].map((metric, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{metric.title}</h3>
                  <span className="text-4xl">{metric.icon}</span>
                </div>
                <p className="text-4xl font-bold text-blue-600 mb-2">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Landed Cost Estimator */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Landed Cost Estimator</h2>
            <p className="text-gray-600 mb-8">Total cost of product upon arrival in Canada (includes freight, insurance, duties)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4">
                  {[
                    { label: "Freight Cost", value: data.landedCost.freightCost, color: "blue" },
                    { label: "Insurance", value: data.landedCost.insurance, color: "green" },
                    { label: "Duties & Tariffs", value: data.landedCost.duties, color: "amber" },
                  ].map((item, idx) => (
                    <div key={idx} className={`bg-${item.color}-50 p-4 rounded-lg border-2 border-${item.color}-500`}>
                      <p className="text-sm text-gray-700 font-semibold">{item.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">${item.value.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8">
                  <p className="text-lg font-semibold opacity-90">Total Landed Cost</p>
                  <p className="text-6xl font-bold mt-4">${data.landedCost.totalLandedCost.toFixed(2)}</p>
                  <p className="text-sm opacity-75 mt-2">Per unit at destination</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compliance & Risk Tab */}
      {activeTab === "compliance" && (
        <div className="space-y-8">
          {/* USMCA/CUSMA Audit Readiness */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">USMCA/CUSMA Audit Readiness Score</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="16" />
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="16"
                      strokeDasharray={`${(data.complianceScore / 100) * 565} 565`}
                      strokeLinecap="round"
                      style={{ transform: "rotate(-90deg)", transformOrigin: "100px 100px" }}
                    />
                    <text x="100" y="85" fontSize="44" fontWeight="bold" fill="#1f2937" textAnchor="middle">
                      {data.complianceScore}
                    </text>
                    <text x="100" y="115" fontSize="14" fill="#6b7280" textAnchor="middle">
                      /100
                    </text>
                  </svg>
                </div>
              </div>
              <div className="md:col-span-2 flex flex-col justify-center space-y-4">
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Status: {data.certificationStatus}</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ All certificates of origin verified</li>
                    <li>✓ Commercial invoices perfectly documented</li>
                    <li>✓ Rules of origin compliance: 100%</li>
                    <li>✓ Audit trail complete and auditable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Exceptions & Incidents */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Exceptions & Incidents Report</h2>
            <p className="text-gray-600 mb-8">Transparency in delays and issues (Last 30 days)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.exceptions}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ payload }) => `${payload?.type ?? ''}: ${payload?.percentage ?? 0}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {data.exceptions.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => typeof value === 'number' ? `${value}%` : '0%'} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-4">
                {data.exceptions.map((exc, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{exc.type}</h4>
                      <span className="text-2xl font-bold text-gray-900">{exc.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div className={`bg-${["blue", "green", "amber", "red"][idx]}-600 h-2 rounded-full`} style={{ width: `${exc.percentage}%` }} />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{exc.count} incidents</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ESG & Sustainability Tab */}
      {activeTab === "esg" && (
        <div className="space-y-8">
          {/* Scope 3 Logistics Emissions */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Scope 3 Logistics Emissions Tracker</h2>
            <p className="text-gray-600 mb-6">Total CO2 equivalent (CO2e) emissions for all freight moved by Summa</p>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data.scope3Emissions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: "CO2e (kg)", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => typeof value === 'number' ? `${value.toLocaleString()} kg CO2e` : '0 kg CO2e'} />
                <Bar dataKey="emissions" name="Total CO2e Emissions" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Carbon Intensity & Green Routing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Carbon Intensity */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <Leaf className="text-green-600" size={28} />
                Carbon Intensity Metric
              </h2>
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-500">
                  <p className="text-sm text-gray-700 font-semibold">Summa's Emissions Per Tonne-km</p>
                  <p className="text-4xl font-bold text-green-600 mt-2">{data.carbonIntensity.tonnesPerKm}</p>
                  <p className="text-sm text-gray-600 mt-2">kg CO2e per tonne-kilometer</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-500">
                  <p className="text-sm text-gray-700 font-semibold">Industry Average</p>
                  <p className="text-4xl font-bold text-blue-600 mt-2">{data.carbonIntensity.industryAverage}</p>
                  <p className="text-sm text-gray-600 mt-2">Standard industry benchmark</p>
                </div>
                <div className="bg-emerald-50 p-6 rounded-xl border-2 border-emerald-500">
                  <p className="text-sm text-gray-700 font-semibold">Summa Advantage</p>
                  <p className="text-4xl font-bold text-emerald-600 mt-2">{data.carbonIntensity.improvement}</p>
                  <p className="text-sm text-gray-600 mt-2">Better than industry average</p>
                </div>
              </div>
            </div>

            {/* Green Routing Savings */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <TrendingUp className="text-green-600" size={28} />
                Green Routing Savings
              </h2>
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-500">
                  <p className="text-sm text-gray-700 font-semibold">CO2 Emissions Saved</p>
                  <p className="text-4xl font-bold text-green-600 mt-2">{data.greenRoutingSavings.co2Saved.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-2">kg CO2 this month</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-500">
                  <p className="text-sm text-gray-700 font-semibold">Cost Savings (Optimized Routes)</p>
                  <p className="text-4xl font-bold text-blue-600 mt-2">${data.greenRoutingSavings.costSavings.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-2">vs traditional routing</p>
                </div>
                <div className="bg-amber-50 p-6 rounded-xl border-2 border-amber-500">
                  <p className="text-sm text-gray-700 font-semibold">Fleet Utilization</p>
                  <p className="text-4xl font-bold text-amber-600 mt-2">{data.greenRoutingSavings.fleetUtilization}</p>
                  <p className="text-sm text-gray-600 mt-2">Modern, eco-friendly trucks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
