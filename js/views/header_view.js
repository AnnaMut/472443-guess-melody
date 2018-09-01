import string from '../data/string_data';
import AbstractView from '../views/abstract_view';
import {initialState} from '../data/game_data';

export default class HeaderView extends AbstractView {
  constructor(lives) {
    super();
    // this.state = state;
    this.lives = lives;
  }

  get template() {
    return `
<header class="game__header">
<a class="game__back" href="#">
  <span class="visually-hidden">${string.buttons.replay}</span>
  <img class="game__logo" src="img/melody-logo-ginger.png" alt="${string.header.logo}">
</a>

<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle class="timer__line" cx="390" cy="390" r="370"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"/>
</svg>

<div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
  <span class="timer__mins">05</span>
  <span class="timer__dots">:</span>
  <span class="timer__secs">00</span>
</div>

<div class="game__mistakes">
${new Array(initialState.lives - this.lives)
  .fill(`<div class="wrong"></div>`)
  .join(``)}
</div>
</header>
`;
  }

  replayButtonClickHandler() {}

  bind() {
    this.element.querySelector(`.game__back`).addEventListener(`click`, () => {
      this.replayButtonClickHandler();
    });
  }
}
