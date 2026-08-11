export function nextReviewAtForScore(score: number, now = new Date()) {
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));
  const delayHours = safeScore >= 90 ? 168 : safeScore >= 75 ? 72 : safeScore >= 55 ? 24 : 6;
  return new Date(now.getTime() + delayHours * 60 * 60 * 1000);
}

export function masteryScoreAfterAttempt(previousScore: number, score: number) {
  const safePrevious = Math.max(0, Math.min(100, Math.round(previousScore)));
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));
  return Math.round(safePrevious * 0.45 + safeScore * 0.55);
}
