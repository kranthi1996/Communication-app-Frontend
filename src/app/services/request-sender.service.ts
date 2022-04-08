
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface RequestObject {
  path: string;
  method: string;
  body?: object;
  headers?: any;
}

@Injectable({ providedIn: 'root' })

export class RequestSenderService {

  constructor(private http: HttpClient) { }

  send(requestObj: RequestObject): any {
    
    // if (!requestObj.headers) {
    //   requestObj.headers = {};
    // }
    // if (!requestObj.headers['Content-Type']) {
    //   requestObj.headers['Content-Type'] = 'application/json';
    // }

    // if (localStorage.token) {
    //   requestObj.headers.Authorization = 'Bearer ' + localStorage.token;
    // }
    const url = environment.URL + requestObj.path;

    switch (requestObj.method) {
      case 'GET':
        return this.http.get<any>(url);
      case 'POST':
        return this.http.post<any>(url, requestObj.body);
      case 'PUT':
        return this.http.put<any>(url, requestObj.body);
      case 'DELETE':
        return this.http.delete<any>(url);
    }
  }
}
