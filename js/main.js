'use strict';

const screenList = [
  `welcome`,
  `game-artist`,
  `game-genre`,
  `result-success`,
  `fail-time`,
  `fail-tries`
];

const screens = screenList.map((item) => document.querySelector(`#${item}`).content);

const body = document.querySelector(`body`);
const main = document.querySelector(`.main`);
let current = 0;

const Keys = {
  LEFT: `ArrowLeft`,
  RIGHT: `ArrowRight`
};

const arrows = `<div class="arrows__wrap">
    <style>
      .arrows__wrap {
        position: absolute;
        top: 135px;
        left: 50%;
        margin-left: -56px;
        z-index: 100;
      }
      .arrows__btn {
        background: none;
        border: 2px solid #ff9749;
        color: #ff9749;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn"><-</button>
    <button class="arrows__btn">-></button>
</div>`;


const showScreen = (index) => {
  main.textContent = ``;
  main.appendChild(screens[index].cloneNode(true));
};

const showPreviousScreen = () => {
  if (current > 0) {
    current--;
    showScreen(current);
  }
};

const showNextScreen = () => {
  if (current < screens.length - 1) {
    current++;
    showScreen(current);
  }
};

document.addEventListener(`keydown`, (evt) => {
  if (evt.key === Keys.LEFT) {
    showPreviousScreen();
  }
  if (evt.key === Keys.RIGHT) {
    showNextScreen();
  }
});

showScreen(0);

body.insertAdjacentHTML(`beforeEnd`, arrows);
const buttons = body.querySelectorAll(`.arrows__btn`);

buttons[0].addEventListener(`click`, () => {
  showPreviousScreen();
});

buttons[1].addEventListener(`click`, () => {
  showNextScreen();
});
