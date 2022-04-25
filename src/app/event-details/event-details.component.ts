import { ToastrService } from 'ngx-toastr';
import { CurdService } from './../services/curd.service';
import { Component, OnInit } from '@angular/core';
import { EditEventComponent } from '../edit-event/edit-event.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  publicEvents: any;
  privateEvents: any;
  constructor(private dataService: DataService, public dialog: MatDialog, private curdService: CurdService, private toastr: ToastrService) {
    this.dataService.getEventObservable().subscribe(data => {
      if (data) {
        this.getPublicEvents();
        this.getPrivateEvents();
      }
    });
  }

  ngOnInit(): void {
    this.getPublicEvents();
    this.getPrivateEvents();
  }
  getPublicEvents() {
    this.curdService.getPublicEvents().subscribe(async (resp: any) => {
      console.log(resp.data);
      this.publicEvents = resp.data;
    }, (err: any) => {
      this.toastr.error(err.error.errObj.message);
    });
  }
  getPrivateEvents() {
    this.curdService.getPrivateEvents().subscribe(async (resp: any) => {
      console.log(resp.data);
      this.privateEvents = resp.data;
    }, (err: any) => {
      this.toastr.error(err.error.errObj.message);
    });
  }
  eventPreview(event: any) {
    const dialogRef = this.dialog.open(EditEventComponent, { data: event });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
