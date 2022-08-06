interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(
  dailyExerciseHours: Array<number>,
  target: number
): Result {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.reduce(
    (sum, dailyHours) => (dailyHours === 0 ? sum : sum + 1),
    0
  );
  const average =
    dailyExerciseHours.reduce((sum, dailyHours) => sum + dailyHours, 0) /
    periodLength;

  const ratingTarget = target > 6 ? 6 : target;
  let rating;
  if (average >= 6) {
    rating = 3;
  } else if (ratingTarget === 6 || average < ratingTarget) {
    rating = (1.5 / ratingTarget) * average + 1.0;
  } else {
    rating = (0.5 / (6 - ratingTarget)) * (average - ratingTarget) + 2.5;
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription:
      rating < 1.5
        ? 'Not so great.'
        : rating < 2.5
        ? 'Not too bad, but could be better.'
        : 'Pretty good!',
    target,
    average,
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
