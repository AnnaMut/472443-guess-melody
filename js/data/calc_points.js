import {MAX_QUESTIONS, Time} from './game_data';

const Points = {
  LOOSE: -1,
  DEFAULT: 1,
  FAST: 2,
  WRONG: -2
};

export const calculatePoints = (answersArr, errors) => {
  let points = 0;
  if (answersArr.length < MAX_QUESTIONS) {
    return Points.LOOSE;
  }
  if (errors < 0) {
    throw new Error(`Errors should be >= 0`);
  }
  answersArr.forEach((answer) => {
    if (answer.correct && answer.time < Time.FAST) {
      points += Points.FAST;
    }
    if (answer.correct && answer.time >= Time.FAST) {
      points += Points.DEFAULT;
    }
    if (!answer.correct) {
      points += Points.WRONG;
    }
  });
  return points;
};

