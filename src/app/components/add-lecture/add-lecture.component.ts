import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video/dist/src/embed-video.service';
import { LectureService } from 'src/app/service/lecture.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.scss']
})
export class AddLectureComponent implements OnInit {

  pageId: any = '/addLecture'
  lecturePanels: any[] = [];
  sections: any[] = [];
  selectedVideoLecture: any;

  constructor(private lectureService: LectureService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    let saveModuleName = [];
    this.lectureService.findAllLectures().subscribe(lecture => {

      lecture.forEach(res => {
        //save module name is array
        //compare it with array sections
        if (saveModuleName.includes(res.module.module_name) === false) {
          saveModuleName.push(res.module.module_name);
          this.sections.push(res.module);
        }
        this.lecturePanels.push(res);

        if (this.lecturePanels.length) {
          this.selectPanel(this.lecturePanels[0])
        }
      })
    })

  }

  selectPanel(lecturePanel: any) {
    this.selectedVideoLecture = null;
    setTimeout(() => {
      this.selectedVideoLecture = lecturePanel;
      console.log(this.selectedVideoLecture.video_url)
      this.changeDetectorRef.detectChanges();

    }, 0);
  }


}
