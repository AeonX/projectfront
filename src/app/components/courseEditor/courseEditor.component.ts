import { Component, OnInit } from '@angular/core';
import { ModuleService } from 'src/app/service/module.service';
import { Module } from 'src/app/model/module';
import { min } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-courseEditor',
  templateUrl: './courseEditor.component.html',
  styleUrls: ['./courseEditor.component.scss']
})
export class CourseEditorComponent implements OnInit {

  removeIcon: boolean = true;
  addSection: boolean = false;
  addAccordion: boolean = false;
  sections: any[] = [];
  titles: any[] = [];

  moduleName: string;
  moduleCode: string;
  description: string;
  createModuleForm: FormGroup;

  module: Module;

  constructor( private moduleService: ModuleService) {
    this.module = new Module();
   }

  ngOnInit() {

    this.createModuleForm = new FormGroup({
      moduleName: new FormControl(),
      moduleCode: new FormControl(),
      description: new FormControl()
    })
  }

  
  


  add() {
    let data: any = {
      ouLetter: 'test',
      noEmployees: false,
      salarySuvaEmployees: null,
      id: null,
      version: null,
      salarySuvaId: null
  }
  this.sections.push(data);
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
    id: null,
    module_name: this.createModuleForm.value.moduleName,
    module_code: this.createModuleForm.value.moduleCode,
    description: this.createModuleForm.value.description,
    // img_url: ,
    course_id: null
  }
  
  this.moduleService.save(this.module).subscribe(result => {});
  this.sections.push(this.module);
  }

}
