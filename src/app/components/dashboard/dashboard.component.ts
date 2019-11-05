import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user_id = sessionStorage.getItem('user_id');
  role_id = parseInt(sessionStorage.getItem('user_id'));
  courses: any[] = [];

  constructor(private userService: UserService, private courseService: CourseService) { }

  ngOnInit() {
    console.log(this.role_id);
    this.courseService.findAllCourses().subscribe(courses => {
      courses.filter(result => {
          this.courses.push(result);
      })
    });
    
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
