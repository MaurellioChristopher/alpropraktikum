import { cookies } from "next/headers";
import { DashboardHeader } from "@/components/aureo/dashboard-header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionUser = cookieStore.get("mock_session")?.value || "GWAN";
  const userRole = (cookieStore.get("mock_role")?.value as "ASPRAK" | "KOMDIS" | "SEKBEN") || (sessionUser === "IZIN" ? "KOMDIS" : sessionUser === "LEVI" ? "SEKBEN" : "ASPRAK");

  return (
    <div className="min-h-screen bg-[#F4F6FB] flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      {/* Top Header matching reference */}
      <DashboardHeader assistantCode={sessionUser} currentRole={userRole} />

      {/* Main Content Area */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}
