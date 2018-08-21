import {assert} from 'chai';
import {calculatePoints} from './calc_points';

const getAnswers = (dataType, answerTime, count) => {
  const answers = new Array(count).fill({
    correct: dataType,
    time: answerTime
  });
  return answers;
};

describe(`Calculate Points`, () => {
  it(`should return -1 when answers < 10`, () => {
    assert.equal(calculatePoints(getAnswers(true, 30, 3), 0), -1);
  });

  it(`should return 0 when notes > 3`, () => {
    assert.equal(calculatePoints(getAnswers(undefined, 30, 10), 4), 0);
  });

  it(`should return 12 when 8 answers are correct and time of correct answer < 30 seconds`, () => {
    let correctAnswers = getAnswers(true, 26, 8);
    let uncorrectAnswers = getAnswers(false, 26, 2);
    let totalAnswers = correctAnswers.concat(uncorrectAnswers);
    assert.equal(calculatePoints(totalAnswers, 2), 12);
  });

  it(`should return 1 when 7 answers are correct and time of correct answer > 30 seconds`, () => {
    let correctAnswers = getAnswers(true, 35, 7);
    let uncorrectAnswers = getAnswers(false, 26, 3);
    let totalAnswers = correctAnswers.concat(uncorrectAnswers);
    assert.equal(calculatePoints(totalAnswers, 3), 1);
  });

  it(`should return 10 if all answers are correct and time > 30 seconds`, () => {
    assert.equal(calculatePoints(getAnswers(true, 40, 10), 0), 10);
  });

  it(`should return 20 if all answers are correct and time < 30 seconds`, () => {
    assert.equal(calculatePoints(getAnswers(true, 25, 10), 0), 20);
  });

  it(`should return -20 if all answers are not correct`, () => {
    assert.equal(calculatePoints(getAnswers(false, 20, 10), 0), -20);
  });

});
