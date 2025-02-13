import { turtleSoupApp } from '~/chain/TurtleSoup'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, id } = await req.json()
  const result = await turtleSoupApp({
    id,
    messages,
  })
  if (!result)
    return new Response(null, { status: 404 })

  return result.toDataStreamResponse()
}
