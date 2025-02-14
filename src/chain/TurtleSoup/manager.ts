import { generateText } from 'ai'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '~/db'
import { turtleSoup } from '~/db/schema/turtle-soup'
import { extractJSONCodeBlocks } from '~/lib/extract/json'
import { siliconFlow } from '~/provider/siliconFlow'
import { generateMessages } from './prompt'

export async function createStory() {
  const model = siliconFlow('deepseek-ai/DeepSeek-R1')

  const { text } = await generateText({
    model,
    messages: generateMessages,
    temperature: 1.5,
  })
  // eslint-disable-next-line no-console
  console.log(text)
  const story: typeof turtleSoup.$inferInsert = JSON.parse(extractJSONCodeBlocks(text)[0])
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
    title: res.title,
    story: res.story,
    answer: res.answer,
  }
}
