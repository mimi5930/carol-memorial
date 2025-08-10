import { users, posts, likes } from '../schema'
import { db } from '..'

export default async function seedData() {
  // Clear tables first (optional, for development)
  await db.delete(likes)
  await db.delete(posts)
  await db.delete(users)

  // Insert users
  const insertedUsers = await db
    .insert(users)
    .values([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        ip: '192.168.0.101',
        picture: 'https://placehold.co/400x400?text=Alice',
        role: 'admin'
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        ip: '192.168.0.102',
        picture: 'https://placehold.co/400x400?text=Bob',
        role: 'user'
      },
      {
        name: 'Charlie Davis',
        email: 'charlie@example.com',
        ip: '192.168.0.103'
      }
    ])
    .returning({ id: users.id })

  console.log('Inserted users:', insertedUsers)

  // Insert posts
  const insertedPosts = await db
    .insert(posts)
    .values([
      {
        text: 'Hello world! This is my first post.',
        userId: insertedUsers[0].id
      },
      {
        text: 'Loving this new platform! 🚀',
        userId: insertedUsers[1].id
      },
      {
        text: 'Coffee is life ☕',
        userId: insertedUsers[2].id
      }
    ])
    .returning({ id: posts.id })

  console.log('Inserted posts:', insertedPosts)

  // Insert likes
  await db.insert(likes).values([
    {
      userId: insertedUsers[1].id.toString(), // Bob likes Alice's post
      postId: insertedPosts[0].id.toString()
    },
    {
      userId: insertedUsers[2].id.toString(), // Charlie likes Bob's post
      postId: insertedPosts[1].id.toString()
    },
    {
      userId: insertedUsers[0].id.toString(), // Alice likes Charlie's post
      postId: insertedPosts[2].id.toString()
    },
    {
      userId: insertedUsers[0].id.toString(), // Alice likes Charlie's post
      postId: insertedPosts[2].id.toString()
    }
  ])

  console.log('Database seeded successfully ✅')
}
