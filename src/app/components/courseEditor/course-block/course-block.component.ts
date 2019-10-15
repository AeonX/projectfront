import { Component, OnInit, Input } from '@angular/core';
import { lectureDto } from 'src/app/model/backend.model';

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
    module: null
  }

  constructor() { }

  ngOnInit() {
  }

  addTitle(i) {
    this.lecture = {
      lecture_id: null,
      lecture_name: null,
      description: null,
      video_url: null,
      module: {
        module_id: null,
        module_name: null,
        module_code: null,
        description: null,
        course: null
      }
    }
    this.titles.push({...this.lecture});
  }

}
