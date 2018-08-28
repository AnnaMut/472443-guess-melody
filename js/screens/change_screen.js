import {showScreen} from '../render';
import {QuestionType, MAX_QUESTIONS} from '../data/game_data';
import genreScreen from './genre_screen';
import artistScreen from './artist_screen';
import fallScreen from './fail_screen';
import timeFailScreen from './timefail_screen';
import winScreen from './win_screen';

export const changeScreen = (state) => {
  const questions = state.questions[state.level];
  if (state.lives < 0) {
    showScreen(fallScreen(state));
  } else if (state.time < 0) {
    showScreen(timeFailScreen(state));
  } else if (state.level === MAX_QUESTIONS) {
    showScreen(winScreen(state));
  } else if (questions.type === QuestionType.ARTIST) {
    showScreen(artistScreen(state));
  } else if (questions.type === QuestionType.GENRE) {
    showScreen(genreScreen(state));
  }
};
