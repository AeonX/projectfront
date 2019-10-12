import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lecture } from '../model/lecture';

@Injectable({
    providedIn: 'root'
})

export class LectureService {
    private lectureUrl: string;

    constructor(private http: HttpClient) {
        this.lectureUrl = 'http://localhost:8085/project/lectures';
    }

    public findAllLectures(): Observable<Lecture[]> {
        return this.http.get<Lecture[]>(this.lectureUrl);
    }

    public save(lecture: Lecture) {
        return this.http.post<Lecture>(this.lectureUrl, Lecture);
      }
}