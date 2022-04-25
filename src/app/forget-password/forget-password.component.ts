import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CurdService } from '../services/curd.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  pwdForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService, private curdService: CurdService) {
    this.pwdForm = this.fb.group({
      email: [''],
      password: [''],
      confirm_password: [''],
    });
  }

  ngOnInit(): void { }
  backToLogin() {
    this.router.navigateByUrl('/login');
  }
  forgetPassword() {
    if (this.pwdForm.value.email === "") {
      this.toastr.error("Email is required");
    } else if (!this.pwdForm.value.email.includes('@')) {
      this.toastr.error("Email is invalid");
    }
    else if (this.pwdForm.value.password == "" || this.pwdForm.value.confirm_password == "") {
      this.toastr.error("Password field is required");
    } else if (this.pwdForm.value.password === this.pwdForm.value.confirm_password) {
      this.curdService.forgetPassword(this.pwdForm.value).subscribe(async (resp: any) => {
        this.toastr.success(resp.message);
      }, (err: any) => {
        console.log(err)
        this.toastr.error(err.error.message);
      });
    } else {
      this.toastr.error("Passwords are not matched.")
    }
  }
}
