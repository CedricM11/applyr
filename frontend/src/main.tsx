import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import { router } from './router/router.tsx'
import { Toaster } from 'sonner'
import AuthInitializer from './components/AuthInitializer.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthInitializer />
		<RouterProvider router={router} />
		<Toaster richColors />
	</StrictMode>,
)
