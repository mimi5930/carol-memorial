import { getUserDataFromSession } from '~/utils/JWT.server'
import type { Route } from './+types/admin'
import { data, redirect, useNavigate } from 'react-router'
import { db } from '~/db'
import { posts, users } from '~/db/schema'
import { eq } from 'drizzle-orm'
import { Button } from '~/components/ui/button'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'

export async function loader({ request }: Route.LoaderArgs) {
  let user
  const cookie = request.headers.get('Cookie')
  if (cookie) user = cookie ? await getUserDataFromSession(cookie) : null

  if (!user || user.role !== 'admin') {
    return redirect('/gallery') // block non-admins
  }

  const allUsers = await db.select().from(users)
  const allPosts = await db
    .select()
    .from(posts)
    .leftJoin(users, eq(users.id, posts.userId))

  return data({ users: allUsers, posts: allPosts })
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const cookie = request.headers.get('Cookie')
  const adminUser = cookie ? await getUserDataFromSession(cookie) : null

  if (adminUser?.role !== 'admin')
    throw new Response('Forbidden', { status: 403 })

  const actionType = formData.get('_action')
  const targetUserId = formData.get('userId')?.toString()
  const targetPostId = formData.get('postId')?.toString()

  switch (actionType) {
    case 'banUser':
      if (!targetUserId) throw new Response('No target userId', { status: 400 })
      await db
        .update(users)
        .set({ status: 'disabled' })
        .where(eq(users.id, targetUserId))
      break
    case 'unbanUser':
      if (!targetUserId) throw new Response('No target userId', { status: 400 })
      await db
        .update(users)
        .set({ status: 'active' })
        .where(eq(users.id, targetUserId))
      break
    case 'deletePost':
      if (!targetPostId) throw new Response('No target userId', { status: 400 })
      const deletedPost = await db
        .update(posts)
        .set({ deletedAt: new Date().toISOString() })
        .where(eq(posts.id, targetPostId))
      if (!deletedPost.changes)
        throw new Response('Post not deleted', { status: 500 })
      console.log('Post deleted', { deletedPost })
      break
    case 'restorePost':
      if (!targetPostId) throw new Response('No target userId', { status: 400 })
      const restoredPost = await db
        .update(posts)
        .set({ deletedAt: null })
        .where(eq(posts.id, targetPostId))
      if (!restoredPost)
        throw new Response('Post not restored', { status: 500 })
      break
    default:
      throw new Response('Unknown action', { status: 400 })
  }

  return redirect('/gallery/admin')
}

