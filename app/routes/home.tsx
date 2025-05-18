import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Carol Trainor' },
    {
      name: 'description',
      content: 'A memorial website for Carol Anne Trainor'
    }
  ]
}

export default function Home() {
  return <div></div>
}
