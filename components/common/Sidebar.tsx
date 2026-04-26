"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, FileText, BarChart3, MessageSquare, Settings, Home, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/map", label: "Live Map", icon: MapPin },
  { href: "/dashboard/documents", label: "Document Vault", icon: FileText },
  { href: "/dashboard/esg", label: "ESG Reporting", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`${isOpen ? 'w-72' : 'w-20'} bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white border-r border-gray-700 min-h-screen flex flex-col shadow-2xl transition-all duration-300`}>
      <nav className="flex-1 px-5 py-8 space-y-2">
        <div className="flex items-center justify-between mb-6">
          {isOpen && <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Navigation</p>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              } ${!isOpen ? 'justify-center' : ''}`}
              title={!isOpen ? item.label : ""}
            >
              <Icon size={20} className={isActive ? "text-blue-200" : ""} />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-6 border-t border-gray-700 bg-gray-800/50">
        {isOpen && (
          <>
            <div className="mb-4">
              <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-2">Account</p>
              <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                <p className="text-sm font-semibold text-white">demo@canadatech.com</p>
                <p className="text-xs text-gray-400 mt-1">Administrator</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 text-sm">
              <LogOut size={16} />
              Sign Out
            </button>
          </>
        )}
        {!isOpen && (
          <button className="w-full flex items-center justify-center p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200">
            <LogOut size={18} />
          </button>
        )}
      </div>
    </aside>
  );
}
