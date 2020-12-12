import { lazy } from 'react'
import Competition from '../pages/competition'

const Home = lazy(() => import('../pages/home'))
const NotFound = lazy(() => import('../pages/not-found'))
const LoginRedirect = lazy(() => import('../pages/login-redirect'))
const Login = lazy(() => import('../pages/login'))
const Voting = lazy(() => import('../pages/voting'))

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
    path: '/login',
    component: Login,
  },
  {
    path: '/competition',
    component: Competition,
    isPrivate: true,
  },
  {
    path: '/voting',
    component: Voting,
    isPrivate: true,
  },
  {
    path: '/*',
    component: NotFound,
  },
]

export default routes
