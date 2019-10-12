import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module } from '../model/module';

@Injectable({
    providedIn: 'root'
})

export class ModuleService {
    private moduleUrl: string;
    private username: string = sessionStorage.getItem('username');
    private pwd: string = sessionStorage.getItem('pwd');  

    constructor(private http: HttpClient) {
        this.moduleUrl = 'http://localhost:8085/project/modules';
    }

    public findAllModules(): Observable<Module[]> {
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.pwd) });
        return this.http.get<Module[]>(this.moduleUrl, {headers});
    }

    public save(module: Module) {
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.pwd) });
        return this.http.post<Module>(this.moduleUrl, module, {headers});
      }
}