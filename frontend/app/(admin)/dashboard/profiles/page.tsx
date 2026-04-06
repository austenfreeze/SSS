import { client } from '@/src/sanity/client'
import { ADMIN_PROFILES_QUERY } from '@/src/sanity/adminQueries'
import { AdminProfileCard } from '@/components/admin/AdminProfileCard'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminProfilesPage() {
  const profiles = await client.fetch(ADMIN_PROFILES_QUERY)

  const roleGroups = profiles.reduce((acc: Record<string, any[]>, profile: any) => {
    const role = profile.role || 'unknown'
    if (!acc[role]) acc[role] = []
    acc[role].push(profile)
    return acc
  }, {})

  const roleOrder = ['superadmin', 'editor', 'moderator', 'contributor', 'viewer', 'unknown']
  const sortedGroups = roleOrder.filter(role => roleGroups[role]?.length > 0)

  return (
    <div className="p-8 lg:p-12 max-w-6xl">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] mb-2">
              Admin Management
            </p>
            <h1 className="text-4xl font-light tracking-tighter uppercase italic">
              Admin Profiles
            </h1>
          </div>
          <Link
            href="/dashboard/profiles/new"
            className="px-4 py-2 bg-white text-black text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-colors"
          >
            Add Admin
          </Link>
        </div>
        <p className="text-zinc-500 text-sm max-w-xl">
          Manage admin team members, roles, and permissions. Multi-admin support 
          enables collaborative content management with role-based access control.
        </p>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4 mb-12 border border-zinc-800 p-6">
        <div>
          <p className="text-2xl font-bold">{profiles.length}</p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Total Admins</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{profiles.filter((p: any) => p.status === 'active').length}</p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Active</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{roleGroups['superadmin']?.length || 0}</p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">Super Admins</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{profiles.filter((p: any) => p.portalsCount > 0).length}</p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-wider">With Portals</p>
        </div>
      </div>

      {/* Profiles by Role */}
      {sortedGroups.length > 0 ? (
        <div className="space-y-12">
          {sortedGroups.map(role => (
            <section key={role}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                  {role === 'superadmin' ? 'Super Admins' : 
                   role.charAt(0).toUpperCase() + role.slice(1) + 's'}
                </h2>
                <div className="flex-1 h-px bg-zinc-900" />
                <span className="text-[10px] text-zinc-700">
                  {roleGroups[role].length} member{roleGroups[role].length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roleGroups[role].map((profile: any) => (
                  <AdminProfileCard key={profile._id} profile={profile} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="py-20 border border-dashed border-zinc-900 text-center">
          <p className="text-zinc-600 italic mb-4">No admin profiles found.</p>
          <Link
            href="/dashboard/profiles/new"
            className="text-[10px] text-white underline underline-offset-4 uppercase tracking-widest"
          >
            Create First Admin
          </Link>
        </div>
      )}
    </div>
  )
}
