import process from 'node:process'
import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env.local' }) // or .env.local

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schemas',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
})
