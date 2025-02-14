import process from 'node:process'
import { deepseek } from '@ai-sdk/deepseek'
import { streamText } from 'ai'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '~/db'
import { turtleSoup } from '~/db/schema/turtle-soup'
import { extractJSONCodeBlocks } from '~/lib/extract/json'
import { generateMessages } from './prompt'

export async function createStory() {
  const model = deepseek('deepseek-reasoner')
  // eslint-disable-next-line no-console
  console.log('start')
  const result = streamText({
    model,
    messages: generateMessages,
    temperature: 1,
  })
  for await (const message of result.fullStream) {
    const mes = message as any
    if (mes.textDelta)
      process.stdout.write(mes.textDelta)
  }
  const text = (await result.text).trim()
  if (!text)
    return 0
  // eslint-disable-next-line no-console
  console.log(text)
  const extracted = extractJSONCodeBlocks(text)[0]
  if (!extracted)
    return 0
  const story: typeof turtleSoup.$inferInsert = JSON.parse(extracted)
  const storySchema = z.object({
    title: z.string(),
    story: z.string(),
    answer: z.string(),
  })
  const { success } = storySchema.safeParse(story)
  if (!success) {
    return 0
  }
  const [{ insertedId: id }] = await db.insert(turtleSoup).values(story).returning({ insertedId: turtleSoup.id })

  return id
}

export async function getStory(id: number) {
  const res = await db.query.turtleSoup.findFirst({
    where: eq(turtleSoup.id, id),
  })
  if (!res)
    return
  return {
    id: res.id,
    title: res.title!,
    story: res.story!,
    answer: res.answer!,
  }
}

export async function listStories() {
  const res = await db.query.turtleSoup.findMany()
  return res.map(r => ({
    id: r.id,
    title: r.title!,
    story: r.story!,
    answer: r.answer!,
  }))
}
