import { SpecialBlockType } from '../types/game';

export interface ScoreCalculationResult {
  baseScore: number;
  pointsAwarded: number;
  speedTierLabel: string;
  specialMultiplierOrBonus: string | null;
}

/**
 * Calculates score based on the 45-second timer bracket:
 * 0–5 seconds: 20 points
 * 6–10 seconds: 18 points
 * 11–15 seconds: 16 points
 * 16–20 seconds: 14 points
 * 21–25 seconds: 12 points
 * 26–30 seconds: 10 points
 * 31–35 seconds: 8 points
 * 36–40 seconds: 6 points
 * 41–45 seconds: 5 points
 * Timeout / Wrong: 0 points
 */
export function calculateTimeBasedScore(
  elapsedSeconds: number,
  isCorrect: boolean,
  specialBlock: SpecialBlockType
): ScoreCalculationResult {
  if (!isCorrect || elapsedSeconds > 45) {
    return {
      baseScore: 0,
      pointsAwarded: 0,
      speedTierLabel: elapsedSeconds > 45 ? 'Time Up' : 'Incorrect',
      specialMultiplierOrBonus: null,
    };
  }

  // Bracket determination
  let baseScore = 5;
  let speedTierLabel = '41–45s (5 pts)';

  if (elapsedSeconds <= 5.0) {
    baseScore = 20;
    speedTierLabel = '0–5s Lightning (20 pts)';
  } else if (elapsedSeconds <= 10.0) {
    baseScore = 18;
    speedTierLabel = '6–10s Swift (18 pts)';
  } else if (elapsedSeconds <= 15.0) {
    baseScore = 16;
    speedTierLabel = '11–15s Quick (16 pts)';
  } else if (elapsedSeconds <= 20.0) {
    baseScore = 14;
    speedTierLabel = '16–20s Steady (14 pts)';
  } else if (elapsedSeconds <= 25.0) {
    baseScore = 12;
    speedTierLabel = '21–25s Measured (12 pts)';
  } else if (elapsedSeconds <= 30.0) {
    baseScore = 10;
    speedTierLabel = '26–30s Thoughtful (10 pts)';
  } else if (elapsedSeconds <= 35.0) {
    baseScore = 8;
    speedTierLabel = '31–35s Deliberate (8 pts)';
  } else if (elapsedSeconds <= 40.0) {
    baseScore = 6;
    speedTierLabel = '36–40s Cautious (6 pts)';
  } else {
    baseScore = 5;
    speedTierLabel = '41–45s Last Second (5 pts)';
  }

  let pointsAwarded = baseScore;
  let specialMultiplierOrBonus: string | null = null;

  // Special block modifications
  if (specialBlock === 'Golden Heritage') {
    // Golden Heritage: Double challenge points
    pointsAwarded = baseScore * 2;
    specialMultiplierOrBonus = 'Golden Heritage: 2x Double Points!';
  } else if (
    specialBlock === 'Culture Challenge' ||
    specialBlock === 'Heritage Challenge' ||
    specialBlock === 'Festival Challenge'
  ) {
    // Challenge bonus +5 pts
    pointsAwarded = baseScore + 5;
    specialMultiplierOrBonus = `${specialBlock}: +5 Challenge Bonus!`;
  } else if (specialBlock === 'Knowledge Ladder') {
    // Knowledge Ladder: +20 points
    pointsAwarded = baseScore + 20;
    specialMultiplierOrBonus = 'Knowledge Ladder: +20 Points Climb!';
  }

  return {
    baseScore,
    pointsAwarded,
    speedTierLabel,
    specialMultiplierOrBonus,
  };
}
