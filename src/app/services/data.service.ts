import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class KanbanDataService {

    newBoard = new Subject<any>();
    toDo = new Subject<any>();
    description = new Subject<any>();
    template = new Subject<any>();
    constructor() { }

    getNewBoard(): Observable<any> {
        return this.newBoard.asObservable();
    }
  
    getTodo(): Observable<any> {
        return this.toDo.asObservable();
    }
   
    setRefresTemplates () {
        this.template.next(true);
    }
    refreshTemplate(): Observable<any> {
        return this.template.asObservable();
    }
}
