import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getStory } from '~/chain/TurtleSoup/manager'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id)
    return NextResponse.error()
  const story = getStory(id)
  return NextResponse.json({ story })
}
