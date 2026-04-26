"use client";

import { useEffect, useState } from "react";
import { ESGData } from "@/types";
import { ESGChart } from "@/components/esg/ESGChart";

export default function ESGPage() {
  const [esgData, setEsgData] = useState<ESGData[]>([]);
  const [loading, setLoading] = useState(true);

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
        <div className="text-slate-600">Loading ESG data...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">ESG & Sustainability</h1>
        <p className="text-slate-600 mt-2">
          Monitor your environmental impact and carbon emissions savings
        </p>
      </div>

      <ESGChart data={esgData} />
    </div>
  );
}
