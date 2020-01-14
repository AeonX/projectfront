import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';
import Darkmode from 'darkmode-js';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  options = {
    bottom: '64px', // default: '32px'
    right: 'unset', // default: '32px'
    left: '32px', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#fff',  // default: '#fff'
    buttonColorDark: '#2f3640',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: false, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
  }


  jwtHelper: JwtHelperService = new JwtHelperService();
  currentUser = (this.jwtHelper.decodeToken(localStorage.getItem('access_token')));
  isStudent: boolean = this.currentUser['authorities'][0] !== 'STUDENT_USER';

  darkmode = new Darkmode(this.options);

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log(this.isStudent);
    console.log('this.cu', this.currentUser['authorities'][0]);
    if (this.currentUser['authorities'][0] !== 'STUDENT_USER') {
      this.isStudent = false;
    } else {
      this.isStudent = true;
    }
  }

  changeTheme() {
    this.darkmode.toggle();
  }

  isUserLoggedIn() {
    if (localStorage.getItem('access_token')) {
      return true;
    }
  }

  logout() {
    localStorage.removeItem("access_token");
    this.router.navigate(['/home']);
  }

}
