import {showScreen} from '../render';
import welcomeScreen from './welcome_screen';
import {initialState} from '../data/game_data';
import WinView from '../views/win_view';

export default (state) => {
  const screen = new WinView(state);

  screen.replayButtonClickHandler = () => {
    showScreen(welcomeScreen(initialState));
  };

  return screen.element;
};
