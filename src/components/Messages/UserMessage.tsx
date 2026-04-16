import { useTheme } from "../theme-provider"

type Props = {
    content: string
}

const UserMessage = ({
    content
}: Props) => {
    const { theme } = useTheme()

    return (
        <div className='flex justify-end'>
            <p className={`px-3 py-2 ${theme === "light" ? "bg-[#7F7F7F20]" : "bg-[#303030]" } rounded-lg w-fit`}>
                {content}
            </p>
        </div>
    )
}

export default UserMessage