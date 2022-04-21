import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from './../services/curd.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  signup: boolean = true;
  emailVerify: boolean = false;
  signupForm: FormGroup;

  constructor(
    private curdService: CurdService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
    });
  }

  ngOnInit(): void { }
  signUp() {
    console.log(this.signupForm.value)
    this.curdService.signUp(this.signupForm.value).subscribe((resp: any) => {
      console.log(resp);
      this.emailVerify = true;
    }, (err: any) => {
      this.toastr.error(err.error.errObj.message);
    });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
