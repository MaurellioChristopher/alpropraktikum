import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F0F2F6] dark:bg-[#070312] font-sans selection:bg-purple-600 selection:text-white transition-colors duration-300 p-2 sm:p-4 lg:p-6">
      <div className="max-w-[1680px] w-full mx-auto">
        {children}
      </div>
    </div>
  );
}
