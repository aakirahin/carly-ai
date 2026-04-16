import carly from '../../assets/carly.svg'
import carlyDark from '../../assets/carly_dark.svg'
import { useTheme } from '../theme-provider'

type Props = {
    content: string
}

const CarlyMessage = ({
    content
}: Props) => {
    const { theme } = useTheme()

    return (
        <div className='flex gap-2 items-end'>
            <img 
                src={theme === "light" ? carly : carlyDark} 
                alt="Carly"
                height="50"
                width="50"
            />
            <p className={`px-3 py-2 ${theme === "light" ? "bg-[#7F7F7F10]" : "bg-[#383838]" } rounded-lg w-fit h-fit`}>
                {content}
            </p>
        </div>
    )
}

export default CarlyMessage