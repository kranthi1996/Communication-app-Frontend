import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { CurdService } from '../services/curd.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  tasks: any;
  noTasks: boolean = true;


  constructor(private curdService: CurdService, private toastr: ToastrService, private dataService: DataService, public dialog: MatDialog) {
    this.dataService.getTaskObservable().subscribe(data => {
      if (data) {
        this.getTasks();
      }
    });
  }

  ngOnInit(): void {
    this.getTasks()
  }
  drop(event: CdkDragDrop<any>, column: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const status = this.status(column);
      const _obj = {
        id: event.container.data[event.currentIndex].taskUsers[0].id,
        status: status
      }
      this.updatTaskUserStatus(_obj);
    }
  }
  getTasks() {
    this.curdService.getTasks().subscribe(async (resp: any) => {
      console.log(resp.data);
      this.tasks = resp.data;
      if(this.tasks[0].tasks.length == 0 &&  this.tasks[1].tasks.length == 0 &&   this.tasks[1].tasks.length == 0){
        this.noTasks = true;
      } else {
        this.noTasks = false;
      }
    }, (err: any) => {
      console.log(err);
      this.toastr.error(err.error.errObj.message);
    });
  }
  updatTaskUserStatus(_obj: any) {
    this.curdService.updatTaskUserStatus(_obj).subscribe(async (resp: any) => {
      //this.tasks = resp.data;
    }, (err: any) => {
      console.log(err);
      this.toastr.error(err.error.errObj.message);
    });
  }
  status(name: string) {
    switch (name) {
      case 'New Tasks':
        return 1;
      case 'Inprogress':
        return 2;
      case 'Done':
        return 3;
      default:
        return 0;
    }
  }
  openDialog(item:any) {
    //item.created_by == ?
    const dialogRef = this.dialog.open(EditTaskComponent, {data:item});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
