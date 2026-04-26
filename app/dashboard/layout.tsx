import { Header } from "@/components/common/Header";
import { Sidebar } from "@/components/common/Sidebar";
import { ChatWidget } from "@/components/chat/ChatWidget";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
      <ChatWidget />
    </div>
  );
}
