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
  return (
    <div className='flex border border-[#7F7F7F20] rounded-full p-2 items-center w-full'>
      <input 
        type='text' 
        placeholder='Ask me anything...' 
        className='focus:outline-none w-full px-2'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isLoading}
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
    </div>
  )
}

export default PromptBar