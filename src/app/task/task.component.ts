import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurdService } from '../services/curd.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  taskCreationForm: FormGroup;
  todayDate:Date = new Date();
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
  constructor(public dialogRef: MatDialogRef<TaskComponent>, private fb: FormBuilder, private curdService: CurdService, private toastr: ToastrService, private dataService:DataService) {
    this.taskCreationForm = this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(255)]],
      priority: ["High"],
      email: [""],
      finsihTime: [""],
      description: [""],
      taskUsers:[""]
    });
  }

  ngOnInit(): void {}
  createTask() {
    this.taskCreationForm.value.taskUsers = ["kranthimandava953@gmail.com"]
    this.curdService.createTask(this.taskCreationForm.value).subscribe(async (resp: any) => {
      this.toastr.success(resp.message);
      this.dataService.setCreateTask();
      this.closeDialog();
    }, (err: any) => {
      console.log(err);
      this.toastr.error(err.error.errObj.message);
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }


  timeList(): void {
    this.istimeList = !this.istimeList;
  }

  onselectedTime(value: any) {
    this.selectedTime = value;
    this.istimeList = false;
  }
}
