import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SidebarProvider } from './components/ui/sidebar.tsx'
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarProvider>
      <AppSidebar />
      <main className='flex flex-1 justify-center text-[14px]'>
        <RouterProvider router={router}/>
      </main>
    </SidebarProvider>
  </StrictMode>,
)
