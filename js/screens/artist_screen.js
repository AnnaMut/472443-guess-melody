import {getFragmentFromString, showScreen} from '../render';
import welcomeScreen from './welcome_screen';
import header from './header';
import {playerArtist} from './player';
import {changeScreen} from './change_screen';
import {initialState} from '../data/game_data';

export default (state) => {
  const questions = state.questions[state.level];
  const content = `
<section class="game game--artist">
${header(state)}
    <section class="game__screen">
      <h2 class="game__title">${questions.question}</h2>
      ${playerArtist(questions.src)}
      <form class="game__artist">
      ${[...Object.entries(questions.answers)].map(([value, answer], i) => {
    return `<div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value="${value}" id="answer-${i + 1}">
        <label class="artist__name" for="answer-${i + 1}">
          <img class="artist__picture" src="${answer.song.image}" alt="${answer.song.name}">
          ${answer.song.name}
        </label>
      </div>`;
  }
  ).join(``)}
      </form>
    </section>
  </section>
  `;

  const artistScreen = getFragmentFromString(content);

  const answerButton = Array.from(artistScreen.querySelector(`.game__artist`).querySelectorAll(`.artist__input`));

  const form = artistScreen.querySelector(`.game__artist`);

  const answerButtonClickHandler = () => {
    let newErrors;
    const answerNode = form.elements[`answer`];

    if (answerNode && questions.answers[answerNode.value].correct) {
      newErrors = state.errors;
      state.answersArr.push({correct: true, time: 12});
    } else {
      newErrors = state.errors + 1;
      state.answersArr.push({correct: false, time: 12});
    }

    const newGameState = Object.assign({}, state, {errors: newErrors, level: state.level + 1, answersArr: state.answersArr});
    changeScreen(newGameState);
  };

  answerButton.forEach((item) => {
    item.addEventListener(`click`, answerButtonClickHandler);
  });

  const replayButtonClickHandler = () => {
    showScreen(welcomeScreen(initialState));
  };

  artistScreen.querySelector(`.game__back`).addEventListener(`click`, replayButtonClickHandler);

  return artistScreen;

};
