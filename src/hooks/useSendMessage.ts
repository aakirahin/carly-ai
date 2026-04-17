import { useNavigate } from "react-router-dom"
import { getResponse } from "../lib/chat"
import type { Chat, Message } from "../types/chat"
import { setItem } from "../utils/localStorage"
import { useState } from "react"

const useSendMessage = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const startChat = async (prompt: string) => {
        if (prompt === "") return
        setIsLoading(true)
        const id = crypto.randomUUID()

        try {
            const response = await getResponse(false, prompt)
    
            const chat: Chat = {
                id,
                title: prompt,
                created: response?.created,
                favourite: false,
                messages: [
                    {
                        id: "1",
                        role: "user",
                        content: prompt
                    },
                    {
                        id: response?.id,
                        role: "assistant",
                        content: response?.choices?.[0]?.message?.content,
                        reasoning: response?.choices?.[0]?.message?.reasoning
                    }
                ]
            }
    
            setItem<Chat>(id, chat)
            navigate(`/chat/${id}`)
        } catch (e) {
        console.error(e)
        } finally {
            setIsLoading(false)
        }
    }
    
    const continueChat = async (chatId: string, chat: Chat, prompt: string) => {
        if (!chatId || !chat || prompt === "") return
        setIsLoading(true)

        const messages: Message[] = [
            ...chat.messages, 
            {
                id: crypto.randomUUID(),
                role: "user",
                content: prompt
            }
        ]
        setItem<Chat>(chatId, { ...chat, messages })
        
        try {
            const response = await getResponse(true, messages)
            
            const newChat = {
                ...chat,
                messages: [
                    ...messages,
                    {
                        id: response?.id,
                        role: "assistant",
                        content: response?.choices?.[0]?.message?.content,
                        reasoning: response?.choices?.[0]?.message?.reasoning
                    }
                ]
            }
    
            setItem(chatId, newChat)    
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, startChat, continueChat }
}

export default useSendMessage