export default function AdminPage({ loaderData }: Route.ComponentProps) {
  // * Component logic *
  const users = loaderData?.users
  const postsData = loaderData?.posts

  let posts: typeof postsData = []
  let deletedPosts: typeof postsData = []
  postsData.forEach(p => {
    p.posts.deletedAt === null ? posts.push(p) : deletedPosts.push(p)
  })
  console.log(postsData[0].posts.deletedAt)
  console.log({ posts })
  console.log({ deletedPosts })

  const [showUsers, setShowUsers] = useState<boolean>(true)
  const [showPosts, setShowPosts] = useState<boolean>(true)
  const [showDeletedPosts, setShowDeletedPosts] = useState<boolean>(false)
  const navigate = useNavigate()

  // * Render *
  return (
    <section className="p-8 flex flex-col gap-8">
      <div className="flex gap-2 items-center">
        <Button variant={'link'} onClick={() => navigate('/gallery')}>
          <ArrowLeft />
        </Button>
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Users</h2>
        <Button
          type="button"
          variant={'link'}
          className="p-0 text-blue-500"
          onClick={() => setShowUsers(!showUsers)}
        >
          {showUsers ? 'Hide users' : 'Show users'}
        </Button>
        <div className="flex flex-col gap-5">
          {showUsers &&
            users.map(u => (
              <div
                key={u.id}
                className="flex gap-4 items-center p-3 bg-slate-50 rounded-md"
              >
                <div>
                  <img
                    src={`${u.picture}-rj`}
                    alt={`${u.name}'s avatar`}
                    className="h-24 aspect-square rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-1">
                    <h3 className="font-bold">Name:</h3>
                    <p>{u.name}</p>
                  </div>
                  <div className="flex gap-1">
                    <h3 className="font-bold">Role:</h3>
                    <p>{u.role}</p>
                  </div>
                  <div className="flex gap-1">
                    <h3 className="font-bold">Status:</h3>
                    <p>{u.status}</p>
                  </div>
                  <div className="flex gap-1">
                    <h3 className="font-bold">Email:</h3>
                    <p>{u.email}</p>
                  </div>
                  <div className="flex gap-1">
                    <h3 className="font-bold">Account created:</h3>
                    <p>{new Date(u.createdAt ?? '').toLocaleString('en-US')}</p>
                  </div>
                  <div className="flex gap-1">
                    <h3 className="font-bold">Last logged in:</h3>
                    <p>
                      {new Date(u.lastLoginAt ?? '').toLocaleString('en-US')}
                    </p>
                  </div>
                </div>
                {u.status === 'disabled' ? (
                  <form method="post">
                    <input type="hidden" name="_action" value="unbanUser" />
                    <input type="hidden" name="userId" value={u.id} />
                    <Button className="bg-green-500">Unban User</Button>
                  </form>
                ) : (
                  <form method="post">
                    <input type="hidden" name="_action" value="banUser" />
                    <input type="hidden" name="userId" value={u.id} />
                    <Button
                      className="bg-red-500"
                      disabled={u.role === 'admin'}
                    >
                      Ban User
                    </Button>
                  </form>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="text-2xl font-semibold">Posts</h2>
        <Button
          type="button"
          variant={'link'}
          className="p-0 text-blue-500"
          onClick={() => setShowPosts(!showPosts)}
        >
          {showPosts ? 'Hide posts' : 'Show posts'}
        </Button>
        <div className="flex flex-col gap-5">
          {showPosts &&
            posts.map(p => (
              <div
                key={p.posts.id}
                className="flex flex-col gap-1 bg-slate-50 p-2 rounded-md"
              >
                <h3 className="font-bold">
                  {`${p.users?.name} (${p.users?.email})`}{' '}
                  <span className="font-normal">
                    on{' '}
                    {new Date(p.posts.createdAt ?? '').toLocaleString('en-US')}
                  </span>
                </h3>
                <div className="flex gap-5 items-center">
                  <p>{p.posts.text}</p>
                  <form method="post">
                    <input type="hidden" name="_action" value="deletePost" />
                    <input type="hidden" name="postId" value={p.posts.id} />
                    <Button type="submit" className="bg-red-500">
                      Delete Post
                    </Button>
                  </form>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Deleted Posts</h2>
        <Button
          type="button"
          variant={'link'}
          className="p-0 text-blue-500"
          onClick={() => setShowDeletedPosts(!showDeletedPosts)}
        >
          {showDeletedPosts ? 'Hide deleted posts' : 'Show deleted posts'}
        </Button>
        <div className="flex flex-col gap-5">
          {showDeletedPosts &&
            deletedPosts.map(p => (
              <div
                key={p.posts.id}
                className="flex flex-col gap-1 bg-slate-50 p-2 rounded-md"
              >
                <h3 className="font-bold">
                  {`${p.users?.name} (${p.users?.email})`}{' '}
                  <span className="font-normal">
                    on{' '}
                    {new Date(p.posts.createdAt ?? '').toLocaleString('en-US')}
                  </span>
                </h3>
                <div className="flex gap-5 items-center">
                  <p>{p.posts.text}</p>
                  <form method="post">
                    <input type="hidden" name="_action" value="restorePost" />
                    <input type="hidden" name="postId" value={p.posts.id} />
                    <Button type="submit" className="bg-green-500">
                      Restore Post
                    </Button>
                  </form>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
