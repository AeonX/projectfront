import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { UserService } from './user.service';
import { courseDto } from '../model/backend.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private username: string = sessionStorage.getItem('user_name');
  private pwd: string = sessionStorage.getItem('pwd');

  private coursesUrl = "/private/courses"
  headers: any;
  accessToken = localStorage.getItem('access_token');
  httpOptions = {
      headers: this.headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + this.accessToken)
  };
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private userService: UserService) {
  }

  public findAllCourses(): Observable<courseDto[]> {
    return this.http.get<courseDto[]>(this.coursesUrl, this.httpOptions);
  }

  public save(course: courseDto) {
    return this.http.post<courseDto>(this.coursesUrl, course, this.httpOptions).pipe(map((response: any) => {
      return response;
    }))
  }
  handleError(handleError: any) {
    throw new Error("Method not implemented.");
  }
}
