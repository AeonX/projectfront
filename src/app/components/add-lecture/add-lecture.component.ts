import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';
import { lectureDto, quizDto } from 'src/app/model/backend.model';
import { FormGroup, FormControl } from '@angular/forms';
import { LectureService } from 'src/app/service/lecture.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { QuizService } from 'src/app/service/quiz.service';


@Component({
  selector: 'app-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.scss']
})
export class AddLectureComponent implements OnInit {

  video_url: string = "";
  hasVideoUrl: boolean = true;
  isLoading: boolean;
  image: any;
  imgSize: number;
  canSaveLecture: number = 0;
  isCreateLecture: boolean = true;
  currentLecture: lectureDto;
  saveDescription: string;
  addDescription: boolean = false;
  quizForm: FormGroup;
  filteredQuiz: quizDto[] = [];
  quiz: quizDto = {
    quiz_id: null,
    quiz_name: null,
    courseQuiz: {
      course_id: null,
      course_name: null,
      created_on: null,
      description: null,
      img_url: null,
      user: null
    },
    moduleQuiz: {
      description: null,
      module_code: null,
      module_id: null,
      module_name: null,
      course: null
    }
  }

  lectureForm: FormGroup;

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

  currentQuizId;
  goToQuiz: boolean = false;

  constructor(private lectureService: LectureService, private quizService: QuizService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let current_id;

    this.route.paramMap.subscribe(element => {
      current_id = parseInt(element.get('lecture_id'));
    })

    this.lectureService.findAllLectures().subscribe(result => {
      result.forEach(element => {
        if (element.lecture_id === current_id) {
          this.currentLecture = element;
          if (this.currentLecture.description !== null) {
            this.addDescription = true;
            this.saveDescription = this.currentLecture.description;
          }

          if (this.currentLecture.video_url !== "") {
            this.hasVideoUrl = true;
            this.video_url = this.currentLecture.video_url;
          }
        }
      });
    });

    this.quizService.findAllQuizzes().subscribe(quiz => {

      // quiz.forEach(element => {
      //   // if(element.courseQuiz.course_id === this.currentLecture.courseLecture.course_id && element.moduleQuiz.module_id === this.currentLecture.module.module_id) {
      //   //   this.filteredQuiz.push(element);
      //   // }
      // })

      quiz.filter(element => {
        if (this.currentLecture.courseLecture.course_id === element.courseQuiz.course_id && element.moduleQuiz.module_id === this.currentLecture.module.module_id) {
          this.filteredQuiz.push(element);
          this.currentQuizId = element.quiz_id;
        }
      })
    })



    this.lectureForm = new FormGroup({
    });

    this.quizForm = new FormGroup({
      quizname: new FormControl()
    });
  }

  addVideoUrl() {
  }

  goToAddQuiz() {

    this.goToQuiz = !this.goToQuiz;
  }

  fileEvent(fileInput: any) {
    this.isLoading = true;
    const AWSService = AWS;
    const region = 'eu-central-1';
    const bucketName = 'webify';
    const IdentityPoolId = 'eu-central-1:8e7c4ec1-e682-471a-ae89-3a06e8977b18';
    const file = fileInput.target.files[0];

    //Configures the AWS service and initial authorization
    AWSService.config.update({
      region: region,
      credentials: new AWSService.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      })
    });

    //adds the S3 service, make sure the api version and bucket are correct
    const s3 = new AWSService.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: bucketName }
    });
    //I store this in a variable for retrieval later
    this.image = file.name;
    s3.upload({ Key: file.name, Bucket: bucketName, Body: file, ACL: 'public-read' }, (err, data) => {
      this.isLoading = false;
      this.video_url = data.Location;
      this.lecture.video_url = data.Location;
      this.currentLecture.video_url = data.Location;
      if (err) {
        console.log(err, 'there was an error uploading your file');
      }
    }).on('httpUploadProgress', element => {
      //put progress bar to 100 when upload is complete
      this.imgSize = 100;
      //change canSaveCourse to 1 when image is uploaded to be able to save 
      this.canSaveLecture = 1;
    })
  }

  closeModal() {
    if (this.currentLecture.video_url !== "") {
      this.hasVideoUrl = true;
      this.lectureService.save(this.currentLecture).subscribe(result => {
        this.lectureService.findAllLectures().subscribe(res => {
        })
      })
    }
  }

  closeModalQuiz() {
    this.quiz.quiz_name = this.quizForm.value.quizname;
    this.quiz.moduleQuiz.module_id = this.currentLecture.module.module_id;
    this.quiz.courseQuiz.course_id = this.currentLecture.module.course.course_id;

    this.quizService.save(this.quiz).subscribe(res => {
    })
  }

  addText() {
    this.addDescription = true;
  }

  saveText() {
    this.currentLecture.description = this.saveDescription;
    this.lectureService.save(this.currentLecture).subscribe(result => {

    })
  }

}
