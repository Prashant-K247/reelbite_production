// src/app/login/partner/page.tsx
"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PartnerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/partner/login", { email, password });
      router.push("/dashboard"); // Send partner to dashboard
    } catch (err) {
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 text-gray-950">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-orange-600">Food Partner Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg" required />
          <button type="submit" className="w-full p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700">Login</button>
        </form>
        
        <div className="mt-4 text-center text-sm">
          <Link href="/register/partner" className="text-orange-500 hover:underline">Don&apos;t have an account? Sign Up</Link>
          <br/>
          <Link href="/login" className="text-gray-400 hover:underline text-xs mt-2 inline-block">Back</Link>
        </div>
      </div>
    </div>
  );
}