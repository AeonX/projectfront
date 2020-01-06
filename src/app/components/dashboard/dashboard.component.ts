import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { CourseService } from 'src/app/service/course.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EnrollmentService } from 'src/app/service/enrollment.service';
import { enrollmentDto } from 'src/app/model/backend.model';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges {

  user_id;
  role_id = parseInt(sessionStorage.getItem('role_id'));
  courses: any[] = [];
  currentUser = localStorage.getItem('access_token');
  jwtHelper: JwtHelperService = new JwtHelperService();
  courseInfo;

  enrollment: enrollmentDto = {
    enrollment_id: null,
    courseEnrollment: {
      course_id: null,
      course_name: null,
      created_on: null,
      description: null,
      img_url: null,
      user: null
    },
    student_id: null
  }

  constructor(private userService: UserService, private courseService: CourseService,
    private enrollmentService: EnrollmentService) { }

  ngOnInit() {
    this.courseService.findAllCourses().subscribe(courses => {
      courses.filter(result => {
        this.courses.push(result);
      })
    });

    this.userService.getAllUsers().subscribe(users => {

      let decodeToken = this.jwtHelper.decodeToken(this.currentUser);

      users.filter(element => {
        if (element.username == decodeToken.user_name) {
          this.user_id = element.id;
          localStorage.setItem("user_id", this.user_id);
        }
      })
    })

    console.log('local', localStorage);

  }

  enrolled(event) {
    console.log('event', this.courseInfo);
    this.enrollment.student_id = this.user_id;
    this.enrollment.courseEnrollment.course_id = this.courseInfo.course_id;

    this.enrollmentService.saveEnrollment(this.enrollment).subscribe(element => {

    })
  }

  enrolledCourse(course) {
    this.courseInfo = course;
  }

  ngOnChanges(): void { }
}
