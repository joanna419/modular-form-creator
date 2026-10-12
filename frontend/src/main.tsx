import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AppStyles } from '@/app/AppStyles'
import { queryClient } from '@/app/queryClient'
import { GlobalStyles } from '@/design-system/theme/GlobalStyles'
import { theme } from '@/design-system/theme/theme'
import { EditBufferProvider } from '@/features/resources/context/EditBufferProvider'
import { router } from '@/routes/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppStyles />
      <QueryClientProvider client={queryClient}>
        <EditBufferProvider>
          <RouterProvider router={router} />
        </EditBufferProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
