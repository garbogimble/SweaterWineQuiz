import confetti from 'canvas-confetti'

/** Tiny wine-bottle silhouette for canvas-confetti custom shapes */
const wineBottlePath =
  'M -4 -18 L 4 -18 L 4 -12 C 8 -10 10 -4 10 2 L 10 14 C 10 18 6 20 0 20 C -6 20 -10 18 -10 14 L -10 2 C -10 -4 -8 -10 -4 -12 Z'

export function fireWineBottleConfetti() {
  const defaults = {
    spread: 68,
    ticks: 90,
    gravity: 1.05,
    decay: 0.92,
    startVelocity: 32,
    colors: ['#6b1e2e', '#8b2942', '#1f3d32', '#c9a84c', '#2f5a48'],
    shapes: [confetti.shapeFromPath({ path: wineBottlePath })],
    scalar: 1.15,
  }

  confetti({
    ...defaults,
    particleCount: 28,
    origin: { x: 0.5, y: 0.55 },
  })

  confetti({
    ...defaults,
    particleCount: 18,
    angle: 60,
    origin: { x: 0.15, y: 0.7 },
  })

  confetti({
    ...defaults,
    particleCount: 18,
    angle: 120,
    origin: { x: 0.85, y: 0.7 },
  })
}
