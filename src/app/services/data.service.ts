import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    newTask = new Subject<any>();
    newEvent = new Subject<any>();

    constructor() { }


    setCreateTask() {
        this.newTask.next(true);
    }
    getTaskObservable(): Observable<any> {
        return this.newTask.asObservable();
    }
    setEvent() {
        this.newEvent.next(true);
    }
    getEventObservable(): Observable<any> {
        return this.newEvent.asObservable();
    }
}
