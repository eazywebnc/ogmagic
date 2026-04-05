import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'OGMagic — AI-Powered OG Image & Social Banner Generator'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#040d14',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background gradient blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            right: '-60px',
            width: '540px',
            height: '540px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px',
            height: '200px',
            background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Magic wand / sparkle icon */}
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(139,92,246,0.25))',
            border: '1px solid rgba(6,182,212,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '28px',
            fontSize: '36px',
          }}
        >
          ✨
        </div>

        {/* Product name */}
        <div
          style={{
            fontSize: '88px',
            fontWeight: '800',
            letterSpacing: '-2px',
            background: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 30%, #818cf8 70%, #7c3aed 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '20px',
            lineHeight: '1',
          }}
        >
          OGMagic
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '27px',
            fontWeight: '400',
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: '-0.3px',
            marginBottom: '40px',
          }}
        >
          AI-Powered OG Image &amp; Social Banner Generator
        </div>

        {/* Feature chips */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          {['✦ 30+ Templates', '⚡ API Access', '🎨 AI Customization'].map((label) => (
            <div
              key={label}
              style={{
                padding: '8px 16px',
                borderRadius: '100px',
                border: '1px solid rgba(6,182,212,0.25)',
                background: 'rgba(6,182,212,0.08)',
                color: 'rgba(255,255,255,0.65)',
                fontSize: '15px',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Brand pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #22d3ee, #7c3aed)',
            }}
          />
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px' }}>
            by EazyWebNC
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
