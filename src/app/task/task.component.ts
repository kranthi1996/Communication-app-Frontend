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
}
