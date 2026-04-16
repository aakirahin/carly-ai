import Body from './Body'
import Face from './Face'
import { useTheme } from '../theme-provider'
import { useEyeTracking } from '../../hooks/useEyeTracking'

type Props = {
    cursorPos: { x: number, y: number }
}

const Carly = ({
    cursorPos
}: Props) => {
    const { theme } = useTheme()
    const { characterRef, eyePositions, backgroundOffset } = useEyeTracking(cursorPos)
    
    return (
        <div className="h-[282px] w-[254px]" ref={characterRef} style={{ animation: 'float 3s ease-in-out infinite' }}>
            <div className="absolute inset-[6.03%_7.09%_16.67%_7.09%] overflow-visible">
                <div className="absolute inset-[-13.76%] overflow-visible">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 278 278">
                        <g filter="url(#filter0_di_1_494)" id="Ellipse 5">
                            <circle cx="139" cy="139" fill={`var(--fill-0, ${theme === "light" ? "#FCFCFC" : "#1F1F1F"})`} r="109" />
                            <circle cx="139" cy="139" r="108.5" stroke="url(#paint0_linear_1_494)" />
                        </g>
                        <defs>
                            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_494" x1="139" x2="139" y1="30" y2="248">
                                <stop stopColor="#C7ACFF" stopOpacity="0.25" />
                                <stop offset="1" stopColor="#56B3FF" stopOpacity="0.25" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
            <div className="absolute inset-[85.82%_13.39%_2.13%_12.99%]">
                <div className="absolute inset-[-147.06%_-26.74%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 287 134">
                        <g filter="url(#filter0_f_1_488)" id="circle2">
                            <ellipse cx="143.5" cy="67" fill="url(#paint0_radial_1_488)" fillOpacity="0.75" rx="93.5" ry="17" />
                        </g>
                        <defs>
                            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="134" id="filter0_f_1_488" width="287" x="0" y="0">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                                <feGaussianBlur result="effect1_foregroundBlur_1_488" stdDeviation="25" />
                            </filter>
                            <radialGradient cx="0" cy="0" gradientTransform="matrix(80 -1.40039e-06 -0.0432524 14.5456 143.5 67)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_488" r="1">
                                <stop stopColor="#BB6EFF" />
                                <stop offset="1" stopColor="#C2CCFF" stopOpacity="0.75" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
            <Body offsetX={backgroundOffset.offsetX} offsetY={backgroundOffset.offsetY} />
            <Face leftEyeX={eyePositions.leftEyeX} rightEyeX={eyePositions.rightEyeX} eyeY={eyePositions.eyeY} />
        </div>
    )
}

export default Carly
