import assert from 'assert';
import {showResults} from './show_results';

const statistics = [
  {
    points: 10,
    notes: 2,
    time: 45
  },
  {
    points: 4,
    notes: 2,
    time: 90
  },
  {
    points: 8,
    notes: 1,
    time: 7
  },
  {
    points: 9,
    notes: 1,
    time: 55
  }
];

const getGameResult = (userPoints, userNotes, userTime) => ({
  points: userPoints,
  notes: userNotes,
  time: userTime
});

describe(`Show results`, () => {
  it(`should return Время вышло! Вы не успели отгадать все мелодии`, () => {
    assert.equal(showResults(statistics, getGameResult(10, 2, 0)), `Время вышло! Вы не успели отгадать все мелодии`);
  });

  it(`should return У вас закончились все попытки. Ничего, повезёт в следующий раз!`, () => {
    assert.equal(showResults(statistics, getGameResult(10, 3, 45)), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });

  it(`should return Вы заняли 1 место из 5 игроков. Это лучше, чем у 80% игроков`, () => {
    assert.equal(showResults(statistics, getGameResult(20, 0, 140)), `Вы заняли 1 место из 5 игроков. Это лучше, чем у 80% игроков`);
  });

  it(`should return Вы заняли 4 место из 5 игроков. Это лучше, чем у 20% игроков`, () => {
    assert.equal(showResults(statistics, getGameResult(7, 2, 140)), `Вы заняли 4 место из 5 игроков. Это лучше, чем у 20% игроков`);
  });

  it(`should return Вы заняли 5 место из 5 игроков. Это лучше, чем у 0% игроков`, () => {
    assert.equal(showResults(statistics, getGameResult(3, 2, 140)), `Вы заняли 5 место из 5 игроков. Это лучше, чем у 0% игроков`);
  });

});

