"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [partner, setPartner] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Check who is logged in
        const meRes = await api.get("/auth/me");
        
        // If it's not a partner, kick them out
        if (meRes.data.type !== "partner") {
          router.push("/reels");
          return;
        }

        const partnerId = meRes.data.foodpartner.id;

        // 2. Fetch full partner profile and their reels
        const partnerRes = await api.get(`/partner/${partnerId}`);
        setPartner(partnerRes.data.foodpartner);
        setLoading(false);
      } catch (error) {
        // If token is missing/invalid, redirect to login
        console.error("Not authenticated", error);
        router.push("/login");
      }
    };

    fetchDashboardData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await api.get("/auth/partner/logout");
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Partner Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/upload" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Upload Reel
            </Link>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
              Logout
            </button>
          </div>
        </div>

        {/* Profile Info Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Profile Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Restaurant Name</p>
              <p className="font-medium text-lg">{partner?.partnername || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Contact Number</p>
              <p className="font-medium text-lg">{partner?.contactNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium text-lg">{partner?.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Address</p>
              <p className="font-medium text-lg">{partner?.address || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Reels Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Reels</h2>
          
          {partner?.foodItem && partner.foodItem.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {partner.foodItem.map((food: any) => (
                <div key={food._id} className="aspect-9/16 bg-black rounded-xl overflow-hidden relative group">
                  <video 
                    src={food.video} 
                    className="w-full h-full object-cover" 
                    controls={false}
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                  <div className="absolute bottom-0 left-0 p-3 bg-linear-to-t from-black/90 to-transparent w-full">
                    <p className="text-white text-sm font-semibold">{food.name}</p>
                    <p className="text-gray-300 text-xs line-clamp-1">{food.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-gray-300 text-xs">
                      <span>❤️ {food.likeCount || 0} Likes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-500 mb-4">You haven't uploaded any reels yet.</p>
              <Link href="/upload" className="text-blue-600 font-medium hover:underline">
                Click here to upload your first food reel!
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}