"use client";
import { useEffect, useState } from "react";
import AdminNavigation from "../navbar/AdminNavigation";
import AgentSideBar from "../sidebar/AgentSidebar";
import BuyerSideBar from "../sidebar/BuyerSidebar";
import SideBar from "../sidebar/Sidebar";
import { useRouter } from "next/navigation";
// import SideBar from "../sidebar/Sidebar";
const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("token");
  }
  return null; // Return null or a default value to prevent errors during SSR
};

function AdminLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      // If not authenticated, redirect to login
      router.push("/auth/login");
    } else {
      setLoading(false);
    }
  }, [router]);
  return (
    <div className="real">
      <div className="cont-div">
        <SideBar />
      </div>
      <main className="content">
        <AdminNavigation />
        <div className="p-3">{children}</div>
      </main>
    </div>
  );
}
export default AdminLayout;
