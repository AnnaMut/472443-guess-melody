'use strict';

const screens = Array.from(document.querySelectorAll(`template`)).
  map((item) => item.content);
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

const showScreen = (item) => {
  main.innerHTML = ``;
  main.appendChild(item.cloneNode(true));
  app.insertAdjacentHTML(`beforeend`, arrows);
};

const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  showScreen(screens[current]);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case KeyCodes.RIGHT:
      select(current + 1);
      break;
    case KeyCodes.LEFT:
      select(current - 1);
      break;
  }
});

select(0);
