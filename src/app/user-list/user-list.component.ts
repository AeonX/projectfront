import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserDto } from '../model/backend.model';
 
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
 
  users: UserDto[];
 
  constructor(private userService: UserService) {
  }
 
  ngOnInit() {
    // this.userService.findAll().subscribe(data => {
    //   this.users = data;
    // });
  }
}