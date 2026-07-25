"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function UploadReel() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!video) return alert("Please select a video");

    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", video);

    try {
      await api.post("/food", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Reel uploaded successfully!");
      router.push("/dashboard");
    } catch (err) {
      alert("Upload failed. Make sure you are logged in as a partner.");
      setLoading(false); // Stop loading if it fails so they can try again
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleUpload} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Upload Food Reel</h1>
        
        <input 
          type="text" 
          placeholder="Food Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          disabled={loading}
          className="w-full p-3 border rounded-lg disabled:bg-gray-100" 
          required 
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          disabled={loading}
          className="w-full p-3 border rounded-lg disabled:bg-gray-100" 
          required 
        />
        
        <div>
          <label className="block mb-2 font-medium">Video File</label>
          <input 
            type="file" 
            accept="video/*" 
            onChange={(e) => setVideo(e.target.files?.[0] || null)} 
            disabled={loading}
            className="w-full p-2 border rounded-lg disabled:bg-gray-100" 
            required 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className={`w-full p-3 text-white rounded-lg flex items-center justify-center gap-2 transition 
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {loading ? (
            <>
              {/* Spinner Icon */}
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            "Upload"
          )}
        </button>
      </form>
    </div>
  );
}