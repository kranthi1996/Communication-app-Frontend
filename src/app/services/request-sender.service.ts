
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

  token: any;
  constructor(private http: HttpClient) {}

  send(requestObj: RequestObject): any {

    if (!requestObj.headers) {
      requestObj.headers = {};
    }
    if (!requestObj.headers['Content-Type']) {
      requestObj.headers['Content-Type'] = 'application/json';
    }

    if (localStorage['token']) {
      requestObj.headers.Authorization = localStorage['token'];
    }
    const url = environment.URL + requestObj.path;

    switch (requestObj.method) {
      case 'GET':
        return this.http.get<any>(url, { headers: requestObj.headers });
      case 'POST':
        return this.http.post<any>(url, requestObj.body, { headers: requestObj.headers });
      case 'PUT':
        return this.http.put<any>(url, requestObj.body, { headers: requestObj.headers });
      case 'DELETE':
        return this.http.delete<any>(url, { headers: requestObj.headers });
    }
  }
}
