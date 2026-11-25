import {createBrowserRouter} from 'react-router-dom'

import {AuthLayout} from '@/layouts'
import { LoginPage, RegisterPage } from '@/features/auth/pages'
import {PATHS} from './paths'

export const router = createBrowserRouter([
  // Auth
  {
    element: <AuthLayout />,
    children: [
      {
        path: PATHS.AUTH.REGISTER,
        element: <RegisterPage />
      },
      {
        path: PATHS.AUTH.LOGIN,
        element: <LoginPage />
      }
    ],
  },
])