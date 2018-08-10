import {getFragmentFromString, showScreen} from './render';
import welcomeScreen from './welcome_screen';

const content = `
  <section class="result">
  <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
  <h2 class="result__title">Вы настоящий меломан!</h2>
  <p class="result__total">За 3 минуты и 25 секунд вы набрали 12 баллов (8 быстрых), совершив 3 ошибки</p>
  <p class="result__text">Вы заняли 2 место из 10. Это лучше чем у 80% игроков</p>
  <button class="result__replay" type="button">Сыграть ещё раз</button>
</section>
`;

const winScreen = getFragmentFromString(content);

const replayButtonClickHandler = () => {
  showScreen(welcomeScreen);
};

winScreen.querySelector(`.result__replay`).addEventListener(`click`, replayButtonClickHandler);

export default winScreen;
