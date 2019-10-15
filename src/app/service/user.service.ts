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

  private username = sessionStorage.getItem('user_name');
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

  public authenticate(username, password) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get<UserStatus>(this.validateLoginUrl, {headers}).pipe(
      map(
        userData => {
        sessionStorage.setItem('user_name', username);
        sessionStorage.setItem('pwd', password);
         return userData;
        }
      )
     );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('user_name');
    return !(user === null);
  }

  logOut() {
    sessionStorage.clear();
  }
}