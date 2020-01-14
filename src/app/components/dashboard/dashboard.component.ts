import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { CourseService } from 'src/app/service/course.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EnrollmentService } from 'src/app/service/enrollment.service';
import { enrollmentDto } from 'src/app/model/backend.model';
import { min } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges {

  user_id;
  role_id = parseInt(sessionStorage.getItem('role_id'));
  courses: any[] = [];
  jwtHelper: JwtHelperService = new JwtHelperService();
  currentUser = (this.jwtHelper.decodeToken(localStorage.getItem('access_token')));
  courseInfo;

  enrollment: enrollmentDto = {
    enrollment_id: null,
    courseEnrollment: {
      course_id: null,
      course_name: null,
      course_level: null,
      created_on: null,
      description: null,
      img_url: null,
      user: null
    },
    student_id: null
  }
  isStudent: boolean;
  temp: any[] = [];
  pathChecked: boolean = false;
  enrolledCourseIds: any[] = [];

  constructor(private userService: UserService, private courseService: CourseService,
    private enrollmentService: EnrollmentService, private router: Router) {

    console.log('st', this.currentUser['authorities'][0]);

    if (this.currentUser['authorities'][0] !== 'STUDENT_USER') {
      this.isStudent = false;
    } else {
      this.isStudent = true;
    }
  }

  ngOnInit() {

    console.log('current', this.currentUser);

    let username = (this.jwtHelper.decodeToken(localStorage.getItem('access_token'))).user_name;
    let userId;
    let enrollmentUserId;

    this.userService.getAllUsers().subscribe(users => {
      users.forEach(user => {
        if (user.username === username) {
          this.user_id = user.id;
        }
      })

      this.enrollmentService.findAllEnrollments().subscribe(enrollments => {
        enrollments.forEach(enrollment => {
          enrollmentUserId = enrollment.student_id;
          console.log('this.user_id', this.user_id);
          console.log('enrollmentUserId', enrollmentUserId);
          if (this.user_id === enrollmentUserId) {
            console.log('entered in en');
            this.enrolledCourseIds.push(enrollment.courseEnrollment.course_id);
          }
        })

        console.log('enrolledCourseIds', this.enrolledCourseIds);
        this.courseService.findAllCourses().subscribe(courses => {
          courses.forEach(course => {
            if (this.enrolledCourseIds.length) {
              this.enrolledCourseIds.forEach(courseId => {
                if (courseId !== course.course_id) {
                  this.courses.push(course);
                }
              })
            } else {
              console.log('entered else');
              this.courses.push(course);
            }
          })
        });
      });
    })
  }

  viewPath(event) {
    if (event.target.checked === true) {
      this.pathChecked = true;
    } else if (event.target.checked === false) {
      this.pathChecked = false;
      this.courseService.findAllCourses().subscribe(courses => {
        courses.filter(result => {
          this.courses.push(result);
        })
      });
    }
  }

  filterResults(event) {

    if (event.target.name === "Beginner") {
      if (event.target.checked === true) {
        this.courses = [];
        this.courseService.findAllCourses().subscribe(courses => {
          this.courses = courses.filter(course => {
            return course.course_level === "Beginner";
          })
        })
      } else {
        this.courses = [];
        this.courseService.findAllCourses().subscribe(courses => {
          courses.filter(result => {
            this.courses.push(result);
          })
        });
      }
    } else if (event.target.name === "Intermediate") {

      if (event.target.checked === true) {
        this.courses = [];
        this.courseService.findAllCourses().subscribe(courses => {
          this.courses = courses.filter(course => {
            return course.course_level === "Intermediate";
          })
        })
      } else {
        this.courses = [];
        this.courseService.findAllCourses().subscribe(courses => {
          courses.filter(result => {
            this.courses.push(result);
          })
        });
      }
    } else if (event.target.name === "Advanced") {
      if (event.target.checked === true) {
        this.courses = [];
        this.courseService.findAllCourses().subscribe(courses => {
          this.courses = courses.filter(course => {
            return course.course_level === "Advanced";
          })
        })
      } else {
        this.courses = [];
        this.courseService.findAllCourses().subscribe(courses => {
          courses.filter(result => {
            this.courses.push(result);
          })
        });
      }
    } else {
      this.courses = this.courses;
    }
  }

  enrolled(event) {
    let username = (this.jwtHelper.decodeToken(localStorage.getItem('access_token'))).user_name;
    let userId;
    this.userService.getAllUsers().subscribe(users => {
      users.forEach(user => {
        if (user.username === username) {
          userId = user.id;
          this.user_id = user.id;
          this.enrollment.student_id = this.user_id;
          this.enrollment.courseEnrollment.course_id = this.courseInfo.course_id;
          this.enrollmentService.saveEnrollment(this.enrollment).subscribe(element => {

          })
        }
      })
    })

    this.router.navigate(['/courses'])

  }

  enrolledCourse(course) {
    this.courseInfo = course;
  }

  ngOnChanges(): void { }
}
