import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lectureDto } from '../model/backend.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})

export class LectureService {
    private lectureUrl: string = 'private/lectures';
    private username: string = sessionStorage.getItem('user_name');
    private pwd: string = sessionStorage.getItem('pwd');

    headers: any;
    accessToken = localStorage.getItem('access_token');
    httpOptions = {
        headers: this.headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + this.accessToken)
    };
    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient) {
    }

    public findAllLectures(): Observable<lectureDto[]> {
        return this.http.get<lectureDto[]>(this.lectureUrl, this.httpOptions);
    }

    public save(lecture: lectureDto) {
        return this.http.post<lectureDto>(this.lectureUrl, lecture, this.httpOptions).pipe(map((response: any) => {
            return response;
        }))
    }

    public update(lecture: lectureDto) {
        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(this.username + ':' + this.pwd),
            observe: 'response'
        });
        return this.http.put<lectureDto>(this.lectureUrl, lecture, { headers }).pipe(map((response: any) => {
            return response;
        }))
    }

    // public findLectureById(lecture: lectureDto) {
    //     const headers = new HttpHeaders({
    //         Authorization: 'Basic ' + btoa(this.username + ':' + this.pwd),
    //         observe: 'response'
    //     });
    //     return this.http.put<lectureDto>(this.lectureUrl, lecture, { headers }).pipe(map((response: any) => {
    //         return response;
    //     }))
    // }
}