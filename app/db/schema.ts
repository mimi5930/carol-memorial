import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { v4 as uuidV4 } from 'uuid'

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidV4()),

  googleId: text('google_id').notNull().unique(),
  email: text('email').unique(),
  name: text('name').notNull(),
  picture: text('picture'),

  role: text('role').notNull().default('user'), // 'user', 'admin'
  status: text('status').notNull().default('active'), // 'active', 'disabled'

  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdateFn(() => new Date().toISOString()),
  lastLoginAt: text('last_login_at')
})

export const posts = sqliteTable('posts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidV4()),
  text: text('text', { length: 256 }),
  userId: text('user_id').references(() => users.id),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdateFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at')
})
