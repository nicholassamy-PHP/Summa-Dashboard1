import Anthropic from "@anthropic-ai/sdk";
import { mockShipments, mockESGData } from "./mock-data";
import { Message } from "@/types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Tool definitions for Claude
export const tools: Anthropic.Tool[] = [
  {
    name: "get_shipment_status",
    description: "Get the current status of a shipment by shipment ID or shipment number",
    input_schema: {
      type: "object" as const,
      properties: {
        shipment_id: {
          type: "string",
          description: "The shipment ID (e.g., 'ship_001') or shipment number (e.g., '#459')",
        },
      },
      required: ["shipment_id"],
    },
  },
  {
    name: "get_esg_data",
    description: "Get ESG (Environmental, Social, Governance) data for a specific month or all months",
    input_schema: {
      type: "object" as const,
      properties: {
        month: {
          type: "string",
          description: "The month to retrieve data for (e.g., 'Apr'). If not provided, returns all months.",
        },
      },
      required: [],
    },
  },
  {
    name: "check_compliance_risks",
    description: "Check for any compliance risks in upcoming border crossings",
    input_schema: {
      type: "object" as const,
      properties: {
        shipment_id: {
          type: "string",
          description: "The shipment ID to check for compliance risks",
        },
      },
      required: ["shipment_id"],
    },
  },
  {
    name: "get_all_shipments",
    description: "Get a list of all active shipments",
    input_schema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
];

// Function implementations
function getShipmentStatus(shipmentId: string): string {
  const shipment = mockShipments.find(
    (s) => s.id === shipmentId || s.shipment_number === shipmentId
  );
  if (!shipment) {
    return `Shipment ${shipmentId} not found.`;
  }
  return JSON.stringify({
    shipment_number: shipment.shipment_number,
    status: shipment.status,
    current_location: shipment.current_location,
    eta: shipment.eta,
    driver_name: shipment.driver_name,
    documents_verified: shipment.documents.every((d) => d.status === "verified"),
  });
}

function getESGData(month?: string): string {
  if (month) {
    const data = mockESGData.find((d) => d.month === month);
    if (!data) return `No ESG data found for ${month}`;
    return JSON.stringify(data);
  }
  return JSON.stringify(mockESGData);
}

function checkComplianceRisks(shipmentId: string): string {
  const shipment = mockShipments.find(
    (s) => s.id === shipmentId || s.shipment_number === shipmentId
  );
  if (!shipment) {
    return `Shipment ${shipmentId} not found.`;
  }
  const allDocsVerified = shipment.documents.every((d) => d.status === "verified");
  return JSON.stringify({
    shipment_number: shipment.shipment_number,
    has_risks: !allDocsVerified,
    compliance_status: allDocsVerified ? "Customs Cleared" : "Pending Verification",
    documents: shipment.documents.map((d) => ({ name: d.name, status: d.status })),
  });
}

function getAllShipments(): string {
  return JSON.stringify(
    mockShipments.map((s) => ({
      shipment_number: s.shipment_number,
      status: s.status,
      origin: `${s.origin.city}, ${s.origin.country}`,
      destination: `${s.destination.city}, ${s.destination.country}`,
      eta: s.eta,
    }))
  );
}

// Process tool calls
function processToolCall(toolName: string, toolInput: Record<string, string>): string {
  switch (toolName) {
    case "get_shipment_status":
      return getShipmentStatus(toolInput.shipment_id);
    case "get_esg_data":
      return getESGData(toolInput.month);
    case "check_compliance_risks":
      return checkComplianceRisks(toolInput.shipment_id);
    case "get_all_shipments":
      return getAllShipments();
    default:
      return `Unknown tool: ${toolName}`;
  }
}

// Main chat function with Claude
export async function chatWithClaude(userMessage: string): Promise<string> {
  const messages: Anthropic.MessageParam[] = [
    {
      role: "user",
      content: userMessage,
    },
  ];

  const systemPrompt = `You are the Summa Logistics Supply Chain Copilot, an expert AI assistant for managing cross-border logistics between Mexico, the US, and Canada. You have access to real-time shipment tracking, ESG data, and compliance information.

Your role is to:
1. Answer questions about shipment status and locations
2. Provide ESG/sustainability insights
3. Highlight any compliance risks
4. Suggest optimizations based on the available data

Be concise, professional, and always provide specific data when available. Use the tools available to you to fetch real-time information.`;

  let response = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: systemPrompt,
    tools: tools,
    messages: messages,
  });

  // Handle tool use in an agentic loop
  while (response.stop_reason === "tool_use") {
    const toolUseBlocks = response.content.filter(
      (block) => block.type === "tool_use"
    );

    const toolResults: Anthropic.MessageParam[] = [];

    for (const toolUse of toolUseBlocks) {
      if (toolUse.type === "tool_use") {
        const toolResult = processToolCall(
          toolUse.name,
          toolUse.input as Record<string, string>
        );
        toolResults.push({
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: toolUse.id,
              content: toolResult,
            },
          ],
        });
      }
    }

    // Continue the conversation with tool results
    messages.push({
      role: "assistant",
      content: response.content,
    });

    for (const toolResult of toolResults) {
      messages.push(toolResult);
    }

    response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      tools: tools,
      messages: messages,
    });
  }

  // Extract text response
  const textContent = response.content.find((block) => block.type === "text");
  if (textContent && textContent.type === "text") {
    return textContent.text;
  }

  return "No response generated.";
}
