import { Injectable } from '@angular/core';
import { quizDto } from '../model/backend.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizUrl: string = 'http://localhost:8085/project/quizzes';
  private username: string = sessionStorage.getItem('user_name');
  private pwd: string = sessionStorage.getItem('pwd');

  constructor(private http: HttpClient) { }

  public findAllQuizzes(): Observable<quizDto[]> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.pwd) });
    return this.http.get<quizDto[]>(this.quizUrl, {headers});
}

public save(quiz: quizDto) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.pwd) });
    console.log(quiz, 'quizzes');
    return this.http.post<quizDto>(this.quizUrl, quiz, {headers});
  }

}