import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginComponent } from './login/login.component';
import { ConfiramtionEmailComponent } from './confirmation-email/confirmation-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from "./services/auth.service";
import { TaskComponent } from './task/task.component';
import { EventComponent } from './event/event.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
const routes: Routes = [
  { path: '', component: UserRegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  {
    // canActivate: [AuthGuard],
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'event', component: EventComponent },
      { path: 'task-details', component: TaskDetailsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'home', component: HomeComponent },
      { path: 'edit-event', component: EditEventComponent },
      { path: 'event-details', component: EventDetailsComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent },
    ]
  },
  { path: 'confirm/:confirmation_code', component: ConfiramtionEmailComponent, pathMatch: "full" },
  {
    //canActivate: [AuthGuard],
    path: 'task', component: TaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
