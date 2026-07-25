"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterUser() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/user/register", { fullname, email, password });
      router.push("/login");
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleRegister} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Create User Account</h1>
        <input type="text" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} className="w-full p-3 border rounded-lg" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg" required />
        <button type="submit" className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Register</button>
      </form>
    </div>
  );
}