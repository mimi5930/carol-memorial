import { users, posts } from '../schema'
import { db } from '..'

export default async function seedData() {
  // Clear tables first (optional, for development)
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
        text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
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

  console.log('Database seeded successfully ✅')
}
