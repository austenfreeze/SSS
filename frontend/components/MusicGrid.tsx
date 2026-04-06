export default function MusicGrid({ items }: { items: any[] }) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {items?.map((item: any) => (
        <a 
          key={item.url} 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex justify-between items-center border border-black p-3 bg-white hover:bg-[#FF3E00] hover:text-white transition-all group"
        >
          <span className="font-mono text-xs uppercase tracking-tighter">
            {item.label || "Audio Stream"}
          </span>
          <span className="text-[10px] font-bold">LINK // 01 →</span>
        </a>
      ))}
    </div>
  );
}