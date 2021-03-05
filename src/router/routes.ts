interface AppRoutes {
  home: string
  detail: string
}

const routes: AppRoutes = {
  home: '/',
  detail: '/detail/:id',
}

export default routes
