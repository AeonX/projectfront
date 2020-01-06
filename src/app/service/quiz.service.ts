import { Injectable } from '@angular/core';
import { quizDto, quizQuestionDto, quizAnswerDto } from '../model/backend.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizUrl: string = 'private/quizzes';
  private quizQuestionUrl: string = 'private/quizQuestions';
  private quizAnswerUrl: string = 'private/quizAnswers';
  private username: string = sessionStorage.getItem('user_name');
  private pwd: string = sessionStorage.getItem('pwd');

  headers: any;
  accessToken = localStorage.getItem('access_token');
  httpOptions = {
    headers: this.headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.accessToken)
  };
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  public findAllQuizzes(): Observable<quizDto[]> {
    return this.http.get<quizDto[]>(this.quizUrl, this.httpOptions);
  }

  public save(quiz: quizDto) {
    return this.http.post<quizDto>(this.quizUrl, quiz, this.httpOptions);
  }

  public findQuizQuestion(): Observable<quizQuestionDto[]> {
    return this.http.get<quizQuestionDto[]>(this.quizQuestionUrl, this.httpOptions);
  }

  public saveQuizQuestion(quizQuestion: quizQuestionDto) {
    return this.http.post<quizQuestionDto>(this.quizQuestionUrl, quizQuestion, this.httpOptions);
  }

  public findQuizAnswer(): Observable<quizAnswerDto[]> {
    return this.http.get<quizAnswerDto[]>(this.quizAnswerUrl, this.httpOptions);
  }

  public saveQuizAnswer(quizAnswer: quizAnswerDto) {
    return this.http.post<quizAnswerDto>(this.quizAnswerUrl, quizAnswer, this.httpOptions);
  }
}