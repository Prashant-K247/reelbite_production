// src/app/reels/page.tsx
"use client";
import { useEffect, useState, Suspense } from "react"; // Added Suspense here
import api from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ReelCard from "@/components/ReelCard";

// 1. Move all the logic into a separate inner component
function ReelsFeedContent() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const startId = searchParams.get("start");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meRes = await api.get("/auth/me");
        if (meRes.data.type === "partner") {
          router.push("/dashboard");
          return;
        }

        const res = await api.get("/food/reels");
        setFoodItems(res.data.foodItem || []);
        setLoading(false);
      } catch (err) {
        router.push("/login");
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    if (!loading && startId) {
      const timer = setTimeout(() => {
        const element = document.getElementById(`reel-${startId}`);
        if (element) {
          element.scrollIntoView({ behavior: "auto", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, startId]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center text-white">
        Loading reels...
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black overflow-y-auto snap-y snap-mandatory flex flex-col items-center">
      
      {/* Back to Explore Button */}
      <Link 
        href="/explore" 
        className="fixed top-4 left-4 z-50 bg-gray-800/80 text-white p-2 rounded-full hover:bg-gray-700 transition text-sm px-4"
      >
        ← Explore
      </Link>

      {foodItems.length === 0 ? (
        <div className="flex items-center justify-center h-full text-white">
          No reels available yet.
        </div>
      ) : (
        foodItems.map((food: any) => (
          <div key={food._id} id={`reel-${food._id}`} className="h-screen w-full flex items-center justify-center snap-start shrink-0">
            <ReelCard food={food} />
          </div>
        ))
      )}
    </div>
  );
}

// 2. Export the default component wrapped in Suspense
export default function ReelsFeed() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    }>
      <ReelsFeedContent />
    </Suspense>
  );
}