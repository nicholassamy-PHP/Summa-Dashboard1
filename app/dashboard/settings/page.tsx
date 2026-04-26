"use client";

export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="max-w-2xl space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value="demo@canadatech.com"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value="Summa Logistics"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-gray-700">Shipment status updates</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-gray-700">Compliance alerts</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-gray-700">ESG reports</span>
            </label>
          </div>
        </div>

        {/* API Keys */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">API Access</h2>
          <p className="text-sm text-gray-600 mb-4">
            API keys and integrations coming soon
          </p>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold cursor-not-allowed">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}
