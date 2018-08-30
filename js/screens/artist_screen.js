import {showScreen} from '../render';
import welcomeScreen from './welcome_screen';
import {changeScreen} from './change_screen';
import ArtistView from '../views/artist_view';

export default (state) => {
  const screen = new ArtistView(state);

  screen.answerButtonClickHandler = () => {
    let newLives;

    if (screen.answerNode && screen.questions.answers[screen.answerNode.value].correct) {
      newLives = screen.state.lives;
      screen.state.answersArr.push({correct: true, time: 12});

    } else {
      newLives = screen.state.lives - 1;
      screen.state.answersArr.push({correct: false, time: 12});
    }

    const newGameState = Object.assign({}, screen.state, {lives: newLives, level: screen.state.level + 1, answersArr: screen.state.answersArr});
    changeScreen(newGameState);
  };

  screen.replayButtonClickHandler = () => {
    showScreen(welcomeScreen());
  };

  return screen.element;
};


