// frontend/components/SpotifyPlaylist.tsx
import { urlFor } from '@/sanity/image'

export default function SpotifyPlaylist({ data }: { data: any }) {
  return (
    <div className="border-2 border-black bg-[#F2F2F2] p-4 mb-6 font-mono">
      <div className="flex gap-4 mb-4">
        {data.coverArt && (
          <img 
            src={urlFor(data.coverArt).width(150).url()} 
            className="w-32 h-32 border-2 border-black grayscale shadow-[4px_4px_0_0_#000]"
          />
        )}
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">{data.title}</h2>
          <a href={data.spotifyUrl} className="text-[10px] bg-black text-white px-2 py-1 hover:bg-[#FF3E00]">LAUNCH_PLAYER</a>
        </div>
      </div>
      
      <table className="w-full text-left text-[10px] border-t border-black mt-4">
        <thead>
          <tr className="border-b border-black">
            <th className="py-1 uppercase">Track</th>
            <th className="py-1 uppercase">Album</th>
            <th className="py-1 text-right uppercase">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.tracks?.map((track: any, i: number) => (
            <tr key={i} className="border-b border-black/10 hover:bg-white transition-colors">
              <td className="py-2">
                <span className="font-bold">{track.songTitle}</span><br/>
                <span className="opacity-60">{track.artist}</span>
              </td>
              <td>{track.albumName}</td>
              <td className="text-right">{track.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}