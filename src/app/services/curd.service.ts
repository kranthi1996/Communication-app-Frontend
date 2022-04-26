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

    return this.requestSenderService.send(requestObj);
  }
  //event 
  createEvent(postObj: any) {
    const requestObj = {
      path: 'event/create',
      method: 'POST',
      body: postObj
    }
    return this.requestSenderService.send(requestObj);
  }
  updateEvent(updateObj: any) {
    const requestObj = {
      path: 'event/update',
      method: 'PUT',
      body: updateObj
    }
    return this.requestSenderService.send(requestObj);
  }
  getTasks() {
    const requestObj = {
      path: 'task/',
      method: 'GET'
    }
    return this.requestSenderService.send(requestObj);
  }
  getPublicEvents() {
    const requestObj = {
      path: 'event/publicevents',
      method: 'GET'
    }
    return this.requestSenderService.send(requestObj);
  }
  getPrivateEvents() {
    const requestObj = {
      path: 'event/privateevents',
      method: 'GET'
    }
    return this.requestSenderService.send(requestObj);
  }
  forgetPassword(postObj: any) {
    const requestObj = {
      path: 'user/forget_password',
      method: 'POST',
      body: postObj
    }
    return this.requestSenderService.send(requestObj);
  }
  changePassword(postObj: any) {
    const requestObj = {
      path: 'user/change_password',
      method: 'PUT',
      body: postObj
    }
    return this.requestSenderService.send(requestObj);
  }
  updatTaskUserStatus(updateObj: any) {
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
  updateProfileInfo(Obj: any) {
    const requestObj = {
      path: 'user/profileInfo',
      method: 'PUT',
      body: Obj
    }
    return this.requestSenderService.send(requestObj);
  }
  storeFile(postObj:any) {
  console.log("what's happening", postObj)
    const requestObj = {
      path: 'event/storeFile',
      method: 'POST',
      body: postObj
    }
    return this.requestSenderService.send(requestObj);
  }
  deleteEvent(eventId:any) {
    const requestObj = {
      path: `event/delete/${eventId}`,
      method: 'DELETE'
    }
    return this.requestSenderService.send(requestObj);
  }
}




