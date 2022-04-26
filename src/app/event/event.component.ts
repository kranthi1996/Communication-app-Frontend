import { ConfiramtionEmailComponent } from './../confirmation-email/confirmation-email.component';
import { DataService } from './../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CurdService } from '../services/curd.service';
import { AuthGuard } from '../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  eventForm: FormGroup;
  inPerson: boolean = false;
  isPrivate: boolean = false;
  profilePicSrc: string = 'https://masters-project-bucket.s3.eu-west-2.amazonaws.com/file1';
  file: string = '';
  uploadImage: boolean = false;
  selected = [
    '12:00 AM', '12:15 AM', '12:30 AM', '12:45 AM',
    '1:00 AM', '1:15 AM', '1:30 AM', '1:45 AM',
    '2:00 AM', '2:15 AM', '2:30 AM', '2:45 AM',
    '3:00 AM', '3:15 AM', '3:30 AM', '3:45 AM',
    '4:00 AM', '4:15 AM', '4:30 AM', '4:45 AM',
    '5:00 AM', '5:15 AM', '5:30 AM', '5:45 AM',
    '6:00 AM', '6:15 AM', '6:30 AM', '6:45 AM',
    '7:00 AM', '7:15 AM', '7:30 AM', '7:45 AM',
    '8:00 AM', '8:15 AM', '8:30 AM', '8:45 AM',
    '9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM',
    '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM',
    '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM',
    '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM',
    '1:00 PM', '1:15 PM', '1:30 PM', '1:45 PM',
    '2:00 PM', '2:15 PM', '2:30 PM', '2:45 PM',
    '3:00 PM', '3:15 PM', '3:30 PM', '3:45 PM',
    '4:00 PM', '4:15 PM', '4:30 PM', '4:45 PM',
    '5:00 PM', '5:15 PM', '5:30 PM', '5:45 PM',
    '6:00 PM', '6:15 PM', '6:30 PM', '6:45 PM',
    '7:00 PM', '7:15 PM', '7:30 PM', '7:45 PM',
    '8:00 PM', '8:15 PM', '8:30 PM', '8:45 PM',
    '9:00 PM', '9:15 PM', '9:30 PM', '9:45 PM',
    '10:00 PM', '10:15 PM', '10:30 PM', '10:45 PM',
    '11:00 PM', '11:15 PM', '11:30 PM', '11:45 PM',
  ];
  attendees: any = [];
  selectedTime: any;
  selectedEndTime: any;
  isEndtimeList: boolean = false;
  istimeList: boolean = false;

  constructor(private dataService: DataService, private router: Router, public dialogRef: MatDialogRef<EventComponent>, private authService: AuthGuard, private fb: FormBuilder, private curdService: CurdService, private toastr: ToastrService) {
    this.eventForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(255)]],
      type: [""],
      eventaccess: [""],
      attendees: this.fb.array([]),
      timezone: [Intl.DateTimeFormat().resolvedOptions().timeZone],
      startDate: [""],
      startTime: [""],
      endDate: [""],
      endTime: [""],
      link: [""],
      description: [""],
      speakers: [""],
      address: [""],
      venue: [""],
      //file: [""]
    })
  }

  ngOnInit(): void {

  }
  addCurrentUserToAttedees() {
    const tokenObj: any = this.authService.decodedToken();
    if (!this.attendees.includes(tokenObj.email)) {
      this.attendees.push(tokenObj.email)
    }
  }
  setAttendees() {
    this.eventForm.value.attendees = this.attendees;
  }
  createEvent() {
    this.addCurrentUserToAttedees();
    this.setAttendees();
   //this.eventForm.controls['file'].setValue(this.file);
    console.log(this.eventForm.value);
    this.curdService.createEvent(this.eventForm.value).subscribe(async (resp: any) => {
      this.toastr.success(resp.message);
      this.dataService.setEvent();
      this.closeDialog();
      this.router.navigateByUrl('/dashboard/event-details');
    }, (err: any) => {
      console.log(err);
      this.toastr.error(err.error.errObj.message);
    });
  }
  storeFile(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    //console.log(formData.getAll('file')[0]);
    const fileObj = formData.getAll('file')[0];
    this.curdService.storeFile(fileObj).subscribe(async (resp: any) => {
    }, (err: any) => {
      console.log(err);
      this.toastr.error(err.error.errObj.message);
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
  onFocusOutEvent(event: any) {
    if (event.target.value.includes('@')) {
      this.attendees.push(event.target.value);
    }
  }
  eventType(event: any) {
    if (event.value === 'Online') {
      this.inPerson = false;
      this.eventForm.patchValue({ type: "ONLINE" });
    } else if (event.value === 'Inperson') {
      this.inPerson = true;
      this.eventForm.patchValue({ type: "INPERSON" });
    }
  }
  eventAccess(event: any) {
    if (event.value === 'Public') {
      this.eventForm.patchValue({ eventaccess: "PUBLIC" });
      this.isPrivate = false;;
    } else if (event.value === 'Private') {
      this.eventForm.patchValue({ eventaccess: "PRIVATE" });
      this.isPrivate = true;
    }
  }
  removeEmail(emails: any, index: any) {
    this.attendees.splice(index, 1)
  }
  timeList(): void {
    this.istimeList = !this.istimeList;
    this.isEndtimeList = false;
  }

  onselectedTime(value: any) {
    this.selectedTime = value;
    this.eventForm.patchValue({ startTime: this.selectedTime });
    this.istimeList = false;
  }

  timeEndList(): void {
    this.isEndtimeList = !this.isEndtimeList;
    this.istimeList = false;
  }

  onselectedEndTime(value: any) {
    this.selectedEndTime = value;
    this.eventForm.patchValue({ endTime: this.selectedEndTime });
    this.isEndtimeList = false;
  }
  async handleFileInput(event: any) {
    //if(event.target.files.length>0) {
    //await this.storeFile(file);
    //}
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePicSrc = reader.result as string;
      this._iSUploadImage();
    };
    reader.readAsDataURL(file);
  }
  _iSUploadImage() {
    this.uploadImage = true;
  }
}
