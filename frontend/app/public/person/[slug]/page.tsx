import { client } from '@/sanity/client'
import { personBySlugQuery } from '@/sanity/queries'
import TabloidFrame from '@/components/TabloidFrame'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

export default async function PersonPage({ params }: { params: { slug: string } }) {
  const person = await client.fetch(personBySlugQuery, { slug: params.slug })

  if (!person) return <div className="p-10 font-mono">FILE NOT FOUND: 404</div>

  return (
    <main className="max-w-4xl mx-auto p-6 bg-[#F2F2F2] min-h-screen">
      <TabloidFrame title={person.name} label="Subject Dossier">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            {person.image && (
              <div className="border-2 border-black p-1 bg-white grayscale hover:grayscale-0 transition-all">
                <Image 
                  src={urlFor(person.image).width(400).url()} 
                  alt={person.name} 
                  width={400} 
                  height={400}
                />
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {person.roles?.map((role: string) => (
                <span key={role} className="border border-black px-2 py-1 text-xs font-mono lowercase bg-white">
                  #{role}
                </span>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <p className="font-serif italic leading-tight text-lg">"{person.bio}"</p>
            
            <div className="border-t border-black pt-4">
              <h3 className="font-bold uppercase text-sm mb-2">Linked Connections</h3>
              <ul className="space-y-1 font-mono text-sm">
                {person.connections?.map((link: any) => (
                  <li key={link.url}>
                    <a href={link.url} className="text-[#FF3E00] hover:underline">
                      [{link.label}] →
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