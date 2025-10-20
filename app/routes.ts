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
    // route('/gallery', 'routes/gallery.tsx'),
    // route('/gallery/admin', 'routes/admin.tsx'),
    route('/memorial', 'routes/memorial.tsx'),
    route('/donate', 'routes/donate.tsx')
  ])
] satisfies RouteConfig
