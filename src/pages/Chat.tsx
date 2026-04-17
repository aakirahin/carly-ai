import { useParams } from 'react-router-dom'
import { useState } from 'react'
import PromptBar from '../components/PromptBar/PromptBar'
import { BotMessageSquare, Frown } from 'lucide-react'
import { getItem } from '../utils/localStorage'
import { useIsMobile } from '../hooks/use-mobile'
import type { Chat, Message } from '../types/chat'
import MessageBubble from '../components/MessageBubble'
import useSendMessage from '../hooks/useSendMessage'

const Chat = () => {
    const { chatId } = useParams()
    const isMobile = useIsMobile()
    const [prompt, setPrompt] = useState<string>("")
    const chat: Chat | undefined = chatId ? getItem<Chat>(chatId) : undefined
    const { isLoading, continueChat } = useSendMessage()

    const handleSubmit = (prompt: string) => {
        if (!chatId || !chat) return
        continueChat(chatId, chat, prompt)
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
                    if (msg.content === null) return "Something went wrong."
                    if (msg.role === "user") return <MessageBubble key={msg.id} content={msg.content}/>
                    if (msg.role === "assistant") return <MessageBubble key={msg.id} content={msg.content} ai/>
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