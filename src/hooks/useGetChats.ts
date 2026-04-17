import { useEffect, useState } from "react"
import { getItem, STORAGE_UPDATED_EVENT } from "../utils/localStorage"
import { useDebounce } from "./use-mobile"
import type { NavItem } from "../types/sidebar"
import type { Chat } from "../types/chat"

const useGetChats = (search: string) => {
    const [chats, setChats] = useState<NavItem[]>([])
    const debouncedSearch = useDebounce(search, 500)

      const getChats = (filter: string) => {
        // Find chat IDs within localStorage
        const chats = Object.keys(localStorage)
            .filter((key) => key.match(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/))

        if (!chats.length) return []

        // Map through all chat IDs and get chat
        const allChats = chats
        .map((chatId) => {
            const chat = getItem<Chat>(chatId)

            if (!chat) return

            return { 
                id: chatId,
                name: chat.title, 
                url: `/chat/${chatId}`,
                favourite: chat.favourite ?? false
            }
        })
        .filter((chat) => (!!chat))

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

    return chats
} 

export default useGetChats