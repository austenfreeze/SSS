import { ReactNode } from "react";

interface TabloidFrameProps {
  children: ReactNode;
  title?: string;  // Added this
  label?: string;  // Added this
}

export default function TabloidFrame({ children, title, label }: TabloidFrameProps) {
  return (
    <div className="border-2 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-4">
        <span className="font-mono text-[10px] uppercase tracking-widest bg-black text-white px-2 py-0.5">
          {label || "Archive Record"}
        </span>
        <span className="font-mono text-[10px] text-zinc-400">
          Ref: {new Date().getFullYear()}-SSS
        </span>
      </div>
      
      {title && (
        <h2 className="text-3xl font-black italic tracking-tighter mb-6 uppercase border-b border-black pb-4">
          {title}
        </h2>
      )}

      <div className="content">
        {children}
      </div>
    </div>
  );
}