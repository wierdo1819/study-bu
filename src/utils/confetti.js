import confetti from 'canvas-confetti';

export function fireConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4f46e5', '#3b82f6', '#10b981', '#f59e0b', '#c5192d']
    });
  } catch (e) {
    // Graceful fallback if canvas is not supported
    console.debug('Confetti triggered', e);
  }
}
