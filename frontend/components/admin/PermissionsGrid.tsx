'use client'

interface PermissionsGridProps {
  value: string[]
  onChange: (permissions: string[]) => void
  disabled?: boolean
}

const permissions = [
  { value: 'manage_users', label: 'Manage Users', group: 'Admin' },
  { value: 'manage_settings', label: 'Manage Settings', group: 'Admin' },
  { value: 'access_analytics', label: 'Access Analytics', group: 'Admin' },
  { value: 'manage_content', label: 'Manage Content', group: 'Content' },
  { value: 'publish_content', label: 'Publish Content', group: 'Content' },
  { value: 'delete_content', label: 'Delete Content', group: 'Content' },
  { value: 'manage_media', label: 'Manage Media', group: 'Media' },
  { value: 'manage_galleries', label: 'Manage Galleries', group: 'Media' },
  { value: 'manage_social', label: 'Manage Social Profiles', group: 'Social' },
]

const groupedPermissions = permissions.reduce((acc, perm) => {
  if (!acc[perm.group]) acc[perm.group] = []
  acc[perm.group].push(perm)
  return acc
}, {} as Record<string, typeof permissions>)

export function PermissionsGrid({ value, onChange, disabled }: PermissionsGridProps) {
  const togglePermission = (permission: string) => {
    if (disabled) return
    
    if (value.includes(permission)) {
      onChange(value.filter((p) => p !== permission))
    } else {
      onChange([...value, permission])
    }
  }

  const selectAll = () => {
    if (disabled) return
    onChange(permissions.map((p) => p.value))
  }

  const clearAll = () => {
    if (disabled) return
    onChange([])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500">
          Permissions
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={selectAll}
            disabled={disabled}
            className="text-[9px] text-zinc-600 hover:text-white transition-colors uppercase tracking-wider disabled:opacity-50"
          >
            All
          </button>
          <span className="text-zinc-800">|</span>
          <button
            type="button"
            onClick={clearAll}
            disabled={disabled}
            className="text-[9px] text-zinc-600 hover:text-white transition-colors uppercase tracking-wider disabled:opacity-50"
          >
            None
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedPermissions).map(([group, perms]) => (
          <div key={group}>
            <p className="text-[9px] text-zinc-700 uppercase tracking-widest mb-2">
              {group}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {perms.map((perm) => (
                <button
                  key={perm.value}
                  type="button"
                  onClick={() => togglePermission(perm.value)}
                  disabled={disabled}
                  className={`
                    flex items-center gap-2 p-2 border transition-all text-left
                    ${value.includes(perm.value)
                      ? 'border-white bg-white/5 text-white'
                      : 'border-zinc-800 text-zinc-600 hover:border-zinc-700 hover:text-zinc-400'
                    }
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className={`w-3 h-3 border ${value.includes(perm.value) ? 'border-white bg-white' : 'border-zinc-700'}`} />
                  <span className="text-[10px] uppercase tracking-wider">
                    {perm.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-[9px] text-zinc-700">
        {value.length} of {permissions.length} permissions selected
      </p>
    </div>
  )
}
