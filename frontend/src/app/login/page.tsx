// src/app/login/page.tsx
import Link from "next/link";

export default function LoginSelection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-950">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-8">Who are you logging in as?</h1>
        <div className="flex flex-col gap-4">
          <Link href="/login/user" className="w-full p-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Login as User
          </Link>
          <Link href="/login/partner" className="w-full p-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition">
            Login as Food Partner
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p className="mb-2">Don&apos;t have an account?</p>
          <div className="flex justify-center gap-4">
            <Link href="/register/user" className="text-blue-500 hover:underline">User Sign Up</Link>
            <Link href="/register/partner" className="text-orange-500 hover:underline">Partner Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}