import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { courseDto } from '../model/backend.model';

@Injectable()
export class UpdateDataService {
    currentCourse;
    public updated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}