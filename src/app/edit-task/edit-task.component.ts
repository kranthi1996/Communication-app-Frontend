import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthGuard } from '../services/auth.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskEditForm: FormGroup;
  enableEdit:boolean = false;
  todayDate: Date = new Date();
  istimeList: boolean = false;
  selectedTime: any;
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
  constructor(private fb: FormBuilder, private authGuard: AuthGuard,
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.taskEditForm = this.fb.group({
      title: [this.data.title, [Validators.required, Validators.maxLength(255)]],
      priority: [this.data.priority], 
      email: [this.data.taskUsers[0].email],
      date: [this.data.date.split('T')[0]],
      time:[this.data.time],
      description: [this.data.description],
      taskUsers: [""]
    });
    this.selectedTime = this.data.time;
  }
  ngOnInit(): void {
    console.log("edit task",this.data);
    const userObj:any =  this.authGuard.decodedToken();
    if (userObj._id == this.data.created_by && this.data?.taskUsers[0].status !== 3) { 
      this.enableEdit = true;
    } else {
      this.enableEdit = false;
    }
  }
  timeList(): void {
    this.istimeList = !this.istimeList;
  }

  onselectedTime(value: any) {
    this.selectedTime = value;
    this.istimeList = false;
  }
}
