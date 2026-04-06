import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar.tsx'
import { AppSidebar } from './components/app-siderbar.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NewChat from './pages/NewChat.tsx'
import NotFound from './pages/NotFound.tsx'
import Chat from './pages/Chat.tsx'
import './index.css'

const router = createBrowserRouter([
  { path: "/", element: <NewChat/> },
  { path: "/chat/:chatId", element: <Chat/> },
  { path: "*", element: <NotFound/> }
])

function AppLayout() {
  const defaultOpen = window.innerWidth >= 1024

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex w-full">
        <SidebarTrigger
          className="fixed top-4 left-4 z-50 w-6 h-6 lg:hidden p-5 border border-gray-200 bg-white rounded-full transition-colors"
          aria-label="Toggle sidebar"
        />
        <AppSidebar />
        <main className="flex flex-1 justify-center text-[14px] w-full">
          <RouterProvider router={router} />
        </main>
      </div>
    </SidebarProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppLayout />
  </StrictMode>,
)
