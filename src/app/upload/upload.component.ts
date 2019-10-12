import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public userFile: any = File;

  constructor() { }
 
  ngOnInit(): void {

  }

  onSelectFile(event) {
    const file = event.target.files[0];
    this.userFile = file;
  }


}
