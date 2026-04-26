import { NextResponse } from "next/server";

export async function GET() {
  const reportsData = {
    // Operations & Logistics Metrics
    otif: {
      rate: 98.5,
      onTimeShipments: 197,
      totalShipments: 200,
      trend: "+2.1%",
    },
    borderDwellTime: [
      { border: "Laredo, TX", avgHours: 4.2, shipments: 45 },
      { border: "El Paso, TX", avgHours: 5.8, shipments: 32 },
      { border: "Detroit, MI", avgHours: 3.1, shipments: 28 },
      { border: "Blaine, WA", avgHours: 2.9, shipments: 15 },
    ],
    transitVariability: [
      { week: "Week 1", minDays: 4.2, avgDays: 4.8, maxDays: 5.5 },
      { week: "Week 2", minDays: 4.1, avgDays: 4.7, maxDays: 5.3 },
      { week: "Week 3", minDays: 4.0, avgDays: 4.6, maxDays: 5.2 },
      { week: "Week 4", minDays: 4.2, avgDays: 4.8, maxDays: 5.4 },
    ],

    // Financial & Spend Analytics
    freightSpend: [
      { month: "January", spend: 124500, yoy: 118200 },
      { month: "February", spend: 132800, yoy: 121500 },
      { month: "March", spend: 145200, yoy: 138900 },
      { month: "April", spend: 151600, yoy: 142300 },
    ],
    costMetrics: {
      costPerKm: 2.45,
      costPerPallet: 85.5,
      avgShipmentValue: 8750,
      totalMonthlySpend: 554100,
    },
    landedCost: {
      freightCost: 850,
      insurance: 42.5,
      duties: 127.5,
      totalLandedCost: 1020,
    },

    // Compliance & Risk Management
    complianceScore: 100,
    certificationStatus: "Fully Compliant",
    exceptions: [
      { type: "Weather Delays", percentage: 35, count: 7 },
      { type: "Border Holds", percentage: 30, count: 6 },
      { type: "Traffic Incidents", percentage: 25, count: 5 },
      { type: "Documentation Issues", percentage: 10, count: 2 },
    ],

    // ESG & Sustainability
    scope3Emissions: [
      { month: "January", emissions: 15420 },
      { month: "February", emissions: 16850 },
      { month: "March", emissions: 18200 },
      { month: "April", emissions: 17950 },
    ],
    carbonIntensity: {
      tonnesPerKm: 0.142,
      industryAverage: 0.185,
      improvement: "23.2%",
    },
    greenRoutingSavings: {
      co2Saved: 2847,
      costSavings: 18950,
      fleetUtilization: "94.2%",
    },
  };

  return NextResponse.json(reportsData);
}
