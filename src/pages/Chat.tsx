import { useParams } from 'react-router-dom'
import { useState } from 'react'
import PromptBar from '../components/PromptBar/PromptBar'
import UserMessage from '../components/Messages/UserMessage'
import CarlyMessage from '../components/Messages/CarlyMessage'
import { BotMessageSquare } from 'lucide-react'
import { getItem, setItem } from '../utils/localStorage'
import type { Chat, Message } from '../utils/type'
import { getResponse } from '../lib/chat'

const Chat = () => {
    const { chatId } = useParams()
    const chat: Chat = getItem(chatId)

    const [prompt, setPrompt] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async () => {
        setIsLoading(true)

        const messages: Message[] = [
            ...chat.messages, 
            {
                role: "user",
                content: prompt
            }
        ]
        setItem(chatId, { ...chat, messages })
        setPrompt("")
        
        const response = await getResponse(messages) // check chat has been updated
        const newChat = {
            ...chat,
            messages: [
                ...messages,
                {
                    role: "assistant",
                    content: response.choices[0].message.content,
                    reasoning: response.choices[0].message.reasoning
                }
            ]
        }

        setItem(chatId, newChat)
        setIsLoading(false)

        return
    }

    return (
        <div className='flex flex-col m-4 justify-end w-full gap-4'>
            {
                chat.messages.map((msg: Message) => {
                    if (msg.role === "user") return <UserMessage content={msg.content}/>
                    if (msg.role === "assistant") return <CarlyMessage content={msg.content}/>
                })
            }
            {
                isLoading &&
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