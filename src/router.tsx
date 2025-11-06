import App from './App.tsx'
import { createHashRouter } from 'react-router-dom'
import { CitiesRouter } from './pages/Cities/routes/CitiesRouter.tsx'
import { RegionsRouter } from './pages/Regions/routes/RegionsRouter.tsx'
import { PackgesRouter } from './pages/Packges/routes/PackgesRouter.tsx'
import { ProvidresRouter } from './pages/Providers/routes/ProvidresRouter.tsx'
import { FaqsRouter } from './pages/faqs/routes/FaqsRouter.tsx'
import { SettingsRouter } from './pages/settings/routes/SettingsRouter.tsx'
import { ClientsRouter } from './pages/clients/routes/ClientsRouter.tsx'
import { BranchesRouter } from './pages/brances/routes/BranchesRouter.tsx'
import { logInRouter } from './pages/logIn/routes/RouterLogIn.tsx'


export const router = createHashRouter([
  {
    path: 'dashboard',
    element: <App />,
    children: [
      ...CitiesRouter,
      ...PackgesRouter,
      ...ProvidresRouter,
      ...RegionsRouter,
      ...FaqsRouter,
      ...SettingsRouter,
      ...ClientsRouter,
      ...BranchesRouter
    ]

  },
  ...logInRouter
])