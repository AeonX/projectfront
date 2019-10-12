import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from 'src/app/model/backend.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserDto = {
    user_id: null,
    firstname: null,
    lastname: null,
    email: null,
    pwd: null,
    username: null
  }

  constructor(private router: Router, private userService: UserService, private toastrService: ToastrService) {
  }

  ngOnInit() {
   // this.user.user_id = parseInt(sessionStorage.getItem('user_id'));
  }

  onSubmit() {
    //authenticate user
    this.userService.authenticate(this.user).subscribe(result => {
      //check if credentials entered === data retrieved from database
      if (result) {
        this.toastrService.success("Logged in successfully", 'Welcome Back, ' + this.user.username + '.', { progressBar: true });
        this.gotoUserList();
      } else {
        this.toastrService.error("Wrong username or password.", "Please try again.", { progressBar: true });
      }
    });
  }

  gotoUserList() {
    this.router.navigate(['/dashboard']);
  }

}
