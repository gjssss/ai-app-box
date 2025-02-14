import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const turtleSoup = pgTable('turtle_soup', {
  id: integer().primaryKey(),
  title: varchar(),
  story: varchar(),
  answer: varchar(),
})
