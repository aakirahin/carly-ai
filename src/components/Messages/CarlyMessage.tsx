import React from 'react'
import carly from '../../assets/carly.svg'

type Props = {
    content: string
}

const CarlyMessage = ({
    content
}: Props) => {
    return (
        <div className='flex gap-2 items-center'>
            <img 
                src={carly} 
                height="40" 
                width="40"
            />
            <p className='px-3 py-2 bg-[#7F7F7F08] rounded-lg w-fit h-fit'>
                {content}
            </p>
        </div>
    )
}

export default CarlyMessage