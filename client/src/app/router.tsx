\import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/features/home'
import { WorkListPage, WorkDetailPage } from '@/features/work'
import NotFound from '@/app/pages/NotFound/NotFound'
import UnderConstruction from '@/app/pages/UnderConstruction/UnderConstruction'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/work',
    element: <WorkListPage />
  },
  {
    path: '/work/:id',
    element: <WorkDetailPage />
  },
  {
    path: '/coming-soon',
    element: <UnderConstruction />
  },
  {
    path: '*',
    element: <NotFound />
  }
])