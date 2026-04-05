'use client'

import type { OGImage } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { Download, ExternalLink, Trash2 } from 'lucide-react'

interface ImageCardProps {
  image: OGImage
  onDelete?: (id: string) => void
}

export function ImageCard({ image, onDelete }: ImageCardProps) {
  return (
    <div className="glass-card rounded-xl overflow-hidden group">
      {/* Preview */}
      <div className="aspect-[1200/630] bg-gradient-to-br from-muted to-background relative overflow-hidden">
        {image.image_url ? (
          <img
            src={image.image_url}
            alt={image.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            Preview
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          {image.image_url && (
            <a
              href={image.image_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {image.image_url && (
            <a
              href={image.image_url}
              download
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Download className="w-4 h-4" />
            </a>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(image.id)}
              className="w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-sm truncate">{image.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            {image.width}x{image.height}
          </span>
          <span className="text-xs text-muted-foreground uppercase">{image.format}</span>
          <span className="text-xs text-muted-foreground">{formatDate(image.created_at)}</span>
        </div>
      </div>
    </div>
  )
}
