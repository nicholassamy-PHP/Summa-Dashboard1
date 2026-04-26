"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ESGData } from "@/types";

interface ESGChartProps {
  data: ESGData[];
}

export function ESGChart({ data }: ESGChartProps) {
  // Prepare data for comparison chart
  const comparisonData = data.map((item) => ({
    month: item.month,
    "Summa Optimized": item.co2_emissions,
    "Traditional Carrier": item.traditional_carrier_co2,
    "Emissions Saved": item.emissions_saved,
  }));

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          CO2 Emissions: Summa vs Traditional Carrier
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => {
              if (typeof value === 'number') {
                return `${value.toLocaleString()} kg CO2`;
              }
              return '0 kg CO2';
            }} />
            <Legend />
            <Bar dataKey="Summa Optimized" fill="#3b82f6" />
            <Bar dataKey="Traditional Carrier" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Monthly Emissions Saved
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => {
              if (typeof value === 'number') {
                return `${value.toLocaleString()} kg CO2`;
              }
              return '0 kg CO2';
            }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="Emissions Saved"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data[data.length - 1] && (
          <>
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
              <p className="text-sm text-gray-600 font-medium">Last Month Savings</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {data[data.length - 1].emissions_saved.toLocaleString()} kg CO2
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {data[data.length - 1].savings_percentage.toFixed(1)}% reduction
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6">
              <p className="text-sm text-gray-600 font-medium">Total Distance</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {(data[data.length - 1].total_distance_km / 1000).toFixed(1)}K km
              </p>
            </div>

            <div className="bg-amber-50 border-2 border-amber-500 rounded-lg p-6">
              <p className="text-sm text-gray-600 font-medium">Monthly Emissions</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">
                {(data[data.length - 1].co2_emissions / 1000).toFixed(1)}K kg
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
