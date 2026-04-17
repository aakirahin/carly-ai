import { 
  MessageCirclePlus, 
  Search, 
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarHeader, 
  SidebarInput, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
} from "../ui/sidebar";
import { Label } from "../ui/label";
import carlyLogo from "../../assets/logo.svg"
import carlyDarkLogo from "../../assets/logo_dark.svg"
import { useIsMobile } from "../../hooks/use-mobile";
import { useState } from "react";
import { ModeToggle } from "../mode-toggle";
import { useTheme } from "../theme-provider";
import { Link } from "react-router-dom";
import ChatList from "./ChatList";
import useGetChats from "../../hooks/useGetChats";

const SidebarSearch = ({ search, setSearch }: { search: string, setSearch: (search: string) => void }) => (
  <form>
    <SidebarGroup className="py-0">
      <SidebarGroupContent className="relative">
        <Label htmlFor="search" className="sr-only">Search</Label>
        <SidebarInput 
          id="search" 
          placeholder="Search chats..." 
          className="pl-8" 
          value={search} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </SidebarGroupContent>
    </SidebarGroup>
  </form>
)

const Header = ({ search, setSearch }: { search: string, setSearch: (search: string) => void }) => {
  const { theme } = useTheme()

  const mainNav = [
    { 
      title: "New chat", 
      url: "/", 
      icon: <MessageCirclePlus className="text-sidebar-foreground/50"/>
    },
  ]

  return (
    <SidebarHeader>
      <div className="flex justify-between items-center m-2 mb-4">
        <img 
          src={theme === "light" ? carlyLogo : carlyDarkLogo} 
          alt="Carly AI" 
          height="40" 
          width="120"
        />
        <ModeToggle/>
      </div>
      <SidebarSearch search={search} setSearch={setSearch}/>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenu>
            {
              mainNav.map((nav, i) => (
                <SidebarMenuItem key={`nav_${i}`} className="mt-2 mx-1">
                  <SidebarMenuButton asChild>
                    <Link to={nav.url}>
                      {nav.icon}
                      <span>{nav.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            }
          </SidebarMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

export function AppSidebar() {
  const isMobile = useIsMobile()
  const [search, setSearch] = useState<string>("")
  const chats = useGetChats(search)

  return (
    <Sidebar>
      <Header search={search} setSearch={setSearch}/>
      <SidebarContent>
        <ChatList chats={chats} isMobile={isMobile}/>
      </SidebarContent>
    </Sidebar>
  )
}
  