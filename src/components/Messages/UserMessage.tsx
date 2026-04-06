import React from 'react'

type Props = {
    content: string
}

const UserMessage = ({
    content
}: Props) => {
  return (
    <div className='flex justify-end'>
        <p className='px-3 py-2 bg-[#7F7F7F25] rounded-lg w-fit'>
            {content}
        </p>
    </div>
  )
}

export default UserMessage