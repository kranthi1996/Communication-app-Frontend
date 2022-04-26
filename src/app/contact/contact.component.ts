import { ToastrService } from 'ngx-toastr';
import { CurdService } from './../services/curd.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  constructor(private fb: FormBuilder, private curdService: CurdService, private toastr: ToastrService) {
    this.contactForm = this.fb.group({
      subject: ["", [Validators.required]],
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      description: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  submit() {
    console.log(this.contactForm.dirty + ' '+ this.contactForm.valid)
    if (this.contactForm.dirty && this.contactForm.valid) {
      this.curdService.contactfeedback(this.contactForm.value).subscribe(async (resp: any) => {
        this.toastr.success('Submitted, thanks for your feedback');
        this.contactForm.reset();
      }, (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message);
      });
    } else {
      this.toastr.error('Please fill all the fields.');
    }
  }
}
