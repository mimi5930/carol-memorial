import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

const timestamps = {
  updated_at: text(),
  created_at: text()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  deleted_at: text()
}

// TODO: Integrate with googleAPIs
export const users = sqliteTable(
  'users',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    // when used with googleAPIs
    // id: integer('id').primarykey()
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    ip: text().notNull(),
    picture: text('picture').default('https://placehold.co/400'),
    role: text('role').default('user'),
    ...timestamps
  }
  //, (table) => [
  //   primaryKey({ columns: [table.bookId, table.authorId] }),
  //   // Or PK with custom name
  //   primaryKey({ name: 'custom_name', columns: [table.bookId, table.authorId] })
  // ]
)

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  text: text('text', { length: 256 }),
  userId: integer('user_id').references(() => users.id),
  ...timestamps
})
