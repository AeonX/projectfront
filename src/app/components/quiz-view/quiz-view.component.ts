import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.scss']
})
export class QuizViewComponent implements OnInit {

  // The question, which will be displayed
  question: any;

  // A form group used to handle the answers as option inputs
  form: FormGroup;

  constructor(
    public quiz: QuizService,
    public route: ActivatedRoute,
    public FB: FormBuilder,
    public router: Router
  ) { 
     /*
      2. Subscribe to routing events. By doing so, everytime your user is being routed, an event will be triggered. Because you declared a parameter in your routes, you have a dynamic URL : this allows you to query the right question. 

      Go to question.component.html
    */
   this.route.paramMap.subscribe(params => {
    // Get the question ID and store it. 
    this.quiz.questionId = +params.get('questionId');

    // If there is no more question, navigate to show the answers
    if(this.quiz.questionId > this.quiz.questions.length - 1) {
      this.router.navigate(['/answers']);
    }


    // Set the current question to be displayed and create a form group. 
    this.question = this.quiz.questions[this.quiz.questionId];
    this.form = this.FB.group({
      answer: ''
    });
  });
  }

  ngOnInit() {
  }

}
