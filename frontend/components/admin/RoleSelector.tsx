'use client'

import { useState } from 'react'

interface RoleSelectorProps {
  value: string
  onChange: (role: string) => void
  disabled?: boolean
}

const roles = [
  { 
    value: 'superadmin', 
    label: 'Super Admin', 
    description: 'Full system access',
    color: 'border-red-500 bg-red-500/10 text-red-400'
  },
  { 
    value: 'editor', 
    label: 'Editor', 
    description: 'Content management',
    color: 'border-blue-500 bg-blue-500/10 text-blue-400'
  },
  { 
    value: 'moderator', 
    label: 'Moderator', 
    description: 'Content moderation',
    color: 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
  },
  { 
    value: 'contributor', 
    label: 'Contributor', 
    description: 'Create content only',
    color: 'border-green-500 bg-green-500/10 text-green-400'
  },
  { 
    value: 'viewer', 
    label: 'Viewer', 
    description: 'Read-only access',
    color: 'border-zinc-500 bg-zinc-500/10 text-zinc-400'
  },
]

export function RoleSelector({ value, onChange, disabled }: RoleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest text-zinc-500">
        Admin Role
      </label>
      <div className="grid grid-cols-1 gap-2">
        {roles.map((role) => (
          <button
            key={role.value}
            type="button"
            onClick={() => onChange(role.value)}
            disabled={disabled}
            className={`
              flex items-center justify-between p-3 border transition-all text-left
              ${value === role.value 
                ? role.color 
                : 'border-zinc-800 hover:border-zinc-700 text-zinc-500 hover:text-zinc-300'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider">
                {role.label}
              </p>
              <p className="text-[9px] text-zinc-600">
                {role.description}
              </p>
            </div>
            {value === role.value && (
              <div className="w-2 h-2 bg-current rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
