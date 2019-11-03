import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { ModuleService } from 'src/app/service/module.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { courseDto, moduleDto, lectureDto } from 'src/app/model/backend.model';
import { LectureService } from 'src/app/service/lecture.service';

@Component({
  selector: 'app-courseEditor',
  templateUrl: './courseEditor.component.html',
  styleUrls: ['./courseEditor.component.scss']
})
export class CourseEditorComponent implements OnInit {

  removeIcon: boolean = true;
  addSection: boolean = false;
  addAccordion: boolean = false;
  modules: any[] = [];


  moduleName: string;
  moduleCode: string;
  description: string;
  createModuleForm: FormGroup;
  lectureName: string;

  @ViewChildren('moduleItem') moduleItem: QueryList<ElementRef>;

  module: moduleDto = {
    module_id: null,
    module_name: null,
    module_code: null,
    description: null,
    course: null
  }

  lecture: lectureDto = {
    lecture_id: null,
    lecture_name: null,
    description: null,
    video_url: null,
    module: null,
    courseLecture: null
  }

  constructor(private moduleService: ModuleService, private route: ActivatedRoute, private lectureService: LectureService) {
  }

  ngOnInit() {

    this.moduleService.findAllModules().subscribe(result => {
      
      result.filter(res => {
        if (parseInt(this.route.snapshot.paramMap.get('course_id')) === res.course.course_id) {
          this.modules.push(res);
        }
      })
    })

    this.createModuleForm = new FormGroup({
      moduleName: new FormControl(),
      moduleCode: new FormControl(),
      description: new FormControl()
    })
  }



  saveTitle() {
  }

  onClick() {
    this.module = {
      module_id: null,
      module_name: this.createModuleForm.value.moduleName,
      module_code: this.createModuleForm.value.moduleCode,
      description: this.createModuleForm.value.description,
      // img_url: ,
      course: {
        course_id: parseInt(this.route.snapshot.paramMap.get('course_id')),
        course_name: null,
        description: null,
        created_on: null,
        img_url: null,
        user: {
          user_id: null
        }
      }
    }
    this.moduleService.save(this.module).subscribe(result => { });
    this.modules.push(this.module);
  }
}
