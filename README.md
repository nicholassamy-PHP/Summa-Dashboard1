# Summa Logistics Dashboard

A high-fidelity MVP supply chain management platform for cross-border logistics between Mexico, the US, and Canada. Built with Next.js, TypeScript, and Claude AI.

## Features

- 🗺️ **Live Tracking Map** - Real-time shipment location tracking with visual routes
- 📦 **Shipment Management** - Monitor active shipments with detailed status information
- 📄 **USMCA Document Vault** - Manage and verify customs documents
- 🌱 **ESG Reporting** - Track carbon emissions and sustainability metrics
- 🤖 **AI Copilot** - Claude-powered supply chain assistant with function calling
- 📊 **Analytics Dashboard** - KPIs and metrics at a glance

## Tech Stack

- **Frontend**: Next.js 16 with TypeScript and Tailwind CSS
- **AI/LLM**: Claude 3.5 Sonnet with Function Calling
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Maps**: Mapbox GL JS (future integration)
- **Database**: Supabase (ready for integration)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd summa-dashboard1
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
cp .env.example .env.local
```

4. Add your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-...
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Login

Email: `demo@canadatech.com`

## Project Structure

```
.
├── app/
│   ├── api/                 # API routes (chat, shipments, ESG data)
│   ├── dashboard/           # Main dashboard pages
│   │   ├── map/            # Live tracking map
│   │   ├── documents/      # Document vault
│   │   ├── esg/            # ESG reporting
│   │   └── settings/       # Settings page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (redirects to dashboard)
│   └── globals.css         # Global styles
├── components/
│   ├── common/             # Reusable components (Header, Sidebar)
│   ├── dashboard/          # Dashboard components (KPI cards, shipment cards)
│   ├── chat/               # AI chat widget
│   ├── documents/          # Document vault component
│   ├── esg/                # ESG chart component
│   └── map/                # Map component
├── lib/
│   ├── claude-agent.ts     # Claude AI integration with tools
│   └── mock-data.ts        # Sample data for demo
├── types/
│   └── index.ts            # TypeScript type definitions
└── public/                 # Static assets
```

## Key Features Explained

### AI Supply Chain Copilot

The dashboard includes an AI-powered copilot that can:
- **Check shipment status** - Query any shipment by ID or number
- **Analyze ESG metrics** - Provide carbon emissions insights
- **Verify compliance** - Check customs document status
- **Generate reports** - Summarize data across shipments

Ask the copilot:
- "Where is shipment #459?"
- "Do I have any compliance risks for tomorrow's border crossing?"
- "What were my total carbon emissions for April?"

### Live Tracking Map

Visualize all active shipments with:
- Origin and destination markers
- Current location of trucks (with pulsing indicator)
- Route visualization
- Shipment details on hover

### Document Vault

Manage USMCA customs documents:
- Commercial Invoices
- Bills of Lading
- Certificates of Origin
- Customs Forms
- Status indicators (Verified, Pending, Rejected)
- Batch download capability

### ESG Reporting

Track environmental impact:
- Monthly CO2 emissions data
- Comparison with traditional carriers
- Emissions savings percentage
- Distance and efficiency metrics

## Environment Variables

```
ANTHROPIC_API_KEY      # Required: Your Anthropic API key
NEXT_PUBLIC_SUPABASE_URL    # Optional: Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY   # Optional: Supabase anonymous key
NEXT_PUBLIC_MAPBOX_TOKEN    # Optional: Mapbox access token
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Netlify (Recommended)

1. Push code to GitHub
2. Connect repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy!

```
Build command: npm run build
Publish directory: .next
```

## Contributing

This is a demo/MVP project. For questions or suggestions, contact the development team.

## License

ISC

## Support

For questions about the Summa Logistics Dashboard, please contact support.
