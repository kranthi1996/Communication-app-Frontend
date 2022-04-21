import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskEditForm: FormGroup;
  constructor(private fb: FormBuilder, 
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.taskEditForm = this.fb.group({
      title: [this.data.title, [Validators.required, Validators.maxLength(255)]],
      priority: [this.data.priority],
      email: [this.data.email],
      finsihTime: [this.data.finishTime],
      description: [this.data.description],
      taskUsers: [""]
    });
  }
  ngOnInit(): void {
    console.log("edit task",this.data)
  }

}
