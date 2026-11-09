import {createBrowserRouter} from 'react-router-dom'

import {AuthLayout} from '@/layouts/AuthLayout'
import {PATHS} from './paths'

export const router = createBrowserRouter([
  // Auth
  {
    element: <AuthLayout />,
    children: [
      {
        path: PATHS.AUTH.LOGIN,
      },
      {
        path: PATHS.AUTH.REGISTER,
      },
    ],
  },
])