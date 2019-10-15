import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from 'src/app/model/backend.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserDto;
  loginForm: FormGroup;

  constructor(private router: Router, private userService: UserService, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      user_name: new FormControl(),
      password: new FormControl()

    })

    sessionStorage.clear();
  }

  onSubmit() {
  }

  validateUser() {

    this.userService.authenticate(this.loginForm.value.user_name, this.loginForm.value.password).subscribe(result => {
      //check if credentials entered === data retrieved from database
      if (result) {
        this.userService.findLoggedInUserDetails().subscribe(res => {
          res.filter(user => {
            if (user.user_name === this.loginForm.value.user_name) {
              sessionStorage.setItem('user_id', user.user_id.toString());
            }
          })
        })


        this.toastrService.success("Logged in successfully", 'Welcome Back, ' + this.loginForm.value.user_name + '.', { progressBar: true });
        this.gotoUserList();
      } else {
        this.toastrService.error("Wrong username or password.", "Please try again.", { progressBar: true });
      }
    });

  }

  gotoUserList() {
    this.router.navigate(['dashboard']);
  }

}
