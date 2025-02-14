import { NextResponse } from 'next/server'
import { createStory } from '~/chain/TurtleSoup/manager'

export async function POST() {
  const id = await createStory()
  if (!id) {
    return NextResponse.json({ error: '服务器繁忙' }, { status: 400 })
  }
  return NextResponse.json({ id })
}
