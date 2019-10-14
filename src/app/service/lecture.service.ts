import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lectureDto } from '../model/backend.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class LectureService {
    private lectureUrl: string = 'http://localhost:8085/project/lectures';
    private username: string = sessionStorage.getItem('username');
    private pwd: string = sessionStorage.getItem('pwd');

    constructor(private http: HttpClient) {
    }

    public findAllLectures(): Observable<lectureDto[]> {
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.pwd) });
        return this.http.get<lectureDto[]>(this.lectureUrl, { headers });
    }

    public save(lecture: lectureDto) {
        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(this.username + ':' + this.pwd),
            observe: 'response'
        });
        return this.http.post<lectureDto>(this.lectureUrl, lecture, { headers }).pipe(map((response: any) => {
            return response;
        }))
    }
}