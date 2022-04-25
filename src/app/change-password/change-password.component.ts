import { CurdService } from './../services/curd.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePwdForm: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastrService, private curdService: CurdService) {
    this.changePwdForm = this.fb.group({
      password: [''],
      confirm_password: [''],
    });
  }

  ngOnInit(): void { }
  changePassword() {
    if (this.changePwdForm.value.password == "" || this.changePwdForm.value.confirm_password == "") {
      this.toastr.error("Password field is required");
    } else if (this.changePwdForm.value.password === this.changePwdForm.value.confirm_password) {
      this.curdService.changePassword(this.changePwdForm.value).subscribe(async (resp: any) => {
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
