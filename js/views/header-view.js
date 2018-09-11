import AbstractView from './abstract-view';
import string from '../data/string-data';
import {initialState} from '../data/game-data';
import {getRadius} from '../get-radius';

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.finished = 30;
    this.min = Math.floor(this.state.time / 60);
    this.sec = Math.floor(this.state.time % 60);
    this.radius = 370;
    this.line = getRadius(this.radius, this.state.time);
  }

  get template() {
    return `
    <header class="game__header">
    <a class="game__back" href="#">
      <span class="visually-hidden">${string.buttons.replay}</span>
      <img class="game__logo" src="img/melody-logo-ginger.png" alt="${string.header.logo}">
    </a>
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle class="timer__line" cx="390" cy="390" r="${this.radius}"
              style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"
              stroke-dasharray="${this.line.strokeDasharray}" stroke-dashoffset="${this.line.strokeDashoffset}"/>
    </svg>
    <div class="timer__value ${this.state.time < this.finished ? `timer__value--finished` : ``}" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer__mins">0${this.min}</span>
      <span class="timer__dots">:</span>
      <span class="timer__secs">${(this.sec < 10) ? `0${this.sec}` : this.sec}</span>
    </div>
    <div class="game__mistakes">
    ${new Array(initialState.lives - this.state.lives)
      .fill(`<div class="wrong"></div>`)
      .join(``)}
    </div>
    </header>
    `;
  }

}


