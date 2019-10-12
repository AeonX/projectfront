import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { UserService } from './user.service';
import { courseDto } from '../model/backend.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private username: string = sessionStorage.getItem('username');
  private pwd: string = sessionStorage.getItem('pwd');
  private courseUrl: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.courseUrl = 'http://localhost:8085/project/courses';
  }

  public findAllCourses(): Observable<courseDto[]> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.pwd) });
    return this.http.get<courseDto[]>(this.courseUrl, {headers});
  }

  public save(course: courseDto) {
    const headers = new HttpHeaders({ 
      Authorization: 'Basic ' + btoa(this.username + ':' + this.pwd) ,
      observe: 'response'
    });
    return this.http.post<courseDto>(this.courseUrl, course, {headers}).pipe(map((response: any) => {
      console.log(response)
      return response;
    }))
  }
  handleError(handleError: any) {
    throw new Error("Method not implemented.");
  }
}
