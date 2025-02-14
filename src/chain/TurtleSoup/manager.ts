import type { CoreMessage } from 'ai'
import { generateId, streamText } from 'ai'
import { extractJSONCodeBlocks } from '~/lib/extract/json'
import { siliconFlow } from '~/provider/siliconFlow'
import { GenerateStorySystemPrompt } from './prompt'

const storyList: {
  id: string
  title: string
  story: string
  answer: string
}[] = [
  {
    id: '1',
    title: '红色高跟鞋的预言',
    story: '一位女士去鞋店里买了一双红色高跟鞋，这双高跟鞋预示了她今晚的死亡。',
    answer: '女士是杂技团的一名演员，那天她去买了一双红色的高跟鞋。晚上她穿着这双高跟鞋就去马戏团上班了，她的工作是头顶苹果，配合另外一名男演员表演小李飞刀。结果因为她的高跟鞋，她比平时高出了几公分，没有调整过来的男演员失手将刀插到了她的脑袋上。',
  },
]

export async function createStory() {
  const model = siliconFlow('deepseek-ai/DeepSeek-R1')
  const messages: CoreMessage[] = [
    {
      role: 'system',
      content: GenerateStorySystemPrompt,
    },
    {
      role: 'user',
      content: '请生成一个海龟汤谜题',
    },
    {
      role: 'assistant',
      content: `
\`\`\`json
{
  "title": "红色高跟鞋的预言",
  "story": "一位女士去鞋店里买了一双红色高跟鞋，这双高跟鞋预示了她今晚的死亡。",
  "answer": "女士是杂技团的一名演员，那天她去买了一双红色的高跟鞋。晚上她穿着这双高跟鞋就去马戏团上班了，她的工作是头顶苹果，配合另外一名男演员表演小李飞刀。结果因为她的高跟鞋，她比平时高出了几公分，没有调整过来的男演员失手将刀插到了她的脑袋上。"
}
\`\`\`
      `,
    },
  ]
  const result = streamText({
    model,
    messages,
  })
  const text = await result.text
  // console.log(text)
  const story = JSON.parse(extractJSONCodeBlocks(text)[0])
  const id = generateId()
  storyList.push({ id, ...story })
  return id
}

export function getStory(id: string) {
  return storyList.find(story => story.id === id)
}
