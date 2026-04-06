import { SiSpotify, SiApplemusic, SiYoutube } from "react-icons/si";

export const getBrandMeta = (platform: string) => {
  switch (platform) {
    case 'spotify': return { icon: <SiSpotify />, color: '#1DB954' };
    case 'apple-music': return { icon: <SiApplemusic />, color: '#FC3C44' };
    case 'youtube-music': return { icon: <SiYoutube />, color: '#FF0000' };
    default: return { icon: null, color: '#000' };
  }
};

export function MusicCard({ item }: { item: any }) {
  const { icon } = getBrandMeta(item.platform);
  
  return (
    <div className="border border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-mono text-[10px] font-bold uppercase">{item.contentType}</span>
        </div>
        <a href={item.url} target="_blank" className="text-[10px] underline uppercase">Open →</a>
      </div>
      <h3 className="font-black italic uppercase leading-tight mb-4">{item.title}</h3>
      {item.embedCode && (
        <div 
          className="aspect-video border border-slate-200 grayscale hover:grayscale-0 transition-all"
          dangerouslySetInnerHTML={{ __html: item.embedCode }} 
        />
      )}
    </div>
  );
}