import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from './use-mobile'

const LEFT_EYE_BASE = 10
const RIGHT_EYE_BASE = 74
const EYE_Y_BASE = 10

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

const getEyePositionFromOffset = (offsetX: number, offsetY: number) => ({
    leftEyeX: clamp(LEFT_EYE_BASE + offsetX, 2, 18),
    rightEyeX: clamp(RIGHT_EYE_BASE + offsetX, 66, 82),
    eyeY: clamp(EYE_Y_BASE + offsetY, 0, 20)
})

export function useEyeTracking(cursorPos: { x: number, y: number }) {
    const isMobile = useIsMobile()
    const characterRef = useRef<HTMLDivElement>(null)
    const [eyePositions, setEyePositions] = useState({ leftEyeX: 10, rightEyeX: 74, eyeY: 10 })
    const [backgroundOffset, setBackgroundOffset] = useState({ offsetX: 0, offsetY: 0 })

    // CURSOR MOVEMENT
    useEffect(() => {
        if (!characterRef.current) return
        if (isMobile || !characterRef.current) return

        const characterRect = characterRef.current.getBoundingClientRect()
        const characterCenterX = characterRect.left + characterRect.width / 2
        const characterCenterY = characterRect.top + characterRect.height / 2

        const deltaX = cursorPos.x - characterCenterX
        const deltaY = cursorPos.y - characterCenterY
        const angle = Math.atan2(deltaY, deltaX)

        const maxMovementX = 15
        const maxMovementY = 12
        const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 100, 1)

        const offsetX = Math.cos(angle) * maxMovementX * distance
        const offsetY = Math.sin(angle) * maxMovementY * distance

        setEyePositions(getEyePositionFromOffset(offsetX, offsetY))
        setBackgroundOffset({
            offsetX: offsetX * 1.2,
            offsetY: offsetY * 1.2
        })
    }, [cursorPos.x, cursorPos.y, isMobile])

    // MOBILE ANIMATION
    useEffect(() => {
        if (!isMobile) return

        let animationFrameId = 0
        let timeoutId = 0
        let currentOffsetX = 0
        let currentOffsetY = 0
        let targetOffsetX = 0
        let targetOffsetY = 0

        const setNextTarget = () => {
            targetOffsetX = Math.random() * 16 - 8
            targetOffsetY = Math.random() * 12 - 6
            timeoutId = window.setTimeout(setNextTarget, 1200 + Math.random() * 1400)
        }

        const animate = () => {
            currentOffsetX += (targetOffsetX - currentOffsetX) * 0.035
            currentOffsetY += (targetOffsetY - currentOffsetY) * 0.035

            setEyePositions(getEyePositionFromOffset(currentOffsetX, currentOffsetY))
            setBackgroundOffset({
                offsetX: currentOffsetX * 0.45,
                offsetY: currentOffsetY * 0.45
            })

            animationFrameId = window.requestAnimationFrame(animate)
        }

        setNextTarget()
        animationFrameId = window.requestAnimationFrame(animate)

        return () => {
            window.cancelAnimationFrame(animationFrameId)
            window.clearTimeout(timeoutId)
        }
    }, [isMobile])

    // SETS EYES BACK TO CENTER
    useEffect(() => {
        if (!characterRef.current) return
        if (!isMobile) return

        setEyePositions(getEyePositionFromOffset(0, 0))
        setBackgroundOffset({ offsetX: 0, offsetY: 0 })
    }, [isMobile])

    return { characterRef, eyePositions, backgroundOffset }
}
