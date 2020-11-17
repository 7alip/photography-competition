import Test from '../pages/test'
import Home from '../pages/home'
import NotFound from '../pages/not-found'
import LoginRedirect from '../pages/login-redirect'
import Login from '../pages/login'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/connect/:providerName/redirect',
    component: LoginRedirect,
  },
  {
    path: '/competition',
    component: Test,
    isPrivate: true,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/*',
    component: NotFound,
  },
]

export default routes
