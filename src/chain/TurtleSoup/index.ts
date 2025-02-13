import { deepseek } from '@ai-sdk/deepseek'
import { streamText } from 'ai'
import { getStory } from './manager'
import { TurtleSoupHost } from './prompt'

export async function turtleSoupApp({
  id,
  messages,
}: {
  id: string
  messages: any[]
}) {
  const model = deepseek('deepseek-chat')
  const story = getStory(id)
  if (!story)
    return
  return streamText({
    model,
    messages,
    system: TurtleSoupHost.replace('{story}', story.story).replace('{answer}', story.answer),
  })
}
