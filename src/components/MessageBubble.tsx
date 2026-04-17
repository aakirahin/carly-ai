import { useTheme } from './theme-provider'
import carly from '../assets/carly.svg'
import carlyDark from '../assets/carly_dark.svg'

type Props = {
    content: string
    ai?: boolean
}

const getTheme = (ai: boolean, theme: "light" | "dark" | "system") => {
    if (ai) return theme === "light" ? "bg-[#7F7F7F10]" : "bg-[#383838]"
    else return theme === "light" ? "bg-[#7F7F7F20]" : "bg-[#303030]"
}

const MessageBubble = ({
    content,
    ai = false
}: Props) => {
    const { theme } = useTheme()
    
    return (
        <div className={`flex ${ai ? "gap-2 items-end" : "justify-end"}`}>
            {
                ai &&
                <img 
                    src={theme === "light" ? carly : carlyDark} 
                    alt="Carly"
                    height="50"
                    width="50"
                />
            }
            <p className={`px-3 py-2 ${getTheme(ai, theme)} rounded-lg w-fit`}>
                {content}
            </p>
        </div>
    )
}

export default MessageBubble