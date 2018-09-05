import {initialState, gameQuestions} from './game-data';

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

  // changeLevel() {
    // return this.state.level + 1;
    //this.state = Object.assign({}, this.state);
    //return this.state.level + 1;
  // }

  restart() {
    this.state = initialState;
  }

  fail() {
    return this.state.lives === 0 || this.state.time === 0;
  }

  win() {
    return this.state.level === this.state.answersArr.length;
  }

  getAnswers(answer) {
    const correct = answer.correct;

    // const correct = Object.keys(this.questions.answers).every((key) => this.questions.answers[key].correct === answer.includes(key));
    if (correct) {
      this.state = Object.assign({}, this.state);
      this.state.level++;
      this.state.answersArr.push({correct: true, time: 12});
    } else {
      this.state = Object.assign({}, this.state);
      this.state.lives--;
      this.state.level++;
      this.state.answersArr.push({correct: false, time: 12});
    }

  }


}
