import {MAX_QUESTIONS} from '../data/game-data';
import {showScreen} from "../render";
import HeaderView from "../views/header-view";
import ArtistView from "../views/artist-view";
import GenreView from "../views/genre-view";
import welcomeScreen from '../screens/welcome-screen';
import failScreen from './fail-screen';
import winScreen from './win-screen';

const ScreenView = {
  artist: ArtistView,
  genre: GenreView
};

const screenGame = (state) => {
  const questions = state.questions[state.level];

  const screen = new ScreenView[questions.type](questions);
  const header = new HeaderView(state.lives);
  screen.element.insertBefore(header.element, screen.element.querySelector(`.game__screen`));

  screen.answerButtonClickHandler = (answer) => {
    event.preventDefault();
    let newLives;
    const correct = Object.keys(questions.answers).every((key) => questions.answers[key].correct === answer.includes(key));
    if (correct) {
      newLives = state.lives;
      state.answersArr.push({correct: true, time: 12});
    } else {
      newLives = state.lives - 1;
      state.answersArr.push({correct: false, time: 12});
    }

    const newState = Object.assign({}, state, {lives: newLives, level: state.level + 1, answersArr: state.answersArr});

    if ((newState.lives <= 0) || (newState.time < 0)) {
      showScreen(failScreen(newState));
    } else if (newState.level === MAX_QUESTIONS) {
      showScreen(winScreen(newState));
    } else {
      showScreen(screenGame(newState));
    }
  };

  header.replayButtonClickHandler = () => {
    showScreen(welcomeScreen());
  };

  return screen.element;
};

export default screenGame;
