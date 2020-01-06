import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthenticationService {
  static AUTH_TOKEN = '/oauth/token';
  TOKEN_NAME = 'access_token';
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  // login(username: string, password: string) {
  //   const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;

  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));

  //   return this.http.post(AuthenticationService.AUTH_TOKEN, body, {headers}).pipe(
  //       map(res => console.log('res', res)),
  //       map((res: any) => {
  //         if (res.access_token) {
  //           return res.access_token;
  //         }
  //         return null;
  //       })
  //   )
      
  // }

  
  login(username: string, password: string) {
    let params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');
    params.append('client_id', 'testjwtclientid');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Access-Control-Allow-Origin':'*',
        'Authorization': 'Basic ' + btoa("testjwtclientid:XY7kmzoNzl100")
      })
    };

    return this.http.post(AuthenticationService.AUTH_TOKEN, params.toString(), httpOptions).pipe(
      map(res => res),
      map((res: any) => {
        if (res.access_token) {
          localStorage.setItem(this.TOKEN_NAME, res.access_token);
          return res.access_token;
        }
        return null;
      })
    )

  }

  decode() {
    return this.jwtHelper.decodeToken(localStorage.getItem('access_token'));
  }

}