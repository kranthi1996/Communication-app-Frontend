import { PushNotificationService } from './push-notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {  } from "@angular/material/";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginComponent } from './login/login.component';
import { ConfiramtionEmailComponent } from './confirmation-email/confirmation-email.component';
import { RequestSenderService } from './services/request-sender.service';
import { DataService } from './services/data.service';
import { CurdService } from './services/curd.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { SnackBarService } from "./services/snackbar.service";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TaskComponent } from './task/task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { EventComponent } from './event/event.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ProfileComponent } from './profile/profile.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { HomeComponent } from './home/home.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    LoginComponent,
    ConfiramtionEmailComponent,
    DashboardComponent,
    TaskComponent,
    TaskDetailsComponent,
    EventComponent,
    EventDetailsComponent,
    ProfileComponent,
    EditTaskComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    MatIconModule,
    DragDropModule,
    MatRadioModule
  ],
  providers: [RequestSenderService, CurdService, SnackBarService, PushNotificationService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
