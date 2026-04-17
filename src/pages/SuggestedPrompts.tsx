import { Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../components/theme-provider'

type Props = {
    disabled: boolean
    isMobile: boolean
    handleSubmit: (prompt: string) => void
}

const suggestions = [
    {
        id: 1,
        suggestion: "How many r's are there in 'strawberry'?",
    },
    {
        id: 2,
        suggestion: "What's the weather like today?",
    },
    {
        id: 3,
        suggestion: "Give me a healthy recipe to cook.",
    },
    {
        id: 4,
        suggestion: "Recommend a movie for me to watch.",
    },
]

const SuggestedPrompts = ({
    disabled,
    isMobile,
    handleSubmit
}: Props) => {
    const { theme } = useTheme()
    const [activeSuggestion, setActiveSuggestion] = useState<number | null>(null)
    const mobileGlowTimerRef = useRef<number | null>(null)

    // Clean up timeout
    useEffect(() => {
        return () => {
            if (mobileGlowTimerRef.current !== null) window.clearTimeout(mobileGlowTimerRef.current)
        }
    }, [])

    const handleSuggestionClick = (suggestion: { id: number, suggestion: string }) => {
        if (disabled) return

        if (isMobile) {
            setActiveSuggestion(suggestion.id)

            if (mobileGlowTimerRef.current !== null) {
                window.clearTimeout(mobileGlowTimerRef.current)
            }

            // If clicked on when in mobile view, set suggested prompted as active for 1s so the border glows whilst loading
            mobileGlowTimerRef.current = window.setTimeout(() => {
                setActiveSuggestion(null)
                mobileGlowTimerRef.current = null
            }, 1000)
        }

        handleSubmit(suggestion.suggestion)
    }
    
    return (
        <div className='md:flex gap-2 grid grid-cols-2'>
            {
                suggestions.map((suggestion) => (
                    <div 
                        key={`prompt_${suggestion.id}`}
                        className='group relative p-[1px] overflow-hidden rounded-lg'
                    >
                        <div
                            className={`${theme === "light" ? 'bg-white border-[#7F7F7F20]' : 'bg-[#1F1F1F] border-[#3A3A3A]'} border rounded-lg md:w-50 h-30 p-3 text-[14px] flex flex-col justify-between ${!disabled && 'cursor-pointer'}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <Sparkles 
                                size={36} 
                                color={"#C5B4FA"} 
                                className={`p-2 border ${theme === "light" ? 'border-[#7F7F7F20]' : 'border-[#3A3A3A]' } rounded-full`}
                            />
                            {suggestion.suggestion}
                        </div>
                        <div
                            className={`absolute top-1/2 left-1/2 w-[200%] h-[200%] animate-spin-slow opacity-0 transition-opacity duration-300 pointer-events-none ${isMobile ? activeSuggestion === suggestion.id ? 'opacity-100' : '' : 'group-hover:opacity-100'}`}
                            style={{ background: "conic-gradient(transparent, #C58EFF, #709DFF, transparent)", zIndex: -1 }}
                        ></div>
                    </div>
                ))
            }
        </div>
    )
}

export default SuggestedPrompts