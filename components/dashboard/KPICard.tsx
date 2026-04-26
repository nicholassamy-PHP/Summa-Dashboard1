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
  const accentColors = {
    blue: "text-blue-400 border-blue-500/30",
    green: "text-green-400 border-green-500/30",
    amber: "text-amber-400 border-amber-500/30",
    red: "text-red-400 border-red-500/30",
  };

  const iconColors = {
    blue: "text-blue-400",
    green: "text-green-400",
    amber: "text-amber-400",
    red: "text-red-400",
  };

  return (
    <div className={`card-premium border-l-4 ${accentColors[color]} p-8 group hover:border-opacity-100 transition-all`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest letter-spacing">{title}</p>
          <p className={`kpi-value mt-4 ${accentColors[color].split(' ')[0]}`}>{value}</p>
          {subtitle && (
            <p className="text-sm text-slate-400 mt-3 font-medium">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className={`${iconColors[color]} text-4xl opacity-80 group-hover:opacity-100 transition-opacity`}>
            {icon}
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Last updated</span>
          <span className="text-slate-400">Just now</span>
        </div>
      </div>
    </div>
  );
}
