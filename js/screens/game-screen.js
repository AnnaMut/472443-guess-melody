// import {MAX_QUESTIONS} from '../data/game-data';
import {showScreen} from "../render";
import ArtistView from "../views/artist-view";
import GenreView from "../views/genre-view";
// import welcomeScreen from '../screens/welcome-screen';
import FailView from '../views/fail-view';
import WinView from '../views/win-view';
import Router from '../router';

const ScreenView = {
  artist: ArtistView,
  genre: GenreView
};

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.screen = new ScreenView[this.model.screenQuestion.type](this.model.screenQuestion);
    this.bind();
  }
  // const questions = state.questions[state.level];
  // const screen = new ScreenView[questions.type](state);
  get element() {
    return this.screen.element;
  }

  showNextGame() {
    // this.model.changeLevel();
    showScreen(new GameScreen(this.model).element);
  }

  bind() {
    this.screen.answerButtonClickHandler = (answer) => {
      this.model.getAnswers(answer);

      if (this.model.fail()) {
        Router.showResult(new FailView(this.model._state));
      } else if (this.model.win()) {
        Router.showResult(new WinView(this.model._state));
      } else {
        this.showNextGame();
      }
    };

  // screen.answerButtonClickHandler = (answer) => {
  // event.preventDefault();

  // let newLives;
  // const correct = Object.keys(questions.answers).every((key) => questions.answers[key].correct === answer.includes(key));
  // if (correct) {
  // newLives = state.lives;
  // state.answersArr.push({correct: true, time: 12});
  // } else {
  // newLives = state.lives - 1;
  // state.answersArr.push({correct: false, time: 12});
  // }

// const newState = Object.assign({}, state, {lives: newLives, level: state.level + 1, answersArr: state.answersArr});

// if ((newState.lives <= 0) || (newState.time < 0)) {
// showScreen(failScreen(newState));
// } else if (newState.level === MAX_QUESTIONS) {
// showScreen(winScreen(newState));
// } else {
// showScreen(gameScreen(newState));
// }
  // };

  // screen.replayButtonClickHandler = () => {
  // showScreen(welcomeScreen());
  // };

// return screen.element;
// / };

// export default gameScreen;
  }
}
