import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CurdService } from '../services/curd.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor( private curdService:CurdService, private toastr: ToastrService, private router: Router) { 
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {}
  login() {
    this.curdService.login(this.loginForm.value).subscribe(async (resp: any) => {
      await localStorage.setItem('token', resp.data.token);
      this.router.navigate(['/dashboard/home']);
    }, (err: any) => {
      console.log(err);
      this.toastr.error(err.error.errObj.message);
    });
  }
  goToLogin() {
    this.router.navigate(['/']);
  }
  goToForgetPassword() {
    alert("Need to implement");
  }
}
