import { useParams } from 'react-router-dom'
import { useState } from 'react'
import PromptBar from '../components/PromptBar/PromptBar'
import UserMessage from '../components/Messages/UserMessage'
import CarlyMessage from '../components/Messages/CarlyMessage'
import { BotMessageSquare, Frown } from 'lucide-react'
import { getItem, setItem } from '../utils/localStorage'
import type { Chat as ChatType, Message } from '../utils/type'
import { getResponse } from '../lib/chat'
import { useIsMobile } from '../hooks/use-mobile'

const Chat = () => {
    const { chatId } = useParams()
    const isMobile = useIsMobile()
    const [prompt, setPrompt] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const chat: ChatType | undefined = getItem<ChatType>(chatId!)

    const handleSubmit = async () => {
        if (!chat || prompt === "") return

        setIsLoading(true)

        const messages: Message[] = [
            ...chat.messages, 
            {
                id: crypto.randomUUID(),
                role: "user",
                content: prompt
            }
        ]
        setItem<ChatType>(chatId!, { ...chat, messages })
        setPrompt("")
        
        try {
            const response = await getResponse(messages)
            
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
    
            setItem(chatId!, newChat)    
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        (!chatId || !chat) ?
        <div className='flex flex-col gap-2 justify-center items-center'>
            <p className='text-4xl font-medium flex gap-2 items-center'>404 <Frown size={36}/></p>
            <p className='text-2xl font-medium'>Chat not found.</p>
        </div> :
        <div className='flex flex-col m-4 justify-end w-full md:gap-4 gap-6'>
            {
                chat.messages.map((msg: Message) => {
                    if (msg.role === "user") return <UserMessage key={msg.id} content={msg.content}/>
                    if (msg.role === "assistant") return <CarlyMessage key={msg.id} content={msg.content}/>
                    return
                })
            }
            {
                !isMobile && isLoading &&
                <span className='flex items-center gap-1.5 mt-0 m-2'>
                    <BotMessageSquare size={16} color='#7F7F7F80'/>
                    <p className='animate-pulse'>
                        Thinking...
                    </p>
                </span>
            }
            <PromptBar 
                prompt={prompt}
                setPrompt={setPrompt}
                isLoading={isLoading}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default Chat