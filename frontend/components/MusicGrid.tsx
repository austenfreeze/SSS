import { SiSpotify, SiApplemusic, SiYoutube } from "react-icons/si";

export default function MusicGrid({ items }: { items: any[] }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {items?.map((item, i) => (
        <div key={i} className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-2">
                {item.platform === 'spotify' && <SiSpotify />}
                {item.platform === 'apple-music' && <SiApplemusic />}
                {item.platform === 'youtube-music' && <SiYoutube />}
                <span className="font-mono text-[10px] font-bold uppercase">{item.contentType}</span>
             </div>
          </div>
          <h4 className="font-black italic uppercase text-lg mb-2">{item.title}</h4>
          {item.embedCode ? (
            <div 
              className="grayscale hover:grayscale-0 transition-all border border-black" 
              dangerouslySetInnerHTML={{ __html: item.embedCode }} 
            />
          ) : (
            <a href={item.url} className="text-xs font-mono underline text-[#FF3E00]">LINK_OUT →</a>
          )}
        </div>
      ))}
    </div>
  )
}