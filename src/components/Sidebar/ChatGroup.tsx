import { useState } from "react"
import { getItem, removeItem, setItem } from "../../utils/localStorage"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group"
import { Link } from "react-router-dom"
import { EllipsisVertical, Pencil, Star, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import type { EditItem, NavItem } from "../../types/sidebar"
import type { Chat } from "../../types/chat"

type Props = { 
    chats: NavItem[], 
    title: string, 
    isMobile: boolean 
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
            setItem<Chat>(id, { ...chatItem as Chat, favourite: !favourite })
        }
    },
    { 
        name: "Delete", 
        icon: <Trash2 className="text-muted-foreground" />,
        onClick: (chat: NavItem) => removeItem(chat.id)
    },
]

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

const ChatGroup = ({ 
  chats, 
  title,
  isMobile
}: Props) => {
    const [edit, setEdit] = useState<EditItem>({
        chatId: "",
        isEditing: false,
        newTitle: ""
    })

    const handleEdit = (chatId: string) => {
        const chat = getItem(chatId)
        setItem<Chat>(chatId, { ...chat as Chat, title: edit.newTitle })
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
                                    <Link to={chat.url} title={chat.name}>
                                        {chat.favourite && <Star className="text-sidebar-foreground/50"/>}
                                        <span>{chat.name}</span>
                                    </Link>
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

export default ChatGroup