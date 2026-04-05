'use client'

import { useState } from 'react'
import type { OGUser } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Save, User } from 'lucide-react'

interface SettingsContentProps {
  user: OGUser | null
}

export function SettingsContent({ user }: SettingsContentProps) {
  const [name, setName] = useState(user?.name ?? '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSave() {
    if (!user) return
    setLoading(true)
    setMessage('')

    const supabase = createClient()
    const { error } = await supabase
      .from('og_users')
      .update({ name, updated_at: new Date().toISOString() })
      .eq('id', user.id)

    if (error) {
      setMessage('Failed to update settings.')
    } else {
      setMessage('Settings saved!')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account settings.
        </p>
      </div>

      <div className="glass-card rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium">{user?.email}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.plan} plan</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="name">
            Display name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={user?.email ?? ''}
            disabled
            className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm text-muted-foreground"
          />
        </div>

        {message && (
          <p className={`text-sm px-3 py-2 rounded-lg ${message.includes('Failed') ? 'text-destructive bg-destructive/10' : 'text-emerald-400 bg-emerald-400/10'}`}>
            {message}
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-medium text-sm disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save changes
        </button>
      </div>
    </div>
  )
}
