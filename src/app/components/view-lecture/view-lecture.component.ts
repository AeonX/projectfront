import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { LectureService } from 'src/app/service/lecture.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-lecture',
  templateUrl: './view-lecture.component.html',
  styleUrls: ['./view-lecture.component.scss']
})
export class ViewLectureComponent implements OnInit {

  pageId: any = '/viewLecture'
  lecturePanels: any[] = [];
  sections: any[] = [];
  selectedVideoLecture: any;
  currentUser = localStorage.getItem("user_id");

  constructor(private lectureService: LectureService,
    private changeDetectorRef: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    let saveModuleName = [];
    this.lectureService.findAllLectures().subscribe(lecture => {

      lecture.forEach(res => {
        //save module name in array
        //compare it with array sections
        if (saveModuleName.includes(res.module.module_name) === false) {
          saveModuleName.push(res.module.module_name);
          this.sections.push(res.module);
        }
        this.lecturePanels.push(res);
        if (this.lecturePanels.length) {
          this.selectPanel(this.lecturePanels[0]);
        }
      })
    })

    console.log('this', this);

  }

  selectPanel(lecturePanel: any) {
    this.selectedVideoLecture = null;
    setTimeout(() => {
      this.selectedVideoLecture = lecturePanel;
      this.changeDetectorRef.detectChanges();
    }, 0);
  }
}
