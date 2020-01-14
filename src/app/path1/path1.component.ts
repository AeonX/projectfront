import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { courseDto } from '../model/backend.model';

@Component({
  selector: 'app-path1',
  templateUrl: './path1.component.html',
  styleUrls: ['./path1.component.scss']
})
export class Path1Component implements OnInit {

  courses: courseDto[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.findAllCourses().subscribe(courses => {
      courses.forEach(course => {
        this.courses.push(course);
      })
      console.log('cour', this.courses);
    })
  }

}
