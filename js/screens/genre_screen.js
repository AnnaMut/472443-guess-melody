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

  const answerButtonClickHandler = (evt) => {
    evt.preventDefault();
    let newLives;
    // const checkedAnswer = answer.filter((item) => item.checked).map((element) => element.id);
    // const checkedAnswer = answer.filter((item) => item.checked).map((item) => questions.answers[item.value]);
    // const checkedAnswer = answer.filter((item) => item.checked).map((element) => element.id);
    const checkedAnswer = answer.filter((item) => item.checked).map((element) => element.id);
    // const correct = checkedAnswer.every((input) => input === questions.answers[input].correct);
    const correct = Object.keys(questions.answers).every((key) => questions.answers[key].correct === checkedAnswer.includes(key));
    // const rightAnswers = new Set(questions.answers.keys().filter((it) => questions.answers[it].correct));
    // const userAnswers = new Set(checkedAnswer);
    // const correct = [...rightAnswers].filter((it) => userAnswers.has(it)).length === rightAnswers.size;
    // if (questions.answers[checkedAnswer].correct) {
    if (correct) {
      newLives = state.lives;
      state.answersArr.push({correct: true, time: 12});
    } else {
      newLives = state.lives - 1;
      state.answersArr.push({correct: false, time: 12});
    }

    const newState = Object.assign({}, state, {lives: newLives, level: state.level + 1, answersArr: state.answersArr});
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

  const players = Array.from(genreScreen.querySelectorAll(`div.track`));
  const playerButtons = players.map((element) => element.querySelector(`button`));
  const playAudio = (evt) => {
    const audio = genreScreen.querySelector(`audio`);
    if (audio.paused) {
      evt.target.classList.replace(`track__button--play`, `track__button--pause`);
      audio.play();
    } else {
      evt.target.classList.replace(`track__button--pause`, `track__button--play`);
      audio.pause();
    }
  };
  playerButtons.forEach((item) => {
    item.addEventListener(`click`, playAudio);
  });

  return genreScreen;

};
