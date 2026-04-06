import { useEffect, useRef, useState } from 'react'
import Body from './Body'
import Face from './Face'

type Props = {
    cursorPos: { x: number, y: number }
}

const Carly = ({
    cursorPos
}: Props) => {
    const characterRef = useRef<HTMLDivElement>(null);
    const [eyePositions, setEyePositions] = useState({ leftEyeX: 10, rightEyeX: 74, eyeY: 10 });
    const [backgroundOffset, setBackgroundOffset] = useState({ offsetX: 0, offsetY: 0 });

    useEffect(() => {
        if (!characterRef.current) return;

        const characterRect = characterRef.current.getBoundingClientRect();
        const characterCenterX = characterRect.left + characterRect.width / 2;
        const characterCenterY = characterRect.top + characterRect.height / 2;

        const deltaX = cursorPos.x - characterCenterX;
        const deltaY = cursorPos.y - characterCenterY;
        const angle = Math.atan2(deltaY, deltaX);

        const maxMovementX = 15;
        const maxMovementY = 12;
        const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 100, 1);

        const offsetX = Math.cos(angle) * maxMovementX * distance;
        const offsetY = Math.sin(angle) * maxMovementY * distance;

        const leftEyeBase = 10;
        const rightEyeBase = 74;
        const eyeYBase = 10;

        setEyePositions({
            leftEyeX: Math.max(2, Math.min(18, leftEyeBase + offsetX)),
            rightEyeX: Math.max(66, Math.min(82, rightEyeBase + offsetX)),
            eyeY: Math.max(0, Math.min(20, eyeYBase + offsetY))
        });

        setBackgroundOffset({
            offsetX: offsetX * 1.2,
            offsetY: offsetY * 1.2
        });
    }, [cursorPos.x, cursorPos.y]);
    
    return (
        <div className="h-[282px] w-[254px]" ref={characterRef} style={{ animation: 'float 3s ease-in-out infinite' }}>
            <div className="absolute inset-[6.03%_7.09%_16.67%_7.09%] overflow-visible">
                <div className="absolute inset-[-13.76%] overflow-visible">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 278 278">
                        <defs>
                            <filter id="whiteGlow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="8"/>
                                <feOffset dx="0" dy="0" result="offsetblur"/>
                                <feFlood floodColor="white" floodOpacity="0.6"/>
                                <feComposite in2="offsetblur" operator="in"/>
                                <feMerge>
                                    <feMergeNode/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        <g filter="url(#filter0_di_1_494) url(#whiteGlow)" id="Ellipse 5">
                            <circle cx="139" cy="139" fill="var(--fill-0, white)" r="109" />
                            <circle cx="139" cy="139" r="108.5" stroke="url(#paint0_linear_1_494)" />
                        </g>
                        <defs>
                            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="278" id="filter0_di_1_494" width="278" x="0" y="0">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                <feMorphology in="SourceAlpha" operator="dilate" radius="10" result="effect1_dropShadow_1_494" />
                                <feOffset />
                                <feGaussianBlur stdDeviation="10" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
                                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_494" />
                                <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_494" mode="normal" result="shape" />
                                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                <feOffset />
                                <feGaussianBlur stdDeviation="20" />
                                <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.923177 0 0 0 0 0.884766 0 0 0 0 1 0 0 0 0.5 0" />
                                <feBlend in2="shape" mode="normal" result="effect2_innerShadow_1_494" />
                            </filter>
                            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_494" x1="139" x2="139" y1="30" y2="248">
                                <stop stopColor="#C7ACFF" stopOpacity="0.25" />
                                <stop offset="1" stopColor="#C7E6FF" stopOpacity="0.25" />
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
                                <stop stopColor="#A071FF" />
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