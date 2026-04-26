"use client";

import { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  color?: "blue" | "green" | "amber" | "red";
}

export function KPICard({ title, value, subtitle, icon, color = "blue" }: KPICardProps) {
  const colorClasses = {
    blue: "border-blue-500 bg-blue-50",
    green: "border-green-500 bg-green-50",
    amber: "border-amber-500 bg-amber-50",
    red: "border-red-500 bg-red-50",
  };

  const iconColorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    amber: "text-amber-600",
    red: "text-red-600",
  };

  return (
    <div className={`rounded-lg border-2 ${colorClasses[color]} p-6`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-600 font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2 text-slate-900">{value}</p>
          {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
        </div>
        {icon && <div className={`text-3xl ${iconColorClasses[color]}`}>{icon}</div>}
      </div>
    </div>
  );
}
