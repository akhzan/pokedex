interface AppRoutes {
  home: string
  detail: string
  compare: string
}

const routes: AppRoutes = {
  home: '/',
  detail: '/detail/:id',
  compare: '/compare',
}

export default routes
