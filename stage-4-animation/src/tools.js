// tools to animate
export const tick = () => {
    console.log('tick...')

    // get animation frame
    window.requestAnimationFrame(tick)
}