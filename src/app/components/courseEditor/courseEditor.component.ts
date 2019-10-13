import { Component, OnInit, DoCheck } from '@angular/core';
import { ModuleService } from 'src/app/service/module.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { courseDto, moduleDto } from 'src/app/model/backend.model';

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
  titles: any[] = [];

  moduleName: string;
  moduleCode: string;
  description: string;
  createModuleForm: FormGroup;

  module: moduleDto = {
    module_id: null,
    module_name: null,
    module_code: null,
    description: null,
    courseEntity: null
  }

  constructor(private moduleService: ModuleService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.moduleService.findAllModules().subscribe(result => {
      result.filter(res => {
        if (parseInt(this.route.snapshot.paramMap.get('course_id')) == res.courseEntity.course_id) {
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

  addTitle() {
    let title: any = {
      id: null,
      text: 'test'
    }
    this.titles.push(title);
  }

  onClick() {
    this.module = {
      module_id: null,
      module_name: this.createModuleForm.value.moduleName,
      module_code: this.createModuleForm.value.moduleCode,
      description: this.createModuleForm.value.description,
      // img_url: ,
      courseEntity: {
        course_id: parseInt(this.route.snapshot.paramMap.get('course_id')),
        coursename: null,
        description: null,
        img_url: null,
        userEntity: null
      }
    }

    this.moduleService.save(this.module).subscribe(result => { });
    this.modules.push(this.module);
  }

}
