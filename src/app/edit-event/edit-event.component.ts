import { DataService } from './../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurdService } from '../services/curd.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
  selectedTime: any;
  selectedEndTime: any;
  isEndtimeList: boolean = false;
  istimeList: boolean = false;
  eventForm: FormGroup;
  inPerson: boolean = false;
  isPrivate: boolean = false;
  attendees: any;
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
    '11:00 PM', '11:15 PM', '11:30 PM', '11:45 PM',];
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService:DataService,
    private router: Router,
    private toastr: ToastrService,
    private curdService: CurdService) {
    this.eventForm = this.fb.group({
      name: [this.data.name, [Validators.required, Validators.maxLength(255)]],
      type: [this.data.type],
      eventaccess: [this.data.eventaccess],
      attendees: this.fb.array(this.data.attendees),
      timezone: [Intl.DateTimeFormat().resolvedOptions().timeZone],
      startDate: [this.data.startDate.split('T')[0]],
      startTime: [this.data.startTime],
      endDate: [this.data.endDate.split('T')[0]],
      endTime: [this.data.endTime],
      link: [this.data.link],
      description: [this.data.description],
      speakers: [this.data.speakers],
      address: [this.data.address],
      venue: [this.data.venue]
    });
    this.attendees = this.data.attendees;
    console.log("I am edit event", this.data);
    this.selectedTime = this.data.startTime;
    this.selectedEndTime = this.data.selectedEndTime;
  }

  ngOnInit(): void {
  }
  timeList(): void {
    this.istimeList = !this.istimeList;
    this.isEndtimeList = false;
  }

  onselectedTime(value: any) {
    this.selectedTime = value;
    //this.eventForm.patchValue({ startTime: this.selectedTime });
    this.istimeList = false;
  }

  timeEndList(): void {
    this.isEndtimeList = !this.isEndtimeList;
    this.istimeList = false;
  }

  onselectedEndTime(value: any) {
    this.selectedEndTime = value;
    // this.eventForm.patchValue({ endTime: this.selectedEndTime });
    this.isEndtimeList = false;
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
  updateEvent() {
    this.eventForm.value.id = this.data.id;
    this.eventForm.value.attendees = this.data.attendees;
    console.log(this.eventForm.value.id);
    this.curdService.updateEvent(this.eventForm.value).subscribe(async (resp: any) => {
      await this.dataService.setEvent();
      this.closeDialog();
      this.router.navigateByUrl('/dashboard/event-details');
    }, (err: any) => {
      console.log(err);
      this.toastr.error(err.error.errObj.message);
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
  removeEmail(index: any) {
    this.attendees.splice(index, 1);
  }
  onFocusOutEvent(event: any) {
    if (event.target.value.includes('@')) {
      this.attendees.push(event.target.value);
    }
  }
}
