type Props = {
    leftEyeX: number;
    rightEyeX: number;
    eyeY: number;
}

const Face = ({ leftEyeX, rightEyeX, eyeY }: Props) => {
    return (
        <div className="absolute h-[44px] left-[85px] top-[79px] w-[64px] overflow-visible">
            <div className="absolute inset-[0_-31.25%_0_0] overflow-visible">
                <svg className="block size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 84 44">
                    <g id="eyes">
                        <line
                            id="left_eye"
                            stroke="var(--stroke-0, white)"
                            strokeLinecap="round"
                            strokeWidth="20"
                            x1={leftEyeX}
                            x2={leftEyeX}
                            y1={eyeY}
                            y2={eyeY + 24}
                        />
                        <line
                            id="right_eye"
                            stroke="var(--stroke-0, white)"
                            strokeLinecap="round"
                            strokeWidth="20"
                            x1={rightEyeX}
                            x2={rightEyeX}
                            y1={eyeY}
                            y2={eyeY + 24}
                        />
                    </g>
                </svg>
            </div>
        </div>
    );
}

export default Face