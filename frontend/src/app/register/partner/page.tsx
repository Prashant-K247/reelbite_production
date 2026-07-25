"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPartner() {
  const [partnername, setPartnername] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/partner/register", { partnername, email, contactNumber, address, password });
      router.push("/login");
    } catch (err) {
      alert("Partner Registration failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10">
      <form onSubmit={handleRegister} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Register Food Partner</h1>
        <input type="text" placeholder="Restaurant/Partner Name" value={partnername} onChange={(e) => setPartnername(e.target.value)} className="w-full p-3 border rounded-lg" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg" required />
        <input type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} className="w-full p-3 border rounded-lg" required />
        <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-3 border rounded-lg" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg" required />
        <button type="submit" className="w-full p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700">Register Partner</button>
      </form>
    </div>
  );
}