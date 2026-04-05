'use client'

import { useState } from 'react'
import type { OGApiKey, Plan } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { Key, Plus, Copy, Trash2, Lock } from 'lucide-react'
import Link from 'next/link'

interface ApiKeysContentProps {
  keys: OGApiKey[]
  userPlan: Plan
  userId: string
}

export function ApiKeysContent({ keys, userPlan, userId }: ApiKeysContentProps) {
  const [newKeyName, setNewKeyName] = useState('')
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [keysList, setKeysList] = useState(keys)

  const hasApiAccess = userPlan !== 'free'

  async function handleCreateKey() {
    if (!newKeyName.trim() || !hasApiAccess) return
    setLoading(true)

    try {
      const res = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create_api_key', name: newKeyName, user_id: userId }),
      })
      const data = await res.json()
      if (data.key) {
        setCreatedKey(data.key)
        setNewKeyName('')
        // Refresh would be needed here
      }
    } catch (err) {
      console.error('Failed to create API key:', err)
    }
    setLoading(false)
  }

  if (!hasApiAccess) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">API Keys</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your API keys for programmatic image generation.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-violet-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">API access requires Pro or Scale</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Upgrade your plan to generate images programmatically via our REST API.
          </p>
          <Link
            href="/dashboard/billing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-medium text-sm"
          >
            Upgrade to Pro
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">API Keys</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your API keys for programmatic image generation.
        </p>
      </div>

      {/* Create new key */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold mb-4">Create new API key</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="Key name (e.g., Production, Development)"
            className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm"
          />
          <button
            onClick={handleCreateKey}
            disabled={loading || !newKeyName.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-medium text-sm disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            Create
          </button>
        </div>

        {createdKey && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-sm text-emerald-400 mb-2 font-medium">Key created! Copy it now - you won&apos;t see it again.</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm bg-black/30 px-3 py-2 rounded-lg font-mono text-emerald-300 break-all">
                {createdKey}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(createdKey)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* API docs snippet */}
      <div className="glass-card rounded-xl p-6" id="api">
        <h3 className="font-semibold mb-4">Quick start</h3>
        <pre className="text-sm bg-black/30 p-4 rounded-xl overflow-x-auto font-mono text-cyan-300">
{`curl -X POST https://ogmagic.eazyweb.nc/api/og \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "template": "blog-post",
    "texts": {
      "title": "My Amazing Post",
      "description": "A brief description",
      "author": "John Doe"
    },
    "format": "png"
  }'`}
        </pre>
      </div>

      {/* Keys list */}
      {keysList.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold">Your API keys</h3>
          {keysList.map((k) => (
            <div key={k.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Key className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{k.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Created {formatDate(k.created_at)}
                    {k.last_used_at && ` · Last used ${formatDate(k.last_used_at)}`}
                  </p>
                </div>
              </div>
              <button className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
