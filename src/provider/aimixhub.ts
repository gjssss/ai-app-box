import process from 'node:process'
import { createOpenAI } from '@ai-sdk/openai'

export const aimixhub = createOpenAI({
  baseURL: 'https://aihubmix.com/v1',
  apiKey: process.env.AIMIXHUB_KEY,
})
