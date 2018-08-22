const MAX_QUESTIONS = 10;
const FAST_TIME = 30;

const Points = {
  LOOSE: -1,
  DEFAULT: 1,
  FAST: 2,
  WRONG: -2
};

export const calculatePoints = (answers, notes) => {
  let points = 0;
  if (answers.length < MAX_QUESTIONS) {
    return Points.LOOSE;
  }
  if (notes < 0) {
    throw new Error(`Notes should be >= 0`);
  }
  answers.forEach((answer) => {
    if (answer.correct && answer.time < FAST_TIME) {
      points += Points.FAST;
    }
    if (answer.correct && answer.time >= FAST_TIME) {
      points += Points.DEFAULT;
    }
    if (!answer.correct) {
      points += Points.WRONG;
    }
  });
  return points;
};

