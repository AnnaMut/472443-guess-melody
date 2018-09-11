import {showScreen} from './render';
import WelcomeScreen from './screens/welcome-screen';
import GameScreen from './screens/game-screen';
import GameModel from './data/game-model';
import ErrorView from './views/error-view';
import {initialState} from './data/game-data';
import Loader from './loader';

export default class Router {

  static start() {
    Router.showWelcome();
    Loader.loadData().
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
    if (result.result.lives > 0 && result.result.time > 0) {
      Loader.loadResults().
        then(showScreen(result.element)).
        then((data) => result.showStats(data)).
        then(Loader.saveResults(result.result)).
        catch(Router.showError);
    } else {
      showScreen(result.element);
    }
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    errorView.showModal();
  }

  static startGame(data) {
    data.forEach((el) => initialState.questions.push(el));
    Router.showWelcome().screen.play();
  }
}