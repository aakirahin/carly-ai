type Props = {
    offsetX: number;
    offsetY: number;
}

const Body = ({ offsetX, offsetY }: Props) => {
    return (
        <div className="absolute inset-[18.81%_18.01%_29.45%_18.24%]">
            <div className="absolute inset-[-34.27%_-30.88%]" style={{ transform: `translate(-${offsetX}px, -${offsetY}px)`, transition: 'transform 0.1s ease-out' }}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 261.93 245.906">
                    <g id="Group 2">
                        <g filter="url(#filter0_f_1_476)" id="Ellipse 6">
                            <circle cx="103.133" cy="103.133" fill="var(--fill-0, #1D5DFF)" fillOpacity="0.15" r="53.1332" />
                        </g>
                        <g filter="url(#filter1_f_1_476)" id="Ellipse 8">
                            <circle cx="156.266" cy="152.893" fill="var(--fill-0, #FF1DE8)" fillOpacity="0.15" r="43.0126" />
                        </g>
                        <g filter="url(#filter2_f_1_476)" id="Ellipse 9">
                            <circle cx="112.41" cy="146.989" fill="var(--fill-0, #638CF4)" fillOpacity="0.15" r="43.856" />
                        </g>
                        <g filter="url(#filter3_f_1_476)" id="Ellipse 7">
                            <circle cx="171.447" cy="103.133" fill="var(--fill-0, #7E41F8)" fillOpacity="0.15" r="40.4825" />
                        </g>
                    </g>
                    <defs>
                        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="206.266" id="filter0_f_1_476" width="206.266" x="6.25849e-07" y="-9.31323e-07">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                            <feGaussianBlur result="effect1_foregroundBlur_1_476" stdDeviation="25" />
                        </filter>
                        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="186.025" id="filter1_f_1_476" width="186.025" x="63.2539" y="59.8803">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                            <feGaussianBlur result="effect1_foregroundBlur_1_476" stdDeviation="25" />
                        </filter>
                        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="187.712" id="filter2_f_1_476" width="187.712" x="18.5545" y="53.1332">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                            <feGaussianBlur result="effect1_foregroundBlur_1_476" stdDeviation="25" />
                        </filter>
                        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="180.965" id="filter3_f_1_476" width="180.965" x="80.9649" y="12.6508">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                            <feGaussianBlur result="effect1_foregroundBlur_1_476" stdDeviation="25" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </div>
    );
}

export default Body