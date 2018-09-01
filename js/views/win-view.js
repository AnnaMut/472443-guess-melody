import string from '../data/string-data';
import {calculatePoints} from '../data/calc-points';
import {showResults} from '../data/show-results';
import {formatWord} from '../utils';
import {initialState} from '../data/game-data';
import AbstractView from '../views/abstract-view';

export default class WinView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    const {points, pointFast} = calculatePoints(this.state);
    this.points = points;
    this.pointFast = pointFast;
    this.result = {
      UserPoint: points,
      time: state.time,
      lives: state.lives
    };
    this.results = [10, 5, 6, 7];
  }

  get template() {
    return `
  <section class="result">
  <div class="result__logo"><img src="img/melody-logo.png" alt="${string.header.logo}" width="186" height="83"></div>
  <h2 class="result__title">${string.result.win}</h2>
  <p class="result__total">За 3 минуты и 25 секунд вы набрали ${this.points}&#160${formatWord(this.points, `point`)} (${this.pointFast}&#160${formatWord(this.pointFast, `fast`)}), совершив ${initialState.lives - this.result.lives}&#160${formatWord(initialState.lives - this.result.lives, `note`)}</p>
  <p class="result__text">${showResults(this.results, this.result)}</p>
  <button class="result__replay" type="button">${string.buttons.replay}</button>
</section>
`;
  }

  replayButtonClickHandler() {}

  bind() {
    this.element.querySelector(`.result__replay`).addEventListener(`click`, () => {
      this.replayButtonClickHandler();
    });
  }
}

