import {showScreen} from './render';
import WelcomeScreen from './screens/welcome-screen';
import GameScreen from './screens/game-screen';
import GameModel from './data/game-model';
import ErrorView from './views/error-view';
import adaptServerData from './data/data-adapter';
import {initialState} from './data/game-data';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Router {

  static start() {
    Router.showWelcome();
    window.fetch(`https://es.dump.academy/guess-melody/questions`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => adaptServerData(data)).
      then((data) => Router.startGame(data)).
      catch(Router.showError);
  }

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    showScreen(welcomeScreen.element);
    return welcomeScreen;
  }

  static showGame() {
    const screen = new GameScreen(new GameModel());
    showScreen(screen.element);
  }

  static showResult(result) {
    result.replayButtonClickHandler = () => {
      this.showGame();
    };
    showScreen(result.element);
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    errorView.showModal();
  }

  static startGame(data) {
    initialState.questions.length = 0;
    data.forEach((el) => initialState.questions.push(el));
    Router.showWelcome().screen.play();
  }
}
