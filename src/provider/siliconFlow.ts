import process from 'node:process'
import { createOpenAI } from '@ai-sdk/openai'

export const siliconFlow = createOpenAI({
  baseURL: 'https://api.siliconflow.cn/v1',
  apiKey: process.env.SILICON_FLOW_KEY,
})
