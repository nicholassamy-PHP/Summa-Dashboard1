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
  const gradients = {
    blue: "from-blue-50 to-blue-100 border-blue-200",
    green: "from-green-50 to-emerald-100 border-green-200",
    amber: "from-amber-50 to-orange-100 border-amber-200",
    red: "from-red-50 to-rose-100 border-red-200",
  };

  const iconBgClasses = {
    blue: "bg-blue-200 text-blue-700",
    green: "bg-green-200 text-green-700",
    amber: "bg-amber-200 text-amber-700",
    red: "bg-red-200 text-red-700",
  };

  const valueColorClasses = {
    blue: "text-blue-700",
    green: "text-green-700",
    amber: "text-amber-700",
    red: "text-red-700",
  };

  return (
    <div className={`rounded-2xl bg-gradient-to-br ${gradients[color]} border-2 p-6 shadow-md hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{title}</p>
          <p className={`text-4xl font-bold mt-3 ${valueColorClasses[color]}`}>{value}</p>
          {subtitle && <p className="text-sm text-slate-600 mt-2 font-medium">{subtitle}</p>}
        </div>
        {icon && (
          <div className={`${iconBgClasses[color]} p-4 rounded-xl text-2xl shadow-md`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
