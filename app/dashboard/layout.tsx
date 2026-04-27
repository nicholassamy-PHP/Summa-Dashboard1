"use client";

import { Header } from "@/components/common/Header";
import { Sidebar } from "@/components/common/Sidebar";
import { SidebarProvider, useSidebar } from "@/lib/sidebar-context";

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebar();

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`${isOpen ? 'w-72' : 'w-16'} transition-all duration-300`}>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}
