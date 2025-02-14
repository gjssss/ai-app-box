import { NextResponse } from 'next/server'
import { listStories } from '~/chain/TurtleSoup/manager'

export async function GET() {
  const list = await listStories()
  return NextResponse.json({ list })
}
