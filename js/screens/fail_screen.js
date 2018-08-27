import {getFragmentFromString, showScreen} from '../render';
import welcomeScreen from './welcome_screen';
import string from '../data/string_data';
import {initialState} from '../data/game_data';
import {calculatePoints} from '../data/calc_points';
import {showResults} from '../data/show_results';

export default (state) => {
  const userPoints = calculatePoints(state);
  const result = {
    points: userPoints,
    time: state.time,
    errors: state.errors
  };

  const results = [3, 5, 6, 7, 3];
  const content = `
<section class="result">
<div class="result__logo"><img src="img/melody-logo.png" alt="${string.header.logo}" width="186" height="83"></div>
<h2 class="result__title">${string.result.loseReplic}</h2>
<p class="result__total result__total--fail">${showResults(results, result)}</p>
<button class="result__replay" type="button">${string.buttons.loseReplay}</button>
</section>
`;

  const failScreen = getFragmentFromString(content);

  const replayButtonClickHandler = () => {
    showScreen(welcomeScreen(initialState));
  };

  failScreen.querySelector(`.result__replay`).addEventListener(`click`, replayButtonClickHandler);

  return failScreen;

};
