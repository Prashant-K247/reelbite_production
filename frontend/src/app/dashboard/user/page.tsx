
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const meRes = await api.get("/auth/me");
        
        if (meRes.data.type === "partner") {
          router.push("/dashboard");
          return;
        }
        
        setUser(meRes.data.user);
        setLoading(false);
      } catch (error) {

        router.push("/login");
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await api.get("/auth/user/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Profile Info Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center gap-6">
            {/* Fake Avatar */}
            <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-bold uppercase">
              {user?.fullname?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user?.fullname}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/explore" className="bg-black text-white p-6 rounded-lg shadow-sm hover:bg-gray-800 transition flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Browse Reels</h3>
              <p className="text-gray-400 text-sm mt-1">Watch & discover food</p>
            </div>
            <span className="text-2xl">→</span>
          </Link>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">Account Settings</h3>
            <p className="text-gray-500 text-sm mt-1">Update your profile (Coming soon)</p>
          </div>
        </div>

      </div>
    </div>
  );
}