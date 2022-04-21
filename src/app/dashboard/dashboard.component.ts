import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from '../task/task.component';
import { EventComponent } from "../event/event.component";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  iscreateClick: boolean = false;
  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void { }
  options = ["Create+", "Task", "Event", "Go to tasks"]
  openDialog() {
    const dialogRef = this.dialog.open(TaskComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.iscreateClick = false;
  }
  goToEvent() {
    const dialogRef = this.dialog.open(EventComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.iscreateClick = false;
  }
  goToTaskDetails() {
    this.router.navigate(['dashboard/task-details']);
    this.iscreateClick = false;
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  onChange(deviceValue: any) {
    if (deviceValue.value == "Task") {
      this.openDialog();
    } else if (deviceValue.value == "Event") {
      this.goToEvent();
    } else if (deviceValue.value == "Go to tasks") {
      this.goToTaskDetails();
    }
  }

  createClick(): void {
    this.iscreateClick = !this.iscreateClick;
  }
}
