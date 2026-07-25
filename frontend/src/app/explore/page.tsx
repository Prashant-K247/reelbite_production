
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Heart } from "lucide-react";

export default function ExplorePage() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Check if user is logged in
        const meRes = await api.get("/auth/me");
        if (meRes.data.type === "partner") {
          router.push("/dashboard");
          return;
        }

        // 2. Fetch all reels
        const res = await api.get("/food/reels");
        setFoodItems(res.data.foodItem || []);
        setLoading(false);
      } catch (err) {
        router.push("/login");
      }
    };

    fetchData();
  }, [router]);

  // Live Search Filter Logic
  const filteredItems = foodItems.filter((food: any) => {
    const searchTerm = search.toLowerCase();
    const nameMatch = food.name?.toLowerCase().includes(searchTerm);
    const descMatch = food.description?.toLowerCase().includes(searchTerm);
    const partnerMatch = food.partner?.partnername?.toLowerCase().includes(searchTerm);
    return nameMatch || descMatch || partnerMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-10">
      
      {/* Top Nav */}
      <div className="flex justify-between items-center p-4 sticky top-0 bg-black z-50 border-b border-gray-800">
        <h1 className="text-xl font-bold">Explore</h1>
        <Link href="/dashboard/user" className="text-sm bg-gray-800 px-3 py-1.5 rounded-full">
          Profile
        </Link>
      </div>

      {/* Search Bar */}
      <div className="p-4 sticky top-14.25 bg-black z-40">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search food or restaurant..." 
            className="w-full bg-gray-900 text-white pl-10 pr-4 py-2.5 rounded-full outline-none focus:ring-1 focus:ring-gray-700"
          />
        </div>
      </div>

      {/* Reels Grid */}
      <div className="grid grid-cols-3 gap-1 px-1">
        {filteredItems.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500 mt-10">
            No reels found.
          </div>
        ) : (
          filteredItems.map((food: any) => (
            <div 
              key={food._id} 
              onClick={() => router.push(`/reels?start=${food._id}`)} 
              className="relative aspect-9/16 bg-gray-900 cursor-pointer group"
            >
              <video 
                src={food.video} 
                muted 
                playsInline 
                className="w-full h-full object-cover group-hover:opacity-80 transition"
              />
              <div className="absolute bottom-0 left-0 p-2 bg-linear-to-t from-black/70 to-transparent w-full">
                <p className="text-xs font-semibold truncate">{food.name}</p>
                <p className="text-[10px] flex items-center gap-1 text-gray-300">
                  <Heart className="w-3 h-3" /> {food.likeCount || 0}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}