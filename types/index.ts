// Shipment related types
export interface Shipment {
  id: string;
  shipment_number: string;
  origin: Location;
  destination: Location;
  status: "in_transit" | "delivered" | "customs" | "delayed";
  current_location: Location;
  eta: string;
  driver_name: string;
  driver_phone: string;
  temperature?: number;
  speed?: number;
  route_distance_km: number;
  co2_emissions: number;
  created_at: string;
  documents: Document[];
}

export interface Location {
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  timestamp?: string;
}

// Document types
export interface Document {
  id: string;
  shipment_id: string;
  type: "commercial_invoice" | "bill_of_lading" | "certificate_of_origin" | "customs_form";
  name: string;
  status: "verified" | "pending" | "rejected";
  url: string;
  uploaded_at: string;
}

// ESG Data
export interface ESGData {
  id: string;
  month: string;
  total_distance_km: number;
  co2_emissions: number;
  traditional_carrier_co2: number;
  emissions_saved: number;
  savings_percentage: number;
}

// Chat / AGI types
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  function_call?: FunctionCall;
}

export interface FunctionCall {
  name: string;
  arguments: Record<string, unknown>;
  result?: unknown;
}

// User types
export interface User {
  id: string;
  email: string;
  company_name: string;
  role: "admin" | "user";
  created_at: string;
}
