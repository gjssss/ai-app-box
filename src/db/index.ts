import process from 'node:process'
import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
// src/db.ts
import { drizzle } from 'drizzle-orm/neon-http'

config({ path: '.env.local' }) // or .env.local

const sql = neon(process.env.POSTGRES_URL!)
export const db = drizzle({ client: sql })
