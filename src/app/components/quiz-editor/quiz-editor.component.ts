import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { QuizService } from 'src/app/service/quiz.service';
import { quizQuestionDto, quizAnswerDto } from 'src/app/model/backend.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.scss']
})
export class QuizEditorComponent implements OnInit {

  formGroup: FormGroup;
  //createQuizForm: FormGroup;

  quizQuestion: quizQuestionDto = {
    quiz_question_id: null,
    question: null,
    quizQuizQuestion: {
      courseQuiz: null,
      moduleQuiz: null,
      quiz_id: null,
      quiz_name: null
    }
  }

  quizAnswer: quizAnswerDto = {
    quiz_answer_id: null,
    answer1: null,
    answer2: null,
    answer3: null,
    answer4: null,
    correct_answer: null,
    quizQuestion: {
      quiz_question_id: null,
      quizQuizQuestion: null,
      question: null
    }
  }

  constructor(private quizService: QuizService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      question: new FormControl(),
      choice1: new FormControl(),
      choice2: new FormControl(),
      choice3: new FormControl(),
      choice4: new FormControl(),
      correctChoice1: new FormControl(),
      correctChoice2: new FormControl(),
      correctChoice3: new FormControl(),
      correctChoice4: new FormControl()
    });
  }

  saveQuestion() {

    let quizQuestionId;

    this.quizQuestion.question = this.formGroup.value['question'];
    this.quizQuestion.quizQuizQuestion.quiz_id = parseInt(this.route.url['_value'][1]['path']);

    this.quizService.saveQuizQuestion(this.quizQuestion).subscribe(result => {
      this.quizService.findQuizQuestion().subscribe(getQuiz => {
        getQuiz.filter(element => {
          if (element.question === this.quizQuestion.question) {
            quizQuestionId = element.quiz_question_id;

            for (let i = 1; i < 5; i++) {
              this.quizAnswer.answer1 = this.formGroup.value['choice' + i];
                this.quizAnswer.quizQuestion.quiz_question_id = quizQuestionId;

                if(this.formGroup.value['correctChoice' + i] == true) {
                  this.quizAnswer.correct_answer = 1;
                } else {
                  this.quizAnswer.correct_answer = 0;
                }
                

              this.quizService.saveQuizAnswer(this.quizAnswer).subscribe(result => {})
            }

          }
        })
      })
    });


    // for(let i = 1; i < 5; i++) {
    //   this.quizService.saveQuizAnswer(this.quizAnswer).subscribe(result => {
    //     this.quizAnswer.answer1 = this.formGroup.value['choice' + i];
    //     this.quizAnswer.quizQuestion.quiz_question_id = 
    //   })
    //}




  }

}
