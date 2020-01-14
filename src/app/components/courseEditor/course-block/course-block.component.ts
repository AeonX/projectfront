import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { lectureDto } from 'src/app/model/backend.model';
import { LectureService } from 'src/app/service/lecture.service';
import { ModuleService } from 'src/app/service/module.service';

@Component({
  selector: 'app-course-block',
  templateUrl: './course-block.component.html',
  styleUrls: ['./course-block.component.scss']
})
export class CourseBlockComponent implements OnInit {

  @Input() module;
  @Input() i;
  @Input() courseId;
  titles: any[] = [];
  showTitles: any[] = [];

  lecture: lectureDto = {
    lecture_id: null,
    lecture_name: null,
    description: null,
    video_url: null,
    module: null,
    courseLecture: {
      course_id: null,
      course_name: null,
      course_level: null,
      created_on: null,
      description: null,
      img_url: null,
      user: null
    }
  }

  constructor(private lectureService: LectureService, private moduleService: ModuleService) { }

  ngOnInit() {
    this.lectureService.findAllLectures().subscribe(element => {
      element.forEach( ele => {

        if(this.module.module_id == ele.module.module_id)
          this.showTitles.push(ele)
      })
    })

    console.log('this coursas', this.courseId);
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
        course_level: null,
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


    this.titles.forEach(element => {
      this.lecture.lecture_name = element.lecture_name;
      this.lecture.module.module_id = this.module.module_id;
      this.lecture.courseLecture.course_id = this.module.course.course_id;

      this.lectureService.save(this.lecture).subscribe(result => {


      });

    })




  }

}
