import { useEffect, useState } from 'react';
import Carly from '../components/Carly/Carly';
import PromptBar from '../components/PromptBar/PromptBar';
import { BotMessageSquare } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import SuggestedPrompts from './SuggestedPrompts';
import useSendMessage from '../hooks/useSendMessage';

const className = "flex flex-col items-center"

const NewChat = () => {
    const isMobile = useIsMobile()
    const [prompt, setPrompt] = useState<string>("")
    const { isLoading, startChat } = useSendMessage()
    
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
                        handleSubmit={startChat}
                    />
                    <PromptBar 
                        prompt={prompt}
                        setPrompt={setPrompt}
                        isLoading={isLoading} 
                        handleSubmit={startChat}    
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