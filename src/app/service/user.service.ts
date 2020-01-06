import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_NAME } from './auth.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  accessToken: string;
  isAdmin: boolean;
  accessToken1 = localStorage.getItem('access_token');
  decodedToken;

  private usersUrl = "/private/users"
  headers: any;
  httpOptions = {
      headers: this.headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + this.accessToken1)
  };

  constructor(private http: HttpClient) {
    
  }

  public getAllUsers(): Observable<any[]> {
    
    this.decodedToken = this.jwtHelper.decodeToken(this.accessToken1);
    return this.http.get<any[]>(this.usersUrl, this.httpOptions);
  }

  login(accessToken: string) {
    this.decodedToken = this.jwtHelper.decodeToken(accessToken);

    // this.isAdmin = this.decodedToken.authorities.some(el => {
    //   console.log('el', el);
    //   el === 'ADMIN_USER'
    // });
    this.accessToken = accessToken;

    localStorage.setItem(TOKEN_NAME, accessToken);
  }

  isUserLoggedIn() {
    return true;
  }

  logout() {
    this.accessToken = null;
    this.isAdmin = false;
    localStorage.removeItem(TOKEN_NAME);
  }

  // isAdminUser(): boolean {
  //   return this.isAdmin;
  // }

  // isUser(): boolean {
  //   return this.accessToken && !this.isAdmin;
  // }
}