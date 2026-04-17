import type { NavItem } from "./app-sidebar"
import ChatGroup from "./ChatGroup"

type Props = { 
    chats: NavItem[], 
    isMobile: boolean 
}

const ChatList = ({ 
  chats,
  isMobile
}: Props) => {
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

export default ChatList