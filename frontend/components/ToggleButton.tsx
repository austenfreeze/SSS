"use client";
// components/ToggleButton.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ToggleButton({ id, initialState }: { id: string, initialState: boolean }) {
  const [isPublic, setIsPublic] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleToggle() {
    setLoading(true);
    // This calls a Next.js API route we'll create to update Sanity
    const res = await fetch("/api/archive/toggle", {
      method: "POST",
      body: JSON.stringify({ id, isPublic: !isPublic }),
    });

    if (res.ok) {
      setIsPublic(!isPublic);
      router.refresh(); // Updates the UI instantly
    }
    setLoading(false);
  }

  return (
    <button 
      onClick={handleToggle}
      disabled={loading}
      className={`mt-2 w-full py-1 text-[10px] uppercase font-bold rounded transition-colors ${
        isPublic ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-white text-black hover:bg-zinc-200'
      }`}
    >
      {loading ? "Updating..." : isPublic ? "Make Private" : "Go Public"}
    </button>
  );
}