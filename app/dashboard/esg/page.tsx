"use client";

import { useEffect, useState } from "react";
import { ESGData } from "@/types";
import { ESGChart } from "@/components/esg/ESGChart";
import { Filter, X } from "lucide-react";

export default function ESGPage() {
  const [esgData, setEsgData] = useState<ESGData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/esg");
        const data = await res.json();
        setEsgData(data);
      } catch (error) {
        console.error("Error fetching ESG data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading ESG data...</div>
      </div>
    );
  }

  return (
    <div className="flex gap-8 p-8">
      {/* Filter Sidebar */}
      <div className={`${showFilters ? 'w-80' : 'w-16'} transition-all duration-300 flex flex-col`}>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center mb-4 transition-colors"
          title="Toggle Filters"
        >
          {showFilters ? <X size={20} /> : <Filter size={20} />}
        </button>

        {showFilters && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Report Filters</h3>

            <div className="space-y-6">
              {/* Metrics Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Metric Type
                </label>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Metrics" },
                    { value: "emissions", label: "CO2 Emissions" },
                    { value: "efficiency", label: "Route Efficiency" },
                    { value: "compliance", label: "Compliance Score" },
                    { value: "sustainability", label: "Sustainability Goals" },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="metric"
                        value={option.value}
                        checked={selectedMetric === option.value}
                        onChange={(e) => setSelectedMetric(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Time Period
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
                >
                  <option value="all">All Time</option>
                  <option value="year">Last 12 Months</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="month">Last Month</option>
                </select>
              </div>

              {/* Export Button */}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Export Report
              </button>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedMetric("all");
                  setDateRange("all");
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">ESG & Sustainability</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Monitor your environmental impact and carbon emissions savings
          </p>
        </div>

        <ESGChart data={esgData} />
      </div>
    </div>
  );
}
