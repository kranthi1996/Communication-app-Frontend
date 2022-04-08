import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginComponent } from './login/login.component';
import { ConfiramtionEmailComponent } from './confiramtion-email/confiramtion-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from "./services/auth.service";

const routes: Routes = [
    { path: '', component: UserRegistrationComponent },
    { path: 'login', component: LoginComponent },
    { canActivate: [AuthGuard],
      path: 'dashboard', 
      component: DashboardComponent 
    },
    { path: 'confirm/:confirmation_code', component: ConfiramtionEmailComponent, pathMatch:"full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
