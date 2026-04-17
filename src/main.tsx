import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar.tsx'
import { AppSidebar } from './components/Sidebar/app-sidebar.tsx'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import NewChat from './pages/NewChat.tsx'
import NotFound from './pages/NotFound.tsx'
import Chat from './pages/Chat.tsx'
import './index.css'
import { ThemeProvider, useTheme } from './components/theme-provider.tsx'

function AppLayout() {
  const defaultOpen = window.innerWidth >= 1024
  const { theme } = useTheme()

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex w-full">
        <SidebarTrigger
          className={`fixed top-4 left-4 z-50 w-6 h-6 lg:hidden p-5 border ${theme === "light" ? 'bg-white border-[#7F7F7F20]' : 'bg-[#1F1F1F] border-[#3A3A3A]'} rounded-full transition-colors`}
          aria-label="Toggle sidebar"
        />
        <AppSidebar />
        <main className="flex flex-1 justify-center lg:text-[14px] text-[16px] w-full">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <NewChat/> },
      { path: "/chat/:chatId", element: <Chat/> },
      { path: "*", element: <NotFound/> }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
