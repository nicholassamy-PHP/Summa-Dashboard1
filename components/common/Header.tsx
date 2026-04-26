"use client";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-b border-blue-800 shadow-lg">
      <div className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
            S
          </div>
          <div>
            <h1 className="text-2xl font-bold">Summa Logistics</h1>
            <p className="text-blue-100 text-xs">Supply Chain Management Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-sm font-medium border border-white/20 hover:bg-white/20 transition-all">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            <span>System: Healthy</span>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <span className="text-sm font-medium">Active:</span>
            <span className="text-lg font-bold bg-green-400/30 px-2 py-1 rounded">2</span>
          </div>

          <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all shadow-lg border border-white/20">
            <span className="text-sm font-bold">U</span>
          </div>
        </div>
      </div>
    </header>
  );
}
