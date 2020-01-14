import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { QuizService } from 'src/app/service/quiz.service';
import { quizQuestionDto, quizAnswerDto } from 'src/app/model/backend.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';


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

  currentCourseId: number;
  quizCounter = 0;
  switchToSave: boolean = false;
  removeNewQuestion: boolean = true;
  temp: any[] = [];
  tempChoice: any[] = [];

  constructor(private quizService: QuizService, private route: ActivatedRoute, private _location: Location,
    private router: Router) { }

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


    // if(this.quizCounter < 2){
    //   this.quizCounter += 1;
    // } else {
    //   this.switchToSave = true;
    //   this.removeNewQuestion = false;
    // }



    this.temp = [];

    for (let i = 1; i < 5; i++) {
      this.temp.push(this.formGroup.value['choice' + i]);
      this.tempChoice.push(this.formGroup.value['correctChoice' + i]);
    }





    this.quizQuestion.question = this.formGroup.value['question'];
    this.quizQuestion.quizQuizQuestion.quiz_id = parseInt(this.route.url['_value'][1]['path']);

    this.quizService.saveQuizQuestion(this.quizQuestion).subscribe(result => {

      this.quizService.findQuizQuestion().subscribe(getQuiz => {
        getQuiz.filter(element => {

          if (element.question === this.quizQuestion.question) {
            quizQuestionId = element.quiz_question_id;



            for (let i = 0; i < 4; i++) {
              this.quizAnswer.answer1 = this.temp[i];

              this.quizAnswer.quizQuestion.quiz_question_id = quizQuestionId;

              if (this.tempChoice[i] === true) {
                this.quizAnswer.correct_answer = 1;
              } else {
                this.quizAnswer.correct_answer = 0;
              }
              this.quizService.saveQuizAnswer(this.quizAnswer).subscribe(result => { })
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

    this.formGroup.value['question'] = "";
    this.formGroup.value['correctChoice'] = 0;

    this.formGroup.reset();



  }

  lastSave() {

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

              if (this.formGroup.value['correctChoice' + i] == true) {
                this.quizAnswer.correct_answer = 1;
              } else {
                this.quizAnswer.correct_answer = 0;
              }


              this.quizService.saveQuizAnswer(this.quizAnswer).subscribe(result => { })
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

    this.formGroup.value['question'] = "";
    this.formGroup.value['correctChoice'] = 0;

    this.formGroup.reset();

    this.router.navigate(['/courseEditor', 3]);

  }

}
