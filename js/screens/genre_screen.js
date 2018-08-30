import {showScreen} from '../render';
import welcomeScreen from './welcome_screen';
import {initialState} from '../data/game_data';
import {changeScreen} from './change_screen';
import GenreView from '../views/artist_view';

export default (state) => {
  const screen = new GenreView(state);

  screen.answerButtonClickHandler = (evt) => {
    evt.preventDefault();
    let newLives;
    const checkedAnswer = screen.answer.filter((item) => item.checked).map((element) => element.id);
    const correct = Object.keys(screen.questions.answers).every((key) => screen.questions.answers[key].correct === checkedAnswer.includes(key));
    if (correct) {
      newLives = state.lives;
      state.answersArr.push({correct: true, time: 12});
    } else {
      newLives = state.lives - 1;
      state.answersArr.push({correct: false, time: 12});
    }

    const newState = Object.assign({}, state, {lives: newLives, level: state.level + 1, answersArr: state.answersArr});
    changeScreen(newState);
    screen.answer.forEach((item) => {
      item.checked = false;
    });
    screen.answerButton.disabled = true;
  };

  screen.answersChangeHandler = () => {
    if (screen.answer.some((element) => element.checked)) {
      screen.answerButton.disabled = false;
    } else {
      screen.answerButton.disabled = true;
    }
  };

  screen.replayButtonClickHandler = () => {
    showScreen(welcomeScreen(initialState));
    screen.answer.forEach((item) => {
      item.checked = false;
    });
    screen.answerButton.disabled = true;
  };


  screen.playAudio = (evt) => {
    const audio = screen.querySelector(`audio`);
    if (audio.paused) {
      evt.target.classList.replace(`track__button--play`, `track__button--pause`);
      audio.play();
    } else {
      evt.target.classList.replace(`track__button--pause`, `track__button--play`);
      audio.pause();
    }
  };

  return screen.element;

};
