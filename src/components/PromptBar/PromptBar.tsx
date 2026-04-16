import { useTheme } from '../theme-provider'
import SparkleButton from './SparkleButton'

type Props = {
  prompt: string
  setPrompt: (prompt: string) => void
  isLoading: boolean
  handleSubmit: (prompt: string) => void
}

const PromptBar = ({
  prompt,
  setPrompt,
  isLoading,
  handleSubmit,
}: Props) => {
  const { theme } = useTheme()

  return (
    <form className={`flex border rounded-full p-2 items-center w-full ${theme === "light" ? 'bg-white border-[#7F7F7F20]' : 'bg-[#1F1F1F] border-[#3A3A3A]'}`}>
      <input 
        type='text' 
        placeholder='Ask me anything...' 
        className='focus:outline-none w-full px-2'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isLoading}
        onSubmit={() => handleSubmit(prompt)}
      />
      <button 
        onClick={() => handleSubmit(prompt)} 
        disabled={isLoading || !prompt.length}
      >
        <SparkleButton 
          isLoading={isLoading}
          disabled={isLoading || !prompt.length}
        />
      </button>
    </form>
  )
}

export default PromptBar