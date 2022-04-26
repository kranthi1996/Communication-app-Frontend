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

  publicEvents: any = [
    {
      name: 'hello',
      startDate: '20 - 12 - 2022',
      startTime: '12: 56 AM',
      endDate: '20 - 12 - 2022',
      endTime: '12: 56 AM',
      type: "ONLINE",
      eventaccess: "PUBLIC",
      attendees: ['kranthimandava@gmail.com', "venky@gmail.com"],
      link: "http://localhost:4200/dashboard/event-details",
      description: "Event details",
      speakers: ['kranthi@gmail.com'],
      address: ["Hyd"],
      venue: ["hyd"]
    },
    {
      name: 'hello',
      startDate: '20 - 12 - 2022',
      startTime: '12: 56 AM',
      endDate: '20 - 12 - 2022',
      endTime: '12: 56 AM',
      type: "INPERSON",
      eventaccess: "PRIVATE",
      attendees: ['kranthimandava@gmail.com', "venky@gmail.com"],
      link: "http://localhost:4200/dashboard/event-details",
      description: "Event details",
      speakers: ['kranthi@gmail.com'],
      address: ["Hyd"],
      venue: ["hyd"]
    },
    {
      name: 'hello',
      startDate: '20 - 12 - 2022',
      startTime: '12: 56 AM',
      endDate: '20 - 12 - 2022',
      endTime: '12: 56 AM',
      type: "ONLINE",
      eventaccess: "PUBLIC",
      attendees: ['kranthimandava@gmail.com', "venky@gmail.com"],
      link: "http://localhost:4200/dashboard/event-details",
      description: "Event details",
      speakers: ['kranthi@gmail.com'],
      address: ["Hyd"],
      venue: ["hyd"]
    },
    {
      name: 'hello',
      startDate: '20 - 12 - 2022',
      startTime: '12: 56 AM',
      endDate: '20 - 12 - 2022',
      endTime: '12: 56 AM',
      type: "ONLINE",
      eventaccess: "PUBLIC",
      attendees: ['kranthimandava@gmail.com', "venky@gmail.com"],
      link: "http://localhost:4200/dashboard/event-details",
      description: "Event details",
      speakers: ['kranthi@gmail.com'],
      address: ["Hyd"],
      venue: ["hyd"]
    },
  ];
  privateEvents: any = [
    {
      name: 'hello',
      startDate: '20 - 12 - 2022',
      startTime: '12: 56 AM',
      endDate: '20 - 12 - 2022',
      endTime: '12: 56 AM',
      type: "ONLINE",
      eventaccess: "PUBLIC",
      attendees: ['kranthimandava@gmail.com', "venky@gmail.com"],
      link: "http://localhost:4200/dashboard/event-details",
      description: "Event details",
      speakers: ['kranthi@gmail.com'],
      address: ["Hyd"],
      venue: ["hyd"]
    },
    {
      name: 'hello',
      startDate: '20 - 12 - 2022',
      startTime: '12: 56 AM',
      endDate: '20 - 12 - 2022',
      endTime: '12: 56 AM',
      type: "INPERSON",
      eventaccess: "PRIVATE",
      attendees: ['kranthimandava@gmail.com', "venky@gmail.com"],
      link: "http://localhost:4200/dashboard/event-details",
      description: "Event details",
      speakers: ['kranthi@gmail.com'],
      address: ["Hyd"],
      venue: ["hyd"]
    }
  ]
  
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
  deleteEvent(event: any) {
    this.curdService.deleteEvent(event.id).subscribe(async (resp: any) => {
      console.log(resp.data);
    }, (err: any) => {
      this.toastr.error(err.error.errObj.message);
    });
  }
}
