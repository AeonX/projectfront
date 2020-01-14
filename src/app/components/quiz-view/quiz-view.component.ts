import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { QuizService } from 'src/app/service/quiz.service';
import { Lecture } from 'src/app/model/lecture';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.scss']
})
export class QuizViewComponent implements OnInit {

  @Input() receiveLecture: Lecture;
  currentId: number;
  quizQuestion;
  quizAnswer: any[] = [];
  quizQuestionId;
  allQuestions: any[] = [];
  questionNumber: number = 0;
  quizNumberOfQuestions: number = 1;

  constructor(private quizService: QuizService) {

  }


  ngOnInit() {
    this.getQuiz(this.questionNumber);
  }


  getQuiz(questionNumber: number) {
    this.quizService.findAllQuizzes().subscribe(quizzes => {
      quizzes.filter(quiz => {
        if (quiz.quiz_name === this.receiveLecture.lecture_name) {
          this.currentId = quiz.quiz_id;
          this.quizService.findQuizQuestion().subscribe(question => {

            question.filter(data => {
              if (data.quizQuizQuestion.quiz_id === this.currentId) {
                this.allQuestions.push(data);
                this.quizQuestion = this.allQuestions[questionNumber].question;
                this.quizQuestionId = this.allQuestions[questionNumber].quiz_question_id;
              }
            })
          });

          this.quizService.findQuizAnswer().subscribe(data => {
            this.quizAnswer = [];
            data.filter(element => {
              if (element.quizQuestion.quiz_question_id === this.quizQuestionId) {
                this.quizAnswer.push(element);
              }
            })
          });
        }
      })
    });
  }

  onAnswerClick(answer) {



    if (this.questionNumber <= 3) {
      this.quizNumberOfQuestions += 1;
      this.questionNumber += 1;
    }

    this.getQuiz(this.questionNumber);
    console.log('answer', answer);
  }

}
