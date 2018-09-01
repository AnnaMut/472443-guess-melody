import {showScreen} from '../render';
import welcomeScreen from './welcome-screen';
import {initialState} from '../data/game-data';
import WinView from '../views/win-view';

export default (state) => {
  const screen = new WinView(state);

  screen.replayButtonClickHandler = () => {
    showScreen(welcomeScreen(initialState));
  };

  return screen.element;
};
