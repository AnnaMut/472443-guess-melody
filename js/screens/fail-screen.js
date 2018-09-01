import {showScreen} from '../render';
import welcomeScreen from './welcome-screen';
import {initialState} from '../data/game-data';
import FailView from '../views/fail-view';

export default (state) => {
  const screen = new FailView(state);

  screen.replayButtonClickHandler = () => {
    showScreen(welcomeScreen(initialState));
  };

  return screen.element;
};

