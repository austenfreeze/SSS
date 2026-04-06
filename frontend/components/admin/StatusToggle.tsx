'use client'

interface StatusToggleProps {
  value: string
  onChange: (status: string) => void
  disabled?: boolean
}

const statuses = [
  { value: 'active', label: 'Active', color: 'bg-green-500' },
  { value: 'inactive', label: 'Inactive', color: 'bg-zinc-500' },
  { value: 'suspended', label: 'Suspended', color: 'bg-red-500' },
  { value: 'pending', label: 'Pending', color: 'bg-yellow-500' },
]

export function StatusToggle({ value, onChange, disabled }: StatusToggleProps) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest text-zinc-500">
        Account Status
      </label>
      <div className="flex items-center gap-2">
        {statuses.map((status) => (
          <button
            key={status.value}
            type="button"
            onClick={() => onChange(status.value)}
            disabled={disabled}
            className={`
              flex items-center gap-2 px-3 py-2 border transition-all
              ${value === status.value
                ? 'border-white bg-white/5 text-white'
                : 'border-zinc-800 text-zinc-600 hover:border-zinc-700 hover:text-zinc-400'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className={`w-2 h-2 rounded-full ${status.color}`} />
            <span className="text-[10px] uppercase tracking-wider">
              {status.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
