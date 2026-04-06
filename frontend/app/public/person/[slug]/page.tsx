import { client } from '@/sanity/client'
import { personBySlugQuery } from '@/sanity/queries'
import TabloidFrame from '@/components/TabloidFrame'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

// In Next.js 15+, params is a Promise
export default async function PersonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // Await the params before using them
  const { slug } = await params
  
  const person = await client.fetch(personBySlugQuery, { slug })

  if (!person) {
    return (
      <div className="p-10 font-mono flex items-center justify-center min-h-screen">
        <span className="border border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          FILE NOT FOUND: 404 // SUBJECT_UNRESOLVED
        </span>
      </div>
    )
  }

  return (
    <main className="max-w-4xl mx-auto p-6 bg-[#F2F2F2] min-h-screen selection:bg-[#FF3E00] selection:text-white">
      <TabloidFrame title={person.name} label="Subject Dossier">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Sidebar: Visual & Meta */}
          <div className="md:col-span-1">
            {person.image && (
              <div className="border-2 border-black p-1 bg-white grayscale hover:grayscale-0 transition-all duration-500 shadow-sm">
                <Image 
                  src={urlFor(person.image).width(400).height(500).fit('max').url()} 
                  alt={person.name} 
                  width={400} 
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              {person.roles?.map((role: string) => (
                <span key={role} className="border border-black px-2 py-1 text-[10px] font-mono lowercase bg-white tracking-tighter">
                  #{role}
                </span>
              ))}
            </div>
          </div>
          
          {/* Main Content: Narrative & Intel */}
          <div className="md:col-span-2 space-y-6">
            <div className="relative">
              <span className="absolute -top-4 -left-2 text-4xl text-gray-300 font-serif">"</span>
              <p className="font-serif italic leading-snug text-xl pt-2 relative z-10">
                {person.bio}
              </p>
            </div>
            
            <div className="border-t-2 border-black pt-6">
              <h3 className="font-bold uppercase text-xs tracking-widest mb-4 flex items-center">
                <span className="w-2 h-2 bg-black mr-2"></span>
                Linked Connections
              </h3>
              <ul className="space-y-3 font-mono text-sm">
                {person.connections?.map((link: any) => (
                  <li key={link.url} className="group">
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#FF3E00] flex items-center group-hover:translate-x-1 transition-transform"
                    >
                      <span className="mr-2">[{link.label}]</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </TabloidFrame>
    </main>
  )
}