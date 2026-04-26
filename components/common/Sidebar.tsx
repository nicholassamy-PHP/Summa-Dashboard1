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
    <aside className={`${isOpen ? 'w-72' : 'w-16'} bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white border-r border-gray-700 min-h-screen flex flex-col shadow-2xl transition-all duration-300`}>
      {/* Toggle Button */}
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full p-2 hover:bg-gray-700 rounded-lg transition-colors flex items-center ${isOpen ? 'justify-end' : 'justify-center'}`}
          title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {!isOpen && <div className="text-xs text-gray-500 text-center mb-4 font-semibold">MENU</div>}
        {isOpen && <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-4">Navigation</p>}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center ${isOpen ? 'gap-3 px-4 py-3' : 'gap-0 px-2 py-3 justify-center'} rounded-xl transition-all duration-200 relative group ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              title={!isOpen ? item.label : ""}
            >
              <Icon size={isOpen ? 20 : 24} className={isActive ? "text-blue-200" : ""} />
              {isOpen && <span className="font-medium text-sm">{item.label}</span>}

              {/* Tooltip for collapsed state */}
              {!isOpen && (
                <div className="absolute left-20 opacity-0 group-hover:opacity-100 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none transition-opacity duration-200 border border-gray-700 z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className={`border-t border-gray-700 bg-gray-800/50 ${isOpen ? 'px-3 py-4' : 'px-2 py-4'}`}>
        {isOpen && (
          <>
            <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-3">Account</p>
            <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600 mb-4">
              <p className="text-sm font-semibold text-white">demo@canadatech.com</p>
              <p className="text-xs text-gray-400 mt-1">Administrator</p>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 text-sm">
              <LogOut size={16} />
              Sign Out
            </button>
          </>
        )}
        {!isOpen && (
          <button className="w-full flex items-center justify-center p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 group relative" title="Sign Out">
            <LogOut size={20} />
            <div className="absolute left-20 opacity-0 group-hover:opacity-100 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none transition-opacity duration-200 border border-gray-700 z-50">
              Sign Out
            </div>
          </button>
        )}
      </div>
    </aside>
  );
}
