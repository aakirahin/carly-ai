import { useEffect, useState } from 'react';
import Carly from '../components/Carly/Carly';
import PromptBar from '../components/PromptBar/PromptBar';
import { BotMessageSquare, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setItem } from '../utils/localStorage';
import { startConversation } from '../lib/chat';
import { useIsMobile } from '../hooks/use-mobile';

const className = "flex flex-col items-center"

const generateId = () => {
	return crypto.randomUUID()
}

const suggestions = [
    "How many r's are there in 'strawberry'?",
    "What's the weather like today?",
    "Give me a healthy recipe to cook for dinner tonight."
]

const SuggestedPrompts = ({ disabled, handleSubmit }: { disabled: boolean, handleSubmit: (prompt: string) => void }) => {
    return (
        <div className='flex gap-2'>
            {
                suggestions.map((suggestion, i) => (
                    <div className='group relative p-[1px] overflow-hidden rounded-lg'>
                        <div 
                            key={`prompt_${i}`}
                            className={`bg-white border border-[#7F7F7F20] rounded-lg w-50 h-40 p-3 text-[14px] flex flex-col justify-between ${!disabled && 'cursor-pointer'}`}
                            onClick={() => handleSubmit(suggestion)}
                        >
                            <Sparkles 
                                size={36} 
                                color={"#C5B4FA"} 
                                className='p-2 border border-[#7F7F7F20] rounded-full'
                            />
                            {suggestion}
                        </div>
                        <div
                            className="absolute top-1/2 left-1/2 w-[200%] h-[200%] animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{ background: "conic-gradient(transparent, #C58EFF, #709DFF, transparent)", zIndex: -1 }}
                        ></div>
                    </div>
                ))
            }
        </div>
    )
}

const NewChat = () => {
    const isMobile = useIsMobile()

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [prompt, setPrompt] = useState<string>("")

    const handleSubmit = async (prompt: string) => {
        setIsLoading(true)

        const id = generateId()
        const response = await startConversation(prompt)
        const chat = {
            id,
            title: prompt,
            created: response.created,
            favourite: false,
            messages: [
                {
                    role: "user",
                    content: prompt
                },
                {
                    role: "assistant",
                    content: response.choices[0].message.content,
                    reasoning: response.choices[0].message.reasoning
                }
            ]
        }

        setItem(id, chat)
        setIsLoading(false)
        navigate(`/chat/${id}`)
        
        return
    }
    
    // CARLY
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className={`${className} gap-10 md:justify-center justify-end m-4`}>
            <Carly cursorPos={cursorPos}/>
            <div className={`${className} gap-8 justify-between h-80`}>
                <h1 className='text-4xl font-medium text-center'>What can I help you with?</h1>
                <div className={`${className} w-full md:w-fit items-start gap-4`}>
                    {
                        !isMobile &&
                        <SuggestedPrompts 
                            disabled={isLoading}
                            handleSubmit={handleSubmit}
                        />
                    }
                    <PromptBar 
                        prompt={prompt}
                        setPrompt={setPrompt}
                        isLoading={isLoading} 
                        handleSubmit={handleSubmit}    
                    />
                    {
                        !isMobile && isLoading &&
                        <span className='flex items-center gap-1.5 mt-0 m-2'>
                            <BotMessageSquare size={16} color='#7F7F7F80'/>
                            <p className='animate-pulse'>
                                Thinking...
                            </p>
                        </span>
                    }
                </div>
            </div>
        </div>
    )
}

export default NewChat