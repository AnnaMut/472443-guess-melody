import {getFragmentFromString, showScreen} from '../render';
import welcomeScreen from './welcome_screen';
import string from '../data/string_data';
import {initialState} from '../data/game_data';
import {calculatePoints} from '../data/calc_points';
import {showResults} from '../data/show_results';
import {formatWord} from '../utils';

export default (state) => {
  const {points, pointFast} = calculatePoints(state);

  const result = {
    UserPoint: points,
    time: state.time,
    lives: state.lives
  };

  const results = [10, 5, 6, 7];
  const content = `
  <section class="result">
  <div class="result__logo"><img src="img/melody-logo.png" alt="${string.header.logo}" width="186" height="83"></div>
  <h2 class="result__title">${string.result.win}</h2>
  <p class="result__total">За 3 минуты и 25 секунд вы набрали ${points}&#160${formatWord(points, `point`)} (${pointFast}&#160${formatWord(pointFast, `fast`)}), совершив ${3 - result.lives}&#160${formatWord(3 - result.lives, `note`)}</p>
  <p class="result__text">${showResults(results, result)}</p>
  <button class="result__replay" type="button">${string.buttons.replay}</button>
</section>
`;

  const winScreen = getFragmentFromString(content);

  const replayButtonClickHandler = () => {
    showScreen(welcomeScreen(initialState));
  };

  winScreen.querySelector(`.result__replay`).addEventListener(`click`, replayButtonClickHandler);

  return winScreen;

};
