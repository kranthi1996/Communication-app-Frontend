import { Injectable } from '@angular/core';
import { RequestSenderService } from './request-sender.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurdService {



  constructor(private requestSenderService: RequestSenderService, private httpClient: HttpClient) { }

  //user
  signUp(postObj: Object) {
    const requestObj = {
      path: 'user/register',
      method: 'POST',
      body: postObj
    }
    return this.requestSenderService.send(requestObj);
  }
  activateEmail(postObj: Object) {
    const requestObj = {
      path: 'user/confirmation/email',
      method: 'POST',
      body: postObj
    }
    return this.requestSenderService.send(requestObj);
  }
  login(postObj: Object) {
    const requestObj = {
      path: 'user/login',
      method: 'POST',
      body: postObj
    }
    return this.requestSenderService.send(requestObj);
  }

  //task
  createTask(postObj: any) {
    const requestObj = {
      path: 'task/create',
      method: 'POST',
      body: postObj
    }
    //localStorage['t = JSON.parse(localStorage.getItem("token"));
    return this.requestSenderService.send(requestObj);
  }

  getTasks() {
    const requestObj = {
      path: 'task/',
      method: 'GET'
    }
    return this.requestSenderService.send(requestObj);
  }
  updatTaskUserStatus(updateObj:any) {
    const requestObj = {
      path: 'task/task_user_status',
      method: 'PUT',
      body: updateObj
    }
    return this.requestSenderService.send(requestObj);
  }
  getProfileInfo() {
    const requestObj = {
      path: 'user/profileInfo',
      method: 'GET'
    }
    return this.requestSenderService.send(requestObj);
  }
  updateProfileInfo(Obj:any) {
    const requestObj = {
      path: 'user/profileInfo',
      method: 'PUT',
      body:Obj
    }
    return this.requestSenderService.send(requestObj);
  }
}




