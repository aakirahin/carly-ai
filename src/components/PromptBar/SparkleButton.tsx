import { ArrowUp } from 'lucide-react';
import { useState } from 'react'
import { Spinner } from '../ui/spinner';

type Props = {
    isLoading: boolean
    disabled: boolean
}

type SparkleProps = {
  x: number;
  y: number;
  delay: number;
}

const SparkleButton = ({ 
    isLoading,
    disabled 
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`relative w-8 h-8 ${!disabled && 'cursor-pointer'}`}
            data-name="ArrowUp"
            onMouseEnter={() => setIsHovered(disabled ? false : true)}
            onMouseLeave={() => setIsHovered(false)}
        >
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
            <g id="arrow-up">
                <rect fill="url(#paint0_linear_1_450)" height="36" rx="18" width="36" />
            </g>
            <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_450" x1="30" x2="40" y1="40" y2="0">
                    <stop stopColor="#709DFF" stopOpacity={isHovered ? "0.8" : "0.5"} style={{ transition: 'all 0.3s ease' }}/>
                    <stop offset="2" stopColor="#C58EFF" stopOpacity={isHovered ? "0.8" : "0.5"} style={{ transition: 'all 0.3s ease' }}/>
                </linearGradient>
            </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {
                isLoading ?
                <Spinner color='white'/> :
                <ArrowUp color="white" size={18} />
            }
        </div>
        {
            isHovered && 
            <>
                <Sparkle delay={0} x={-15} y={-10} />
                <Sparkle delay={0.1} x={25} y={-5} />
                <Sparkle delay={0.2} x={-10} y={20} />
                <Sparkle delay={0.05} x={25} y={15} />
                <Sparkle delay={0.15} x={0} y={-20} />
                <Sparkle delay={0.25} x={-25} y={0} />
            </>
        }
        </div>
    );
}

const Sparkle = ({ x, y, delay }: SparkleProps) => {
    return (
        <div
            className="absolute pointer-events-none"
            style={{
                left: `calc(20% + ${x}px)`,
                top: `calc(20% + ${y}px)`,
                animation: `sparkle 1s ease-out ${delay}s infinite`
            }}
        >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: 'translate(-25%, -50%)' }}>
                <path
                    d="M8 0L8.9 5.8L14 8L8.9 10.2L8 16L7.1 10.2L2 8L7.1 5.8L8 0Z"
                    fill="url(#sparkle-gradient)"
                    opacity="0.8"
                />
                <defs>
                    <linearGradient id="sparkle-gradient" x1="8" y1="0" x2="8" y2="16">
                        <stop stopColor="#C58EFF" />
                        <stop offset="1" stopColor="#709DFF" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

export default SparkleButton
