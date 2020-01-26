import { Injectable } from '@angular/core';

@Injectable()
export class QuizService {

  // the list of questions and their answers
  questions = [
    {
      category: 'Coding',
      question: 'Angular is a framework made for :',
      answers: ['front-end', 'back-end']
    },
    {
      category: 'Coding',
      question: 'Angular is not the same as AngularJS : ',
      answers: ['true', 'false']
    },
  ];

  // the ID of the current question displayed. Used to navigate and query a specific question.
  questionId: number;

  // The list of answers. 
  answers = [];

  constructor() { }

  /*
    4. Store the answer. Called when the user clicks on an answer. 
    Because we are already checking if the question ID isn't greater than the total of questions, we don't need to check if the answer given by the user is the last one. 

    Go to answer.component.html
  */
  validate(answer) {
    this.answers.push({ question: this.questions[this.questionId].question, answer });
  }

}