import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    //get username
    let username = sessionStorage.getItem('user_name');
    
    //filter users and save user_id in sessionStorage
    this.userService.findLoggedInUserDetails().subscribe( result => {
      result.filter(element => {
        if(username === element.user_name) {
          sessionStorage.setItem('user_id', element.user_id.toString());
        }
      })
    })
  }

}
