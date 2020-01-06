import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.scss']
})
export class QuizViewComponent implements OnInit {

  constructor(private quizService: QuizService) { 
    
  }


  ngOnInit() {
    this.quizService.findQuizQuestion().subscribe(question => {
      console.log('question', question);
    });

    this.quizService.findQuizAnswer().subscribe(answers => {
      console.log('answers', answers);
    })

  }

}
