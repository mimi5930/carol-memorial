import {
  type RouteConfig,
  index,
  route,
  layout
} from '@react-router/dev/routes'

export default [
  layout('routes/layout.tsx', [
    index('routes/home.tsx'),
    route('/about', 'routes/about.tsx'),
    route('/memorial', 'routes/memorial.tsx')
  ])
] satisfies RouteConfig
