import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video/dist/src/embed-video.service';

@Component({
  selector: 'app-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.scss']
})
export class AddLectureComponent implements OnInit {

  pageId: any = '/addLecture'

  constructor() { }

  ngOnInit() {
  }

}
