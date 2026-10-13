import { createBrowserRouter, Navigate } from 'react-router-dom'
import { BasicInfoPage } from '@/features/resources/pages/BasicInfoPage'
import { ProjectDetailsPage } from '@/features/resources/pages/ProjectDetailsPage'
import { ResourceDetailsPage } from '@/features/resources/pages/ResourceDetailsPage'
import { ResourceOverviewPage } from '@/features/resources/pages/ResourceOverviewPage'
import { ResourcesListPage } from '@/features/resources/pages/ResourcesListPage'
import { NotFoundPage } from '@/routes/NotFoundPage'
import { paths } from '@/routes/paths'
import { RootLayout, type RouteHandle } from '@/routes/RootLayout'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to={paths.resources} replace /> },
      {
        path: 'resources',
        element: <ResourcesListPage />,
        handle: { fillViewport: true } satisfies RouteHandle,
      },
      { path: 'resources/:resourceId', element: <ResourceOverviewPage /> },
      {
        path: 'resources/:resourceId/details',
        element: <ResourceDetailsPage />,
      },
      {
        path: 'resources/:resourceId/basic-info',
        element: <BasicInfoPage />,
      },
      {
        path: 'resources/:resourceId/project-details',
        element: <ProjectDetailsPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
