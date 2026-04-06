import { 
  EllipsisVertical, 
  MessageCirclePlus, 
  Pencil, 
  Search, 
  Star, 
  Trash2,
  X 
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarInput, 
  SidebarMenu, 
  SidebarMenuAction, 
  SidebarMenuButton, 
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Label } from "./ui/label";
import carlyLogo from "../assets/logo.svg"
import { useDebounce, useIsMobile } from "../hooks/use-mobile";
import { getItem, removeItem, setItem, STORAGE_UPDATED_EVENT } from "../utils/localStorage";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./ui/input-group";

type NavItem = {
  id: string
  name: string
  url: string
  favourite: boolean
}

type EditItem = {
  chatId: string
  isEditing: boolean
  newTitle: string
}

const menuItemActions = [
  { 
    name: "Rename chat", 
    icon: <Pencil className="text-muted-foreground" />,
    onClick: (chat: NavItem, setEdit: (edit: EditItem) => void) => setEdit({ chatId: chat.id, isEditing: true, newTitle: "" })
  },
  { 
    name: "Toggle favourite", 
    icon: <Star className="text-muted-foreground" />,
    onClick: (chat: NavItem) => {
      const { id, favourite } = chat
      const chatItem = getItem(id)
      setItem(id, { ...chatItem, favourite: !favourite })
    }
  },
  { 
    name: "Delete", 
    icon: <Trash2 className="text-muted-foreground" />,
    onClick: (chat: NavItem) => removeItem(chat.id)
  },
]

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
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </SidebarGroupContent>
    </SidebarGroup>
  </form>
)
  

const MenuItemActions = ({ 
  chat, 
  isMobile,
  setEdit
}: { chat: NavItem, isMobile: boolean, setEdit: (edit: EditItem) => void }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <SidebarMenuAction showOnHover className="text-sidebar-foreground/50">
        <EllipsisVertical className="rotate-90"/>
        <span className="sr-only">More</span>
      </SidebarMenuAction>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      className="w-56 rounded-lg"
      side={isMobile ? 'bottom' : 'right'}
      align={isMobile ? 'end' : 'start'}
    >
      {
        menuItemActions.map((action, i) => (
          <DropdownMenuItem 
            key={`menuItemAction_${i}`} 
            className="m-1"
            onClick={() => action.onClick(chat, setEdit)}
          >
            {action.icon}
            <span>{action.name}</span>
          </DropdownMenuItem>
        ))
      }
    </DropdownMenuContent>
  </DropdownMenu>
)

const Header = ({ search, setSearch }: { search: string, setSearch: (search: string) => void }) => {
  const { toggleSidebar } = useSidebar()
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
          src={carlyLogo} 
          alt="Carly AI" 
          height="40" 
          width="120"
        />
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <SidebarSearch search={search} setSearch={setSearch}/>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenu>
            {
              mainNav.map((nav, i) => (
                <SidebarMenuItem key={`nav_${i}`} className="mt-2 mx-1">
                  <SidebarMenuButton asChild>
                    <a href={nav.url}>
                      {nav.icon}
                      <span>{nav.title}</span>
                    </a>
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
  

const ChatGroup = ({ 
  chats, 
  title,
  isMobile
}: { chats: NavItem[], title: string, isMobile: boolean }) => {
  const [edit, setEdit] = useState<EditItem>({
    chatId: "",
    isEditing: false,
    newTitle: ""
  })

  const handleEdit = (chatId: string) => {
    const chat = getItem(chatId)
    setItem(chatId, { ...chat, title: edit.newTitle })
    setEdit({
      chatId: "",
      isEditing: false,
      newTitle: ""
    })
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-sidebar-foreground/70 uppercase">{title}</SidebarGroupLabel>
      <SidebarMenu>
        {
          chats.map((chat, i) => (
            <SidebarMenuItem key={`chat_${i}`} className="mt-2 mx-1">
                {
                  edit.chatId === chat.id && edit.isEditing ?
                  <InputGroup>
                    <InputGroupInput 
                      placeholder={chat.name} 
                      value={edit.newTitle}
                      onChange={(e) => setEdit({ ...edit, newTitle: e.target.value })}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton 
                        variant="secondary"
                        disabled={!edit.newTitle}
                        onClick={() => handleEdit(chat.id)}
                      >
                        Save
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup> :
                  <SidebarMenuButton asChild>
                    <a href={chat.url} title={chat.name}>
                      {chat.favourite && <Star className="text-sidebar-foreground/50"/>}
                      <span>{chat.name}</span>
                    </a>
                  </SidebarMenuButton>
                }
              {
                !edit.isEditing &&
                <MenuItemActions 
                  chat={chat} 
                  isMobile={isMobile}
                  setEdit={setEdit}
                />
              }
            </SidebarMenuItem>
          ))
        }
      </SidebarMenu>
    </SidebarGroup>
  )
}
  
const Chats = ({ 
  chats,
  isMobile
}: { chats: NavItem[], isMobile: boolean }) => {
  const favourites = chats.filter((chat) => chat.favourite)
  const nonFavourites = chats.filter((chat) => !chat.favourite)

  return (
    <>
      {
        !!favourites.length && 
        <ChatGroup 
          chats={favourites} 
          title="Favourites"
          isMobile={isMobile}
        />
      }
      {
        !!nonFavourites.length &&
        <ChatGroup 
          chats={nonFavourites} 
          title="Chats"
          isMobile={isMobile}
        />
      }
    </>
  )
}

export function AppSidebar() {
  const isMobile = useIsMobile()
  const [chats, setChats] = useState<NavItem[]>([])
  const [search, setSearch] = useState<string>("")
  const debouncedSearch = useDebounce(search, 500)

  const getChats = (filter: string) => {
    const chats = Object.keys({ ...localStorage }).filter((key) => key.length === 36)

    if (!chats.length) return []

    const allChats = chats.map((chatId) => {
      const chat = getItem(chatId)
      return { 
        id: chatId,
        name: chat.title, 
        url: `/chat/${chatId}`,
        favourite: chat.favourite ?? false
      }
    })

    return filter ? allChats.filter((chat) => chat.name.toLowerCase().includes(filter.toLowerCase())) : allChats
  }

  useEffect(() => {
    const syncChats = () => {
      setChats(getChats(debouncedSearch))
    }

    syncChats()

    window.addEventListener(STORAGE_UPDATED_EVENT, syncChats)
    window.addEventListener("storage", syncChats)

    return () => {
      window.removeEventListener(STORAGE_UPDATED_EVENT, syncChats)
      window.removeEventListener("storage", syncChats)
    }
  }, [debouncedSearch])

  return (
    <Sidebar>
      <Header search={search} setSearch={setSearch}/>
      <SidebarContent>
        <Chats chats={chats} isMobile={isMobile}/>
      </SidebarContent>
    </Sidebar>
  )
}
  