import {getFragmentFromString, showScreen} from './render';
import welcomeScreen from './welcome_screen';

const content = `
  <section class="result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">Увы и ах!</h2>
    <p class="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
    <button class="result__replay" type="button">Попробовать ещё раз</button>
  </section>
  `;

const timeFailScreen = getFragmentFromString(content);

const replayButtonClickHandler = () => {
  showScreen(welcomeScreen);
};

timeFailScreen.querySelector(`.result__replay`).addEventListener(`click`, replayButtonClickHandler);

export default timeFailScreen;
