"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

export function ArchivalHeader() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <header className="h-20 bg-black border-b border-zinc-900" />;

  return (
    <header className="flex justify-end items-center p-6 gap-6 h-20 border-b border-zinc-900 bg-black">
      {!isSignedIn ? (
        <SignInButton mode="modal">
          <button className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-all cursor-pointer font-mono">
            [ System Login ]
          </button>
        </SignInButton>
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-[9px] text-zinc-700 uppercase tracking-widest font-mono italic">Session Active</span>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "h-8 w-8 border border-zinc-800 rounded-none hover:border-zinc-400 transition-all"
              }
            }}
          />
        </div>
      )}
    </header>
  );
}