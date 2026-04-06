import { useEffect, useState } from 'react';
import Carly from '../components/Carly/Carly';
import PromptBar from '../components/PromptBar/PromptBar';
import { BotMessageSquare, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setItem } from '../utils/localStorage';
import { startConversation } from '../lib/chat';
import { useIsMobile } from '../hooks/use-mobile';
import { useTheme } from '../components/theme-provider';

const className = "flex flex-col items-center"

const generateId = () => {
	return crypto.randomUUID()
}

const suggestions = [
    "How many r's are there in 'strawberry'?",
    "What's the weather like today?",
    "Give me a healthy recipe to cook.",
    "Recommend a movie for me to watch."
]

const SuggestedPrompts = ({
    disabled,
    isMobile,
    handleSubmit
}: {
    disabled: boolean
    isMobile: boolean
    handleSubmit: (prompt: string) => void
}) => {
    const { theme } = useTheme()
    const [activeSuggestion, setActiveSuggestion] = useState<number | null>(null)

    const handleSuggestionClick = (suggestion: string, index: number) => {
        if (disabled) return

        if (isMobile) {
            setActiveSuggestion(index)
            window.setTimeout(() => setActiveSuggestion(null), 800)
        }

        handleSubmit(suggestion)
    }
    
    return (
        <div className='md:flex gap-2 grid grid-cols-2'>
            {
                suggestions.map((suggestion, i) => (
                    <div className='group relative p-[1px] overflow-hidden rounded-lg'>
                        <div 
                            key={`prompt_${i}`}
                            className={`${theme === "light" ? 'bg-white border-[#7F7F7F20]' : 'bg-[#1F1F1F] border-[#3A3A3A]'} border rounded-lg md:w-50 h-30 p-3 text-[14px] flex flex-col justify-between ${!disabled && 'cursor-pointer'}`}
                            onClick={() => handleSuggestionClick(suggestion, i)}
                        >
                            <Sparkles 
                                size={36} 
                                color={"#C5B4FA"} 
                                className={`p-2 border ${theme === "light" ? 'border-[#7F7F7F20]' : 'border-[#3A3A3A]' } rounded-full`}
                            />
                            {suggestion}
                        </div>
                        <div
                            className={`absolute top-1/2 left-1/2 w-[200%] h-[200%] animate-spin-slow opacity-0 transition-opacity duration-300 pointer-events-none ${isMobile ? activeSuggestion === i ? 'opacity-100' : '' : 'group-hover:opacity-100'}`}
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
        <div className={`${className} gap-10 md:justify-center justify-end m-4 overflow-hidden`}>
            <Carly cursorPos={cursorPos}/>
            <div className={`${className} gap-8`}>
                <h1 className='text-4xl font-medium text-center'>What can I help you with?</h1>
                <div className={`${className} w-full md:w-fit items-start gap-4`}>
                    <SuggestedPrompts 
                        disabled={isLoading}
                        isMobile={isMobile}
                        handleSubmit={handleSubmit}
                    />
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