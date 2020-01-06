import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { moduleDto } from '../model/backend.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})

export class ModuleService {
    //private moduleUrl: string;
    private username: string = sessionStorage.getItem('user_name');
    private pwd: string = sessionStorage.getItem('pwd');

    private moduleUrl = "/private/modules"
    headers: any;
    accessToken = localStorage.getItem('access_token');
    httpOptions = {
        headers: this.headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + this.accessToken)
    };
    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient) {
    }

    public findAllModules(): Observable<moduleDto[]> {
        return this.http.get<moduleDto[]>(this.moduleUrl, this.httpOptions);
    }

    public save(module: moduleDto) {
        return this.http.post<moduleDto>(this.moduleUrl, module, this.httpOptions);
    }
}