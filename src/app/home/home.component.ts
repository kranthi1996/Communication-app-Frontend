import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { EditEventComponent } from '../edit-event/edit-event.component';
import { CurdService } from '../services/curd.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todayPublicEvents: any = [];
  todayPriavateEvents: any = [];
  tasks: any;
  constructor(public dialog: MatDialog,private curdService: CurdService) { }

  ngOnInit(): void {
    this._todayPublicEvents();
    this._todayPrivateEvents();
    this.todayDeadLineTasks();
  }
  _todayPublicEvents() {
    this.curdService.getPublicEvents().subscribe(async (resp: any) => {
      if (resp.data.length > 0) {
        const publicEvents = resp.data;
        this.todayPublicEvents = publicEvents.filter((event: any) => {
          //console.log(event.startDate.split('T')[0] + "   " + new Date().toJSON().split('T')[0])
          return event.startDate.split('T')[0] === new Date().toJSON().split('T')[0]
        });
        console.log(this.todayPublicEvents);
      }
    }, (err: any) => {
      //this.toastr.error(err.error.errObj.message);
    });
  }
  _todayPrivateEvents() {
    this.curdService.getPrivateEvents().subscribe(async (resp: any) => {
      if (resp.data.length > 0) {
        const privateEvents = resp.data;
        this.todayPriavateEvents = privateEvents.filter((event: any) => {
          return event.startDate.split('T')[0] === new Date().toJSON().split('T')[0]
        });
        console.log(this.todayPriavateEvents);
      }
    }, (err: any) => {
      //this.toastr.error(err.error.errObj.message);
    });
  }
  eventPreview(event: any) {
    const dialogRef = this.dialog.open(EditEventComponent, { data: event });
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  todayDeadLineTasks() {
    this.curdService.getTasks().subscribe(async (resp: any) => {
      if (resp.data.length > 0) {
        // this.tasks = resp.data.filter((task: any) => {
        //   return task.tasks.filter((task: any) => {
        //     console.log(task.date.split('T')[0] +" "+ new Date().toJSON().split('T')[0])
        //     return task.date.split('T')[0] === new Date().toJSON().split('T')[0]
        //   })
        // });

        this.tasks =  resp.data.filter((task:any) => task.tasks.some((task:any) => task.date.split('T')[0] === new Date().toJSON().split('T')[0]));
      }

  
    }, (err: any) => {
      console.log(err);
      //this.toastr.error(err.error.errObj.message);
    });
  }
}
