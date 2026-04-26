"use client";

export function Header() {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
            S
          </div>
          <h1 className="text-xl font-bold">Summa Logistics</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>System Status: Healthy</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg">
            <span className="text-sm">Active Shipments:</span>
            <span className="font-bold text-lg">2</span>
          </div>

          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-600">
            <span className="text-sm font-semibold">U</span>
          </div>
        </div>
      </div>
    </header>
  );
}
