import { RouterProvider } from 'react-router-dom'

import { ErrorBoundary } from '@/components'
import { AppProvider } from './app-provider'
import { router } from './routes'

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App