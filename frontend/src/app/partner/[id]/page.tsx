"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PartnerProfile() {
  const { id } = useParams();
  const [partner, setPartner] = useState<any>(null);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await api.get(`/partner/${id}`);
        setPartner(res.data.foodpartner);
      } catch (err) {
        console.error("Failed to fetch partner");
      }
    };
    if (id) fetchPartner();
  }, [id]);

  if (!partner) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-950" >
      
      <div className="bg-white shadow-sm p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold">{partner.partnername}</h1>
        <p className="text-gray-600 mt-2">📞 {partner.contactNumber}</p>
        <p className="text-gray-600">📍 {partner.address}</p>
        
        {/* Show Dashboard Button if the logged-in user is the owner */}
        {partner.isOwner && (
          <Link href="/dashboard" className="mt-4 bg-black text-white px-6 py-2 rounded-full">
            Go to Dashboard
          </Link>
        )}
      </div>

      {/* Reels Grid */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {partner.foodItem?.map((food: any) => (
          <div key={food._id} className="aspect-9/16 bg-black rounded-xl overflow-hidden relative">
            <video src={food.video} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 p-2 bg-linear-to-t from-black to-transparent w-full">
              <p className="text-white text-sm font-semibold">{food.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}