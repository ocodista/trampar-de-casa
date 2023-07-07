import confetti from 'canvas-confetti'

export default function fireworks() {
  const duration = 6_500
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)

    // random on the left side
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.5), y: 0 },
      })
    )

    // random on the right side
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.6, 0.9), y: 0 },
      })
    )
  }, 250)
}
