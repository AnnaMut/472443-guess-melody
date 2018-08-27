import {getFragmentFromString, showScreen} from '../render';
import welcomeScreen from './welcome_screen';
import header from './header';
import string from '../data/string_data';
import {initialState} from '../data/game_data';
import {playerGenre} from './player';
import {changeScreen} from './change_screen';

export default (state) => {
  const questions = state.questions[state.level];
  const content = `
  <section class="game game--genre">
  ${header(state)}
  <section class="game__screen">
    <h2 class="game__title">${questions.question}</h2>
    <form class="game__tracks">
    ${[...Object.entries(questions.answers)].map(([id, answer]) =>{
    return `${playerGenre(answer.song.src)}
    <div class="game__answer">
          <input class="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="${id}">
          <label class="game__check" for="${id}">Отметить</label>
        </div>
        </div>`
    ;
  }).join(` `)}
      <button class="game__submit button" type="submit">${string.buttons.answerSend}</button>
    </form>
  </section>
</section>
`;

  const genreScreen = getFragmentFromString(content);
  const answerButton = genreScreen.querySelector(`.game__submit`);

  answerButton.disabled = true;

  const form = genreScreen.querySelector(`.game__tracks`);
  const answer = Array.from(form.querySelectorAll(`input`));

  const answerButtonClickHandler = () => {
    let newErrors;
    const checkedAnswer = answer.filter((item) => item.checked).map((element) => element.id);

    if (questions.answers[checkedAnswer].correct) {
      newErrors = state.errors;
      state.answersArr.push({correct: true, time: 12});
    } else {
      newErrors = state.errors + 1;
      state.answersArr.push({correct: false, time: 12});
    }

    const newState = Object.assign({}, state, {errors: newErrors, level: state.level + 1, answersArr: state.answersArr});
    changeScreen(newState);
    answer.forEach((item) => {
      item.checked = false;
    });
    answerButton.disabled = true;
  };

  answer.forEach((item) => {
    item.addEventListener(`change`, () => {
      if (answer.some((element) => element.checked)) {
        answerButton.disabled = false;
      } else {
        answerButton.disabled = true;
      }
    });
  });

  answerButton.addEventListener(`click`, answerButtonClickHandler);

  const replayButtonClickHandler = () => {
    showScreen(welcomeScreen(initialState));
    answer.forEach((item) => {
      item.checked = false;
    });
    answerButton.disabled = true;
  };

  genreScreen.querySelector(`.game__back`).addEventListener(`click`, replayButtonClickHandler);

  return genreScreen;

};
