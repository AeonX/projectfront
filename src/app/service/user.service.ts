import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStatus } from '../model/userStatus';
import { map } from 'rxjs/operators';
import { UserDto } from '../model/backend.model';

@Injectable()
export class UserService {

  private usersUrl: string;
  private validateLoginUrl: string = 'http://localhost:8085/project/validateLogin';

  private username = sessionStorage.getItem('username');
  private pwd = sessionStorage.getItem('pwd');

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8085/project/users';
  }

  public findLoggedInUserDetails(): Observable<UserDto[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Basic ' + btoa(this.username + ':' + this.pwd) });
    return this.http.get<UserDto[]>(this.usersUrl, {headers});
  }

  public save(user: UserDto) {
    return this.http.post<UserDto>(this.usersUrl, user);
  }

  public authenticate(user: UserDto) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Basic ' + btoa(user.username + ':' + user.pwd) });
    return this.http.get<UserStatus>(this.validateLoginUrl, {headers}).pipe(
      map(
        userData => {
        sessionStorage.setItem('username',user.username);
        sessionStorage.setItem('pwd', user.pwd);
         return userData;
        }
      )
     );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }
}