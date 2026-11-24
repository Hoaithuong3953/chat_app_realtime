import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@mantine/core/styles.css'
import '@/styles/index.css'
import App from '@/app/app'
import { setupAuth } from '@/app/auth.setup'

setupAuth()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
