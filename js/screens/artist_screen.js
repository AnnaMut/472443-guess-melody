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

  const answerButtonClickHandler = (evt) => {
    evt.preventDefault();
    let newLives;
    const answerNode = form.elements[`answer`];

    if (answerNode && questions.answers[answerNode.value].correct) {
      newLives = state.lives;
      state.answersArr.push({correct: true, time: 12});
    } else {
      newLives = state.lives - 1;
      state.answersArr.push({correct: false, time: 12});
    }

    const newGameState = Object.assign({}, state, {lives: newLives, level: state.level + 1, answersArr: state.answersArr});
    changeScreen(newGameState);
  };

  answerButton.forEach((item) => {
    item.addEventListener(`click`, answerButtonClickHandler);
  });

  const replayButtonClickHandler = () => {
    showScreen(welcomeScreen(initialState));
  };

  artistScreen.querySelector(`.game__back`).addEventListener(`click`, replayButtonClickHandler);

  const playerButton = artistScreen.querySelector(`div.game__track`).querySelector(`button`);
  const playAudio = () => {
    const audio = artistScreen.querySelector(`audio`);
    if (audio.paused) {
      playerButton.classList.replace(`track__button--play`, `track__button--pause`);
      audio.play();
    } else {
      playerButton.classList.replace(`track__button--pause`, `track__button--play`);
      audio.pause();
    }
  };

  playerButton.addEventListener(`click`, playAudio);

  return artistScreen;

};
