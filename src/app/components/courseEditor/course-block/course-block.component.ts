import { Component, OnInit, Input } from '@angular/core';
import { lectureDto } from 'src/app/model/backend.model';
import { LectureService } from 'src/app/service/lecture.service';

@Component({
  selector: 'app-course-block',
  templateUrl: './course-block.component.html',
  styleUrls: ['./course-block.component.scss']
})
export class CourseBlockComponent implements OnInit {

  @Input() module;
  titles: any[] = [];

  lecture: lectureDto = {
    lecture_id: null,
    lecture_name: null,
    description: null,
    video_url: null,
    module: null,
    courseLecture: {
      course_id: null,
        course_name: null,
        created_on: null,
        description: null,
        img_url: null,
        user: null
    }
  }

  constructor(private lectureService: LectureService) { }

  ngOnInit() {
  }

  addTitle(i) {
    this.lecture = {
      lecture_id: null,
      lecture_name: null,
      description: null,
      video_url: null,
      courseLecture: {
        course_id: null,
        course_name: null,
        created_on: null,
        description: null,
        img_url: null,
        user: null
      },
      module: {
        module_id: null,
        module_name: null,
        module_code: null,
        description: null,
        course: null
      }
    }
    this.titles.push({ ...this.lecture });
  }

  saveTitle() {
    this.lecture.lecture_name = this.titles[0].lecture_name;
    this.lecture.module.module_id = this.module.module_id;
    this.lecture.courseLecture.course_id = this.module.course.course_id;
    //console.log(this.lecture);

    this.lectureService.save(this.lecture).subscribe(result => {
    });
  }

}
