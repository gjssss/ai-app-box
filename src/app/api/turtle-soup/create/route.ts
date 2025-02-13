import { NextResponse } from 'next/server'
import { createStory } from '~/chain/TurtleSoup/manager'

export async function POST() {
  const id = await createStory()
  return NextResponse.json({ id })
}
