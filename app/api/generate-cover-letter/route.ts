// app/api/test/route.ts
import { NextResponse } from 'next/server'

const API_BASE = 'https://cover-letter-serverless-production.up.railway.app/api/test'
const API_KEY   = '96FB32684B2FF4D7742D75B98229A'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(request: Request) {
  try {
    // 1) forward create‐job request
    const body = await request.json()
    const createRes = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key':    API_KEY,
      },
      body: JSON.stringify(body),
    })
    if (!createRes.ok) {
      const text = await createRes.text()
      return NextResponse.json(
        { error: `Upstream POST failed: ${createRes.status} ${text}` },
        { status: 502 }
      )
    }
    const { jobId } = await createRes.json() as { jobId: string }

    // 2) initial 30s pause before polling
    await delay(30_000)

    // 3) poll until complete (or timeout)
    const maxAttempts = 18       // ~1.5 min total if interval=5s
    const interval    = 5_000
    for (let i = 0; i < maxAttempts; i++) {
      const statusRes = await fetch(`${API_BASE}/status/${jobId}`, {
        headers: { 'x-api-key': API_KEY },
      })
      if (!statusRes.ok) {
        const text = await statusRes.text()
        return NextResponse.json(
          { error: `Upstream status check failed: ${statusRes.status} ${text}` },
          { status: 502 }
        )
      }

      const json = await statusRes.json() as {
        status: 'pending'|'processing'|'completed'|'failed'
        result?: { letter: string }
        error?: string
      }
      if (json.status === 'completed' && json.result?.letter) {
        return NextResponse.json({ letter: json.result.letter }, { status: 200 })
      }
      if (json.status === 'failed') {
        return NextResponse.json(
          { error: json.error || 'Job failed' },
          { status: 500 }
        )
      }
      await delay(interval)
    }

    // 4) timed out
    return NextResponse.json(
      { error: 'Timed out waiting for job completion (≈1.5 min)' },
      { status: 504 }
    )

  } catch (err: any) {
    console.error('Proxy+polling error:', err)
    return NextResponse.json(
      { error: err.message || 'Internal proxy error' },
      { status: 500 }
    )
  }
}
