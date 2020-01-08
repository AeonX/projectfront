import { Injectable, RootRenderer } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enrollmentDto } from '../model/backend.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class EnrollmentService {
    private enrollmentUrl: string = "/private/enrollment";

    headers: any;
    accessToken = localStorage.getItem('access_token');
    httpOptions = {
        headers: this.headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + this.accessToken)
    };
    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient) {}

    public saveEnrollment(enrollment: enrollmentDto) {
        return this.http.post<enrollmentDto>(this.enrollmentUrl, enrollment, this.httpOptions);
    }

    public findAllEnrollments(): Observable<enrollmentDto[]> {
        return this.http.get<enrollmentDto[]>(this.enrollmentUrl, this.httpOptions);
    }

}