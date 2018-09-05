import {initialState, gameQuestions, MAX_QUESTIONS} from './game-data';

export default class GameModel {
  constructor() {
    this.questions = gameQuestions;
    this.restart();
  }

  get level() {
    return this.state.level;
  }

  get screenQuestion() {
    return this.questions[this.level];
  }

  changeLevel() {
    return this.state.level++;
  }

  restart() {
    this.state = Object.assign({}, initialState, {answersArr: []});
  }

  fail() {
    return this.state.lives === 0 || this.state.time === 0;
  }

  win() {
    return this.state.answersArr.length === MAX_QUESTIONS;
  }

  getAnswers(answer) {
    const correct = Object.keys(this.screenQuestion.answers).every((key) => this.screenQuestion.answers[key].correct === answer.includes(key));
    if (!correct) {
      this.state.lives--;
    }
    this.state.answersArr.push({correct, time: 12});
  }


}
