'use strict';

const screens = [
  `welcome`,
  `game-artist`,
  `game-genre`,
  `result-success`,
  `fail-time`,
  `fail-tries`
];

const app = document.querySelector(`.app`);
const main = app.querySelector(`.main`);
let current = 0;

const KeyCodes = {
  LEFT: 37,
  RIGHT: 39
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
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn"><-</button>
    <button class="arrows__btn">-></button>
</div>`;

const getScreen = (index) => {
  return document.querySelector(`#${screens[index]}`).content.cloneNode(true);
};

const showScreen = (index) => {
  main.textContent = ``;
  main.appendChild(getScreen(index));
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
  if (evt.keyCode === KeyCodes.LEFT) {
    showPreviousScreen();
  }
  if (evt.keyCode === KeyCodes.RIGHT) {
    showNextScreen();
  }
});

showScreen(0);

app.insertAdjacentHTML(`beforeEnd`, arrows);
const buttons = app.querySelectorAll(`.arrows__btn`);

buttons[0].addEventListener(`click`, () => {
  showPreviousScreen();
});

buttons[1].addEventListener(`click`, () => {
  showNextScreen();
});
