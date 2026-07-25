// src/components/ReelCard.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

export default function ReelCard({ food }: { food: any }) {
  const [likes, setLikes] = useState(food.likeCount || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.intersectionRatio > 0.6) {
              video.play().catch((err) => console.log("Autoplay blocked:", err));
            } else {
              video.pause();
            }
          }
        });
      },
      { threshold: [0, 0.6, 1] }
    );

    observer.observe(video);
    return () => observer.unobserve(video);
  }, []);

  const handleLike = async () => {
    try {
      await api.post("/food/like", { foodId: food._id });
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);
    } catch (err) {
      alert("Login to like");
    }
  };

  const fetchComments = async () => {
    const res = await api.get(`/food/comment/${food._id}`);
    setComments(res.data.comments || []);
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!commentText) return;
    try {
      await api.post("/food/comment", { foodId: food._id, text: commentText });
      setCommentText("");
      fetchComments();
    } catch (err) {
      alert("Login to comment");
    }
  };

  return (
    // Constrained to 9:16 aspect ratio, max height is the screen
    <div className="relative h-full aspect-9/16 max-h-screen max-w-full flex items-center justify-center snap-start bg-black sm:rounded-xl overflow-hidden">
      
      {/* Video */}
      <video 
        ref={videoRef} 
        src={food.video} 
        loop 
        muted 
        playsInline 
        className="h-full w-full object-cover" 
      />
      
      {/* Overlay UI */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-black/80 to-transparent text-white">
        <h2 className="text-xl font-bold">{food.name}</h2>
        <p className="mt-1 text-gray-200 line-clamp-2">{food.description}</p>
        <Link href={`/partner/${food.partner._id}`} className="mt-4 inline-block bg-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-orange-600">
          Order Now
        </Link>
      </div>

      {/* Right Side Icons */}
      <div className="absolute bottom-24 right-3 flex flex-col gap-6 items-center text-white">
        <button onClick={handleLike} className="flex flex-col items-center">
          <Heart fill={isLiked ? "red" : "transparent"} className="w-8 h-8" />
          <span className="text-sm">{likes}</span>
        </button>
        <button onClick={() => { setShowComments(!showComments); if(!showComments) fetchComments(); }} className="flex flex-col items-center">
          <MessageCircle className="w-8 h-8" />
          <span className="text-sm">Comments</span>
        </button>
      </div>

      {/* Invisible Overlay */}
      {showComments && (
        <div className="absolute inset-0 z-10" onClick={() => setShowComments(false)} />
      )}

      {/* Comments Modal */}
      {showComments && (
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black/90 text-white p-4 overflow-y-auto rounded-t-2xl z-20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Comments</h3>
            <button onClick={() => setShowComments(false)} className="text-gray-400 text-sm hover:text-white">Close</button>
          </div>
          
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm text-center mt-4">No comments yet. Be the first!</p>
          ) : (
            comments.map((c: any) => (
              <div key={c._id} className="mb-3">
                <span className="font-semibold text-gray-400">{c.user?.fullname || "User"}: </span>
                <span>{c.text}</span>
              </div>
            ))
          )}
          
          <form onSubmit={handleComment} className="mt-4 flex gap-2 sticky bottom-0 left-0 w-full pb-2 bg-black/90">
            <input 
              value={commentText} 
              onChange={(e) => setCommentText(e.target.value)} 
              placeholder="Add a comment..." 
              className="flex-1 p-2 rounded bg-gray-800 text-white outline-none" 
            />
            <button type="submit" className="bg-blue-500 px-4 rounded">Post</button>
          </form>
        </div>
      )}
    </div>
  );
}