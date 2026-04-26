"use client";

import { Document } from "@/types";
import { Download, CheckCircle, AlertCircle, FileText } from "lucide-react";

interface DocumentVaultProps {
  documents: Document[];
}

export function DocumentVault({ documents }: DocumentVaultProps) {
  const documentTypeLabels = {
    commercial_invoice: "Commercial Invoice",
    bill_of_lading: "Bill of Lading",
    certificate_of_origin: "USMCA Certificate of Origin",
    customs_form: "Customs Form",
  };

  const allVerified = documents.every((d) => d.status === "verified");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Documents</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold">
          Download Zip
        </button>
      </div>

      {allVerified && (
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="text-green-600" size={24} />
          <div>
            <p className="font-semibold text-green-900">Status: Verified</p>
            <p className="text-sm text-green-700">All customs documents cleared</p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="text-gray-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-600">
                  {documentTypeLabels[doc.type]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {doc.status === "verified" ? (
                  <>
                    <CheckCircle className="text-green-600" size={20} />
                    <span className="text-sm font-semibold text-green-600">
                      Verified
                    </span>
                  </>
                ) : doc.status === "pending" ? (
                  <>
                    <AlertCircle className="text-amber-600" size={20} />
                    <span className="text-sm font-semibold text-amber-600">
                      Pending
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="text-red-600" size={20} />
                    <span className="text-sm font-semibold text-red-600">
                      Rejected
                    </span>
                  </>
                )}
              </div>

              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="text-gray-600" size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
