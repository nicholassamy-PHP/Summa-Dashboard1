"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, FileText, BarChart3, MessageSquare, Settings, Home } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/map", label: "Live Map", icon: MapPin },
  { href: "/dashboard/documents", label: "Document Vault", icon: FileText },
  { href: "/dashboard/esg", label: "ESG Reporting", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-800 text-white border-r border-slate-700 min-h-screen flex flex-col">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-6 border-t border-slate-700">
        <p className="text-xs text-slate-400 mb-2">Logged in as</p>
        <p className="text-sm font-semibold">demo@canadatech.com</p>
      </div>
    </aside>
  );
}
