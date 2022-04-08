import { Injectable } from '@angular/core';
import { RequestSenderService } from './request-sender.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurdService {

 

  constructor(private requestSenderService: RequestSenderService, private httpClient: HttpClient) {}

  signUp(postObj:Object) {
      const requestObj = {
        path: 'user/register',
        method: 'POST',
        body: postObj
      }
      return this.requestSenderService.send(requestObj);
    }
    login(postObj:Object) {
      const requestObj = {
        path: 'user/login',
        method: 'POST',
        body: postObj
      }
      return this.requestSenderService.send(requestObj);
    }
  }




